import STW_API from "../helpers/api";

const searchCategories = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`/category`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const CATEGORY_API = {
    searchCategories,
};

export default CATEGORY_API;
