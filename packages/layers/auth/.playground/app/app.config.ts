export default defineAppConfig({
  connectOverrides: {
    bcscOnly: {
      login: {
        idps: ['bcsc'],
        idpEnforcement: true
      }
    }
  }
})
