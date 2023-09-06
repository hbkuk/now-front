import axios from "axios";

const AttachmentService = {

    downloadFile(attachmentIdx) {
        return axios.get(`/api/attachments/${attachmentIdx}`, {responseType: "blob"}
    )},

};
export default AttachmentService;
