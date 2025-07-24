// https://beholdr.github.io/maska/v3/#/vue
import { vMaska } from 'maska/vue'

export default defineNuxtPlugin({
  name: 'core-maska-plugin',
  parallel: true,
  setup (nuxtApp) {
    nuxtApp.vueApp.directive('maska', vMaska)
  }
})