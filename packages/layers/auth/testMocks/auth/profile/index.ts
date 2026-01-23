import fs from 'fs'
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export const getUserProfileMock = () => {
  const json: ConnectAuthProfile = JSON.parse(fs.readFileSync(resolve('./json/PUBLIC_USER.json'), 'utf8'))
  return json
}
