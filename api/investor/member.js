import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const addMember = async ({ token = null, newMember = {} }) => {
    return STW_API.post(
        `${API_URLS.INVESTOR.MEMBER.LIST}`,
        { ...newMember },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const getMembers = async ({ token = null, page = 0, limit = 10, filters = {} } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.MEMBER.LIST}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: { page, limit, filters },
    });
};

const getMemberDetails = async ({ token = null, investorMemberId = null } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.MEMBER.DETAILS}/${investorMemberId}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: {},
    });
};

const updateMember = async ({ token = null, memberDetails = {} }) => {
    const { investorMemberId, ...rest } = memberDetails;

    return STW_API.patch(
        `${API_URLS.INVESTOR.MEMBER.UPDATE}/${investorMemberId}`,
        { ...rest },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const removeMember = async ({ token = null, investorMemberId = null }) => {
    return STW_API.delete(`${API_URLS.INVESTOR.MEMBER.DELETE}/${investorMemberId}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
    });
};

const INVESTOR_MEMBER_API = {
    addMember,
    getMembers,
    getMemberDetails,
    updateMember,
    removeMember,
};

export default INVESTOR_MEMBER_API;
