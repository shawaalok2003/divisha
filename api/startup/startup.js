import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const registerStartup = async (data) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/register`,
        { ...data },
        {
            headers: {},
        }
    );
};

const loginStartup = async ({ username }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/login`,
        { username },
        {
            headers: {},
        }
    );
};

const verifyOTP = async ({ type, otp }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/verifyotp`,
        { type, otp },
        {
            headers: {},
        }
    );
};

const searchStartups = async ({ page = 0, limit = 0, filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}`, {
        headers: {},
        params: { page, limit, filters },
    });
};

const getStartupDetails = async ({ token = null }) => {
    return STW_API.get(`${API_URLS.STARTUP}/details`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: {},
    });
};

const updateStartup = async ({ token, updateFields = {} }) => {
    return STW_API.patch(
        `${API_URLS.STARTUP}`,
        { ...updateFields },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const updateStartupInfo = async ({ token, updateFields = {} }) => {
    return STW_API.patch(
        `${API_URLS.STARTUP}/info`,
        { ...updateFields },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const updateStartupTraction = async ({ token, updateFields = {} }) => {
    return STW_API.patch(
        `${API_URLS.STARTUP}/traction`,
        { ...updateFields },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const STARTUP_API = {
    registerStartup,
    loginStartup,
    verifyOTP,
    searchStartups,
    getStartupDetails,
    updateStartup,
    updateStartupInfo,
    updateStartupTraction,
};

export default STARTUP_API;
