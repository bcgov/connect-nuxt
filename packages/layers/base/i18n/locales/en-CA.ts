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
      copyright: 'Copyright',
      disclaimer: 'Disclaimer',
      fees: 'Fees',
      goBack: 'Go Back',
      home: 'Home',
      localeSelect: 'Select a Language, current language: English',
      privacy: 'Privacy',
      releaseNotes: 'Release Notes'
    },
    text: {}
  },
  test: {
    i18nBold: {
      strong: 'This should have {boldStart} bold {boldEnd} text',
      strongWithProps: 'This should have {boldStart} bold {boldEnd} text and allow a {prop}',
      italic: 'Italic test {italicStart} goes here {italicEnd}.'
    }
  }
}
