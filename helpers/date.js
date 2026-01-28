import moment from "moment";
import momentTz from "moment-timezone";

export const getYear = () => moment().year();

export const getFormattedDateOnly = (date) => moment(date).format("YYYY-MM-DD");

const DateUtil = {
    getCustomerFormattedDate: (date = null, format = null, timezone = null) => {
        if (!date) return "";

        return momentTz(date)
            .tz(timezone || "Asia/Kolkata")
            .format(format || "DD-MM-YYYY");
    },
    getCustomerFormattedDateTime: (date = null, format = null, timezone = null) => {
        if (!date) return "";

        return momentTz(date)
            .tz(timezone || "Asia/Kolkata")
            .format(format || "DD-MM-YYYY HH:mm:ss");
    },
};

export default DateUtil;
