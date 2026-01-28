import { API_URLS } from "../constants";
import STW_API from "../helpers/api";

const getCountries = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.BASE}/country`, {
        headers: { "stw-investor-session": `Bearer ${token}`, "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const COUNTRY_API = {
    getCountries,
};

export default COUNTRY_API;
