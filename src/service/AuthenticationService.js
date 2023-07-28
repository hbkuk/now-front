import {useHttpRequest} from "@/composable/request/httpRequest";
import {HttpMethod} from "@/composable/request/HttpMethod";
import {json} from "@/composable/request/Headers";

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
    signIn(formData) {
        return useHttpRequest(HttpMethod.POST, '/api/sign-in', formData, json);
    }
};

export default AuthenticationService;
