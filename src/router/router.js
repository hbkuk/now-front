import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/pages/home/Home.vue";
import Photos from "@/pages/Photo/Photos.vue";
import Login from "@/pages/home/Login.vue";
import SignUp from "@/pages/home/SignUp.vue";
import Notices from "@/pages/Notice/Notices.vue";
import NoticePostForm from "@/pages/Notice/NoticePostForm.vue";
import CommunityPostForm from "@/pages/Community/CommunityPostForm.vue";
import PhotoPostForm from "@/pages/Photo/PhotoPostForm.vue";
import Inquiries from "@/pages/Inquiry/Inquiries.vue";
import InquiryPostForm from "@/pages/Inquiry/InquiryPostForm.vue";
import Forgot from "@/pages/home/Forgot.vue";
import Communities from "@/pages/Community/Communities.vue";
import CommunityPost from "@/pages/Community/CommunityPost.vue";
import NoticePost from "@/pages/Notice/NoticePost.vue";
import PhotoPost from "@/pages/Photo/PhotoPost.vue";
import InquiryPost from "@/pages/Inquiry/InquiryPost.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name: 'Login', component: Login},
    {path: '/SignUp', name: 'SignUp', component: SignUp},
    {path: '/Forgot', name: 'Forgot', component: Forgot}, /** 추후 이메일 발송 구현 후 진행*/

    {path: '/notices', name: 'Notices', component: Notices},
    {path: '/notices/:postIdx', name: 'NoticeView', component: NoticePost, props: true},
    {path: '/notices/form', name: 'NoticePostForm', component: NoticePostForm},

    {path: '/communities', name: 'Communities', component: Communities},
    {path: '/communities/:postIdx', name: 'CommunityPost', component: CommunityPost, props: true},
    {path: '/communities/form', name: 'CommunityPostForm', component: CommunityPostForm},

    {path: '/photos', name: 'Photos', component: Photos},
    {path: '/photos/:postIdx', name: 'PhotoView', component: PhotoPost, props: true},
    {path: '/photos/form', name: 'PhotoPostForm', component: PhotoPostForm},

    {path: '/inquiries', name: 'Inquiries', component: Inquiries},
    {path: '/inquiries/:postIdx', name: 'InquiryView', component: InquiryPost, props: true},
    {path: '/inquiries/form', name: 'InquiryPostForm', component: InquiryPostForm},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;