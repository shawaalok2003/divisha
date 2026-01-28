import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const manageStartupServices = async ({ token, services = [] }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/service/manage`,
        { services },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const searchStartupServices = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/service`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const STARTUP_SERVICE_API = {
    manageStartupServices,
    searchStartupServices,
};

export default STARTUP_SERVICE_API;
