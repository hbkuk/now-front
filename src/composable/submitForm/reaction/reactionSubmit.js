import { ref } from 'vue';
import ErrorType from "@/composable/response/ErrorType";
import { useRefreshTokenAndRetry } from "@/composable/authentication/refreshTokenAndRetry";

/**
 * 게시물 반응을 제출하기 위한 컴포지션 함수
 *
 * @param {Object} targetPost - 대상 게시물 객체
 * @param {Function} getPostReactionFunction - 게시물 반응 정보를 가져오는 함수
 * @param {Function} savePostReactionFunction - 게시물 반응 정보를 저장하는 함수
 * @returns {Object} - 컴포지션 함수에서 사용 가능한 값들의 객체
 */
export function usePostReactionSubmit(targetPost, getPostReactionFunction, savePostReactionFunction) {
    const fetchPostReactionData = ref(null);
    const updatedReaction = ref({reaction: null});

    /**
     * 게시물의 반응 정보를 가져오는 함수
     *
     * @param {number} postIdx - 게시물 인덱스
     * @param {boolean} isReactionDetails - 반응 상세 정보 필요 여부
     * @returns {Promise<Object>} - 게시물 반응 정보의 프라미스
     */
    async function getPostReact(postIdx, isReactionDetails) {
        return await getPostReactionFunction(postIdx, isReactionDetails).then(response => {
            fetchPostReactionData.value = response?.data;
        }).catch(async error => {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => getPostReact(postIdx, isReactionDetails));
            }
        });
    }

    /**
     * 게시물 반응을 업데이트하는 함수
     *
     * @param {string} reaction - 반응
     */
    function updatePostReaction(reaction) {
        updatedReaction.value.reaction = reaction;
    }


    /**
     * 업데이트할 게시글 반응정보를 서버에 전송하는 함수
     *
     * @param {number} postIdx - 게시물 인덱스
     */
    async function useSubmit(postIdx) {
        try {
            await savePostReactionFunction(postIdx, new Blob([JSON.stringify(updatedReaction.value)], {type: 'application/json'}));

            const response = await getPostReactionFunction(postIdx, { isReactionDetails: true });
            fetchPostReactionData.value = response.data;
            targetPost.value.likeCount = response.data.likeCount;
            targetPost.value.dislikeCount = response.data.dislikeCount;

        } catch (error) {
            if (error.response?.data?.errorCode === ErrorType.EXPIRED_ACCESS_TOKEN) {
                await useRefreshTokenAndRetry(() => useSubmit(postIdx));
            }
        }
    }

    return {
        fetchPostReactionData,
        getPostReact,
        updatePostReaction,
        useSubmit,
    };
}
