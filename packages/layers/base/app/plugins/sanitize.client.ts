import DOMPurify from 'dompurify'

export default defineNuxtPlugin({
  name: 'connect-sanitize-plugin',
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.directive('sanitize', {
      beforeMount(el, binding) {
        el.innerHTML = DOMPurify.sanitize(binding.value)
      },
      updated(el, binding) {
        el.innerHTML = DOMPurify.sanitize(binding.value)
      }
    })

    return {
      provide: {
        sanitize: DOMPurify.sanitize
      }
    }
  }
})
