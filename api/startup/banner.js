import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupBanner = async ({ token, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/banner`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addBanner = async ({ token, title, file }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/banner`,
        {
            title,
            file,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeBanner = async ({ token, startupBannerId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/banner/${startupBannerId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_GALLERY_API = {
    searchStartupBanner,
    addBanner,
    removeBanner,
};

export default STARTUP_GALLERY_API;
