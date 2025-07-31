/* eslint-disable max-len */
export default defineAppConfig({
  connect: {
    payApi: {
      errorRedirect: {
        401: '/'
      }
    }
  }
})
