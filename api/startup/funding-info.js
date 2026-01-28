import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const updateStartupFundingInfo = async ({ token, updateFields = {} }) => {
    return STW_API.patch(
        `${API_URLS.STARTUP}/funding/info`,
        { ...updateFields },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const STARTUP_FUNDING_API = {
    updateStartupFundingInfo,
};

export default STARTUP_FUNDING_API;
