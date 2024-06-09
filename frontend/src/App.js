import router from './router/routes.js';

const app = Vue.createApp({
    template: '<router-view></router-view>',
})

app.use(router)
app.mount('#app')
