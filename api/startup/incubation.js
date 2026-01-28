import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupIncubations = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/incubation`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addIncubation = async ({ token, orgName, orgMobile, orgEmail, orgWebsite, incubationDate, incubationPeriod }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/incubation`,
        {
            orgName,
            orgMobile,
            orgEmail,
            orgWebsite,
            incubationDate,
            incubationPeriod,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const deleteIncubation = async ({ token, startupIncubationId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/incubation/${startupIncubationId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_INCUBATION_API = {
    searchStartupIncubations,
    addIncubation,
    deleteIncubation,
};

export default STARTUP_INCUBATION_API;
