import { reactive } from 'vue';
import {useGetPayloadFromAccessToken} from "@/composable/token/getPayloadFromAccessToken";

export const store = reactive({
    categories: JSON.parse(sessionStorage.getItem("categories")) || [],

    accessToken: '',
    refreshToken: '',
    isSignedIn: false,
    id: null,
    nickname: null,

    /**
     * 토큰을 저장 및 로그인 상태 저장하는 함수
     *
     * @param authorization Access Token
     * @param refreshToken Refresh Token
     */
    saveUser(authorization, refreshToken) {
        this.accessToken = authorization
        this.refreshToken = refreshToken
        this.isSignedIn = true

        const payload = useGetPayloadFromAccessToken(authorization)
        this.id = payload.id
        this.nickname = payload.nickname
    },

    /**
     * 사용자가 로그인 상태라면 true 반환, 그렇지 않다면 false 반환
     *
     * @returns {boolean} 사용자가 로그인 상태라면 true 반환, 그렇지 않다면 false 반환
     */
    isUserSignedIn() {
        return this.isSignedIn;
    }
});
