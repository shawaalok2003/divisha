import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const addExternalStartup = async ({ token = null, newExternalStartup = {} }) => {
    return STW_API.post(
        `${API_URLS.INVESTOR.STARTUP.ADDEXTERNAL}`,
        { ...newExternalStartup },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const addInternalStartup = async ({ token = null, startupId = null, activity, year, amountInvested }) => {
    return STW_API.post(
        `${API_URLS.INVESTOR.STARTUP.ADDINTERNAL}`,
        { startupId, activity, year, amountInvested },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const getStartups = async ({ token = null, page = 0, limit = 10, filters = {} } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.STARTUP.LIST}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: { page, limit, filters },
    });
};

const getStartupDetails = async ({ token = null, investorStartupId = null } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.STARTUP.DETAILS}/${investorStartupId}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: {},
    });
};

const removeStartup = async ({ token = null, investorStartupId = null }) => {
    return STW_API.delete(`${API_URLS.INVESTOR.STARTUP.DELETE}/${investorStartupId}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
    });
};

const INVESTOR_STARTUP_PORTFOLIO_API = {
    addExternalStartup,
    addInternalStartup,
    getStartups,
    getStartupDetails,
    removeStartup,
};

export default INVESTOR_STARTUP_PORTFOLIO_API;
