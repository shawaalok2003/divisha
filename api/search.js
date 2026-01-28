import { API_URLS } from "../constants";
import STW_API from "../helpers/api";

const findStartups = async ({ token = null, filters = {} } = {}) => {
    return STW_API.get(`${API_URLS.SEARCH.STARTUP}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: { filters },
    });
};

const SEARCH_API = {
    findStartups,
};

export default SEARCH_API;
