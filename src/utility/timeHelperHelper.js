const { zonedTimeToUtc, format, utcToZonedTime } = require('date-fns');
const { parseISO } = require('date-fns');
/**
 * Covert timezone
 * @param {String/Date} inputTime
 * @param {String} currentTimezone = 'UTC'
 * @param {String} convertTimezone = ''
 * @param {String} formatPattern = 'yyyy-MM-dd HH:mm:ss'
 * @returns {string}
 */
const convertTimezone = (
    inputTime,
    currentTimezone = 'UTC',
    // eslint-disable-next-line no-shadow
    convertTimezone = '',
    formatPattern = 'yyyy-MM-dd HH:mm:ss',
) => {
    try {
        if (convertTimezone === '') {
            // eslint-disable-next-line no-param-reassign
            convertTimezone = currentTimezone;
        }
        let currentTimeInGivenTimezone;

        if (currentTimezone === 'UTC') {
            currentTimeInGivenTimezone = utcToZonedTime(inputTime, convertTimezone);
        } else {
            const currentTimezoneToUtc = zonedTimeToUtc(inputTime, currentTimezone);
            if (convertTimezone === 'UTC') {
                currentTimeInGivenTimezone = currentTimezoneToUtc;
            } else {
                currentTimeInGivenTimezone = utcToZonedTime(currentTimezoneToUtc, convertTimezone);
            }
        }
        return format(currentTimeInGivenTimezone, formatPattern, { timeZone: convertTimezone });
    } catch (e) {
        return format(new Date(), formatPattern);
    }
};
/**
 * format time
 * @param {String/Date} time
 * @param {String} formatPattern = 'yyyy-MM-dd HH:mm:ss'
 * @returns {string}
 */
const formatTime = (time, formatPattern = 'yyyy-MM-dd HH:mm:ss') => {
    if (typeof time !== 'string') {
        return format(time, formatPattern);
    }
    return format(new Date(time), formatPattern);
};
/**
 * Parse date or string to date instance
 * @param {String/Date} time
 * @returns {Date}
 */
const parseTime = (time) => {
    if (typeof time !== 'string') {
        return time;
    }
    return parseISO(time);
};

module.exports = {
    convertTimezone,
    formatTime,
    parseTime,
};
