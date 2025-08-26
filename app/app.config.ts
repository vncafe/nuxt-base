// app/app.config.ts để giữ metadata / theme / config toàn cục.
export default defineAppConfig({
    name: 'My Nuxt App',
    author: 'HuyDQ',
    theme: {
        primaryColor: '#42b883',
        secondaryColor: '#35495e',
        darkMode: false
    },
    seo: {
        title: 'Trang demo Nuxt 3',
        description: 'Ứng dụng mẫu với Nuxt 3 + Vue 3'
    }
})
