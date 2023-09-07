import http from "@/composable/request/http";

const AttachmentService = {

    downloadFile(attachmentIdx) {
        return http.get(`/api/attachments/${attachmentIdx}`, {responseType: "blob"});
    },

};
export default AttachmentService;
