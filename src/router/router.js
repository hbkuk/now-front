import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/pages/home/Home.vue";
import Photos from "@/pages/Photo/Photos.vue";
import SignIn from "@/pages/home/SignIn.vue";
import SignUp from "@/pages/home/SignUp.vue";
import Notices from "@/pages/Notice/Notices.vue";
import Inquiries from "@/pages/Inquiry/Inquiries.vue";
import Communities from "@/pages/Community/Communities.vue";
import CommunityPost from "@/pages/Community/CommunityPost.vue";
import NoticePost from "@/pages/Notice/NoticePost.vue";
import PhotoPost from "@/pages/Photo/PhotoPost.vue";
import InquiryPost from "@/pages/Inquiry/InquiryPost.vue";
import CommunityForm from "@/pages/Community/CommunityForm.vue";
import NoticeForm from "@/pages/Notice/NoticeForm.vue";
import PhotoForm from "@/pages/Photo/PhotoForm.vue";
import InquiryForm from "@/pages/Inquiry/InquiryForm.vue";
import CommunityEdit from "@/pages/Community/CommunityEdit.vue";
import NoticeEdit from "@/pages/Notice/NoticeEdit.vue";
import PhotoEdit from "@/pages/Photo/PhotoEdit.vue";
import InquiryEdit from "@/pages/Inquiry/InquiryEdit.vue";
import NotFound from "@/components/NotFound.vue";
import ServiceNotAvailable from "@/components/ServiceNotAvailable.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/sign-in', name: 'SignIn', component: SignIn},
    {path: '/sign-up', name: 'SignUp', component: SignUp},
    {path: '/settings', name: 'Settings', component: ServiceNotAvailable},
    {path: '/notification', name: 'Notification', component: ServiceNotAvailable},
    {path: '/forgot', name: 'Forgot', component: ServiceNotAvailable}, /** 추후 이메일 발송 구현 후 진행*/

    {path: '/notices', name: 'Notices', component: Notices},
    {path: '/notices/:postIdx', name: 'NoticePost', component: NoticePost, props: true},
    {path: '/notices/form', name: 'NoticeForm', component: NoticeForm},
    {path: '/notices/:postIdx/edit', name: 'NoticeEdit', component: NoticeEdit, props: true},

    {path: '/communities', name: 'Communities', component: Communities},
    {path: '/communities/:postIdx', name: 'CommunityPost', component: CommunityPost, props: true},
    {path: '/communities/form', name: 'CommunityForm', component: CommunityForm},
    {path: '/communities/:postIdx/edit', name: 'CommunityEdit', component: CommunityEdit, props: true},

    {path: '/photos', name: 'Photos', component: Photos},
    {path: '/photos/:postIdx', name: 'PhotoPost', component: PhotoPost, props: true},
    {path: '/photos/form', name: 'PhotoForm', component: PhotoForm},
    {path: '/photos/:postIdx/edit', name: 'PhotoEdit', component: PhotoEdit, props: true},

    {path: '/inquiries', name: 'Inquiries', component: Inquiries},
    {path: '/inquiries/:postIdx', name: 'InquiryPost', component: InquiryPost, props: true},
    {path: '/inquiries/form', name: 'InquiryForm', component: InquiryForm},
    {path: '/inquiries/:postIdx/edit', name: 'InquiryEdit', component: InquiryEdit, props: true},

    {path: '/:catchAll(.*)*', name: 'NotFound', component: NotFound}, // 404 페이지로 리다이렉트
]

export default createRouter({
    history: createWebHistory(),
    routes
});