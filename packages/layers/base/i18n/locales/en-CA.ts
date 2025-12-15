export default {
  /* Ordering should be alphabetical unless otherwise specified */
  connect: {
    breadcrumb: {
      /* Only include breadcrumb values that extended apps may overwrite */
      arialabel: 'Breadcrumb',
      default: 'Service BC Connect'
    },
    footer: {
      /* Only include footer values that extended apps may overwrite */
      navLabel: 'Useful Links' // <nav> aria-label
    },
    header: {
      /* Only include header values that extended apps may overwrite */
      homeLink: 'Home', // aria-label
      navLabel: 'Main Navigation', // <nav> aria-label
      title: 'Service BC Connect'
    },
    label: {
      accessibility: 'Accessibility',
      appVersion: 'App Version',
      bcApp: 'A BC Online Application',
      bcGovLogo: 'Government of British Columbia Logo',
      cancel: 'Cancel',
      close: 'Close',
      contactInformation: 'Contact Information',
      copyright: 'Copyright',
      disclaimer: 'Disclaimer',
      fees: 'Fees',
      goBack: 'Go Back',
      goHome: 'Go Home',
      home: 'Home',
      hoursOfOperation: 'Hours of Operation',
      localeSelect: 'Select a Language, current language: English',
      privacy: 'Privacy',
      whatsNew: "What's New",
      whatsNewAria: "What's New, {count} unread",
      whatsNewSlideover: "What's New at BC Registries"
    },
    page: {
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
    text: {
      whatsNewSlideoverDescription: ' ',
      whatsNewSlideoverEmpty: 'No new items.'
    }
  },
  test: {
    i18n: {
      strong: 'This should have {boldStart} bold {boldEnd} text',
      strongWithProps: 'This should have {boldStart} bold {boldEnd} text and allow a {prop}',
      italic: 'Italic test {italicStart} goes here {italicEnd}.',
      computed: 'This text will be updated. Updated {boldStart}{count}{boldEnd} times.',
      sanitized: () => {
        return "This is <strong>safe bold text</strong>, with a sanitized <script>alert('XSS')</script> script element."
      }
    }
  }
}
