export default defineNuxtRouteMiddleware((to, from) => {
    console.log(from.fullPath)
    // console.log('Auth middleware:', { to, from })
    if (to.query.id === '1') {
        return abortNavigation({ statusCode: 401, statusMessage: 'Access Denied' })
    }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    if (!to.path.endsWith('/')) {
        return navigateTo(to.path + '/')
    }
})
