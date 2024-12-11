export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  if (auth.loggedIn && to.path === '/login') {
    return navigateTo('/')
  }
})
