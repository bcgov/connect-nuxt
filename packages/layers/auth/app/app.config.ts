export default defineAppConfig({
  connect: {
    login: {
      redirect: '',
      idps: ['bcsc', 'bceid', 'idir']
    },
    logout: {
      redirect: ''
    },
    header: {
      loginMenu: true,
      createAccount: true,
      notifications: true,
      accountOptionsMenu: true
    }
  }
})
