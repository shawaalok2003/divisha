import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const addInvestor = async ({ token = null, newInvestor } = {}) => {
    return STW_API.post(
        `${API_URLS.INVESTOR.ADD}`,
        { ...newInvestor },
        {
            headers: { "stw-super-session": `Bearer ${token}` },
        }
    );
};

const getInvestorsList = async ({ token = null, page = 0, limit = 10, filters = {} } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.LIST}`, {
        headers: { "stw-super-session": `Bearer ${token}` },
        params: { page, limit, filters },
    });
};

const getInvestorDetails = async ({ token = null, investorId = null } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.LIST}/${investorId}`, {
        headers: { "stw-super-session": `Bearer ${token}` },
        params: {},
    });
};

const updateInvestor = async ({ token = null, investorDetails } = {}) => {
    const { investorId, ...rest } = investorDetails;

    return STW_API.patch(
        `${API_URLS.INVESTOR.LIST}/${investorId}`,
        { ...rest },
        {
            headers: { "stw-super-session": `Bearer ${token}` },
        }
    );
};

const SUPER_INVESTORS_API = {
    addInvestor,
    getInvestorsList,
    getInvestorDetails,
    updateInvestor,
};

export default SUPER_INVESTORS_API;
