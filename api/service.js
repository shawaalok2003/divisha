import STW_API from "../helpers/api";

const searchServices = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`/service`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const SERVICE_API = {
    searchServices,
};

export default SERVICE_API;
