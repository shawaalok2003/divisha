import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupMedias = async ({ token, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/media`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addMedia = async ({ token, title, image, publication = "", link = "" }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/media`,
        {
            title,
            image,
            publication,
            link,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeMedia = async ({ token, startupMediaId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/media/${startupMediaId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_MEDIA_API = {
    searchStartupMedias,
    addMedia,
    removeMedia,
};

export default STARTUP_MEDIA_API;
