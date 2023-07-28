import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/router";

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import '@/assest/main.css';
import { useParseJsonItemFromSessionStorage } from "@/composable/store/parseJsonItemFromSessionStorage";
import { store } from "@/store";
import { useParseJsonItemFromLocalStorage } from "@/composable/store/parseJsonItemFromLocalStorage";

const app = createApp(App);
initializeStore(store);

app.use(BootstrapVue3);
app.use(router);
app.mount('#app');

/**
 * 세션 스토리지와 로컬 스토리지에서 데이터를 가져와 스토어를 초기화
 *
 * @param {object} store - 초기화할 Vue 반응형 스토어 객체
 * @returns {object} 카테고리와 멤버 데이터가 포함된 초기화된 스토어를 반환
 */
function initializeStore(store) {
    store.categories = useParseJsonItemFromSessionStorage("categories") || [];
    const storedMember = useParseJsonItemFromLocalStorage("member") || {};
    store.member = {
        id: storedMember?.id ?? null,
        nickname: storedMember?.nickname ?? null,
        isSignedIn: storedMember?.isSignedIn ?? false,
    };
    return store;
}
