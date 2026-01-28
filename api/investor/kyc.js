import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const getKYC = async ({ token = null } = {}) => {
    return STW_API.get(`${API_URLS.INVESTOR.KYC.DETAILS}`, {
        headers: { "stw-investor-session": `Bearer ${token}` },
        params: {},
    });
};

const updateKYC = async ({ token = null, kyc = {} }) => {
    return STW_API.patch(
        `${API_URLS.INVESTOR.KYC.UPDATE}`,
        { ...kyc },
        {
            headers: { "stw-investor-session": `Bearer ${token}` },
        }
    );
};

const INVESTOR_KYC_API = {
    getKYC,
    updateKYC,
};

export default INVESTOR_KYC_API;
