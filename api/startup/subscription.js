import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const createSubscription = async ({ token, subscriptionPlanId }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/subscription`,
        { subscriptionPlanId },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const STARTUP_SUBSCRIPTION_API = {
    createSubscription,
};

export default STARTUP_SUBSCRIPTION_API;
