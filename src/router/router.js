import {createRouter, createWebHistory} from 'vue-router'
import Index from "@/pages/Index.vue";
import Community from "@/pages/Community.vue";
import Post from "@/pages/CommunityPost.vue";
import Photos from "@/pages/Photos.vue";
import Photo from "@/pages/Photo.vue";
import PostForm from "@/pages/CommunityForm.vue";

const routes = [
    {path: '/', name: 'Index', component: Index},
    {path: '/community', name: 'Community', component: Community},
    {path: '/community/post', name: 'Post', component: Post},
    {path: '/photo', name: 'Photo', component: Photo},
    {path: '/photos', name: 'Photos', component: Photos},
    {path: '/community/form', name: 'PostForm', component: PostForm},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;