import {useHttpRequest} from "@/composable/request/httpRequest";
import {HttpMethod} from "@/composable/request/constants/HttpMethod";
import {json} from "@/composable/request/constants/Headers";
import {store} from "@/store";
import {useGetRequest} from "@/composable/request/getRequest";

/**
 * 인증 서비스 객체
 */
const AuthenticationService = {
    /**
     * 로그인 요청을 서버에 전송하는 함수
     *
     * @param {FormData} formData - 사용자 아이디와 비밀번호 등의 로그인 정보가 담긴 FormData 객체
     * @returns {Promise} 서버 응답에 대한 Promise 객체
     */
    async signIn(formData) {
        const response = await useHttpRequest(HttpMethod.POST, '/api/sign-in', formData, json);
        if (response.status === 200) {
            store.saveMember(response.data.id, response.data.nickname);
        }
        return response;
    },
    /**
     * 로그아웃 요청을 서버에 전송하는 함수
     *
     * @returns {Promise} 서버 응답에 대한 Promise 객체
     */
    async logout() {
        const response = await useHttpRequest(HttpMethod.POST, '/api/log-out');
        if (response.status === 200) {
            store.resetMember();
        }
        return response;
    },
    refresh() {
        return useHttpRequest(HttpMethod.POST, '/api/refresh');
    },

    isManager() {
        return useGetRequest("/api/manager/isManager")
    }
};
export default AuthenticationService;
