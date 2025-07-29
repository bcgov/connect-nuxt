export default defineAppConfig({
  connect: {
    login: {
      redirectPath: '',
      idps: ['bcsc', 'bceid', 'idir']
    },
    header: {
      loginMenu: true,
      createAccount: true,
      notifications: true,
      accountOptionsMenu: true
    }
  }
})
