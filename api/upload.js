import { API_URLS } from "../constants";
import STW_API from "../helpers/api";

const uploadFileToAWS = async ({ token, file = null, type = null }) => {
    if (!file && !type) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", type);

    return STW_API.post(`${API_URLS.BASE}/upload/aws`, formData, {
        headers: {
            [`stw-${type.includes("investor") ? "investor" : "startup"}-session`]: `Bearer ${token}`,
        },
    });
};

const UPLOAD_API = {
    uploadFileToAWS,
};

export default UPLOAD_API;
