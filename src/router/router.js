import {createRouter, createWebHistory} from 'vue-router'
const Home = () => import(/* webpackChunkName: "Home"*/`@/pages/home/Home.vue`);
const Photos = () => import(/* webpackChunkName: "Photos"*/ "@/pages/photo/Photos.vue");
const SignIn = () => import(/* webpackChunkName: "SignIn"*/ "@/pages/home/SignIn.vue");
const SignUp = () => import(/* webpackChunkName: "SignUp"*/ "@/pages/home/SignUp.vue");
const Notices = () => import(/* webpackChunkName: "Notices"*/ "@/pages/notice/Notices.vue");
const Inquiries = () => import(/* webpackChunkName: "Inquiries"*/ "@/pages/Inquiry/Inquiries.vue");
const Communities = () => import(/* webpackChunkName: "Communities"*/ "@/pages/community/Communities.vue");
const CommunityPost = () => import(/* webpackChunkName: "CommunityPost"*/ "@/pages/community/CommunityPost.vue");
const NoticePost = () => import(/* webpackChunkName: "NoticePost"*/ "@/pages/notice/NoticePost.vue");
const PhotoPost = () => import(/* webpackChunkName: "PhotoPost"*/ "@/pages/photo/PhotoPost.vue");
const InquiryPost = () => import(/* webpackChunkName: "InquiryPost"*/ "@/pages/Inquiry/InquiryPost.vue");
const CommunityForm = () => import(/* webpackChunkName: "CommunityForm"*/ "@/pages/community/CommunityForm.vue");
const NoticeForm = () => import(/* webpackChunkName: "NoticeForm"*/ "@/pages/notice/NoticeForm.vue");
const PhotoForm = () => import(/* webpackChunkName: "PhotoForm"*/ "@/pages/photo/PhotoForm.vue");
const InquiryForm = () => import(/* webpackChunkName: "InquiryForm"*/ "@/pages/Inquiry/InquiryForm.vue");
const CommunityEdit = () => import(/* webpackChunkName: "CommunityEdit"*/ "@/pages/community/CommunityEdit.vue");
const NoticeEdit = () => import(/* webpackChunkName: "NoticeEdit"*/ "@/pages/notice/NoticeEdit.vue");
const PhotoEdit = () => import(/* webpackChunkName: "PhotoEdit"*/ "@/pages/photo/PhotoEdit.vue");
const InquiryEdit = () => import(/* webpackChunkName: "InquiryEdit"*/ "@/pages/Inquiry/InquiryEdit.vue");
const NotFound = () => import(/* webpackChunkName: "NotFound"*/ "@/components/NotFound.vue");
const ServiceNotAvailable = () => import(/* webpackChunkName: "ServiceNotAvailable"*/ "@/components/ServiceNotAvailable.vue");
const Unauthorized = () => import(/* webpackChunkName: "Unauthorized"*/ "@/components/Unauthorized.vue");
const Forbidden = () => import(/* webpackChunkName: "Forbidden"*/ "@/components/Forbidden.vue");
const RequestError = () => import(/* webpackChunkName: "RequestError"*/ "@/components/RequestError.vue");
const TooManyRequest = () => import(/* webpackChunkName: "TooManyRequest"*/ "@/components/TooManyRequest.vue");
const ServerError = () => import(/* webpackChunkName: "ServerError"*/ "@/components/ServerError.vue");
import {store} from "@/store";
import {ROUTE_NAME_GROUP} from "@/composable/router/routeNameGroup";

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


    {path: '/too-many-request', name: 'TooManyRequest', component: TooManyRequest },
    {path: '/request-error', name: 'RequestError', component: RequestError },
    {path: '/forbidden', name: 'Forbidden', component: Forbidden },
    {path: '/unauthorized', name: 'Unauthorized', component: Unauthorized },
    {path: '/server-error', name: 'ServerError', component: ServerError },
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
    // 추가 조건: fromRouteGroup 또는 toRouteGroup가 정의되지 않은 경우에도 세션 스토리지에서 삭제
    if (!fromRouteGroup || !toRouteGroup) {
        sessionStorage.removeItem('condition');
    }
    next();
});

export default router;

async function waitForInitialization() {
    return new Promise(resolve => {
        const checkInitialization = () => {
            if (store.getInitialized()) {
                resolve();
            } else {
                setTimeout(checkInitialization, 100); // 적절한 간격으로 조정
            }
        };
        checkInitialization();
    });
}

async function requireSignIn(to, from, next) {
    await waitForInitialization().then(() => {
        if (store.isMemberSignedIn()) {
            next();
        }
        if (!store.isMemberSignedIn()) {
            next(false);
            store.openSignInModal();
        }
    });
}