import {useGetRequest} from "@/composable/request/getRequest";
import {useHttpRequest} from "@/composable/request/httpRequest";
import {formUrlencoded, json, multipart} from "@/composable/request/Headers";
import {HttpMethod} from "@/composable/request/HttpMethod";

const DataService = {

    /**
     * 공지 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {{data, error}} - 게시판 목록
     */
    fetchNotices(condition) {
        return useGetRequest('/api/notices', condition)
    },

    /**
     * 커뮤니티 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {{data, error}} - 게시판 목록
     */
    fetchCommunities(condition) {
        return useGetRequest('/api/communities', condition)
    },

    /**
     * 사진 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {{data, error}} - 게시판 목록
     */
    fetchPhotos(condition) {
        return useGetRequest('/api/photos', condition)
    },

    /**
     * 문의 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {{data, error}} - 게시판 목록
     */
    fetchInquiries(condition) {
        return useGetRequest('/api/inquiries', condition)
    },

    



    /**
     * 공지 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchNotice(postIdx) {
        return useGetRequest(`/api/notices/${postIdx}`)
    },

    /**
     * 커뮤니티 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchCommunity(postIdx) {
        return useGetRequest(`/api/communities/${postIdx}`)
    },

    /**
     * 사진 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchPhoto(postIdx) {
        return useGetRequest(`/api/photos/${postIdx}`)
    },

    /**
     * 문의 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchInquiry(postIdx) {
        return useGetRequest(`/api/inquiries/${postIdx}`)
    },
    
    
    
    
    
    

    /**
     * 게시물 작성을 위한 데이터를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchWriteView() {
        return useGetRequest('/api/board/write')
    },

    /**
     * 게시물 작성을 위한 데이터를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchModifyView(postIdx) {
        return useGetRequest(`/api/board/modify/${postIdx}`)
    },

    /**
     * 게시물 작성을 위한 요청 함수
     *
     * @param formData 요청 데이터
     */
    fetchWriteAction(formData) {
        return useHttpRequest(HttpMethod.POST, `/api/board`, formData, multipart)
    },

    /**
     * 게시물 수정을 위한 요청 함수
     *
     * @param postIdx 게시물 번호
     * @param formData 요청 데이터
     */
    fetchModifyAction(postIdx, formData) {
        return useHttpRequest(HttpMethod.PUT,`/api/board/${postIdx}`, formData, multipart)
    },

    /**
     * 게시물 삭제을 위한 요청 함수
     *
     * @param postIdx 게시물 번호
     * @param formData 요청 데이터
     */
    fetchDeleteAction(postIdx, formData) {
        return useHttpRequest(HttpMethod.DELETE,`/api/board/${postIdx}`, formData, formUrlencoded)
    },

    /**
     * 카테고리 목록을 가져오는 함수
     *
     * @returns {{data, error}} - 카테고리 목록
     */
    fetchCategories() {
        return useGetRequest('/api/categories')
    },
};

export default DataService;
