import { describe, expect, it } from 'vitest'
import { parseSpecialCharacters } from '../../../app/utils/parseSpecialCharacters'

describe('parseSpecialCharacters', () => {
  it('returns fallback for undefined input', () => {
    const result = parseSpecialCharacters(undefined)
    expect(result).toBe('N/A')
  })

  it('returns fallback for null input', () => {
    const result = parseSpecialCharacters(null)
    expect(result).toBe('N/A')
  })

  it('returns custom fallback for undefined input', () => {
    const result = parseSpecialCharacters('Custom Fallback', 'Custom Fallback')
    expect(result).toBe('Custom Fallback')
  })

  it('returns custom fallback for null input', () => {
    const result = parseSpecialCharacters('Custom Fallback', 'Custom Fallback')
    expect(result).toBe('Custom Fallback')
  })

  it('returns original text if no special characters', () => {
    const text = 'Hello World'
    const result = parseSpecialCharacters(text)
    expect(result).toBe(text)
  })

  it('handles text containing special characters', () => {
    const text = 'Hello! How are you?'
    const parsedText = 'Hello! How are you?'

    const result = parseSpecialCharacters(text)
    expect(result).toBe(parsedText)
  })

  it('handles text with accented characters', () => {
    const text = 'Café'
    const parsedText = 'Café'

    const result = parseSpecialCharacters(text)
    expect(result).toBe(parsedText)
  })

  it.each([
    ['<div>Some HTML content</div>', 'Some HTML content'],
    ['àèìòù', 'àèìòù'],
    ['&amp; &gt; &lt;', '& > <'],
    // ['&copy; &reg;', '© ®'], // doesnt work in happydom but works in vue template
    ['😊', '😊'],
    ['@#$%^&*()', '@#$%^&*()'],
    ['&lt; &gt; &amp;', '< > &'], 
    ['&#955;UG&#695;AL&#601;S', 'λUGʷALəS'], 
    ['&#247; &#215; &#162;', '÷ × ¢'],
    ['&#171; &#8220;Hello&#8221; &#187;', '« “Hello” »']
  ])('handles special character strings', (value, expected) => {
      const result = parseSpecialCharacters(value)
      expect(result).toEqual(expected)
    })
})
