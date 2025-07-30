import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logFetchError } from '../../../app/utils/logFetchError'

describe('logFetchError', () => {
  let consoleSpy

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should log a simple message when error is not an object with response', () => {
    const message = 'Failed to load data'
    const error = 'Network error'
    logFetchError(error, message)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(message)
  })

  it('should log a message with status and statusText from response', () => {
    const message = 'API request failed'
    const error = {
      response: {
        status: 404,
        statusText: 'Not Found'
      }
    }
    logFetchError(error, message)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(`${message}: 404 - Not Found `)
  })

  it('should use data.message for statusText if available and statusText is empty', () => {
    const message = 'Login failed'
    const error = {
      response: {
        status: 401,
        statusText: ''
      },
      data: {
        message: 'Invalid credentials'
      }
    }
    logFetchError(error, message)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(
      `${message}: 401 - Invalid credentials --- {"message":"Invalid credentials"}`
    )
  })

  it('should include data payload when data.message exists', () => {
    const message = 'Failed to submit form'
    const error = {
      response: {
        status: 400,
        statusText: 'Bad Request'
      },
      data: {
        message: 'Validation error',
        errors: { name: 'Name is required' }
      }
    }
    logFetchError(error, message)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(
      `${message}: 400 - Bad Request --- {"message":"Validation error","errors":{"name":"Name is required"}}`
    )
  })
})
