import React, {Component} from 'react';
import Moment from 'moment';
import {tz} from 'moment-timezone';
import StringUtils from "../string/StringUtils";

export default class DateUtils extends Component {
    static Formats = {
        FULL_YEAR: 'YYYY',
        YEAR: 'YY',
        FULL_MONTH: 'MM',
        MONTH: 'M',
        MONTH_NAME: 'A',
        FULL_DAY: 'DD',
        DAY: 'D',
        HOUR: 'H',
        MINUTE: 'I',
        SECOND: 'S',
        WEEK_DAY: 'W',
        fullDate: 'W D A YYYY - H:I:S',
        fullDate2: 'W D A - H:I',
        fullDate3: 'YYYY-MM-DDTH:I:S',
        simpleDate: 'DD A YYYY',
        simpleDate2: 'D A YYYY',
        simpleDate3: 'W D A YYYY',
        simpleDate4: 'YY/MM/DD',
        simpleDateAndTime: 'D,M,YY - H:I',
        simpleDateAndTime2: 'D A YY - H:I:S',
        fullTime: 'H:I:S',
        simpleTime: 'H:I',
    };

    static resolveDate(string) {
        return new Date(Moment(string));
    }

    static toGregorianDate = (date, format) => {
        let weekDayNames = [i18n('weekDays.sunday'), i18n('weekDays.monday'), i18n('weekDays.tuesday'), i18n('weekDays.wednesday'), i18n('weekDays.thursday'), i18n('weekDays.friday'), i18n('weekDays.saturday')];
        let monthNames = [
            i18n('months.toGregorianDate.january'),
            i18n('months.toGregorianDate.february'),
            i18n('months.toGregorianDate.march'),
            i18n('months.toGregorianDate.april'),
            i18n('months.toGregorianDate.may'),
            i18n('months.toGregorianDate.june'),
            i18n('months.toGregorianDate.july'),
            i18n('months.toGregorianDate.august'),
            i18n('months.toGregorianDate.september'),
            i18n('months.toGregorianDate.october'),
            i18n('months.toGregorianDate.november'),
            i18n('months.toGregorianDate.december')
        ];

        let dayOfWeek = weekDayNames[date.getDay()];
        let monthName = monthNames[date.getMonth()];
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        let minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        let second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();

        return format
            .replace(/YYYY/g, year)
            .replace(/YY/g, year ? StringUtils.getZeroLeadingValue(year % 100) : '')
            .replace(/MM/g, StringUtils.getZeroLeadingValue(Math.floor(month)))
            .replace('M', Math.floor(month))
            .replace(/DD/g, StringUtils.getZeroLeadingValue(day))
            .replace('D', day)
            .replace('H', hour)
            .replace('I', minute)
            .replace('S', second)
            .replace('W', dayOfWeek)
            .replace('A', monthName)
    };

