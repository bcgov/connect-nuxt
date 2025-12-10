/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Safely extracts an error message from an unknown error object.
 *
 * The search order (Highest Priority to Lowest) is:
 * 1. Current object's 'message' (must be a non-empty string).
 * 2. Current object's 'detail' (must be a non-empty string).
 * 3. Recursively searches the 'error.data.rootCause' object.
 * 4. Recursively searches the 'error.data' object.
 *
 * This function will return the first valid, non-empty string message found.
 *
 * @param error - The error object (unknown).
 * @returns The error message if found, else 'undefined'.
*/
export function getErrorMessage(error: unknown): string | undefined {
  if (error && typeof error === 'object') {
    const errorObject = error as Record<string, any>

    const message = errorObject.message
    if (message && typeof message === 'string' && message.length > 0) {
      return message
    }
    const detail = errorObject.detail
    if (detail && typeof detail === 'string' && detail.length > 0) {
      return detail
    }

    const rootCauseMessage = getErrorMessage(errorObject?.data?.rootCause)
    if (rootCauseMessage) {
      return rootCauseMessage
    }

    const dataMessage = getErrorMessage(errorObject?.data)
    if (dataMessage) {
      return dataMessage
    }
  }

  return undefined
}
