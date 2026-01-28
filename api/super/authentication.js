import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const loginSuper = async ({ username, password }) => {
    return STW_API.post(
        `${API_URLS.SUPER.LOGIN}`,
        { username, password },
        {
            headers: {},
        }
    );
};

const getSuperDetails = async ({ token = null }) => {
    return STW_API.get(`${API_URLS.SUPER.DETAILS}`, {
        headers: { "stw-super-session": `Bearer ${token}` },
        params: {},
    });
};

const loginAsInvestor = async ({ token, username }) => {
    return STW_API.post(
        `${API_URLS.SUPER.LOGINASINVESTOR}`,
        { username },
        {
            headers: { "stw-super-session": `Bearer ${token}` },
        }
    );
};

const SUPER_AUTH_API = {
    loginSuper,
    getSuperDetails,
    loginAsInvestor,
};

export default SUPER_AUTH_API;
