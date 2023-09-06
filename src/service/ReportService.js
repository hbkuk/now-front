import {useHttpFormDataRequest} from "@/composable/request/httpFormDataRequest";
import {HttpMethod} from "@/composable/request/constants/HttpMethod";
import {json} from "@/composable/request/constants/Headers";

const ReportService = {

    /**
     * 오류 내용을 전송하는 함수
     * @param formData - 전송할 데이터가 담긴 객체
     * @returns {Promise<AxiosResponse<any>>}
     */
    sendBug(formData) {
        return useHttpFormDataRequest(HttpMethod.POST, `/api/report/bug`, formData, json)
    },

    /**
     * 피드백을 전송하는 함수
     * @param formData - 전송할 데이터가 담긴 객체
     * @returns {Promise<AxiosResponse<any>>}
     */
    sendFeedback(formData) {
        return useHttpFormDataRequest(HttpMethod.POST, `/api/report/feedback`, formData, json)
    },

};
export default ReportService;
