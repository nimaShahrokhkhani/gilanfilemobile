import React, {Component} from 'react';
import _ from "underscore";
import {toGregorian, toJalaali} from "../date/jalali-js";
const FRACTION_DIGIT = 2;
const SECURE_CHARS = [
    {
        key: '&amp;',
        value: '&amp;'
    },
    {
        key: '%',
        value: '%'
    },
    {
        key: '|',
        value: '|'
    },
    {
        key: '$',
        value: '$'
    },
    {
        key: '#',
        value: '#'
    },
    {
        key: '(',
        value: '('
    },
    {
        key: ')',
        value: ')'
    },
    {
        key: "\\'",
        value: "\\'"
    },
    {
        key: '`',
        value: '`'
    },
    {
        key: '\\"',
        value: '\\"'
    },
    {
        key: '&gt;',
        value: '&gt;'
    },
    {
        key: '&lt;',
        value: '&lt;'
    },
    {
        key: 'null',
        value: 'null'
    },
    {
        key: '../',
        value: '../'
    },
    {
        key: '..\\',
        value: '..\\'
    },
    {
        key: '\\\\',
        value: '\\\\'
    },
    {
        key: '/*',
        value: '/*'
    },
    {
        key: '*/',
        value: '*/'
    },
    {
        key: ';',
        value: ';'
    },
    {
        key: '&',
        value: '&'
    },
    {
        key: '@',
        value: '@'
    },
    {
        key: "'",
        value: "'"
    },
    {
        key: '<',
        value: '<'
    },
    {
        key: '>',
        value: '>'
    },
    {
        key: '+',
        value: '+'
    },
    {
        key: ',',
        value: ','
    },
    {
        key: '\\',
        value: '\\'
    },
    {
        key: ':',
        value: ':'
    },
    {
        key: '!',
        value: '!'
    },
    {
        key: '\r',
        value: 'Enter'
    },
    {
        key: '\n',
        value: 'Enter'
    }
];
export default class StringUtils extends Component {

    static getZeroLeadingValue(value) {
        return parseInt(value, 10) < 10 ? '0' + value : value;
    };

    static convertNumbersToPersian(inputString) {
        return inputString
            .replace(/0/g, '??')
            .replace(/??/g, '??')
            .replace(/1/g, '??')
            .replace(/??/g, '??')
            .replace(/2/g, '??')
            .replace(/??/g, '??')
            .replace(/3/g, '??')
            .replace(/??/g, '??')
            .replace(/4/g, '??')
            .replace(/??/g, '??')
            .replace(/5/g, '??')
            .replace(/??/g, '??')
            .replace(/6/g, '??')
            .replace(/??/g, '??')
            .replace(/7/g, '??')
            .replace(/??/g, '??')
            .replace(/8/g, '??')
            .replace(/??/g, '??')
            .replace(/9/g, '??')
            .replace(/??/g, '??');

    }

    static convertNumbersToEnglish(inputString) {
        return inputString
            .replace(/??/g, '0')
            .replace(/??/g, '0')
            .replace(/??/g, '1')
            .replace(/??/g, '1')
            .replace(/??/g, '2')
            .replace(/??/g, '2')
            .replace(/??/g, '3')
            .replace(/??/g, '3')
            .replace(/??/g, '4')
            .replace(/??/g, '4')
            .replace(/??/g, '5')
            .replace(/??/g, '5')
            .replace(/??/g, '6')
            .replace(/??/g, '6')
            .replace(/??/g, '7')
            .replace(/??/g, '7')
            .replace(/??/g, '8')
            .replace(/??/g, '8')
            .replace(/??/g, '9')
            .replace(/??/g, '9');
    }

    static convertShamsiToMillisecond(shamsiDate) {
        if (!_.isEmpty(shamsiDate)) {
            let jToG = toGregorian(parseInt(StringUtils.convertNumbersToEnglish(shamsiDate.split('/')[0])),
                parseInt(StringUtils.convertNumbersToEnglish(shamsiDate.split('/')[1])),
                parseInt(StringUtils.convertNumbersToEnglish(shamsiDate.split('/')[2])));
            let date = new Date(jToG.gy, jToG.gm, jToG.gd);
            return date.getTime();
        } else {
            return undefined;
        }
    }

