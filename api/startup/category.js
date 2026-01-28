import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const manageStartupCategories = async ({ token, categories = [] }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/category/manage`,
        { categories },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const searchStartupCategories = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/category`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const STARTUP_CATEGORY_API = {
    manageStartupCategories,
    searchStartupCategories,
};

export default STARTUP_CATEGORY_API;
