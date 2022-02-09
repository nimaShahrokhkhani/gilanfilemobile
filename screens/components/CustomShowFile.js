import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView,
    ImageBackground,
    KeyboardAvoidingView, Image, ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android'
import {TextInput} from 'react-native-paper';
import {Button} from "react-native-paper";
import DateUtils from '../../utils/date/DateUtils'
import _ from "underscore";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapboxGL from "@react-native-mapbox-gl/maps";
import CustomMapModal from "./CustomMapModal";
import Spinner from "react-native-loading-spinner-overlay";
import StringUtils from "../../utils/string/StringUtils";

export default class CustomShowFile extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {file} = this.props;
        return (
            <View>
                <StatusBar backgroundColor="transparent" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView>
                    <View style={styles.backgroundImage}>
                        <View style={{
                            width: 150,
                            height: 10,
                            backgroundColor: '#000',
                            borderRadius: 5,
                            marginBottom: 25
                        }}/>
                        {file &&
                        <View style={styles.container}>

                            <View>
                                <View style={styles.fileItemContainer}>
                                    <View style={styles.imageContainer}>
                                        <TouchableOpacity onPress={() => this.props.editFile(file)}>
                                            <Image
                                                style={{width: 30, height: 30, resizeMode: 'contain', marginBottom: 20}}
                                                source={require('../images/edit.png')}/>
                                        </TouchableOpacity>
                                        {!_.isEmpty(file.imageUrl) ?
                                            <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                                                   source={{uri: JSON.parse(file.imageUrl).assets[0].uri}}/> :

                                            <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                                                   source={require('../images/home-icon.png')}/>
                                        }
                                    </View>
                                    <View style={styles.fileInfoContainer}>
                                        <View style={styles.ownerContainer}>
                                            <Text style={styles.ownerText}>
                                                {file.owner}
                                            </Text>
                                        </View>
                                        <View style={styles.extraInfoContainer}>
                                            <Text style={styles.regionCodeText}>
                                                {file.regionCode}
                                            </Text>
                                            <Text style={styles.regionNameText}>
                                                {file.regionName}
                                            </Text>
                                        </View>
                                        <View style={styles.extraInfoContainer}>
                                            <Text style={styles.typeText}>
                                                {file.type}
                                            </Text>
                                            <Text style={styles.saleText}>
                                                {file.sale}
                                            </Text>
                                            <View style={styles.floorContainer}>
                                                <Text style={styles.floorTextTitle}>
                                                    طبقه:
                                                </Text>
                                                <Text style={styles.floorTextValue}>
                                                    {!_.isEmpty(file.unitFloor) ? StringUtils.convertNumbersToPersian(file.unitFloor) : '0'}
                                                </Text>
                                            </View>
                                            <View style={styles.floorContainer}>
                                                <Text style={styles.floorTextTitle}>
                                                    مساحت:
                                                </Text>
                                                <Text style={styles.floorTextValue}>
                                                    {!_.isEmpty(file.area) ? StringUtils.convertNumbersToPersian(file.area) : '0'}
                                                </Text>
                                            </View>
                                        </View>
                                        {(file.sale === 'فروش' || file.sale === 'معاوضه' || file.sale === 'مشارکت') ?
                                            <View>
                                                <View style={styles.extraInfoContainer}>
                                                    <View style={styles.floorContainer}>
                                                        <Text style={styles.floorTextTitle}>
                                                            قیمت کل:
                                                        </Text>
                                                        <Text style={styles.floorTextValue}>
                                                            {!_.isEmpty(file.totalPrice) ? StringUtils.convertNumbersToPersian(StringUtils.commify(file.totalPrice)) : '0'}
                                                        </Text>
                                                        <Text style={styles.textCurrency}>
                                                            تومان
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.extraInfoContainer}>
                                                    <View style={styles.floorContainer}>
                                                        <Text style={styles.floorTextTitle}>
                                                            قیمت متری:
                                                        </Text>
                                                        <Text style={styles.floorTextValue}>
                                                            {!_.isEmpty(file.unitPrice) ? StringUtils.convertNumbersToPersian(StringUtils.commify(file.unitPrice)) : '0'}
                                                        </Text>
                                                        <Text style={styles.textCurrency}>
                                                            تومان
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            :
                                            <View>
                                                <View style={styles.extraInfoContainer}>
                                                    <View style={styles.floorContainer}>
                                                        <Text style={styles.floorTextTitle}>
                                                            رهن:
                                                        </Text>
                                                        <Text style={styles.floorTextValue}>
                                                            {!_.isEmpty(file.mortgage) ? StringUtils.convertNumbersToPersian(StringUtils.commify(file.mortgage)) : '0'}
                                                        </Text>
                                                        <Text style={styles.textCurrency}>
                                                            تومان
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.extraInfoContainer}>
                                                    <View style={styles.floorContainer}>
                                                        <Text style={styles.floorTextTitle}>
                                                            اجاره:
                                                        </Text>
                                                        <Text style={styles.floorTextValue}>
                                                            {!_.isEmpty(file.rent) ? StringUtils.convertNumbersToPersian(StringUtils.commify(file.rent)) : '0'}
                                                        </Text>
                                                        <Text style={styles.textCurrency}>
                                                            تومان
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        }
                                        <View style={styles.floorContainer}>
                                            <Text style={styles.address} numberOfLines={1}>
                                                {file.address}
                                            </Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            تاریخ:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.date && StringUtils.convertMillisecondToShamsi(parseInt(file.date))}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            تلفن:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.tel1}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            سن بنا:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.age}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            جهت ملک:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.direction}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            نوع سند:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.documentKind}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            پارکینگ:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.unitParking}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            انباری:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.unitAnbari}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            استخر:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.pool}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            جکوزی:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.jakozi}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View style={styles.infoTitleContainer}>
                                        <Text style={styles.infoTitle}>
                                            سونا:
                                        </Text>
                                    </View>
                                    <View style={styles.infoValueContainer}>
                                        <Text style={styles.infoValue}>
                                            {file.sona}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{width: '100%', height: 250, marginTop: 20}}>
                                    <MapboxGL.MapView
                                        style={{width: '100%', height: 250}}
                                        onLongPress={this.onLongPress}>
                                        <MapboxGL.Camera
                                            centerCoordinate={[49.589674, 37.295316]}
                                            zoomLevel={12}
                                            defaultSettings={{
                                                centerCoordinate: [49.589674, 37.295316],
                                                zoomLevel: 20,
                                            }}
                                        />
                                        {file.marker ?
                                            <MapboxGL.PointAnnotation id={'1'}
                                                                      coordinate={[parseFloat(file.marker.split(',')[0]), parseFloat(file.marker.split(',')[1])]}/> :
                                            <MapboxGL.PointAnnotation id={'1'}
                                                                      coordinate={[49.589674, 37.295316]}/>
                                        }
                                    </MapboxGL.MapView>
                                </View>
                            </View>

                        </View>
                        }
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomView}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    childrenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#13213c'
    },
    bottomView: {
        flex: 0
    },
    topView: {
        backgroundColor: '#13213c',
        flex: 0
    },
    icon: {
        tintColor: '#fff',
        width: 20,
        height: 20
    },
    iconSecondary: {
        tintColor: '#fff',
        width: 20,
        height: 20
    },
    topBarStart: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    topBarEnd: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    localizationContainer: {
        marginHorizontal: 10,
    },
    shoppingCartContainer: {
        marginHorizontal: 10,
    },
    searchContainer: {
        marginHorizontal: 10,
    },
    closeContainer: {
        marginHorizontal: 15,
    },
    screenTitle: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        color: '#fff',
        fontSize: 18,
        marginEnd: 5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    input: {
        width: 250,
        height: 50,
        fontFamily: 'IRANSansMobileFaNum-Light',
        textAlign: 'right',
        marginHorizontal: 10
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 25
    },
    checkbox: {
        alignSelf: "center",
        width: 20,
        height: 20,
        marginHorizontal: 10
    },
    label: {
        fontFamily: 'IRANSansMobileFaNum-Light'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    fileItemContainer: {
        height: 200,
        // flex: 1,
        flexDirection: 'row-reverse',
        marginBottom: 20
        // backgroundColor: '#f0f',
    },
    fileListContainer: {
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    fileInfoContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    ownerContainer: {
        alignItems: 'flex-end'
    },
    floorContainer: {
        flexDirection: 'row-reverse'
    },
    ownerText: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        marginVertical: 5
    },
    saleText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#b00000'
    },
    typeText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#b00000'
    },
    floorTextTitle: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginRight: 5,
        color: '#b00000'
    },
    floorTextValue: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        color: '#b00000'
    },
    textCurrency: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginLeft: 5,
        color: '#b00000'
    },
    regionCodeText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#00004e'
    },
    regionNameText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#00004e'
    },
    address: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#00001c',
        overflow: 'hidden'
    },
    extraInfoContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row-reverse'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#13213c',
        paddingHorizontal: 10
        // padding: 100
    },
    innerModal: {
        flex: 1,
        width: '100%',
        marginTop: 50,
        marginHorizontal: 20,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        // padding: 100
    },
    modalTitle: {
        color: '#f0f0f0',
        fontFamily: 'IRANSansMobileFaNum-Bold',
        fontSize: 18,
        paddingTop: 25
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    infoContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    infoTitle: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
    },
    infoValue: {
        fontFamily: 'IRANSansMobileFaNum-Light',
    },
    infoTitleContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    infoValueContainer: {
        flex: 1,
        alignItems: 'flex-start'
    }
});
