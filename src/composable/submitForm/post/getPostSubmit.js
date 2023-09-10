import {ref} from 'vue';

/**
 * 게시글을 조회하고 페이지 정보를 관리하는 컴포지션 함수
 *
 * @param {function} getPostFunction - 게시글 조회 함수
 */
export function useGetPostSubmit(getPostFunction) {
    const fetchPostData = ref(null);

    /**
     * 게시글 목록을 가져오기 위한 서버에 요청하는 함수
     */
    async function useSubmit(postIdx) {
        return getPostFunction(postIdx).then(response => {
            fetchPostData.value = response.data
        }).catch(error => {
            console.log(error);
        })
    }

    return {
        fetchPostData,
        useSubmit
    };
}
