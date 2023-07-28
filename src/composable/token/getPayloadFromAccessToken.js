import {useJwt} from "@vueuse/integrations/useJwt";

/**
 * 액세스 토큰에서 토큰의 페이로드 값을 추출하는 컴포저블
 * 
 * @param {string} authorization 액세스 토큰 문자열
 * @returns {any} 토큰의 페이로드 값
 */
export function useGetPayloadFromAccessToken(authorization) {
    return useJwt(authorization).payload.value;
}