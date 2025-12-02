export default defineNuxtRouteMiddleware((to) => {
  const ac = useAppConfig().connect.login
  const validIdps = getValidIdps()
  const allowedIdps = to.query.allowedIdps as string | undefined

  if (allowedIdps) {
    const idpArray = allowedIdps
      .split(',')
      .filter(idp =>
        validIdps.includes(idp as ConnectValidIdpOption)
      ) as ConnectValidIdps

    if (idpArray.length) {
      // updateAppConfig util doesn't seem to be updating correctly
      // https://nuxt.com/docs/4.x/api/utils/update-app-config
      // assign directly
      ac.idps = idpArray
    }
  }
})
