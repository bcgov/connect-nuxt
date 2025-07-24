import DOMPurify from 'dompurify'

export default defineNuxtPlugin({
  name: 'connect-sanitize-plugin',
  parallel: true,
  setup() {
    return {
      provide: {
        sanitize: DOMPurify.sanitize
      }
    }
  }
})
