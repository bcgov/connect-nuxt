import { describe, it, expect } from 'vitest'

describe('getErrorMessage', () => {
  it('should prioritize top level "message" property', () => {
    const error = {
      message: 'top level message',
      detail: 'top level detail',
      data: {
        rootCause: { message: 'root cause message' }
      }
    }
    expect(getErrorMessage(error)).toBe('top level message')
  })

  it('should return top level "detail" property is no "message"', () => {
    const error = {
      detail: 'top level detail',
      data: {
        rootCause: { message: 'root cause message' }
      }
    }
    expect(getErrorMessage(error)).toBe('top level detail')
  })

  it('should return "data.rootCause.message" property if no top level message', () => {
    const error = {
      data: {
        rootCause: {
          message: 'root cause message',
          detail: 'root cause detail'
        },
        message: 'base data message'
      }
    }
    expect(getErrorMessage(error)).toBe('root cause message')
  })

  it('should return "data.rootCause.detail" property if no top level message, detail or rootCause.message', () => {
    const error = {
      data: {
        rootCause: {
          detail: 'root cause detail'
        },
        message: 'base data message'
      }
    }
    expect(getErrorMessage(error)).toBe('root cause detail')
  })

  it('should return "data.message" property if no top level message, detail or rootCause message or detail', () => {
    const error = {
      data: {
        message: 'base data message',
        detail: 'base data detail'
      }
    }
    expect(getErrorMessage(error)).toBe('base data message')
  })

  it('should return "data.detail" property if no other checks passed', () => {
    const error = {
      data: {
        detail: 'base data detail'
      }
    }
    expect(getErrorMessage(error)).toBe('base data detail')
  })

  it('should return undefined for null, undefined, string, numbers and empty objects', () => {
    expect(getErrorMessage(null)).toBeUndefined()
    expect(getErrorMessage(undefined)).toBeUndefined()
    expect(getErrorMessage('error')).toBeUndefined()
    expect(getErrorMessage(123)).toBeUndefined()
    expect(getErrorMessage({})).toBeUndefined()
  })

  it('should return undefined if found value isnt a string', () => {
    const error = {
      data: {
        rootCause: {
          message: 100
        }
      }
    }
    expect(getErrorMessage(error)).toBeUndefined()
  })

  it('should return the text from a JS error', () => {
    const error = new Error('JS error')
    expect(getErrorMessage(error)).toEqual('JS error')
  })
})
