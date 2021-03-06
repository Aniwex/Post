import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI/index'
import router from './router/router'
import directives from './directives/index'
const app = createApp(App).use(router);

components.forEach(component =>{
    app.component(component.name,component)
})
directives.forEach(directive =>{
    app.directive(directive.name, directive);
})
app
    .use(router)
    .mount('#app')
