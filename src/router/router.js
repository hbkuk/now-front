import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/pages/home/Home.vue";
import Photos from "@/pages/photo/Photos.vue";
import SignIn from "@/pages/home/SignIn.vue";
import SignUp from "@/pages/home/SignUp.vue";
import Notices from "@/pages/Notice/Notices.vue";
import Inquiries from "@/pages/Inquiry/Inquiries.vue";
import Communities from "@/pages/community/Communities.vue";
import CommunityPost from "@/pages/community/CommunityPost.vue";
import NoticePost from "@/pages/Notice/NoticePost.vue";
import PhotoPost from "@/pages/photo/PhotoPost.vue";
import InquiryPost from "@/pages/Inquiry/InquiryPost.vue";
import CommunityForm from "@/pages/community/CommunityForm.vue";
import NoticeForm from "@/pages/Notice/NoticeForm.vue";
import PhotoForm from "@/pages/photo/PhotoForm.vue";
import InquiryForm from "@/pages/Inquiry/InquiryForm.vue";
import CommunityEdit from "@/pages/community/CommunityEdit.vue";
import NoticeEdit from "@/pages/Notice/NoticeEdit.vue";
import PhotoEdit from "@/pages/photo/PhotoEdit.vue";
import InquiryEdit from "@/pages/Inquiry/InquiryEdit.vue";
import NotFound from "@/components/NotFound.vue";
import ServiceNotAvailable from "@/components/ServiceNotAvailable.vue";
import {store} from "@/store";
import Unauthorized from "@/components/Unauthorized.vue";
import Forbidden from "@/components/Forbidden.vue";
import RequestError from "@/components/RequestError.vue";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";
import TooManyRequest from "@/components/TooManyRequest.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/sign-in', name: 'SignIn', component: SignIn},
    {path: '/sign-up', name: 'SignUp', component: SignUp},
    {path: '/search', name: 'Search', component: ServiceNotAvailable, props: true},
    {path: '/settings', name: 'Settings', component: ServiceNotAvailable, beforeEnter: requireSignIn},
    {path: '/notification', name: 'Notification', component: ServiceNotAvailable, beforeEnter: requireSignIn},
    {path: '/forgot', name: 'Forgot', component: ServiceNotAvailable},

    {path: '/notices', name: 'Notices', component: Notices},
    {path: '/notices/:postIdx', name: 'NoticePost', component: NoticePost, props: true},
    {path: '/notices/form', name: 'NoticeForm', component: NoticeForm, beforeEnter: requireSignIn},
    {path: '/notices/:postIdx/edit', name: 'NoticeEdit', component: NoticeEdit, props: true, beforeEnter: requireSignIn},

    {path: '/communities', name: 'Communities', component: Communities},
    {path: '/communities/:postIdx', name: 'CommunityPost', component: CommunityPost, props: true},
    {path: '/communities/form', name: 'CommunityForm', component: CommunityForm, beforeEnter: requireSignIn},
    {path: '/communities/:postIdx/edit', name: 'CommunityEdit', component: CommunityEdit, props: true, beforeEnter: requireSignIn},

    {path: '/photos', name: 'Photos', component: Photos},
    {path: '/photos/:postIdx', name: 'PhotoPost', component: PhotoPost, props: true},
    {path: '/photos/form', name: 'PhotoForm', component: PhotoForm, beforeEnter: requireSignIn},
    {path: '/photos/:postIdx/edit', name: 'PhotoEdit', component: PhotoEdit, props: true, beforeEnter: requireSignIn},

    {path: '/inquiries', name: 'Inquiries', component: Inquiries},
    {path: '/inquiries/:postIdx', name: 'InquiryPost', component: InquiryPost, props: true},
    {path: '/inquiries/form', name: 'InquiryForm', component: InquiryForm, beforeEnter: requireSignIn},
    {path: '/inquiries/:postIdx/edit', name: 'InquiryEdit', component: InquiryEdit, props: true, beforeEnter: requireSignIn},


    {path: '/TooManyRequest', name: 'TooManyRequest', component: TooManyRequest },
    {path: '/RequestError', name: 'RequestError', component: RequestError },
    {path: '/Forbidden', name: 'Forbidden', component: Forbidden },
    {path: '/unauthorized', name: 'Unauthorized', component: Unauthorized },
    {path: '/:catchAll(.*)*', name: 'NotFound', component: NotFound}, // 404 페이지로 리다이렉트
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 다른 그룹으로 이동 시 검색 조건 삭제
router.beforeEach((to, from, next) => {
    const fromRouteGroup = Object.values(ROUTE_NAME_GROUP).find(group =>
        group.routes.includes(from.name)
    );
    const toRouteGroup = Object.values(ROUTE_NAME_GROUP).find(group =>
        group.routes.includes(to.name)
    );

    if (fromRouteGroup && toRouteGroup && fromRouteGroup !== toRouteGroup) {
        // 그룹을 벗어날 때 검색 조건 세션 스토리지에서 삭제
        sessionStorage.removeItem('condition');
    }

    next();
});

export default router;

function requireSignIn(to, from, next) {
    if (store.isMemberSignedIn()) {
        next();
    } else {
        store.openSignInModal();
    }
}