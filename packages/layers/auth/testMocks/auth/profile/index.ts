import fs from 'fs'
import { createResolver } from 'nuxt/kit'

import type { ConnectAccount } from '#auth/app/interfaces/connect-account'

const { resolve } = createResolver(import.meta.url)

export const getUserProfileMock = () => {
  const json: ConnectAccount[] = JSON.parse(fs.readFileSync(resolve('./json/PUBLIC_USER.json'), 'utf8'))
  return json
}
