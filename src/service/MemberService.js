import {useHttpFormDataRequest} from "@/composable/request/httpFormDataRequest";
import {HttpMethod} from "@/composable/request/constants/HttpMethod";
import {json} from "@/composable/request/constants/Headers";
import {store} from "@/store";

/**
 * 회원 서비스 객체
 */
const MemberService = {

    async signUp(formData) {
        const response = await useHttpFormDataRequest(HttpMethod.POST, '/api/sign-up', formData, json);
        if (response.status === 201) {
            store.saveMember(response.data.id, response.data.nickname);
        }
        return response;
    },
};
export default MemberService;
