import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/router";

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import '@/assest/main.css';
import {store} from "@/store";
import AuthenticationService from "@/service/AuthenticationService";
import ErrorType from "@/composable/response/constants/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import {useParseJsonItemFromSessionStorage} from "@/composable/parse/parseJsonItemFromSessionStorage";
import CategoryService from "@/service/CategoryService";
import VueDOMPurifyHTML from 'vue-dompurify-html'

const app = createApp(App);
initializeStore();

app.use(VueDOMPurifyHTML)
app.use(BootstrapVue3);
app.use(router);
app.mount('#app');

// 사용자가 앱을 종료하기 전에 회원의 로그인 정보를 세션 스토리지에 저장
window.addEventListener('beforeunload', () => {
    localStorage.setItem('isSignedIn', store.member.isSignedIn.toString());
});

// iOS safari에서 beforeunload 이벤트를 지원하지 않는 이슈로 인해 추가
window.addEventListener('pagehide', () => {
    localStorage.setItem('isSignedIn', store.member.isSignedIn.toString());
});

/**
 * 스토어 초기화
 *z
 * @returns {object} 카테고리와 멤버 데이터가 포함된 초기화된 스토어를 반환
 */
async function initializeStore() {
    const category = useParseJsonItemFromSessionStorage("categories");
    if (Object.keys(category).length === 0) {
        await getCategories();
    } else {
        store.updateCategory(category);
    }

    const isSignedIn = localStorage.getItem('isSignedIn');
    if (isSignedIn === 'true') {
        await getMember();
        localStorage.removeItem("isSignedIn");
    }

    const isShowWelcomeModal = localStorage.getItem('isShowWelcomeModal');
    if (isShowWelcomeModal === 'null' || isShowWelcomeModal !== 'false') {
        store.updateIsShowWelcomeModal(true);
    }
    store.updateInitialized(true);
}

/**
 * 카테고리 데이터를 가져와 store 저장
 *
 * @returns {Promise<void>} 카테고리 데이터 가져오기와 Store 저장 후 완료
 */
async function getCategories() {
    return CategoryService.fetchCategories().then(response => {
        store.updateCategory(response.data)
        sessionStorage.setItem("categories", JSON.stringify(response.data));
    }).catch(error => {
        console.log(error)
    })
}

/**
 * 회원 정보를 가져와 store 저장
 *
 * @returns {Promise<AxiosResponse<any>>} 회원 데이터 가져오기와 Store 저장 후 완료
 */
async function getMember() {
    return await AuthenticationService.getMember().then(response => {
        store.saveMember(response.data.id, response.data.nickname);
    }).catch(async error => {
        if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
            await useRefreshTokenAndRetry(() => getMember());
            return;
        }
        console.log(error)
    })
}

