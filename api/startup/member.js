import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupMembers = async ({ token = null, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/member`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const addMember = async ({ token, type, name, email, mobile, designation, qualification, about, share, facebook, instagram, linkedin, photo }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/member`,
        {
            type,
            name,
            email,
            mobile,
            designation,
            qualification,
            about,
            share,
            facebook,
            instagram,
            linkedin,
            photo,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeMember = async ({ token, startupMemberId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/member/${startupMemberId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_MEMBER_API = {
    searchStartupMembers,
    addMember,
    removeMember,
};

export default STARTUP_MEMBER_API;
