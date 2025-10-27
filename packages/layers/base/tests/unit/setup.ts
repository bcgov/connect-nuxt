import { vi } from 'vitest'

vi.mock('reka-ui', async (importOriginal) => {
  const original = await importOriginal<typeof import('reka-ui')>()

  return {
    ...original,
    PopperRoot: {
      template: '<div><slot /></div>'
    }
  }
})
