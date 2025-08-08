/* eslint-disable max-len */
export default {
  /* Ordering should be alphabetical unless otherwise specified */
  connect: {
    label: {
      accountInfo: 'Account Info',
      accountOptionsMenu: 'Account Options Menu',
      accountSettings: 'Account Settings',
      bceid: 'BCeID',
      bcsc: 'BC Services Card',
      createAccount: 'Create Account',
      editProfile: 'Edit Profile',
      idir: 'IDIR',
      logout: 'Log out',
      login: 'Log in',
      mainMenu: 'Main Menu',
      notifications: 'Notifications',
      notificationsAria: 'Notifications, {count} unread',
      selectLoginMethod: 'Select log in method',
      switchAccount: 'Switch Account',
      teamMembers: 'Team Members',
      transactions: 'Transactions'
    },
    page: {
      login: {
        h1: 'SBC Connect Account Login',
        title: 'Log in - SBC Connect',
        loginBCSC: 'Login with BC Services Card',
        loginBCEID: 'Login with BCeID',
        loginIDIR: 'Login with IDIR',
        sessionExpiredAlert: {
          title: 'Session Expired',
          description: 'Your session has expired. Please log in again to continue.'
        }
      }
    },
    sessionExpiry: {
      title: 'Session Expiring Soon',
      content: 'Your session is about to expire due to inactivity. You will be logged out in {boldStart}0{boldEnd} seconds. Press any key to continue your session. | Your session is about to expire due to inactivity. You will be logged out in {boldStart}1{boldEnd} second. Press any key to continue your session. | Your session is about to expire due to inactivity. You will be logged out in {boldStart}{count}{boldEnd} seconds. Press any key to continue your session.',
      sessionExpired: 'Session Expired',
      continueBtn: {
        main: 'Continue Session',
        aria: 'Your session is about to expire, press any key to continue your session.'
      }
    },
    text: {
      imageAltGenericLogin: 'Generic Login Image',
      notifications: {
        none: 'No Notifications',
        teamMemberApproval: '{count} team member requires approval to access this account. | {count} team members require approval to access this account.'
      }
    }
  }
}
