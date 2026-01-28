import { API_URLS } from "../../constants";
import STW_API from "../../helpers/api";

const searchStartupOffices = async ({ page = 0, limit = 0, sort = "asc", filters = {} }) => {
    return STW_API.get(`${API_URLS.STARTUP}/office`, {
        headers: {},
        params: { page, limit, sort, filters },
    });
};

const addOffice = async ({ token, type, address, area, landmark, countryId, stateId, cityId, pincode, longitude, latitude }) => {
    return STW_API.post(
        `${API_URLS.STARTUP}/office`,
        {
            type,
            address,
            area,
            landmark,
            countryId,
            stateId,
            cityId,
            pincode,
            longitude,
            latitude,
        },
        {
            headers: { "stw-startup-session": `Bearer ${token}` },
        }
    );
};

const removeOffice = async ({ token, startupOfficeId }) => {
    return STW_API.delete(`${API_URLS.STARTUP}/office/${startupOfficeId}`, {
        headers: { "stw-startup-session": `Bearer ${token}` },
    });
};

const STARTUP_OFFICE_API = {
    searchStartupOffices,
    addOffice,
    removeOffice,
};

export default STARTUP_OFFICE_API;
