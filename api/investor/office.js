import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const addOffice = async ({ token = null, newOffice = {} }) => {
    return STW_API.post(
        `${API_URLS.INVESTOR.OFFICE.LIST}`,
        { ...newOffice },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const getOfficeList = async ({ token = null, page = 0, limit = 10, filters = {} } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.OFFICE.LIST}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: { page, limit, filters },
    });
};

const getOfficeDetails = async ({ token = null, investorOfficeId = null } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.OFFICE.DETAILS}/${investorOfficeId}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: {},
    });
};

const editOffice = async ({ token = null, editOfficeData = {} }) => {
    return STW_API.patch(
        `${API_URLS.INVESTOR.OFFICE.UPDATE}/${editOfficeData.investorOfficeId}`,
        { ...editOfficeData },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const removeOffice = async ({ token = null, investorOfficeId = null }) => {
    return STW_API.delete(`${API_URLS.INVESTOR.OFFICE.UPDATE}/${investorOfficeId}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
    });
};

const INVESTOR_OFFICE_API = {
    addOffice,
    getOfficeList,
    getOfficeDetails,
    editOffice,
    removeOffice,
};

export default INVESTOR_OFFICE_API;
