import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const getPreference = async ({ token = null } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.PREFERENCE.DETAILS}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: {},
    });
};

const updatePreference = async ({ token = null, preference = {} }) => {
    return STW_API.patch(
        `${API_URLS.INVESTOR.PREFERENCE.UPDATE}`,
        { ...preference },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const INVESTOR_PREFERENCE_API = {
    getPreference,
    updatePreference,
};

export default INVESTOR_PREFERENCE_API;
