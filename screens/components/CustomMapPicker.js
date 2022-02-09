import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android'
import {TextInput} from 'react-native-paper';
import {Button} from "react-native-paper";
import DateUtils from '../../utils/date/DateUtils'
import _ from "underscore";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapboxGL from "@react-native-mapbox-gl/maps";
import CustomMapModal from "./CustomMapModal";
import {CustomTextInput} from "./CustomTextInput";


export default class CustomMapPicker extends Component {

    static propTypes = {
        dataArray: PropTypes.arrayOf(PropTypes.string),
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

        this.state = {
            value: '',
            isModalVisible: false,
            isError: false,
            errorMessage: '',
            markerCoordinate: []
        };

        this.defaultValue = this.props.defaultValue;
    }

    confirmSinglePickerModal = () => {
        let {onChangeText} = this.props;
        this.props.onModalClose && this.props.onModalClose();
    };

    onPickerPress = () => {
        let me = this;
        let {onSinglePickerClick} = me.props;
        onSinglePickerClick(this.renderSinglePickerInnerView)
        // launchImageLibrary(undefined, () => {alert(1)});
    };

    renderSinglePickerOutput() {
        return this.renderValue();
    }

    onCoordinateChange = (marker) => {
        this.props.onCoordinateChange(marker)
        this.setState({markerCoordinate: marker})
    };

    renderSinglePickerInnerView = () => {
        return (
            <CustomMapModal
                onCoordinateChange={this.onCoordinateChange}
                onMapClose={() => {
                    this.props.onModalClose && this.props.onModalClose();
                }}/>
        );
    };

    renderValue() {
        let {required, label} = this.props;
        return (
            <TouchableOpacity onPress={this.onPickerPress}>
                <View pointerEvents="none">
                    <CustomTextInput
                        placeholder={label ? label : ''}
                        editable={false}
                        value={this.state.markerCoordinate && this.state.markerCoordinate.toString()}
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
                {this.renderSinglePickerOutput()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center'
    },

    dataContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        borderColor: '#13213c',
        borderWidth: 0.5,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#eff9f9',
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
        marginBottom: 0,
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
        flex: 0,
        marginBottom: 30,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
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
    },

    labelTitle: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        fontSize: 18,
        color: '#13213c',
        alignSelf: 'center',
        marginVertical: 10
    },

    dataText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        fontSize: 15
    },

    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },

    mapContainer: {
        height: '100%',
        width: '100%',
    },

    map: {
        flex: 1
    }
});
