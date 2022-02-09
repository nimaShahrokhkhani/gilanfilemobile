import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android'
import {TextInput} from 'react-native-paper';
import {Button} from "react-native-paper";
import DateUtils from '../../utils/date/DateUtils'
import _ from "underscore";
import {
    toGregorian,
    toJalaali,
    isLeapJalaaliYear
} from '../../utils/date/jalali-js';
import StringUtils from "../../utils/string/StringUtils";
import {CustomTextInput} from "./CustomTextInput";

export default class CustomDatePicker extends Component {

    static propTypes = {
        calendarType: PropTypes.oneOf(['gregorian', 'jalali']),
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        required: PropTypes.bool,
        id: PropTypes.string,
        fromYear: PropTypes.string,
        yearsCount: PropTypes.number,
        onChangeText: PropTypes.func,
        placeholder: PropTypes.string,
        currentDate: PropTypes.date
    };

    constructor(props) {
        super(props);

        this.wheelPickerYear = [];
        this.wheelPickerMonth = [];
        let calendarType = this.props.calendarType ?
            this.props.calendarType :
            'jalali';

        this.state = {
            wheelPickerDay: [],
            isModalVisible: false,
            calendarValue: this.props.value ? StringUtils.convertMillisecondToShamsi(this.props.value) : '',
            yearValue: 0,
            monthValue: 0,
            dayValue: 0,
            isError: false,
            errorMessage: ''
        };

        this.initDefaultCalendar();
        this.selectedDate = {
            year: this.wheelPickerYear[0],
            month: this.wheelPickerMonth[0],
            day: this.state.wheelPickerDay[0]
        };

        this.isReadOnly = this.props.type === 'CONSTANT';
        this.defaultValue = this.props.defaultValue;
        // this.width = Dimensions.get('window');
    }

    updateModalInnerView = () => {
        this._modalRef && this._modalRef.updateInnerView()
    };

