import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupGallery = async ({ token, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/gallery`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addGallery = async ({ token, title, file }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/gallery`,
        {
            title,
            file,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeGallery = async ({ token, startupGalleryId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/gallery/${startupGalleryId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_GALLERY_API = {
    searchStartupGallery,
    addGallery,
    removeGallery,
};

export default STARTUP_GALLERY_API;
