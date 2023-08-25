import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/router";

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import '@/assest/main.css';
import {store} from "@/store";
import AuthenticationService from "@/service/AuthenticationService";
import ErrorType from "@/composable/response/ErrorType";
import {useRefreshTokenAndRetry} from "@/composable/authentication/refreshTokenAndRetry";
import CategoryService from "@/service/CategoryService";

const app = createApp(App);
initializeStore();

app.use(BootstrapVue3);
app.use(router);
app.mount('#app');

// 사용자가 앱을 종료하기 전에 로그인 상태를 세션 스토리지에 저장
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('isSignedIn', store.member.isSignedIn.toString());
});

/**
 * 세션 스토리지와 로컬 스토리지에서 데이터를 가져와 스토어를 초기화
 *
 * @returns {object} 카테고리와 멤버 데이터가 포함된 초기화된 스토어를 반환
 */
function initializeStore() {
    const isSignedIn = sessionStorage.getItem('isSignedIn');
    if (isSignedIn === 'true') {
        getMember();
        sessionStorage.removeItem('isSignedIn');
    }
    getCategories();
}

/**
 * 카테고리 데이터를 가져와 store 저장
 *
 * @returns {Promise<void>} 카테고리 데이터 가져오기와 Store 저장 후 완료
 */
function getCategories() {
    CategoryService.fetchCategories().then(response => {
        store.categories = response.data;
    }).catch(error => {
        console.log(error)
    })
}

/**
 * 회원 데이터를 가져와 store 저장
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

