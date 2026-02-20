# @sbc-connect/nuxt-auth

## 0.6.0

### Minor Changes

- [#127](https://github.com/bcgov/connect-nuxt/pull/127) [`63409ea`](https://github.com/bcgov/connect-nuxt/commit/63409eab3ef9072fe8e05662b44f61bb8be6cff4) Thanks [@cameron-eyds](https://github.com/cameron-eyds)! - Improved name lookup validations

- [#125](https://github.com/bcgov/connect-nuxt/pull/125) [`fda1d48`](https://github.com/bcgov/connect-nuxt/commit/fda1d48ed55838aeece70aa04a82440153a3db24) Thanks [@cameron-eyds](https://github.com/cameron-eyds)! - Includes contact POST and minor redirect refactors

### Patch Changes

- Updated dependencies [[`8cc8cc0`](https://github.com/bcgov/connect-nuxt/commit/8cc8cc09aad741dc841a864998129c6ac5a6af2f)]:
  - @sbc-connect/nuxt-base@0.6.1
  - @sbc-connect/nuxt-forms@0.4.1

## 0.5.0

### Minor Changes

- [#123](https://github.com/bcgov/connect-nuxt/pull/123) [`3c33132`](https://github.com/bcgov/connect-nuxt/commit/3c331327a27cfbd0613c268abf97842288d10f8c) Thanks [@cameron-eyds](https://github.com/cameron-eyds)! - Auth Redirect Enhancements

## 0.4.1

### Patch Changes

- [#121](https://github.com/bcgov/connect-nuxt/pull/121) [`e4d8d9e`](https://github.com/bcgov/connect-nuxt/commit/e4d8d9e510af321a2cc7ba12ca270a5f018981e5) Thanks [@kialj876](https://github.com/kialj876)! - Updated account mocking so that tests can mock their own account instead of the hardcoded mock

- Updated dependencies []:
  - @sbc-connect/nuxt-base@0.6.0
  - @sbc-connect/nuxt-forms@0.4.0

## 0.4.0

### Minor Changes

- [#118](https://github.com/bcgov/connect-nuxt/pull/118) [`41e58f4`](https://github.com/bcgov/connect-nuxt/commit/41e58f44e6d216e7de568bccb2e240b2d89b8408) Thanks [@deetz99](https://github.com/deetz99)! - Remove now unnecessary css module workaround.

- [#120](https://github.com/bcgov/connect-nuxt/pull/120) [`9f42868`](https://github.com/bcgov/connect-nuxt/commit/9f428681207188292d52cf6d370035f54bdb6ab4) Thanks [@cameron-eyds](https://github.com/cameron-eyds)! - Idp Enforcement Modal and bcsc user welcome msg

- [#117](https://github.com/bcgov/connect-nuxt/pull/117) [`e3da105`](https://github.com/bcgov/connect-nuxt/commit/e3da1056247f5c502578dc70f95375e66e3cc1da) Thanks [@deetz99](https://github.com/deetz99)! - Update all dependencies

- [#119](https://github.com/bcgov/connect-nuxt/pull/119) [`ee5ba9e`](https://github.com/bcgov/connect-nuxt/commit/ee5ba9e6f7302e8ea11fd0ebfa887c4f6269b0ee) Thanks [@cameron-eyds](https://github.com/cameron-eyds)! - implements Dynamic app.config and idp enforcement

- [#114](https://github.com/bcgov/connect-nuxt/pull/114) [`fe3eef1`](https://github.com/bcgov/connect-nuxt/commit/fe3eef1b39cc5883cc5e8560efe0dd89d04d0455) Thanks [@cameron-eyds](https://github.com/cameron-eyds)! - Implements Acct Creation submissions, contact updates and name lookup

### Patch Changes

- Updated dependencies [[`41e58f4`](https://github.com/bcgov/connect-nuxt/commit/41e58f44e6d216e7de568bccb2e240b2d89b8408), [`e3da105`](https://github.com/bcgov/connect-nuxt/commit/e3da1056247f5c502578dc70f95375e66e3cc1da), [`fe3eef1`](https://github.com/bcgov/connect-nuxt/commit/fe3eef1b39cc5883cc5e8560efe0dd89d04d0455)]:
  - @sbc-connect/nuxt-forms@0.4.0
  - @sbc-connect/nuxt-base@0.6.0

## 0.3.0

### Minor Changes

- [#108](https://github.com/bcgov/connect-nuxt/pull/108) [`8571754`](https://github.com/bcgov/connect-nuxt/commit/8571754160242c3233838fc039fd1a01ff9d7a82) Thanks [@cameron-eyds](https://github.com/cameron-eyds)! - Implements account creation in Auth and Country Code/Country Flag components in Forms

### Patch Changes

- Updated dependencies [[`8571754`](https://github.com/bcgov/connect-nuxt/commit/8571754160242c3233838fc039fd1a01ff9d7a82), [`d9d6356`](https://github.com/bcgov/connect-nuxt/commit/d9d63560e27117c43b9e8e54d363c3fdbb620049), [`dd17349`](https://github.com/bcgov/connect-nuxt/commit/dd173497255f35415b468e17f7192722f604d3c8)]:
  - @sbc-connect/nuxt-forms@0.3.0
  - @sbc-connect/nuxt-base@0.5.0

## 0.2.1

### Patch Changes

- Updated dependencies [[`f5d34df`](https://github.com/bcgov/connect-nuxt/commit/f5d34df0bbb2b37cbeda8a9dd39c6bce098c564f)]:
  - @sbc-connect/nuxt-base@0.4.0

## 0.2.0

### Minor Changes

- [#104](https://github.com/bcgov/connect-nuxt/pull/104) [`5f1b383`](https://github.com/bcgov/connect-nuxt/commit/5f1b3839ed993654a7f20fe161047ba38ab86274) Thanks [@deetz99](https://github.com/deetz99)! - - Terms of Use page

  - check user terms of use in auth middleware
  - useAuthApi composable using pinia-colada for api methods
  - terms of use error/decline modals
  - auth contact, auth profile and terms of use interfaces
  - update account store to use pinia-colada query for setUserName method
  - related i18n translations
  - add '@pinia/colada-nuxt' nuxt module

- [#102](https://github.com/bcgov/connect-nuxt/pull/102) [`d714785`](https://github.com/bcgov/connect-nuxt/commit/d71478573f1fe11be34d5d588d68fb75eb5fd159) Thanks [@deetz99](https://github.com/deetz99)! - - allowed-idps middleware
  - login-page middleware
  - add explicit typing for allowed idps in app config
  - util getValidIdps constant
  - Choose existing account page (WIP)

### Patch Changes

- Updated dependencies [[`d714785`](https://github.com/bcgov/connect-nuxt/commit/d71478573f1fe11be34d5d588d68fb75eb5fd159), [`5f1b383`](https://github.com/bcgov/connect-nuxt/commit/5f1b3839ed993654a7f20fe161047ba38ab86274)]:
  - @sbc-connect/nuxt-base@0.3.0

## 0.1.32

### Patch Changes

- [#98](https://github.com/bcgov/connect-nuxt/pull/98) [`cb7ba1b`](https://github.com/bcgov/connect-nuxt/commit/cb7ba1b38a7e7dbeb296479ef0fcba13ddb1d20f) Thanks [@kialj876](https://github.com/kialj876)! - Auth Layer: Move auth layout to component, Pay Layer: Add in sidebar for examples and add layout tests

- Updated dependencies [[`09323e1`](https://github.com/bcgov/connect-nuxt/commit/09323e1fcaff9a2738528c8161288c1d4bcd0677), [`033f6c6`](https://github.com/bcgov/connect-nuxt/commit/033f6c624fbf953f1d7cf491c876cc9b58619b22)]:
  - @sbc-connect/nuxt-base@0.2.0

## 0.1.31

### Patch Changes

- Updated dependencies [[`a0724ac`](https://github.com/bcgov/connect-nuxt/commit/a0724ac5fdf44296e822942b0eea6be3bb313fcb)]:
  - @sbc-connect/nuxt-base@0.1.29

## 0.1.30

### Patch Changes

- [#90](https://github.com/bcgov/connect-nuxt/pull/90) [`b66923e`](https://github.com/bcgov/connect-nuxt/commit/b66923e94a2c8a7aa936b7e371e727be73d90ea7) Thanks [@kialj876](https://github.com/kialj876)! - Base tombstone - bug fix

- Updated dependencies [[`b66923e`](https://github.com/bcgov/connect-nuxt/commit/b66923e94a2c8a7aa936b7e371e727be73d90ea7)]:
  - @sbc-connect/nuxt-base@0.1.28

## 0.1.29

### Patch Changes

- [#88](https://github.com/bcgov/connect-nuxt/pull/88) [`11ccded`](https://github.com/bcgov/connect-nuxt/commit/11ccdedb47c73d36a335ddd96e529fe74ca17480) Thanks [@kialj876](https://github.com/kialj876)! - Base layer - Update tombstone component stateKey prop to optional

- Updated dependencies [[`11ccded`](https://github.com/bcgov/connect-nuxt/commit/11ccdedb47c73d36a335ddd96e529fe74ca17480)]:
  - @sbc-connect/nuxt-base@0.1.27

## 0.1.28

### Patch Changes

- Updated dependencies [[`c1fb4f2`](https://github.com/bcgov/connect-nuxt/commit/c1fb4f2a217b3d57e7ea7aed8b9773e215a21978)]:
  - @sbc-connect/nuxt-base@0.1.26

## 0.1.27

### Patch Changes

- [#85](https://github.com/bcgov/connect-nuxt/pull/85) [`6b0f70a`](https://github.com/bcgov/connect-nuxt/commit/6b0f70ab895a26c0b049dce84b130d6a04fd911e) Thanks [@kialj876](https://github.com/kialj876)! - Common layout updates, default state key for tombstone, fee store - waive fees, add prioirty, expose cached fees

- [#84](https://github.com/bcgov/connect-nuxt/pull/84) [`f37700a`](https://github.com/bcgov/connect-nuxt/commit/f37700ab568335df724a5e9472a5e0b4198704b5) Thanks [@deetz99](https://github.com/deetz99)! - feat: Add mock option to auth middleware.

- Updated dependencies [[`f37700a`](https://github.com/bcgov/connect-nuxt/commit/f37700ab568335df724a5e9472a5e0b4198704b5), [`6b0f70a`](https://github.com/bcgov/connect-nuxt/commit/6b0f70ab895a26c0b049dce84b130d6a04fd911e), [`ba04c84`](https://github.com/bcgov/connect-nuxt/commit/ba04c8424353b32af0811534d9c3edd31e15d39e)]:
  - @sbc-connect/nuxt-base@0.1.25

## 0.1.26

### Patch Changes

- Updated dependencies [[`0615542`](https://github.com/bcgov/connect-nuxt/commit/06155422d0a8d61ee862bb3483330610b4a9434d)]:
  - @sbc-connect/nuxt-base@0.1.24

## 0.1.25

### Patch Changes

- [#77](https://github.com/bcgov/connect-nuxt/pull/77) [`86ec3d0`](https://github.com/bcgov/connect-nuxt/commit/86ec3d03baa7dae3137f6c4c96a328f13eb46ce5) Thanks [@deetz99](https://github.com/deetz99)! - Update dependencies

- Updated dependencies [[`86ec3d0`](https://github.com/bcgov/connect-nuxt/commit/86ec3d03baa7dae3137f6c4c96a328f13eb46ce5), [`86ec3d0`](https://github.com/bcgov/connect-nuxt/commit/86ec3d03baa7dae3137f6c4c96a328f13eb46ce5), [`86ec3d0`](https://github.com/bcgov/connect-nuxt/commit/86ec3d03baa7dae3137f6c4c96a328f13eb46ce5)]:
  - @sbc-connect/nuxt-base@0.1.23

## 0.1.24

### Patch Changes

- Updated dependencies [[`3dec6d9`](https://github.com/bcgov/connect-nuxt/commit/3dec6d92101915d2253cb177c38acf2a2e534fc1)]:
  - @sbc-connect/nuxt-base@0.1.22

## 0.1.23

### Patch Changes

- Updated dependencies [[`6c568da`](https://github.com/bcgov/connect-nuxt/commit/6c568da341a6d9c56cacf2c5ad56301837f9f525)]:
  - @sbc-connect/nuxt-base@0.1.21

## 0.1.22

### Patch Changes

- [#71](https://github.com/bcgov/connect-nuxt/pull/71) [`1752ac6`](https://github.com/bcgov/connect-nuxt/commit/1752ac651e03269825b81bf24bba3fcc67c2679c) Thanks [@deetz99](https://github.com/deetz99)! - fix logout page accidentally referencing login redirect property

## 0.1.21

### Patch Changes

- Updated dependencies [[`88cd406`](https://github.com/bcgov/connect-nuxt/commit/88cd406e185ec8b91b35ec04efc80e2518412462)]:
  - @sbc-connect/nuxt-base@0.1.20

## 0.1.20

### Patch Changes

- Updated dependencies [[`f1145be`](https://github.com/bcgov/connect-nuxt/commit/f1145be1b8b175d9f2e37ae13305d112c6d31cc9)]:
  - @sbc-connect/nuxt-base@0.1.19

## 0.1.19

### Patch Changes

- Updated dependencies [[`291b7dd`](https://github.com/bcgov/connect-nuxt/commit/291b7dd9147dfe465efaabca645ff5cef23d2a66), [`6ff25af`](https://github.com/bcgov/connect-nuxt/commit/6ff25af994b1099582f632825e1c280a518ff59a)]:
  - @sbc-connect/nuxt-base@0.1.18

## 0.1.18

### Patch Changes

- Updated dependencies [[`b77b067`](https://github.com/bcgov/connect-nuxt/commit/b77b067c07962f79396064f14da87dd25a89a4d1)]:
  - @sbc-connect/nuxt-base@0.1.17

## 0.1.17

### Patch Changes

- Updated dependencies [[`a98c264`](https://github.com/bcgov/connect-nuxt/commit/a98c2647e041061223d504c8e974670148c08c0b)]:
  - @sbc-connect/nuxt-base@0.1.16

## 0.1.16

### Patch Changes

- Updated dependencies [[`cab53dc`](https://github.com/bcgov/connect-nuxt/commit/cab53dc83ab8c8032bdb424a9e135febdfebf645)]:
  - @sbc-connect/nuxt-base@0.1.15

## 0.1.15

### Patch Changes

- Updated dependencies [[`5d66b92`](https://github.com/bcgov/connect-nuxt/commit/5d66b927121d6144ee7eedb8ed86b64c76e26c7e)]:
  - @sbc-connect/nuxt-base@0.1.14

## 0.1.14

### Patch Changes

- Updated dependencies [[`602360a`](https://github.com/bcgov/connect-nuxt/commit/602360a628742ffe8957209bbe38eff1663a0851)]:
  - @sbc-connect/nuxt-base@0.1.13

## 0.1.13

### Patch Changes

- Updated dependencies [[`19e3a00`](https://github.com/bcgov/connect-nuxt/commit/19e3a00a8350f8f02f674d10e1d572c909ad90c5)]:
  - @sbc-connect/nuxt-base@0.1.12

## 0.1.12

### Patch Changes

- Updated dependencies [[`9edf5ab`](https://github.com/bcgov/connect-nuxt/commit/9edf5ab6c4c7598f661e8ea713e6a60b390105c1)]:
  - @sbc-connect/nuxt-base@0.1.11

## 0.1.11

### Patch Changes

- Updated dependencies [[`8eb83d3`](https://github.com/bcgov/connect-nuxt/commit/8eb83d3e4d0af392f3e7ca8661020e6ae3f4cc7d)]:
  - @sbc-connect/nuxt-base@0.1.10

## 0.1.10

### Patch Changes

- [#43](https://github.com/bcgov/connect-nuxt/pull/43) [`3b521b7`](https://github.com/bcgov/connect-nuxt/commit/3b521b70bf1a0cc5a0feea63a825ef5544347aa8) Thanks [@deetz99](https://github.com/deetz99)! - Form components and new lint rules

  - Forms layer address components
  - Lint rules and fixes to prevent rule collision and promote best practices

  issue: bcgov/entity#29338

- [#42](https://github.com/bcgov/connect-nuxt/pull/42) [`be3f9d2`](https://github.com/bcgov/connect-nuxt/commit/be3f9d2eb93e8bd6da134e69ff1de4676b8c21f9) Thanks [@deetz99](https://github.com/deetz99)! - Auth Layer - Auth layer tests
  Fix auth web url var name in account store issue: bcgov/entity#29335
- Updated dependencies [[`3b521b7`](https://github.com/bcgov/connect-nuxt/commit/3b521b70bf1a0cc5a0feea63a825ef5544347aa8)]:
  - @sbc-connect/nuxt-base@0.1.9

## 0.1.9

### Patch Changes

- [#40](https://github.com/bcgov/connect-nuxt/pull/40) [`f4b62e1`](https://github.com/bcgov/connect-nuxt/commit/f4b62e19570ed062399ce7d23ce07abcf682285f) Thanks [@deetz99](https://github.com/deetz99)! - Add login page and auth middleware issue: bcgov/entity#29335

- [#38](https://github.com/bcgov/connect-nuxt/pull/38) [`8b8f067`](https://github.com/bcgov/connect-nuxt/commit/8b8f067aba4cda2cd2cd8de5c6f74ccc24eaf822) Thanks [@deetz99](https://github.com/deetz99)! - Add LaunchDarkly composable with user context. issue: bcgov/entity#29335

## 0.1.8

### Patch Changes

- [#34](https://github.com/bcgov/connect-nuxt/pull/34) [`b2a0458`](https://github.com/bcgov/connect-nuxt/commit/b2a04587d5408d213d463ef6161b701ca597ef86) Thanks [@deetz99](https://github.com/deetz99)! - - handle user session expiry in auth plugin

  - onBeforeSessionExpiry route meta
  - onAccountChange route meta
  - resetPiniaStores util and reset on logout
  - add account id to layouts/ConnectAuth breadcrumb slot

  issue: bcgov/entity#29335

- [#32](https://github.com/bcgov/connect-nuxt/pull/32) [`66d83d1`](https://github.com/bcgov/connect-nuxt/commit/66d83d14b2ec7950057dd39a4d876a8c4096923f) Thanks [@kialj876](https://github.com/kialj876)! - Pay layer cleanup bcgov/entity#29337

- Updated dependencies [[`66d83d1`](https://github.com/bcgov/connect-nuxt/commit/66d83d14b2ec7950057dd39a4d876a8c4096923f)]:
  - @sbc-connect/nuxt-base@0.1.8

## 0.1.7

### Patch Changes

- [#28](https://github.com/bcgov/connect-nuxt/pull/28) [`68af125`](https://github.com/bcgov/connect-nuxt/commit/68af1259b87846f42010026977411481e53ca8fb) Thanks [@kialj876](https://github.com/kialj876)! - Filling out the pay layer. Ticket bcgov/entity#29337

- Updated dependencies [[`68af125`](https://github.com/bcgov/connect-nuxt/commit/68af1259b87846f42010026977411481e53ca8fb)]:
  - @sbc-connect/nuxt-base@0.1.7

## 0.1.6

### Patch Changes

- [#21](https://github.com/bcgov/connect-nuxt/pull/21) [`db2159e`](https://github.com/bcgov/connect-nuxt/commit/db2159ebc4b310c1c24986ca8ef85b5435fd50c8) Thanks [@deetz99](https://github.com/deetz99)! - Init auth plugin

- [#26](https://github.com/bcgov/connect-nuxt/pull/26) [`65ae301`](https://github.com/bcgov/connect-nuxt/commit/65ae301972b39cfed8550e49c1209133674528a4) Thanks [@deetz99](https://github.com/deetz99)! - Update CSS variables to match Nuxt UI naming convention. Issue: bcgov/entity#29335

- [#23](https://github.com/bcgov/connect-nuxt/pull/23) [`b257d0c`](https://github.com/bcgov/connect-nuxt/commit/b257d0c874138e56ae0b5d79ec6e5a7b30acec8b) Thanks [@deetz99](https://github.com/deetz99)! - - begin initial account store

  - auth composable
  - clear keycloak params in url
  - init account in middleware
  - several enums/types to support accounts
  - update nuxt config with auto imports and pinia plugin module

  issue: bcgov/entity#29335

- [#25](https://github.com/bcgov/connect-nuxt/pull/25) [`aba11d1`](https://github.com/bcgov/connect-nuxt/commit/aba11d1303ab1b19b3a51c27959766c4ee0cd5d8) Thanks [@deetz99](https://github.com/deetz99)! - - create auth header components

  - connect-auth layout

  issue: bcgov/entity#29335

- Updated dependencies [[`65ae301`](https://github.com/bcgov/connect-nuxt/commit/65ae301972b39cfed8550e49c1209133674528a4), [`09fa4f1`](https://github.com/bcgov/connect-nuxt/commit/09fa4f1b4b2c65d189a6477c9c5f2d44607b543d), [`aba11d1`](https://github.com/bcgov/connect-nuxt/commit/aba11d1303ab1b19b3a51c27959766c4ee0cd5d8)]:
  - @sbc-connect/nuxt-base@0.1.6

## 0.1.5

### Patch Changes

- Updated dependencies [[`4231254`](https://github.com/bcgov/connect-nuxt/commit/42312540f5eec65f5d3979d5492bdfaa9bb0b079)]:
  - @sbc-connect/nuxt-base@0.1.5

## 0.1.4

### Patch Changes

- [#16](https://github.com/bcgov/connect-nuxt/pull/16) [`9b8c225`](https://github.com/bcgov/connect-nuxt/commit/9b8c225a011e3c89c9b490e93a554f55a4e29b78) Thanks [@kialj876](https://github.com/kialj876)! - - add base header components (logo, localeSelect, wrapper)

  - add footer component
  - appendUrlParam util

  issue: bcgov/entity#29334

- Updated dependencies [[`90f240f`](https://github.com/bcgov/connect-nuxt/commit/90f240fd789a5286ded5df710bddd6dc953bcba5), [`0fb8c54`](https://github.com/bcgov/connect-nuxt/commit/0fb8c54e059d78b246b80a03f049d075b7bbcf72), [`9b8c225`](https://github.com/bcgov/connect-nuxt/commit/9b8c225a011e3c89c9b490e93a554f55a4e29b78)]:
  - @sbc-connect/nuxt-base@0.1.4

## 0.1.3

### Patch Changes

- [#9](https://github.com/bcgov/connect-nuxt/pull/9) [`e841fde`](https://github.com/bcgov/connect-nuxt/commit/e841fde27630d63efb2c152cd78d92b1193d1d5e) Thanks [@kialj876](https://github.com/kialj876)! - Add Nuxt back as a dev dependency

- [#8](https://github.com/bcgov/connect-nuxt/pull/8) [`c85ebfc`](https://github.com/bcgov/connect-nuxt/commit/c85ebfc879e19cce307b109c9d38044f71f482d2) Thanks [@kialj876](https://github.com/kialj876)! - Added in i18n, added base header components, added in styles for nuxt ui

- Updated dependencies [[`e841fde`](https://github.com/bcgov/connect-nuxt/commit/e841fde27630d63efb2c152cd78d92b1193d1d5e), [`c85ebfc`](https://github.com/bcgov/connect-nuxt/commit/c85ebfc879e19cce307b109c9d38044f71f482d2)]:
  - @sbc-connect/nuxt-base@0.1.3

## 0.1.2

### Patch Changes

- [#5](https://github.com/bcgov/connect-nuxt/pull/5) [`2999779`](https://github.com/bcgov/connect-nuxt/commit/29997796bd3908b2c5ba04319b26cbb00bffe0fc) Thanks [@kialj876](https://github.com/kialj876)! - Updated fonts propagation in base, cleaned up dependencies in layers

- Updated dependencies [[`2999779`](https://github.com/bcgov/connect-nuxt/commit/29997796bd3908b2c5ba04319b26cbb00bffe0fc)]:
  - @sbc-connect/nuxt-base@0.1.2

## 0.1.1

### Patch Changes

- [#3](https://github.com/bcgov/connect-nuxt/pull/3) [`401b62a`](https://github.com/bcgov/connect-nuxt/commit/401b62a465c338cb745c14db645797ffaac1ddab) Thanks [@kialj876](https://github.com/kialj876)! - Layer updates

- Updated dependencies [[`401b62a`](https://github.com/bcgov/connect-nuxt/commit/401b62a465c338cb745c14db645797ffaac1ddab)]:
  - @sbc-connect/nuxt-base@0.1.1
