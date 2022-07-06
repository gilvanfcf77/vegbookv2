const { DateTime } = require("luxon");
import 'intl';
import 'intl/locale-data/jsonp/en-ZA'

export const getFormattedDate = (date) => {
    try {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)
    } catch {
        return date;
    }
};

export const getDate = () => {
    try {
        return DateTime.local().toISO()
    } catch (error) {
        console.log(error);
    }
};