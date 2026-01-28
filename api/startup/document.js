import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupDocuments = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/document`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addDocument = async ({ token, ...rest }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/document`,
        {
            ...rest,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeDocument = async ({ token, startupDocumentId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/document/${startupDocumentId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_DOCUMENT_API = {
    searchStartupDocuments,
    addDocument,
    removeDocument,
};

export default STARTUP_DOCUMENT_API;
