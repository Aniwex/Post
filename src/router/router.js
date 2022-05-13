import { createWebHistory,createRouter } from 'vue-router'
import MainPage from '../components/pages/MainPage.vue'
import PostPage from '../components/pages/PostPage.vue'
import AboutPage from '../components/pages/AboutPage.vue'
import PostIdPage from '../components/pages/PostIdPage.vue'
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
    },
    {
        path:'/about',
        name:'about',
        component: AboutPage,
    },
    {
        path:'/posts/:id',
        name:'PostIdPage',
        component: PostIdPage,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})


export default router;