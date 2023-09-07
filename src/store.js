import {reactive, ref} from 'vue';

export const store = reactive({
    isShowWelcomeModal: ref(false),

    isInitialized: false,

    isCurrentRequesting: false,

    isDuplicateRequesting: false,

    isSignInModalVisible: ref(false),

    categories: [],

    member: {
        id: null,
        nickname: null,
        isSignedIn: false,
    },

    updateIsShowWelcomeModal(value) {
        this.isShowWelcomeModal = value;
    },

    /**
     * 초기화 상태 변경
     *
     * @param {boolean} initialized - 초기화 상태 값 (true/false)
     */
    updateInitialized(initialized) {
        this.isInitialized = initialized;
    },

    /**
     * 저장된 초기화 상태 반환
     *
     * @returns {boolean} 초기화 상태
     */
    getInitialized() {
        return this.isInitialized;
    },

    /**
     * 현재 요청 상태 변경
     *
     * @param value - 변경할 상태 값
     */
    updateIsCurrentRequesting(value) {
        this.isCurrentRequesting = value;
    },

    /**
     * 요청 상태 변경
     *
     * @param value - 변경할 상태 값
     */
    updateIsDuplicateRequesting(value) {
        this.isDuplicateRequesting = value;
    },

    /**
     * 요청 상태 값 반환
     *
     * @returns {boolean} 요청 상태 값
     */
    getIsDuplicateRequesting() {
        return this.isDuplicateRequesting;
    },

    /**
     * 카테고리 데이터를 업데이트
     *
     * @param {Array} category 업데이트할 카테고리 데이터 배열
     */
    updateCategory(category) {
        this.categories = category;
    },

    /**
     * 저장된 카테고리 데이터를 반환
     *
     * @returns {Array} 카테고리 데이터 배열
     */
    getCategory() {
        return this.categories;
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
