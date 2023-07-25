import {useGetRequest} from "@/composable/request/getRequest";
import {useHttpRequest} from "@/composable/request/httpRequest";
import {formUrlencoded, json, multipart} from "@/composable/request/Headers";
import {HttpMethod} from "@/composable/request/HttpMethod";


/**
 * 데이터 서비스 함수
 */

const DataService = {

    /**
     * 게시물 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {{data, error}} - 게시판 목록
     */
    fetchBoards(condition) {
        return useGetRequest('/api/boards', condition)
    },

    /**
     * 게시물 정보를 가져오는 함수
     *
     * @param boardIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchBoard(boardIdx) {
        return useGetRequest(`/api/board/${boardIdx}`)
    },

    /**
     * 게시물 작성을 위한 데이터를 가져오는 함수
     *
     * @param boardIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchWriteView() {
        return useGetRequest('/api/board/write')
    },

    /**
     * 게시물 작성을 위한 데이터를 가져오는 함수
     *
     * @param boardIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchModifyView(boardIdx) {
        return useGetRequest(`/api/board/modify/${boardIdx}`)
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
     * @param boardIdx 게시물 번호
     * @param formData 요청 데이터
     */
    fetchModifyAction(boardIdx, formData) {
        return useHttpRequest(HttpMethod.PUT,`/api/board/${boardIdx}`, formData, multipart)
    },

    /**
     * 게시물 삭제을 위한 요청 함수
     *
     * @param boardIdx 게시물 번호
     * @param formData 요청 데이터
     */
    fetchDeleteAction(boardIdx, formData) {
        return useHttpRequest(HttpMethod.DELETE,`/api/board/${boardIdx}`, formData, formUrlencoded)
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
