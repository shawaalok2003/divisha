import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const registerInvestor = async ({ type, firstName, lastName, username, mobile, password, agreement }) => {
    return STW_API.post(
        `${API_URLS.INVESTOR.REGISTER}`,
        { type, firstName, lastName, username, mobile, password, agreement },
        {
            headers: {},
        }
    );
};

const loginInvestor = async ({ username, password }) => {
    return STW_API.post(
        `${API_URLS.INVESTOR.LOGIN}`,
        { username, password },
        {
            headers: {},
        }
    );
};

const getInvestorDetails = async ({ token = null, investorId = null } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.DETAILS}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: {},
    });
};

const INVESTOR_AUTH_API = {
    registerInvestor,
    loginInvestor,
    getInvestorDetails,
};

export default INVESTOR_AUTH_API;
