import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupContactEmails = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/contact/email`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const searchStartupContactMobiles = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/contact/mobile`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const searchStartupWebsites = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/contact/website`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const searchStartupApps = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/contact/app`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const addEmail = async ({ token, contact, title }) => {
    return STW_API.post(`${API_URLS.STARTUP}/contact/email`, { contact, title }, { headers: { "stw-startup-session": `Bearer ${token}` } });
};

const addMobile = async ({ token, contact, title }) => {
    return STW_API.post(`${API_URLS.STARTUP}/contact/mobile`, { contact, title }, { headers: { "stw-startup-session": `Bearer ${token}` } });
};

const addWebsite = async ({ token, contact, title }) => {
    return STW_API.post(`${API_URLS.STARTUP}/contact/website`, { contact, title }, { headers: { "stw-startup-session": `Bearer ${token}` } });
};

const addApp = async ({ token, contact, title }) => {
    return STW_API.post(`${API_URLS.STARTUP}/contact/app`, { contact, title }, { headers: { "stw-startup-session": `Bearer ${token}` } });
};

const deleteContact = async ({ token, contactType, startupContactId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/contact/${contactType}/${startupContactId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_CONTACT_API = {
    searchStartupContactEmails,
    searchStartupContactMobiles,
    searchStartupWebsites,
    searchStartupApps,
    addEmail,
    addMobile,
    addWebsite,
    addApp,
    deleteContact,
};

export default STARTUP_CONTACT_API;
