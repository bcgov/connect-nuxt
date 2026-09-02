export default defineAppConfig({
  connectOverrides: {
    bcscOnly: {
      login: {
        idps: ['bcsc'],
        idpEnforcement: true
      }
    },
    customDescription: {
      login: {
        description: 'connect.page.login.descriptionCustom'
      }
    }
  }
})
