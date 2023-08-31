/**
 * 개인 정보 업데이트 옵션 객체
 */
export const PrivacyUpdateOptions = {
    /**
     * 공개로 변경 옵션
     */
    TO_PUBLIC: {
        code: "TO_PUBLIC",
        value: 'to_public'
    },

    /**
     * 비밀로 변경 및 비밀번호 업데이트 옵션
     */
    TO_PRIVATE: {
        code: "TO_PRIVATE",
        value: 'to_private'
    },

    /**
     * 비밀번호 변경 옵션
     */
    CHANGE_PASSWORD: {
        code: "CHANGE_PASSWORD",
        value: 'change_password'
    },

    /**
     * 비밀번호 유지 옵션
     */
    KEEP_PASSWORD: {
        code: "KEEP_PASSWORD",
        value: 'keep_password'
    },
};
