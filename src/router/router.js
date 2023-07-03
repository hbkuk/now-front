import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/pages/home/Home.vue";
import Community from "@/pages/Community/Community.vue";
import Photos from "@/pages/Photo/Photos.vue";
import Login from "@/pages/home/Login.vue";
import SignUp from "@/pages/home/SignUp.vue";
import Notices from "@/pages/Notice/Notices.vue";
import NoticeView from "@/pages/Notice/NoticeView.vue";
import NoticePostForm from "@/pages/Notice/NoticePostForm.vue";
import CommunityView from "@/pages/Community/CommunityView.vue";
import CommunityPostForm from "@/pages/Community/CommunityPostForm.vue";
import PhotoView from "@/pages/Photo/PhotoView.vue";
import PhotoPostForm from "@/pages/Photo/PhotoPostForm.vue";
import Inquiries from "@/pages/Inquiry/Inquiries.vue";
import InquiryView from "@/pages/Inquiry/InquiryView.vue";
import InquiryPostForm from "@/pages/Inquiry/InquiryPostForm.vue";
import Forgot from "@/pages/home/Forgot.vue";

const routes = [
    {path: '/', redirect: '/home'}, // 리다이렉트 설정

    {path: '/home', name: 'Home', component: Home},
    {path: '/login', name: 'Login', component: Login},
    {path: '/SignUp', name: 'SignUp', component: SignUp},
    {path: '/Forgot', name: 'Forgot', component: Forgot}, /** 추후 이메일 발송 구현 후 진행*/

    {path: '/notices', name: 'Notices', component: Notices},
    {path: '/notice/:noticeIdx', name: 'NoticeView', component: NoticeView},
    {path: '/notice/form', name: 'NoticePostForm', component: NoticePostForm},

    {path: '/community', name: 'Community', component: Community},
    {path: '/community/:communityIdx', name: 'CommunityView', component: CommunityView},
    {path: '/community/form', name: 'CommunityPostForm', component: CommunityPostForm},

    {path: '/photos', name: 'Photos', component: Photos},
    {path: '/photo/:photoIdx', name: 'PhotoView', component: PhotoView},
    {path: '/photo/form', name: 'PhotoPostForm', component: PhotoPostForm},

    {path: '/inquiries', name: 'Inquiries', component: Inquiries},
    {path: '/inquiry/:inquiryIdx', name: 'InquiryView', component: InquiryView},
    {path: '/inquiry/form', name: 'InquiryPostForm', component: InquiryPostForm},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;