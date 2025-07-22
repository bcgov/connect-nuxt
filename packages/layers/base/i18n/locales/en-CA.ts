export default {
  btn: {
    appVersion: 'App Version',
    bcRegHome: 'BC Registries Home',
    createAccount: 'Create Account',
    editProfile: 'Edit Profile',
    logout: 'Log out',
    login: 'Log in',
    accountInfo: 'Account Info',
    teamMembers: 'Team Members',
    transactions: 'Transactions',
    notifications: {
      main: 'Notifications',
      aria: 'Notifications, {count} New'
    },
    accountOptionsMenu: 'Account Options Menu',
    whatsNew: "What's New",
    mainMenu: 'Main menu',
    goHome: 'Go Home'
  },
  label: {
    accountSettings: 'Account Settings',
    bcRegOLServices: 'BC Registries and Online Services',
    switchAccount: 'Switch Account',
    selectLoginMethod: 'Select log in method',
    bcsc: 'BC Services Card',
    bceid: 'BCeID',
    idir: 'IDIR',
    whatsNewSlideover: "What's New at BC Registries"
  },
  notifications: {
    none: 'No Notifications',
    teamMemberApproval: '{count} team member requires approval to access this account. | {count} team members require approval to access this account.'
  },
  ConnectFooter: {
    navLabel: 'Useful Links', // <nav> aria-label
    home: 'Home',
    releaseNotes: 'Release Notes',
    fees: 'Fees',
    disclaimer: 'Disclaimer',
    privacy: 'Privacy',
    ally: 'Accessibility',
    copyright: 'Copyright',
    bcApp: 'A BC Online Application'
  },
  ConnectHeader: {
    title: 'Service BC Connect',
    logoBtnLabel: 'Home', // <img> link aria-label
    navLabel: 'Main Navigation', // <nav> aria-label
    homeLink: 'Home'
  },
  ConnectBCGovLogo: {
    alt: 'Government of British Columbia Logo' // <img> alt
  },
  ConnectLocaleSelect: {
    // aria-label
    label: 'Select a Language, current language: English'
  },
  ConnectBreadcrumb: {
    default: 'Service BC Connect',
    backBtn: 'Go Back',
    arialabel: 'Breadcrumb'
  },
  ConnectPage: {
    error: {
      404: {
        title: 'Page Not Found - Service BC Connect',
        h1: '404 Page Not Found',
        content: 'This page could not be found or does not exist.'
      },
      unknown: {
        title: 'Unknown Error - Service BC Connect',
        h1: 'Unknown Error',
        content: 'An unknown error occured, please refresh the page or try again later.'
      }
    }
  },
  ConnectModalSessionExpiring: {
    title: 'Session Expiring Soon',
    content: 'Your session is about to expire due to inactivity. You will be logged out in {boldStart}0{boldEnd} seconds. Press any key to continue your session. | Your session is about to expire due to inactivity. You will be logged out in {boldStart}1{boldEnd} second. Press any key to continue your session. | Your session is about to expire due to inactivity. You will be logged out in {boldStart}{count}{boldEnd} seconds. Press any key to continue your session.',
    sessionExpired: 'Session Expired',
    continueBtn: {
      main: 'Continue Session',
      aria: 'Your session is about to expire, press any key to continue your session.'
    }
  },
  test: {
    i18nBold: {
      strong: 'This should have {boldStart} bold {boldEnd} text',
      strongWithProps: 'This should have {boldStart} bold {boldEnd} text and allow a {prop}',
      italic: 'Italic test {italicStart} goes here {italicEnd}.'
    }
  }
}
