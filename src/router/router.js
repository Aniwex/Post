import { createWebHistory,createRouter } from 'vue-router'
import MainPage from '../components/pages/MainPage.vue'
import PostPage from '../components/pages/PostPage.vue'
const routes = [
    {
        path:'/',
        name:'MainPage',
        component: MainPage,
    },
    {
        path:'/posts',
        name:'PostPage',
        component: PostPage,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})


export default router;