export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return
  }

  // remove query params in url added by keycloak
  if (to.query) {
    const params = new URLSearchParams(to.fullPath.split('?')[1])
    params.delete('state')
    params.delete('session_state')
    params.delete('code')
    params.delete('error')
    params.delete('iss')
    to.fullPath = to.path + (params.size > 0 ? `?${params}` : '') + to.hash
  }
})
