/* eslint-disable max-len */
export default {
  /* Ordering should be alphabetical unless otherwise specified */
  connect: {
    label: {
      accept: 'Accept',
      accountInfo: 'Account Info',
      accountInformation: 'Account Information',
      accountOptionsMenu: 'Account Options Menu',
      accountSettings: 'Account Settings',
      back: 'Back',
      bceid: 'BCeID',
      bcsc: 'BC Services Card',
      createAccount: 'Create Account',
      createNewAccount: 'Create New Account',
      createNewAccountCont: 'Create a new account to continue',
      decline: 'Decline',
      declineTermsOfUse: 'Decline Terms of Use',
      editProfile: 'Edit Profile',
      existingAccountFound: 'Existing Account Found',
      idir: 'IDIR',
      logout: 'Log out',
      login: 'Log in',
      mainMenu: 'Main Menu',
      notifications: 'Notifications',
      notificationsAria: 'Notifications, {count} unread',
      saveAndContinue: 'Save and Continue',
      sbcAccountCreation: 'Service BC Account Creation',
      selectLoginMethod: 'Select log in method',
      switchAccount: 'Switch Account',
      teamMembers: 'Team Members',
      transactions: 'Transactions',
      useThisAccount: 'Use this Account',
      useThisAccountAria: 'Use this Account, {name}',
      yourExistingAccounts: '{boldStart}Your Existing Accounts{boldEnd} ({count})'
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
        },
        newBcscUserWelcome: {
          title: 'Welcome to the new Business Registry',
          description: 'To complete the move of your business, sign in or create an account using your BC Services'
            + ' Card below.'
        }
      },
      termsOfUse: {
        h1: 'Terms of Use',
        title: 'Terms of Use - Service BC Connect'
      },
      createAccount: {
        yourNameLabel: 'Your Name',
        yourNameHelp: 'This is your legal name as it appears on your BC Services Card.',
        accountNameLabel: 'Account Name',
        accountNameHelp: 'This is your default login name.',
        emailLabel: 'Email',
        emailPlaceholder: 'Enter email address',
        phoneLabel: 'Phone',
        phonePlaceholder: 'Enter phone number',
        phoneExtensionLabel: 'Phone extension (Optional)',
        addressLabel: 'Address',
        countryLabel: 'Country'
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
    invalidIdp: {
      title: 'You\'re logged in with your',
      content: 'To continue, you must sign in with your BC Services Card. Please log out and sign in again using your BC Services Card credentials.'
    },
    text: {
      alertExistingAccountFound: '{boldStart}Note:{boldEnd} It looks like you already have an account with Service BC Connect. You can use an existing account to proceed or create a new one.',
      alertUnableToLoadTermsOfUse: 'Unable to load Terms of Use, please try again later.',
      declineTOSCantAccessService: 'By declining the Terms of Use, you won’t be able to access this service. Do you wish to proceed?',
      iHaveReadAndAcceptTermsOfUse: 'I have read and accept the Terms of Use',
      imageAltGenericLogin: 'Generic Login Image',
      notifications: {
        none: 'No Notifications',
        teamMemberApproval: '{count} team member requires approval to access this account. | {count} team members require approval to access this account.'
      },
      patchTosError: {
        title: 'Terms of Use Update Error',
        description: 'Unable to update Terms of Use at this time. Please try again later.'
      },
      accountCreationError: {
        title: 'Account Creation Error',
        description: 'Unable to create your account at this time. Please try again later.'
      },
      userContactUpdateError: {
        title: 'User Contact Update Error',
        description: 'Unable to update your contact information at this time. Please try again later.'
      }
    },
    validation: {
      acceptTermsOfUse: 'Please accept the Terms of Use.',
      duplicateAccountName: 'An account with this name already exists.',
      requestError: 'Request error, please try again.',
      termsOfUseScrollToBottom: 'Please scroll to the bottom of the page to accept the Terms of Use.',
      phoneNumberFormat: 'Phone must be in the format (123) 123-1231',
      phoneExtFormat: 'Extension must be digits only',
      requiredAccountName: 'Account name is required'
    }
  }
}
