import {createRouter, createWebHistory} from 'vue-router'
import Index from "@/pages/Index.vue";
import Community from "@/pages/Community.vue";

const routes = [
    {path: '/', name: 'Index', component: Index},
    {path: '/Community', name: 'Community', component: Community},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;