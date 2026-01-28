import { API_URLS } from "../constants";
import STW_API from "../helpers/api";

const resendEmail = async ({ token = null, type = null }) => {
    return STW_API.post(
        `${API_URLS.BASE}/verification/resendemail`,
        {
            type,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const VERIFICATION_API = {
    resendEmail,
};

export default VERIFICATION_API;
