import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartups = async ({ page = 0, limit = 0, filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/listing`, {
        headers: {},
        params: { page, limit, filters },
    });
};

const getStartupDetails = async ({ token = null, startupId }) => {
    return STW_API.get(`${API_URLS.STARTUP}/listing/details`, {
        //headers: { "stw-startup-session": `Bearer ${token}` },
        params: { startupId },
    });
};

const STARTUP_LISTING_API = {
    searchStartups,
    getStartupDetails,
};

export default STARTUP_LISTING_API;
