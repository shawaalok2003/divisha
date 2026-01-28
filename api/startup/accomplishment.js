import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupAccomplishments = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/accomplishment`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addAccomplishment = async ({ token, title, file }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/accomplishment`,
        {
            title,
            file,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeAccomplishment = async ({ token, startupAccomplishmentId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/accomplishment/${startupAccomplishmentId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_ACCOMPLISHMENT_API = {
    searchStartupAccomplishments,
    addAccomplishment,
    removeAccomplishment,
};

export default STARTUP_ACCOMPLISHMENT_API;
