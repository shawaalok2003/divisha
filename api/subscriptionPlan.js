import { API_URLS } from "../constants";
import STW_API from "../helpers/api";

const searchSubscriptionPlans = async ({ token, page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`/subscription-plan`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
        params: { page, limit, sort, filters },
    });
};

const SUBSCRIPTION_PLAN_API = {
    searchSubscriptionPlans,
};

export default SUBSCRIPTION_PLAN_API;
