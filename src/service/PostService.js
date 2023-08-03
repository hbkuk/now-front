import {useGetRequest} from "@/composable/request/getRequest";
import {useHttpRequest} from "@/composable/request/httpRequest";
import {formUrlencoded, json, multipart} from "@/composable/request/constants/Headers";
import {HttpMethod} from "@/composable/request/constants/HttpMethod";

const PostService = {

    /**
     * 공지 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {Promise<AxiosResponse<any>>} - 게시판 목록
     */
    fetchNotices(condition) {
        return useGetRequest('/api/notices', condition)
    },

    /**
     * 커뮤니티 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {Promise<AxiosResponse<any>>} - 게시판 목록
     */
    fetchCommunities(condition) {
        return useGetRequest('/api/communities', condition)
    },

    /**
     * 사진 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {Promise<AxiosResponse<any>>} - 게시판 목록
     */
    fetchPhotos(condition) {
        return useGetRequest('/api/photos', condition)
    },

    /**
     * 문의 게시글 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {Promise<AxiosResponse<any>>} - 게시판 목록
     */
    fetchInquiries(condition) {
        return useGetRequest('/api/inquiries', condition)
    },

    



    /**
     * 공지 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchNotice(postIdx) {
        return useGetRequest(`/api/notices/${postIdx}`)
    },

    /**
     * 커뮤니티 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchCommunity(postIdx) {
        return useGetRequest(`/api/communities/${postIdx}`)
    },

    /**
     * 사진 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchPhoto(postIdx) {
        return useGetRequest(`/api/photos/${postIdx}`)
    },

    /**
     * 문의 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchInquiry(postIdx) {
        return useGetRequest(`/api/inquiries/${postIdx}`)
    },


    /**
     * 비밀글 설정된 문의 게시글 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @param formData 폼 데이터
     */
    fetchSecretInquiry(postIdx, formData) {
        return useHttpRequest(HttpMethod.POST, `/api/inquiries/secret/${postIdx}`, formData, formUrlencoded);
    },
    
    
    
    

    /**
     * 수정 공지 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchEditNotice(postIdx) {
        return useGetRequest(`/api/manager/notices/${postIdx}/edit`)
    },

    /**
     * 수정 커뮤니티 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchEditCommunity(postIdx) {
        return useGetRequest(`/api/communities/${postIdx}/edit`)
    },

    /**
     * 수정 사진 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchEditPhoto(postIdx) {
        return useGetRequest(`/api/photos/${postIdx}/edit`)
    },

    /**
     * 수정 문의 게시물 정보를 가져오는 함수
     *
     * @param postIdx 게시물 번호
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchEditInquiry(postIdx) {
        return useGetRequest(`/api/inquiries/${postIdx}/edit`)
    },
    
    



    /**
     * 공지 게시물을 저장하는 함수
     *
     * @param {object} formData - 저장할 게시물 데이터가 담긴 폼 데이터
     * @returns {Promise<AxiosResponse<any>>} - 저장된 게시물 정보
     */
    saveNotice(formData) {
        return useHttpRequest(HttpMethod.POST, '/api/manager/notices', formData, json);
    },


    /**
     * 커뮤니티 게시물을 저장하는 함수
     *
     * @param {object} formData - 저장할 게시물 데이터가 담긴 폼 데이터
     * @returns {Promise<AxiosResponse<any>>} - 저장된 게시물 정보
     */
    saveCommunity(formData) {
        return useHttpRequest(HttpMethod.POST, '/api/communities', formData, multipart);
    },

    /**
     * 사진 게시물을 저장하는 함수
     *
     * @param {object} formData - 저장할 게시물 데이터가 담긴 폼 데이터
     * @returns {Promise<AxiosResponse<any>>} - 저장된 게시물 정보
     */
    savePhoto(formData) {
        return useHttpRequest(HttpMethod.POST, '/api/photos', formData, multipart);
    },

    /**
     * 문의 게시물을 저장하는 함수
     *
     * @param {object} formData - 저장할 게시물 데이터가 담긴 폼 데이터
     * @returns {Promise<AxiosResponse<any>>} - 저장된 게시물 정보
     */
    saveInquiry(formData) {
        return useHttpRequest(HttpMethod.POST, '/api/inquiries', formData, json);
    },
    
    

    /**
     * 커뮤니티 게시물을 수정하는 함수
     *
     * @param postIdx 게시글 번호
     * @param {object} formData - 저장할 게시물 데이터가 담긴 폼 데이터
     * @returns {Promise<AxiosResponse<any>>} - 저장된 게시물 정보
     */
    editCommunity(postIdx, formData) {
        return useHttpRequest(HttpMethod.PUT, `/api/communities/${postIdx}`, formData, multipart);
    },

    /**
     * 사진 게시물을 수정하는 함수
     *
     * @param postIdx 게시글 번호
     * @param {object} formData - 저장할 게시물 데이터가 담긴 폼 데이터
     * @returns {Promise<AxiosResponse<any>>} - 저장된 게시물 정보
     */
    editPhoto(postIdx, formData) {
        return useHttpRequest(HttpMethod.PUT, `/api/photos/${postIdx}`, formData, multipart);
    },
    
    


    /**
     * 문의 게시글을 삭제하는 함수
     *
     * @param {string} postIdx - 삭제할 게시물의 번호
     * @returns {Promise<AxiosResponse<any>>} - 삭제 요청 결과
     */
    deleteNotice(postIdx) {
        return useHttpRequest(HttpMethod.DELETE, `/api/manager/notices/${postIdx}`);
    },

    /**
     * 커뮤니티 게시글을 삭제하는 함수
     *
     * @param {string} postIdx - 삭제할 게시물의 번호
     * @returns {Promise<AxiosResponse<any>>} - 삭제 요청 결과
     */
    deleteCommunity(postIdx) {
        return useHttpRequest(HttpMethod.DELETE, `/api/communities/${postIdx}`);
    },

    /**
     * 사진 게시글을 삭제하는 함수
     *
     * @param {string} postIdx - 삭제할 게시물의 번호
     * @returns {Promise<AxiosResponse<any>>} - 삭제 요청 결과
     */
    deletePhoto(postIdx) {
        return useHttpRequest(HttpMethod.DELETE, `/api/photos/${postIdx}`);
    },

    /**
     * 문의 게시글을 삭제하는 함수
     *
     * @param {string} postIdx - 삭제할 게시물의 번호
     * @returns {Promise<AxiosResponse<any>>} - 삭제 요청 결과
     */
    deleteInquiry(postIdx) {
        return useHttpRequest(HttpMethod.DELETE, `/api/inquiries/${postIdx}`);
    },

};

export default PostService;
