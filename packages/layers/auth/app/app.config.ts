export default defineAppConfig({
  connect: {
    login: {
      redirect: '',
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
