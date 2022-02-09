import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, SafeAreaView} from 'react-native';
import {Formik} from 'formik';
import {TextInput, Button, Appbar} from 'react-native-paper';
import * as userActions from "../../utils/redux/actions/userLogin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Picker} from '@react-native-picker/picker';
import CustomDatePicker from "../components/CustomDatePicker";
import BaseScreen from "../base/BaseScreen";
import Spinner from "react-native-loading-spinner-overlay";
import BottomSheet from "reanimated-bottom-sheet";
import Services from "../../utils/services/Services";
import StringUtils from "../../utils/string/StringUtils";
import dbHelper from "../../helper/db/dbHelper";
import {FilesSchema} from "../../helper/schema/fileSchema";
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import _ from 'underscore';

class GetFilesScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            renderInnerContent: undefined,
            fromDate: '',
            toDate: ''
        };
    }

    showLoading = () => {
        this.setState({spinner: true})
    };

    hideLoading = () => {
        this.setState({spinner: false})
    };

    onFromDateChangeText = (text) => {
        this.setState({
            fromDate: text
        })
    };

    onToDateChangeText = (text) => {
        this.setState({
            toDate: text
        })
    };

    onModalClose = () => {
        this.sheetRef.snapTo(2)
    };

    onPickerClick = (innerView, snap) => {
        this.setState({
            renderInnerContent: innerView
        });
        this.sheetRef.snapTo(0)
    };

    onGetFiles = () => {
        this.showLoading();
        let requestObject = {
            agencyCode: this.props.user[0].agencyCode,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
        };
        Services.getFileFromFilling(requestObject).then(async (response) => {
            let requestArray = response.data;
            if (requestArray.length !== 0) {
                for (var i in requestArray) {
                    let result;
                    if (requestArray[i].isDeleted) {
                        let dataArray = [];
                        dataArray.push(requestArray[i].Id);
                        await dbHelper.delete(FilesSchema, 'files', requestArray[i]);
                    } else {
                        if (!_.isEmpty(requestArray[i])) {
                            let searchedFiles = await dbHelper.find(FilesSchema, 'files', 'Id == "' + requestArray[i].Id + '"');
                            if (_.isEmpty(searchedFiles)) {
                                requestArray[i].date = requestArray[i].date ? requestArray[i].date.toString() : '';
                                requestArray[i].home = requestArray[i].home ? requestArray[i].home.toString() : '';
                                requestArray[i].store = requestArray[i].store ? requestArray[i].store.toString() : '';
                                requestArray[i].north = requestArray[i].north ? requestArray[i].north.toString() : '';
                                requestArray[i].south = requestArray[i].south ? requestArray[i].south.toString() : '';
                                requestArray[i].east = requestArray[i].east ? requestArray[i].east.toString() : '';
                                requestArray[i].west = requestArray[i].west ? requestArray[i].west.toString() : '';
                                requestArray[i].unitBalcony = requestArray[i].unitBalcony ? requestArray[i].unitBalcony.toString() : '';
                                requestArray[i].unitMetri = requestArray[i].unitMetri ? requestArray[i].unitMetri.toString() : '';
                                requestArray[i].unitOpen = requestArray[i].unitOpen ? requestArray[i].unitOpen.toString() : '';
                                requestArray[i].floorNo = requestArray[i].floorNo ? requestArray[i].floorNo.toString() : '';
                                requestArray[i].unitNo = requestArray[i].unitNo ? requestArray[i].unitNo.toString() : '';
                                requestArray[i].residential = requestArray[i].residential ? requestArray[i].residential.toString() : '';
                                requestArray[i].age = requestArray[i].age ? requestArray[i].age.toString() : '';
                                requestArray[i].inHurry = requestArray[i].inHurry ? requestArray[i].inHurry.toString() : '';
                                requestArray[i].equipments = requestArray[i].equipments ? requestArray[i].equipments.toString() : '';
                                requestArray[i].unitTotalAmount = requestArray[i].unitTotalAmount ? requestArray[i].unitTotalAmount.toString() : '';
                                requestArray[i].totalPrice = requestArray[i].totalPrice ? requestArray[i].totalPrice.toString() : '';
                                requestArray[i].unitPrice = requestArray[i].unitPrice ? requestArray[i].unitPrice.toString() : '';
                                requestArray[i].mortgage = requestArray[i].mortgage ? requestArray[i].mortgage.toString() : '';
                                requestArray[i].rent = requestArray[i].rent ? requestArray[i].rent.toString() : '';
                                requestArray[i].area = requestArray[i].area ? requestArray[i].area.toString() : '';
                                requestArray[i].height = requestArray[i].height ? requestArray[i].height.toString() : '';
                                requestArray[i].density = requestArray[i].density ? requestArray[i].density.toString() : '';
                                requestArray[i].front = requestArray[i].front ? requestArray[i].front.toString() : '';
                                requestArray[i].isDeleted = requestArray[i].isDeleted ? requestArray[i].isDeleted.toString() : '';
                                requestArray[i].isSold = requestArray[i].isSold ? requestArray[i].isSold.toString() : '';
                                requestArray[i].isRented = requestArray[i].isRented ? requestArray[i].isRented.toString() : '';
                                requestArray[i].isDontCall = requestArray[i].isDontCall ? requestArray[i].isDontCall.toString() : '';
                                await dbHelper.insert(FilesSchema, 'files', requestArray[i]);
                            }
                        }
                    }
                    if (parseInt(i) === (requestArray.length - 1)) {
                        this.hideLoading();
                        showMessage({
                            message: 'موفق',
                            description: 'فایل با موفقیت ثبت شد.',
                            type: "success",
                            style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                            titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                            textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                            icon: {icon: "success", position: "right"}
                        });
                    }
                }
            } else {
                this.hideLoading();
                showMessage({
                    message: 'خطا',
                    description: 'خطا در دریافت فایل.',
                    type: "danger",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
            }

        }).catch((error) => {
            console.log('errorrrrrr=>', error)
            this.hideLoading();
            showMessage({
                message: 'خطا',
                description: 'خطا در دریافت فایل.',
                type: "danger",
                style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                icon: {icon: "success", position: "right"}
            });
        })
    }

    render() {
        return (
            <BaseScreen navigation={this.props.navigation} title={'دریافت فایل'}>
                <ImageBackground source={require('../images/getFilesBg.jpeg')} style={styles.backgroundImage}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={"لطفا منتظر بمانید..."}
                        textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                        overlayColor={'#000000dd'}
                    />
                    <ScrollView style={styles.container}>
                        <Image
                            style={{width: 200, height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 50}}
                            source={require('../images/gilan-file-logo.png')}/>
                        <View style={{marginTop: 50}}>
                            <CustomDatePicker
                                placeholder="از تاریخ"
                                currentDate={new Date()}
                                onChangeText={this.onFromDateChangeText}
                                value={this.state.fromDate}
                                underlineColor='transparent'
                                onDatePickerClick={this.onPickerClick}
                                onModalClose={this.onModalClose}
                            />
                            <CustomDatePicker
                                placeholder="تا تاریخ"
                                currentDate={new Date()}
                                onChangeText={this.onToDateChangeText}
                                value={this.state.toDate}
                                underlineColor='transparent'
                                onDatePickerClick={this.onPickerClick}
                                onModalClose={this.onModalClose}
                            />
                            <Button style={{flex: 0, marginHorizontal: 10, borderRadius: 20, marginTop: 50}}
                                    labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                    mode="contained"
                                    onPress={this.onGetFiles}>
                                دریافت فایل
                            </Button>
                        </View>
                    </ScrollView>
                    <BottomSheet
                        ref={(ref) => {
                            this.sheetRef = ref
                        }}
                        snapPoints={[400, 300, 0]}
                        borderRadius={10}
                        initialSnap={2}
                        renderContent={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 16,
                                        height: 600,
                                    }}
                                >
                                    {this.state.renderInnerContent && this.state.renderInnerContent()}
                                </View>
                            )
                        }}
                    />
                </ImageBackground>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    container: {
        width: '100%'
    },
    rowContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 10
    },
    menuItemContainer: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginTop: 10
    },
    input: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        fontSize: 13,
        direction: 'rtl',
        textAlign: 'right',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        margin: 10,
        height: 55
    },
});

const mapStateToProps = state => ({
    user: state.user.user,
});

const ActionCreators = Object.assign(
    {},
    userActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetFilesScreen)
