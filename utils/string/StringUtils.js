import React, {Component} from 'react';
import _ from "underscore";
export default class StringUtils extends Component {

    static getZeroLeadingValue(value) {
        return parseInt(value, 10) < 10 ? '0' + value : value;
    };

}
