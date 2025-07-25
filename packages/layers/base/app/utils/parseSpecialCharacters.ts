/**
 * Parses a string to decode HTML entities and remove HTML tags.
 *
 * @param text The string to parse.
 * @param fallback The fallback text to return if the input is null or undefined.
 * @returns The sanitized string.
 */
export function parseSpecialCharacters(text: string | undefined | null, fallback = 'N/A'): string {
  // Return fallback text if the input is null or undefined.
  if (text === null || text === undefined) {
    return fallback
  }

  const inputText = String(text)

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(inputText, 'text/html')

    return doc.body.textContent || fallback
  } catch (error) {
    console.error(`Error parsing special characters in: ${inputText}`, error)
    return fallback
  }
}
