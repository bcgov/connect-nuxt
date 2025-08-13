# @sbc-connect/nuxt-base

## 0.1.9

### Patch Changes

- [#43](https://github.com/bcgov/connect-nuxt/pull/43) [`3b521b7`](https://github.com/bcgov/connect-nuxt/commit/3b521b70bf1a0cc5a0feea63a825ef5544347aa8) Thanks [@deetz99](https://github.com/deetz99)! - Form components and new lint rules

  - Forms layer address components
  - Lint rules and fixes to prevent rule collision and promote best practices

  issue: bcgov/entity#29338

## 0.1.8

### Patch Changes

- [#32](https://github.com/bcgov/connect-nuxt/pull/32) [`66d83d1`](https://github.com/bcgov/connect-nuxt/commit/66d83d14b2ec7950057dd39a4d876a8c4096923f) Thanks [@kialj876](https://github.com/kialj876)! - Pay layer cleanup bcgov/entity#29337

## 0.1.7

### Patch Changes

- [#28](https://github.com/bcgov/connect-nuxt/pull/28) [`68af125`](https://github.com/bcgov/connect-nuxt/commit/68af1259b87846f42010026977411481e53ca8fb) Thanks [@kialj876](https://github.com/kialj876)! - Filling out the pay layer. Ticket bcgov/entity#29337

## 0.1.6

### Patch Changes

- [#26](https://github.com/bcgov/connect-nuxt/pull/26) [`65ae301`](https://github.com/bcgov/connect-nuxt/commit/65ae301972b39cfed8550e49c1209133674528a4) Thanks [@deetz99](https://github.com/deetz99)! - Update CSS variables to match Nuxt UI naming convention. Issue: bcgov/entity#29335

- [#27](https://github.com/bcgov/connect-nuxt/pull/27) [`09fa4f1`](https://github.com/bcgov/connect-nuxt/commit/09fa4f1b4b2c65d189a6477c9c5f2d44607b543d) Thanks [@deetz99](https://github.com/deetz99)! - - ConnectModal component

  - ConnectAddressDisplay component
  - logFetchError util
  - tests
  - switch lodash for es-toolkit

  issue: bcgov/entity#29335

- [#25](https://github.com/bcgov/connect-nuxt/pull/25) [`aba11d1`](https://github.com/bcgov/connect-nuxt/commit/aba11d1303ab1b19b3a51c27959766c4ee0cd5d8) Thanks [@deetz99](https://github.com/deetz99)! - - create auth header components

  - connect-auth layout

  issue: bcgov/entity#29335

## 0.1.5

### Patch Changes

- [#19](https://github.com/bcgov/connect-nuxt/pull/19) [`4231254`](https://github.com/bcgov/connect-nuxt/commit/42312540f5eec65f5d3979d5492bdfaa9bb0b079) Thanks [@deetz99](https://github.com/deetz99)! - Several components and utils

  - ConnectInput
  - ConnectTextarea
  - ConnectI18nHelper
  - ConnectSpinner
  - ConnectPageSection
  - parseSpecialCharacters util
  - setBreadcrumbs util
  - set nuxt ui default icons to use mdi instead of lucide icons

  issue: bcgov/entity#29334

## 0.1.4

### Patch Changes

- [#18](https://github.com/bcgov/connect-nuxt/pull/18) [`90f240f`](https://github.com/bcgov/connect-nuxt/commit/90f240fd789a5286ded5df710bddd6dc953bcba5) Thanks [@deetz99](https://github.com/deetz99)! - **Feat: Whats New**

  - fetch whats new inside a plugin
  - whats new header button
  - whats new slideover component
  - whats new plugin tests
  - fix eslint to ignore playwright reports
  - whats new items tracked in local storage to display button chip or not

  issue: bcgov/entity#29334

- [#15](https://github.com/bcgov/connect-nuxt/pull/15) [`0fb8c54`](https://github.com/bcgov/connect-nuxt/commit/0fb8c54e059d78b246b80a03f049d075b7bbcf72) Thanks [@deetz99](https://github.com/deetz99)! - - add spa-loading-template

  - add error.vue
  - add html attrs to app.vue
  - add launch darkly composable & start tests
  - add Banner component
  - add iconify dep and icons to client bundle
  - add test:unit:watch command to run vitest in watch mode
  - update vitest config to search nested folders
  - update --ui-radius var so rounded-md is 0.25rem
  - remove core main css file causing duplicate fonts
  - add html sanitizer plugin

  issue: bcgov/entity#29334

- [#16](https://github.com/bcgov/connect-nuxt/pull/16) [`9b8c225`](https://github.com/bcgov/connect-nuxt/commit/9b8c225a011e3c89c9b490e93a554f55a4e29b78) Thanks [@kialj876](https://github.com/kialj876)! - - add base header components (logo, localeSelect, wrapper)

  - add footer component
  - appendUrlParam util

  issue: bcgov/entity#29334

## 0.1.3

### Patch Changes

- [#9](https://github.com/bcgov/connect-nuxt/pull/9) [`e841fde`](https://github.com/bcgov/connect-nuxt/commit/e841fde27630d63efb2c152cd78d92b1193d1d5e) Thanks [@kialj876](https://github.com/kialj876)! - Add Nuxt back as a dev dependency

- [#8](https://github.com/bcgov/connect-nuxt/pull/8) [`c85ebfc`](https://github.com/bcgov/connect-nuxt/commit/c85ebfc879e19cce307b109c9d38044f71f482d2) Thanks [@kialj876](https://github.com/kialj876)! - Added in i18n, added base header components, added in styles for nuxt ui

## 0.1.2

### Patch Changes

- [#5](https://github.com/bcgov/connect-nuxt/pull/5) [`2999779`](https://github.com/bcgov/connect-nuxt/commit/29997796bd3908b2c5ba04319b26cbb00bffe0fc) Thanks [@kialj876](https://github.com/kialj876)! - Updated fonts propagation in base, cleaned up dependencies in layers

## 0.1.1

### Patch Changes

- [#3](https://github.com/bcgov/connect-nuxt/pull/3) [`401b62a`](https://github.com/bcgov/connect-nuxt/commit/401b62a465c338cb745c14db645797ffaac1ddab) Thanks [@kialj876](https://github.com/kialj876)! - Layer updates
