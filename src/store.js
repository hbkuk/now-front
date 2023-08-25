import {reactive, ref} from 'vue';

export const store = reactive({
    
    isSignInModalVisible : ref(false),

    categories: [],

    member: {
        id: null,
        nickname: null,
        isSignedIn: false,
    },

    /**
     * 토큰을 저장 및 로그인 상태 저장
     *
     */
    saveMember(id, nickname) {
        this.member.id = id
        this.member.nickname = nickname
        this.member.isSignedIn = true
    },

    /**
     * 회원 정보를 초기화
     */
    resetMember() {
        this.member.id = null
        this.member.nickname = null
        this.member.isSignedIn = false
    },

    /**
     * 회원이 로그인 상태라면 true 반환, 그렇지 않다면 false 반환
     *
     * @returns {boolean} 회원이 로그인 상태라면 true 반환, 그렇지 않다면 false 반환
     */
    isMemberSignedIn() {
        return this.member.isSignedIn;
    },

    /**
     * 주어진 닉네임과 현재 회원의 닉네임이 일치하면 true 반환, 그렇지 않으면 false 반환
     *
     * @param {string} nickname - 비교할 닉네임
     * @returns {boolean} 주어진 닉네임과 현재 회원의 닉네임이 일치하면 true 반환, 그렇지 않으면 false 반환
     */
    isSameMember(nickname) {
        return this.member.nickname === nickname;
    },

    /**
     * 로그인 모달 보이기
     */
    openSignInModal() {
        store.isSignInModalVisible = true;
    },

    /**
     * 로그인 모달 숨기기
     */
    closeSignInModal() {
        store.isSignInModalVisible = false;
    }
});
