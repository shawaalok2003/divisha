import { API_URLS } from "../constants";
import STW_API from "../helpers/api";

const searchCountries = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.PUBLIC}/country`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const searchStates = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.PUBLIC}/state`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const searchCities = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.PUBLIC}/city`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const COMMON_API = {
    searchCountries,
    searchStates,
    searchCities,
};

export default COMMON_API;