    static toJalaliDate = function (date, format) {
        let weekDayNames = [i18n('weekDays.sunday'), i18n('weekDays.monday'), i18n('weekDays.tuesday'), i18n('weekDays.wednesday'), i18n('weekDays.thursday'), i18n('weekDays.friday'), i18n('weekDays.saturday')];
        let monthNames = [
            i18n('months.toJalaliDate.farvardin'),
            i18n('months.toJalaliDate.ordibehesht'),
            i18n('months.toJalaliDate.khordad'),
            i18n('months.toJalaliDate.tir'),
            i18n('months.toJalaliDate.mordad'),
            i18n('months.toJalaliDate.shahrivar'),
            i18n('months.toJalaliDate.mehr'),
            i18n('months.toJalaliDate.aban'),
            i18n('months.toJalaliDate.azar'),
            i18n('months.toJalaliDate.dey'),
            i18n('months.toJalaliDate.bahman'),
            i18n('months.toJalaliDate.esfand')
        ];
        let dayOfWeek = null;
        let monthName = null;
        let day = null;
        let month = null;
        let year = null;
        let ld = null;
        let hour = null;
        let minute = null;
        let second = null;
        let farsiDate = null;

        let today = new Date();

        let gregorianYear = null;
        let gregorianMonth = null;
        let gregorianDay = null;
        let weekDayIndex = null;
        let buf1 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let buf2 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

        let convertToJalali = function (gregorianDate, dateFormat) {
            today = gregorianDate;
            gregorianYear = today.getFullYear();
            gregorianMonth = today.getMonth() + 1;
            gregorianDay = today.getDate();
            weekDayIndex = today.getDay();
            hour = (today.getHours() < 10) ? '0' + today.getHours() : today.getHours();
            minute = (today.getMinutes() < 10) ? '0' + today.getMinutes() : today.getMinutes();
            second = (today.getSeconds() < 10) ? '0' + today.getSeconds() : today.getSeconds();
            resolvePersianDateNumbers(gregorianDate);
            return dateFormat
                .replace(/YYYY/g, year)
                .replace(/YY/g, year ? StringUtils.getZeroLeadingValue(year % 100) : '')
                .replace(/MM/g, StringUtils.getZeroLeadingValue(Math.floor(month)))
                .replace('M', Math.floor(month))
                .replace(/DD/g, StringUtils.getZeroLeadingValue(day))
                .replace('D', day)
                .replace('H', hour)
                .replace('I', minute)
                .replace('S', second)
                .replace('W', dayOfWeek)
                .replace('A', monthName)
        };

        let resolvePersianDateNumbers = function (gregorianDate) {
            if ((gregorianYear % 4) !== 0)
                farsiDate = func1();
            else
                farsiDate = func2();
            monthName = monthNames[Math.floor(month - 1)];
            dayOfWeek = weekDayNames[weekDayIndex];

        };


        let func1 = function () {
            day = buf1[gregorianMonth - 1] + gregorianDay;
            if (day > 79) {
                day = day - 79;
                if (day <= 186) {
                    let day2 = day;
                    month = (day2 / 31) + 1;
                    day = (day2 % 31);
                    if (day2 % 31 == 0) {
                        month--;
                        day = 31;
                    }
                    year = gregorianYear - 621;
                }
                else {
                    let day2 = day - 186;
                    month = (day2 / 30) + 7;
                    day = (day2 % 30);
                    if (day2 % 30 == 0) {
                        month = (day2 / 30) + 6;
                        day = 30;
                    }
                    year = gregorianYear - 621;
                }
            }
            else {
                ld = gregorianYear > 1996 && gregorianYear % 4 == 1 ? 11 : 10;
                let day2 = day + ld;
                month = (day2 / 30) + 10;
                day = (day2 % 30);
                if (day2 % 30 == 0) {
                    month--;
                    day = 30;
                }
                year = gregorianYear - 622;
            }
            let fullDate = day + "/" + Math.floor(month) + "/" + year;
            return fullDate
        };


        let func2 = function () {
            day = buf2[gregorianMonth - 1] + gregorianDay;
            ld = gregorianYear >= 1996 ? 79 : 80;
            if (day > ld) {
                day = day - ld;
                if (day <= 186) {
                    let day2 = day;
                    month = (day2 / 31) + 1;
                    day = (day2 % 31);
                    if (day2 % 31 == 0) {
                        month--;
                        day = 31;
                    }
                    year = gregorianYear - 621;
                } else {
                    let day2 = day - 186;
                    month = (day2 / 30) + 7;
                    day = (day2 % 30);
                    if (day2 % 30 == 0) {
                        month--;
                        day = 30;
                    }
                    year = gregorianYear - 621;
                }
                let fullDate = day + "/" + Math.floor(month) + "/" + year;
                return fullDate
            }
            else {
                let day2 = day + 10;
                month = (day2 / 30) + 10;
                day = (day2 % 30);
                if (day2 % 30 == 0) {
                    month--;
                    day = 30;
                }
                year = gregorianYear - 622;
            }
        };

        let getZeroLeadingValue = function (value) {
            return parseInt(value, 10) < 10 ? '0' + value : value;
        };

        if (format) {
            return convertToJalali(date, format);
        } else {
            return convertToJalali(date, DateUtils.Formats.fullDate)
        }
    }
}