    static convertMillisecondToShamsi(millisecond) {
        if (millisecond !== undefined && millisecond !== null) {
            let date = new Date(millisecond);
            let jalaliDate = toJalaali(date.getFullYear(), date.getMonth(), date.getDate());
            return StringUtils.convertNumbersToPersian(jalaliDate.jy.toString()) + '/' + StringUtils.convertNumbersToPersian(jalaliDate.jm.toString()) + '/' + StringUtils.convertNumbersToPersian(jalaliDate.jd.toString());
        } else {
            return '';
        }
    }

    static separateNumberWithCommas(number) {
        return (number + '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static commify(value){
        if (!_.isEmpty(value)) {
            value = value.replace(/,/g, '');
            var chars = value.split("").reverse();
            var withCommas = [];
            for(var i = 1; i <= chars.length; i++ ){
                withCommas.push(chars[i-1]);
                if(i%3 === 0 && i !== chars.length ){
                    withCommas.push(",")
                }
            }
            return withCommas.reverse().join("");
        } else {
            return '';
        }
    }

    static convertNumbersToEnglish(inputString) {
        return inputString
            .replace(/??/g, '0')
            .replace(/??/g, '0')
            .replace(/??/g, '1')
            .replace(/??/g, '1')
            .replace(/??/g, '2')
            .replace(/??/g, '2')
            .replace(/??/g, '3')
            .replace(/??/g, '3')
            .replace(/??/g, '4')
            .replace(/??/g, '4')
            .replace(/??/g, '5')
            .replace(/??/g, '5')
            .replace(/??/g, '6')
            .replace(/??/g, '6')
            .replace(/??/g, '7')
            .replace(/??/g, '7')
            .replace(/??/g, '8')
            .replace(/??/g, '8')
            .replace(/??/g, '9')
            .replace(/??/g, '9');
    }

    static checkSecureCharacters(string) {
        for (let unSecureCharacter of SECURE_CHARS) {
            if (string.includes(unSecureCharacter.key)) {
                return {hasSecureCharacter: true, secureCharacter: unSecureCharacter.value};
            }
        }
        return {hasSecureCharacter: false, secureCharacter: null};
    }

    static valueToAmountCurrency(value, fractionDigit) {
        if (value && ((value.split('.') || []).length - 1) <= 1) {
            let baseFractionDigit = isNaN(fractionDigit) && _.isEmpty(fractionDigit) ? FRACTION_DIGIT : fractionDigit;
            if (value !== '0') {
                let fractionSeparator = baseFractionDigit !== 0 ? '.' : '';
                let pureValue;
                if (value.split('.')[0] === '00') {
                    pureValue = value.replace(/,/g, '').replace('0.', '').replace('.', '');
                } else if (value.split('.')[0][0] === '0') {
                    pureValue = value.replace('0', '').replace(/,/g, '').replace('.', '');
                } else {
                    pureValue = value.replace(/,/g, '').replace('.', '');
                }
                let fractionPart = '0';
                let truePart = '';
                if (pureValue.length > baseFractionDigit) {
                    fractionPart = pureValue.substr(pureValue.length - baseFractionDigit, baseFractionDigit);
                    truePart = pureValue.substr(0, pureValue.length - baseFractionDigit);
                } else if (!_.isEmpty(pureValue)) {
                    fractionPart = parseInt(pureValue).toString();
                    truePart = '0';
                    if (fractionPart.length < baseFractionDigit && fractionPart.length !== 0) {
                        fractionPart = '';
                        for (let i = 0; i < baseFractionDigit - pureValue.length; i++) {
                            fractionPart += '0';
                        }
                        fractionPart += pureValue;
                        truePart = '0';
                    }
                }
                return (StringUtils.separateNumberWithCommas(truePart.replace(/,/g, '')) + fractionSeparator + fractionPart);
            }
        }
        return '';
    }

}
