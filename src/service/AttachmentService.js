import axios from "axios";

const AttachmentService = {

    downloadFile(attachmentIdx) {
        return axios.get(`/attachments/${attachmentIdx}`, {responseType: "blob"}
    )},

};
export default AttachmentService;