    getValue() {
        let year = parseInt(this.state.calendarValue.split('/')[2]);
        let month = parseInt(this.wheelPickerMonth.indexOf(this.state.calendarValue.split('/')[1]));
        let day = parseInt(this.state.calendarValue.split('/')[0]);
        let date;
        if (this.state.calendarValue !== '') {
            let calendarType = this.props.calendarType ?
                this.props.calendarType :
                'jalali';
            if (calendarType === 'gregorian') {
                date = DateUtils.toGregorianDate(new Date(year, month, day, 12), 'YYYY-MM-DD');
            } else {
                let gregorianDate = toGregorian(year, month + 1, day);
                date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd, 12);
            }
        }
        return date.getTime().toString();
    }

    getType() {
        return 'input';
    }

    setError(isError, errorMessage) {
        this.setState({
            isError,
            errorMessage
        });
    }

    getError() {
        return this.state.isError;
    }

    getErrorMessage() {
        return this.state.errorMessage;
    }

    initDefaultCalendar() {
        this.initDefaultYears();
        this.initDefaultMonths();
        this.initDefaultDays();
    }

    initDefaultYears() {
        let {fromYear, yearsCount, calendarType} = this.props;
        let calendarTypeValue = calendarType ? calendarType : 'jalali';
        let toYear;
        if (fromYear === undefined || _.isEmpty(fromYear.toString())) {
            fromYear = new Date().getFullYear();
            toYear = fromYear + ((yearsCount === undefined || _.isEmpty(yearsCount.toString())) ? 10 : yearsCount);
        } else {
            toYear = parseInt(new Date().getFullYear()) + ((yearsCount === undefined || _.isEmpty(yearsCount.toString())) ? 10 : yearsCount);
        }
        if (calendarTypeValue !== 'gregorian') {
            fromYear = toJalaali(new Date(fromYear.toString(), '01', '01')).jy;
            toYear = toJalaali(new Date()).jy + ((yearsCount === undefined || _.isEmpty(yearsCount.toString())) ? 10 : yearsCount);
        }
        for (let i = fromYear; i <= toYear; i++) {
            this.wheelPickerYear.push(i.toString());
        }
    }

    initDefaultMonths() {
        let {calendarType} = this.props;
        this.wheelPickerMonth = [
            'فروردین',
            'اردیبهشت',
            'خرداد',
            'تیر',
            'مرداد',
            'شهریور',
            'مهر',
            'آبان',
            'آذر',
            'دی',
            'بهمن',
            'اسفند'
        ];
    }

    initDefaultDays() {
        for (let i = 1; i <= 31; i++) {
            this.state.wheelPickerDay.push(i.toString());
        }
    }

    onMonthSelected = selectedMonth => {
        this.reloadDays(selectedMonth);
        this.selectedDate.month = this.wheelPickerMonth[selectedMonth];
        this.setState({
            monthValue: selectedMonth
        }, this.updateModalInnerView);
    };

    reloadDays = (selectedMonth) => {
        let {calendarType} = this.props;
        (calendarType ? calendarType : 'jalali') === 'jalali' ?
            this.loadJalaliDays(selectedMonth) :
            this.loadGregorianDays(selectedMonth);
    };

    loadJalaliDays(selectedMonth) {
        let midMonthDays = [];
        if (selectedMonth <= 5/*zero base*/) {
            for (let i = 1; i <= 31; i++) {
                midMonthDays.push(i.toString());
            }
            this.setState({
                wheelPickerDay: midMonthDays
            }, this.updateModalInnerView)
        } else {
            let endDayOfMonth = 30;
            if (selectedMonth === 11) {
                endDayOfMonth = isLeapJalaaliYear(this.selectedDate.year) ? 30 : 29;
            }
            for (let i = 1; i <= endDayOfMonth; i++) {
                midMonthDays.push(i.toString());
            }
            this.setState({
                wheelPickerDay: midMonthDays
            }, this.updateModalInnerView)
        }
    }

    loadGregorianDays(selectedItem) {
        let midMonthDays = [];
        let longMonths = [0, 2, 4, 6, 7, 9, 11];
        let shortMonths = [3, 5, 8, 10];
        if (longMonths.includes(selectedItem)) {
            for (let i = 1; i <= 31; i++) {
                midMonthDays.push(i.toString());
            }
            this.setState({
                wheelPickerDay: midMonthDays
            })
        } else if (shortMonths.includes(selectedItem)) {
            for (let i = 1; i <= 30; i++) {
                midMonthDays.push(i.toString());
            }
            this.setState({
                wheelPickerDay: midMonthDays
            })
        } else if (selectedItem === 1) {
            for (let i = 1; i <= 28; i++) {
                midMonthDays.push(i.toString());
            }
            this.setState({
                wheelPickerDay: midMonthDays
            })
        }
    }

    onYearSelected = selectedItem => {
        this.selectedDate.year = this.wheelPickerYear[selectedItem];
        this.setState({
            yearValue: selectedItem
        }, () => {
            this.reloadDays(this.state.monthValue);
            this.updateModalInnerView();
        });
    };

    onDaySelected = selectedItem => {
        this.selectedDate.day = this.state.wheelPickerDay[selectedItem];
        this.setState({
            dayValue: selectedItem
        }, this.updateModalInnerView);
    };

    onCalendarClick = () => {
        let me = this;
        let year = '';
        let month = '';
        let day = '';
        if (_.isEmpty(this.state.calendarValue)) {
            let currentDate = this.props.currentDate ? new Date(this.props.currentDate) : new Date();
            let calendarType = this.props.calendarType ?
                this.props.calendarType :
                'jalali';
            if (calendarType === 'gregorian') {
                year = currentDate.getFullYear().toString();
                month = this.wheelPickerMonth[currentDate.getMonth()];
                day = currentDate.getDate().toString();
            } else {
                year = toJalaali(currentDate).jy.toString();
                month = this.wheelPickerMonth[toJalaali(currentDate).jm - 1];
                day = toJalaali(currentDate).jd.toString();
            }
        } else {
            year = this.state.calendarValue.split('/')[2];
            month = this.state.calendarValue.split('/')[1];
            day = this.state.calendarValue.split('/')[0];
        }
        this.setState({
            yearValue: this.wheelPickerYear.indexOf(year),
            monthValue: this.wheelPickerMonth.indexOf(month),
            dayValue: this.state.wheelPickerDay.indexOf(day)
        }, () => {
            this.selectedDate.year = this.wheelPickerYear[this.state.yearValue];
            this.selectedDate.month = this.wheelPickerMonth[this.state.monthValue];
            this.selectedDate.day = this.state.wheelPickerDay[this.state.dayValue];
            this.reloadDays(this.state.monthValue);
            // this.showModal({
            //     innerView: Platform.OS === 'ios' ? this.renderCalendarIos : this.renderCalendarAndroid,
            //     bottomSheet: true,
            //     headerColor: '#fff',
            //     innerViewPadding: 0,
            //     closeOnBackdropClick: false,
            //     draggable: false,
            //     onClose: () => {
            //         me.onModalHide();
            //     },
            //     buttons: this.renderButtons
            // })
            me.props.onDatePickerClick(Platform.OS === 'ios' ? this.renderCalendarIos : this.renderCalendarAndroid, 0)
        })
    };

    onModalHide = () => {
        this.setState({
            yearValue: 0,
            monthValue: 0,
            dayValue: 0
        }, () => {
            this._modalRef && this._modalRef.close();
        })
    };

    confirmCalendarModal = () => {
        let {onChangeText} = this.props;
        this.props.onModalClose && this.props.onModalClose();
        this.setState({
            yearValue: this.wheelPickerYear.indexOf(this.selectedDate.year),
            monthValue: this.wheelPickerMonth.indexOf(this.selectedDate.month),
            dayValue: this.state.wheelPickerDay.indexOf(this.selectedDate.day),
            calendarValue: this.selectedDate.day + '/' + this.selectedDate.month + '/' + this.selectedDate.year,
            isError: false,
            errorMessage: ''
        }, () => {
            onChangeText && onChangeText(this.getValue())
        });
    };

    renderCalendarIos = (modalRef) => {
        this._modalRef = modalRef;

        let fontFamily = 'IRANSansMobileFaNum-Light';
        return (
            <View>
                <View style={styles.modalContainerIos}>
                    <WheelPicker
                        style={{width: '33%'}}
                        data={this.state.wheelPickerDay}
                        itemTextFontFamily={fontFamily}
                        selectedItemTextFontFamily={fontFamily}
                        onItemSelected={this.onDaySelected}
                        selectedItem={this.state.dayValue}/>
                    <WheelPicker
                        style={{width: '33%'}}
                        data={this.wheelPickerMonth}
                        itemTextFontFamily={fontFamily}
                        selectedItemTextFontFamily={fontFamily}
                        onItemSelected={this.onMonthSelected}
                        selectedItem={this.state.monthValue}/>
                    <WheelPicker
                        style={{width: '33%'}}
                        data={this.wheelPickerYear}
                        itemTextFontFamily={fontFamily}
                        selectedItemTextFontFamily={fontFamily}
                        onItemSelected={this.onYearSelected}
                        selectedItem={this.state.yearValue}/>
                </View>
                {this.renderButtons()}
            </View>
        );
    };

    renderCalendarAndroid = (modalRef) => {
        this._modalRef = modalRef;

        let fontFamily = 'IRANSansMobileFaNum-Light';
        return (
            <View>
                <View style={styles.modalContainerAndroid}>
                    <View style={styles.startPlace}>
                        <WheelPicker
                            style={{width: '100%', height: 150}}
                            data={this.state.wheelPickerDay}
                            itemTextFontFamily={fontFamily}
                            selectedItemTextFontFamily={fontFamily}
                            onItemSelected={this.onDaySelected}
                            selectedItem={this.state.dayValue}/>
                    </View>
                    <View style={{width: '33.4%', alignItems: 'center'}}>
                        <WheelPicker
                            style={{width: '100%', height: 150}}
                            data={this.wheelPickerMonth}
                            itemTextFontFamily={fontFamily}
                            selectedItemTextFontFamily={fontFamily}
                            onItemSelected={this.onMonthSelected}
                            selectedItem={this.state.monthValue}/>
                    </View>
                    <View style={styles.endPlace}>
                        <WheelPicker
                            style={{width: '100%', height: 150}}
                            data={this.wheelPickerYear}
                            itemTextFontFamily={fontFamily}
                            selectedItemTextFontFamily={fontFamily}
                            onItemSelected={this.onYearSelected}
                            selectedItem={this.state.yearValue}/>
                    </View>
                </View>
                {this.renderButtons()}
            </View>
        );
    };

    renderCalendarOutput() {
        return this.renderValue();
    }

    clear = () => {
        this.setState({
            calendarValue: ''
        })
    };

    renderValue() {
        let {required, placeholder} = this.props;
        return (
            <TouchableOpacity onPress={this.onCalendarClick}>
                <View pointerEvents="none">
                    <CustomTextInput
                        placeholder={placeholder ? placeholder : 'تاریخ'}
                        editable={false}
                        value={this.state.calendarValue}
                        backgroundStyles={[{
                            fontFamily: 'IRANSansMobileFaNum-Light',
                            fontSize: 13,
                            direction: 'rtl',
                            textAlign: 'right',
                            backgroundColor: 'transparent',
                            margin: 10,
                            height: 55
                        }]}
                        underlineColor='transparent'
                    />
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCalendarOutput()}
            </View>
        );
    }

    renderButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <Button style={{marginTop: 20, marginHorizontal: 5}}
                        labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                        mode="contained"
                        onPress={this.confirmCalendarModal}>
                    تایید
                </Button>
                <Button style={{marginTop: 20, marginHorizontal: 5}}
                        labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                        mode="contained"
                        onPress={this.props.onModalClose}>
                    لغو
                </Button>
            </View>
        )
    };
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center'
    },

    readOnlyContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#E6E6E6',
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    readOnlyValue: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        marginTop: 5
    },

    dashedLineContainer: {
        height: 1,
        overflow: 'hidden',
        flex: 1
    },

    dashedLine: {
        paddingVertical: 2,
        borderRadius: 5,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#DBDBDB',
        flex: 1,
        marginHorizontal: 5
    },

    modalContainerIos: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: Platform.OS === 'ios' ? 10 : 0
    },

    modalContainerAndroid: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 0
    },

    startPlace: {
        alignItems: 'center',
        width: '33.4%',
        position: 'absolute',
        start: 0,
        zIndex: -1
    },

    endPlace: {
        alignItems: 'center',
        width: '33.4%',
        position: 'absolute',
        end: 0,
        zIndex: -1
    },

    buttonsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },

    btnSize: {
        width: '47%',
        borderRadius: 5
    },

    calendarValue: {
        margin: 4,
        backgroundColor: '#fff',
        color: '#444444',
        fontFamily: 'IRANSansMobileFaNum-Light',
        fontSize: 16,
        height: 45,
        paddingStart: 10,
        paddingEnd: 17,
        // width: Constants.screenWidth - 80
    },

    errorMessage: {
        color: '#F34848',
        fontSize: 10,
        position: 'absolute',
        top: 65,
        end: 35
    }
});
