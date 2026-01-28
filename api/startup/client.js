import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupClients = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/client`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addClient = async ({ token, name, testimonial, logo }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/client`,
        {
            name,
            testimonial,
            logo,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeClient = async ({ token, clientId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/client/${clientId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_CLIENT_API = {
    searchStartupClients,
    addClient,
    removeClient,
};

export default STARTUP_CLIENT_API;
