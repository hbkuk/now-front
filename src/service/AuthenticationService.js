import {useHttpFormDataRequest} from "@/composable/request/httpFormDataRequest";
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
        const response = await useHttpFormDataRequest(HttpMethod.POST, '/api/sign-in', formData, json);
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
        const response = await useHttpFormDataRequest(HttpMethod.POST, '/api/log-out');
        if (response.status === 200) {
            store.resetMember();
        }
        return response;
    },

    /**
     * 토큰 재발급을 서버에 요청을 전송하는 함수
     * 
     * @returns {Promise<AxiosResponse<any>>} 서버 응답에 대한 Promise 객체
     */
    refresh() {
        return useHttpFormDataRequest(HttpMethod.POST, '/api/refresh');
    },

    /**
     * 회원 정보를 서버에 요청하는 함수
     * 
     * @returns {Promise<AxiosResponse<any>>} 서버 응답에 대한 Promise 객체
     */
    getMember() {
        return useHttpFormDataRequest(HttpMethod.POST, '/api/member/me');
    },

    /**
     * 현재 사용자가 매니저인지 확인을 요청하는 함수
     *
     * @returns {Promise<axios.AxiosResponse<*>>} 서버 응답에 대한 Promise 객체
     */
    isManager() {
        return useGetRequest("/api/manager/isManager")
    }
};
export default AuthenticationService;
