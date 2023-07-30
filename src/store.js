import { reactive } from 'vue';

export const store = reactive({
    categories: [],

    member: {
        id: null,
        nickname: null,
        isSignedIn: false,
    },

    /**
     * 토큰을 저장 및 로그인 상태 저장하는 함수
     *
     */
    saveMember(id, nickname) {
        this.member.id = id
        this.member.nickname = nickname
        this.member.isSignedIn = true

        localStorage.setItem("member", JSON.stringify(this.member));
    },

    resetMember() {
        this.member.id = null
        this.member.nickname = null
        this.member.isSignedIn = false

        localStorage.clear();
    },

    /**
     * 회원이 로그인 상태라면 true 반환, 그렇지 않다면 false 반환
     *
     * @returns {boolean} 회원이 로그인 상태라면 true 반환, 그렇지 않다면 false 반환
     */
    isMemberSignedIn() {
        return this.member.isSignedIn;
    },

    isSameMember(nickname) {
        return this.member.nickname === nickname;
    }
});
