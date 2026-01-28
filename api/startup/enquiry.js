import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupEnquiries = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/enquiry`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addEnquiry = async ({ token, mobile, email, message }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/enquiry`,
        {
            mobile,
            email,
            message,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const addPublicEnquiry = async ({ token, startupId, mobile, email, message }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/enquiry/public`,
        {
            startupId,
            mobile,
            email,
            message,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const STARTUP_ENQUIRY_API = {
    searchStartupEnquiries,
    addEnquiry,
    addPublicEnquiry,
};

export default STARTUP_ENQUIRY_API;
