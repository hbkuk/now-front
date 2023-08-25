import {useHttpRequest} from "@/composable/request/httpRequest";
import {json} from "@/composable/request/constants/Headers";
import {HttpMethod} from "@/composable/request/constants/HttpMethod";
import {useGetRequest} from "@/composable/request/getRequest";

const CommentService = {

    fetchAllCommentsByPostIdx(postIdx) {
        return useGetRequest(`/api/posts/${postIdx}/comments`)
    },

    saveComment(postIdx, formData) {
        return useHttpRequest(HttpMethod.POST, `/api/posts/${postIdx}/comments`, formData, json);
    },

    editComment(postIdx, commentIdx, formData) {
        return useHttpRequest(HttpMethod.PUT, `/api/posts/${postIdx}/comments/${commentIdx}`, formData, json);
    },

    deleteComment(postIdx, commentIdx) {
        return useHttpRequest(HttpMethod.DELETE, `/api/posts/${postIdx}/comments/${commentIdx}`);
    },

};

export default CommentService;
