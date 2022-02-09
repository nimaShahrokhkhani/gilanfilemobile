import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Text,
    Dimensions,
    FlatList,
    TouchableHighlight,
    Platform, SafeAreaView
} from 'react-native';
import {Formik} from 'formik';
import {TextInput, Button, Appbar} from 'react-native-paper';
import * as userActions from "../../utils/redux/actions/userLogin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Picker} from '@react-native-picker/picker';
import CustomDatePicker from "../components/CustomDatePicker";
import BaseScreen from "../base/BaseScreen";
import BottomSheet from "reanimated-bottom-sheet";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import dbHelper from "../../helper/db/dbHelper";
import {FilesSchema} from "../../helper/schema/fileSchema";
import Services from "../../utils/services/Services";
import CheckBox from '@react-native-community/checkbox';
import CustomSinglePicker from "../components/CustomSinglePicker";
import _ from 'underscore';
import CustomImagePicker from "../components/CustomImagePicker";
import CustomMapPicker from "../components/CustomMapPicker";
import Spinner from "react-native-loading-spinner-overlay";
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import {CustomTextInput} from "../components/CustomTextInput";

class AddFileScreen extends Component {

    constructor(props) {
        super(props);
        this.props.navigation.addListener(
            'focus',
            payload => {
                let {file} = this.props.route.params ? this.props.route.params : {file: {}};
                console.log('fileeeeeeee=>', file)
            }
        );

        this.state = {
            renderInnerContent: undefined,
            renderMapInnerContent: undefined,
            index: 2,
            configList: [],
            regionCode: '',
            regionNameList: [],
            routes: [
                {key: 'third', title: 'امکانات'},
                {key: 'second', title: 'اختیاری'},
                {key: 'first', title: 'ضروری'},
            ],
            marker: undefined,
            imageUrl: undefined,
            spinner: false,
            equipmentList: [],
            fileEdit: {}
        };
        this.tabRef = undefined;
        this.tabRef1 = undefined;
        this.firstValues = undefined;
        this.secondValues = undefined;
        this.equipmentList = [];
        this.stepOneRef = undefined;
    }

    componentDidMount() {
        Services.getConfigList().then(response => {
            let regionCodeList = [];
            for (let i = 0; i < response.data[0].region.length; i++) {
                if (!_.contains(regionCodeList, response.data[0].region[i].regionCode)) {
                    regionCodeList.push(response.data[0].region[i].regionCode)
                }
            }
            this.setState({
                configList: response.data[0],
                regionCodeList: regionCodeList
            })
        }).catch(error => {

        })

        this.props.navigation.addListener(
            'focus',
            payload => {
                let {file} = this.props.route.params ? this.props.route.params : {file: {}};
                this.setState({
                    fileEdit: file
                })
            }
        );
    }

    hideLoading = () => {
        this.setState({spinner: false})
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

    onMapModalClose = () => {
        this.mapSheetRef.snapTo(2)
    };

    onMapPickerClick = (innerView, snap) => {
        this.setState({
            renderMapInnerContent: innerView
        });
        this.mapSheetRef.snapTo(0)
    };

    insertFile = () => {
        this.setState({spinner: true}, () => {
            let fileObject = Object.assign({}, this.firstValues, this.secondValues, {
                equipments: this.equipmentList.toString(),
                marker: this.state.marker ? this.state.marker.toString() : '',
                imageUrl: this.state.imageUrl ? JSON.stringify(this.state.imageUrl) : ''
            });
            dbHelper.insert(FilesSchema, 'files', fileObject).then(() => {
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
                this.props.navigation.navigate('جستجو فایل');
            }).catch((error) => {
                this.hideLoading();
                showMessage({
                    message: 'خطا',
                    description: 'خطا در ثبت فایل.',
                    type: "danger",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
            });
        })
    };

    editFile = () => {
        this.setState({spinner: true}, () => {
            let fileObject = Object.assign({}, this.firstValues, this.secondValues, {
                equipments: this.equipmentList.toString(),
                marker: this.state.marker ? this.state.marker.toString() : '',
                imageUrl: this.state.imageUrl ? JSON.stringify(this.state.imageUrl) : ''
            });
            let filter = '_id == "' + this.state.fileEdit._id + '"';
            dbHelper.update(FilesSchema, 'files', filter, fileObject, () => {
                this.hideLoading();
                showMessage({
                    message: 'موفق',
                    description: 'فایل با موفقیت به روزرسانی شد.',
                    type: "success",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
                this.props.navigation.navigate('جستجو فایل');
            }).then(() => {
                this.hideLoading();
                showMessage({
                    message: 'موفق',
                    description: 'فایل با موفقیت به روزرسانی شد.',
                    type: "success",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
            }).catch((error) => {
                this.hideLoading();
                showMessage({
                    message: 'خطا',
                    description: 'خطا در به روزرسانی فایل.',
                    type: "danger",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
            });
        })
    };

    onCoordinateChange = (marker) => {
        this.setState({marker})
    };

    onFilePicker = (imageUrl) => {
        this.setState({imageUrl})
    };

    setToggleCheckBox = (value, item) => {
        if (value) {
            this.equipmentList.push(item);
            this.state.equipmentList[item] = true;
        } else {
            this.equipmentList = this.equipmentList.filter(data => data !== item)
            this.state.equipmentList[item] = false;
        }
        this.setState({
            equipmentList: this.state.equipmentList
        })
    };

    firstStepValues = (props, values) => {
        this.firstValues = values;
        props.jumpTo('second');
    };

    secondStepValues = (props, values) => {
        this.secondValues = values;
        props.jumpTo('third');
    };

    FirstRoute = (props) => {
        let {fileEdit} = this.state;
        let initialValues = {
            owner: fileEdit.owner,
            tel1: fileEdit.tel1,
            address: fileEdit.address,
            date: fileEdit.date ? parseInt(fileEdit.date) : '',
            sale: fileEdit.sale,
            type: fileEdit.type,
            unitPrice: fileEdit.unitPrice,
            totalPrice: fileEdit.totalPrice,
            rent: fileEdit.rent,
            mortgage: fileEdit.mortgage,
            regionCode: fileEdit.regionCode,
            regionName: fileEdit.regionName,
            unitNo: fileEdit.unitNo,
        };
        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""}
                                      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70} enabled={true}
                                      style={{
                                          height: '100%',
                                          backgroundColor: '#13213c'
                                      }}>
                    <Formik ref={(ref) => {
                        this.tabRef1 = ref
                    }} enableReinitialize initialValues={initialValues} onSubmit={values => this.firstStepValues(props, values)}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View style={{height: '100%', paddingBottom: 60}}>
                                <ScrollView style={styles.scrollContainer}>
                                    <CustomTextInput
                                        placeholder="نام مالک"
                                        onChangeText={handleChange('owner')}
                                        // onBlur={handleBlur('owner')}
                                        value={values.owner}
                                        backgroundStyles={[styles.backgroundInput]}
                                        // underlineColor='transparent'
                                    />
                                    <CustomTextInput
                                        placeholder="تلفن"
                                        onChangeText={handleChange('tel1')}
                                        onBlur={handleBlur('tel1')}
                                        value={values.tel1}
                                        backgroundStyles={[styles.backgroundInput]}
                                        underlineColor='transparent'
                                    />
                                    <CustomTextInput
                                        placeholder="آدرس"
                                        onChangeText={handleChange('address')}
                                        onBlur={handleBlur('address')}
                                        value={values.address}
                                        backgroundStyles={[styles.backgroundInput]}
                                        underlineColor='transparent'
                                    />
                                    <CustomDatePicker
                                        currentDate={new Date()}
                                        value={values.date}
                                        onChangeText={handleChange('date')}
                                        underlineColor='transparent'
                                        onDatePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomSinglePicker
                                        label="نوع فروش"
                                        onChangeText={handleChange('sale')}
                                        onBlur={handleBlur('sale')}
                                        value={values.sale}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={['رهن و اجاره', 'رهن کامل', 'اجاره', 'فروش']}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomSinglePicker
                                        label="نوع ملک"
                                        onChangeText={handleChange('type')}
                                        onBlur={handleBlur('type')}
                                        value={values.type}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={['آپارتمان', 'ویلا', 'مستغلات', 'کلنگی', 'زمین', 'دفتر کار', 'مغازه']}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomTextInput
                                        placeholder="قیمت متری"
                                        onChangeText={handleChange('unitPrice')}
                                        onBlur={handleBlur('unitPrice')}
                                        value={values.unitPrice}
                                        backgroundStyles={[styles.backgroundInput]}
                                        underlineColor='transparent'
                                    />
                                    <CustomTextInput
                                        placeholder="قیمت کل"
                                        onChangeText={handleChange('totalPrice')}
                                        onBlur={handleBlur('totalPrice')}
                                        value={values.totalPrice}
                                        backgroundStyles={[styles.backgroundInput]}
                                        underlineColor='transparent'
                                    />
                                    <CustomTextInput
                                        placeholder="قیمت اجاره"
                                        onChangeText={handleChange('rent')}
                                        onBlur={handleBlur('rent')}
                                        value={values.rent}
                                        backgroundStyles={[styles.backgroundInput]}
                                        underlineColor='transparent'
                                    />
                                    <CustomTextInput
                                        placeholder="قیمت رهن"
                                        onChangeText={handleChange('mortgage')}
                                        onBlur={handleBlur('mortgage')}
                                        value={values.mortgage}
                                        style={styles.input}
                                        underlineColor='transparent'
                                    />
                                    <CustomSinglePicker
                                        label="کد منطقه"
                                        onChangeText={handleChange('regionCode')}
                                        onBlur={handleBlur('regionCode')}
                                        value={values.regionCode}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.regionCodeList}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                        setValue={(data) => {
                                            let regionNameList = [];
                                            for (let i = 0; i < this.state.configList.region.length; i++) {
                                                if (data === this.state.configList.region[i].regionCode) {
                                                    regionNameList.push(this.state.configList.region[i].regionName)
                                                }
                                            }
                                            this.setState({
                                                regionCode: data,
                                                regionNameList: regionNameList
                                            })
                                        }}
                                    />
                                    <CustomSinglePicker
                                        label="نام منطقه"
                                        onChangeText={handleChange('regionName')}
                                        onBlur={handleBlur('regionName')}
                                        value={values.regionName}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.regionNameList}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomTextInput
                                        placeholder="طبقه"
                                        onChangeText={handleChange('unitNo')}
                                        onBlur={handleBlur('unitNo')}
                                        value={values.unitNo}
                                        style={styles.input}
                                        underlineColor='transparent'
                                    />
                                </ScrollView>
                                <Button style={{flex: 0, marginHorizontal: 10}}
                                        labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                        mode="contained"
                                        onPress={handleSubmit}>
                                    مرحله بعد
                                </Button>
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </View>
        )
    };

    SecondRoute = (props) => {
        let {fileEdit} = this.state;
        let initialValues = {
            age: fileEdit.age,
            direction: fileEdit.direction,
            comment: fileEdit.comment,
            pool: fileEdit.pool,
            jakozi: fileEdit.jakozi,
            sona: fileEdit.sona,
            documentKind: fileEdit.documentKind,
            area: fileEdit.area,
            unitParking: fileEdit.unitParking,
            unitAnbari: fileEdit.unitAnbari,
        };
        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""}
                                      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70} enabled={true}
                                      style={{
                                          height: '100%',
                                          backgroundColor: '#13213c'
                                      }}>
                    <Formik enableReinitialize initialValues={initialValues} onSubmit={values => this.secondStepValues(props, values)}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View style={{height: '100%', paddingBottom: 60}}>
                                <ScrollView style={styles.scrollContainer}>
                                    <CustomTextInput
                                        placeholder="سن"
                                        onChangeText={handleChange('age')}
                                        onBlur={handleBlur('age')}
                                        value={values.age}
                                        style={styles.input}
                                        underlineColor='transparent'
                                    />
                                    <CustomSinglePicker
                                        label="جهت ملک"
                                        onChangeText={handleChange('direction')}
                                        onBlur={handleBlur('direction')}
                                        value={values.direction}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={['شمال', 'جنوب', 'شرق', 'غرب']}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomTextInput
                                        placeholder="توضیحات"
                                        onChangeText={handleChange('comment')}
                                        onBlur={handleBlur('comment')}
                                        value={values.comment}
                                        style={styles.input}
                                        underlineColor='transparent'
                                    />
                                    <CustomSinglePicker
                                        label="استخر"
                                        onChangeText={handleChange('pool')}
                                        onBlur={handleBlur('pool')}
                                        value={values.pool}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.configList.pool}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomSinglePicker
                                        label="جکوزی"
                                        onChangeText={handleChange('jakozi')}
                                        onBlur={handleBlur('jakozi')}
                                        value={values.jakozi}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.configList.jakozi}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomSinglePicker
                                        label="سونا"
                                        onChangeText={handleChange('sona')}
                                        onBlur={handleBlur('sona')}
                                        value={values.sona}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.configList.sona}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomSinglePicker
                                        label="سند"
                                        onChangeText={handleChange('documentKind')}
                                        onBlur={handleBlur('documentKind')}
                                        value={values.documentKind}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.configList.documentKind}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomTextInput
                                        placeholder="مساحت"
                                        onChangeText={handleChange('area')}
                                        onBlur={handleBlur('area')}
                                        value={values.area}
                                        style={styles.input}
                                        underlineColor='transparent'
                                    />
                                    <CustomSinglePicker
                                        label="پارکینگ"
                                        onChangeText={handleChange('unitParking')}
                                        onBlur={handleBlur('unitParking')}
                                        value={values.unitParking}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.configList.parking}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                    <CustomSinglePicker
                                        label="انباری"
                                        onChangeText={handleChange('unitAnbari')}
                                        onBlur={handleBlur('unitAnbari')}
                                        value={values.unitAnbari}
                                        style={styles.input}
                                        underlineColor='transparent'
                                        dataArray={this.state.configList.warehouse}
                                        onSinglePickerClick={this.onPickerClick}
                                        onModalClose={this.onModalClose}
                                    />
                                </ScrollView>
                                <Button style={{flex: 0, marginHorizontal: 10}}
                                        labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                        mode="contained"
                                        onPress={handleSubmit}>
                                    مرحله بعد
                                </Button>
                            </View>
                        )}
                    </Formik>

                </KeyboardAvoidingView>
            </View>
        )
    };

    thirdRoute = () => {
        let {fileEdit} = this.state;
        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""}
                                      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} enabled={true}
                                      style={{
                                          height: '100%',
                                          backgroundColor: '#13213c'
                                      }}>
                    <View style={{height: '100%', paddingBottom: 60}}>
                        <View style={styles.scrollContainer}>
                            <CustomImagePicker
                                label="تصویر"
                                maxFileSize={100000000}
                                validFileTypes={['image/jpg', 'image/jpeg', 'image/png']}
                                onSinglePickerClick={this.onPickerClick}
                                onModalClose={this.onModalClose}
                                onFilePicker={this.onFilePicker}/>
                            <CustomMapPicker
                                label="موقعیت"
                                onCoordinateChange={this.onCoordinateChange}
                                onSinglePickerClick={this.onMapPickerClick}
                                onModalClose={this.onMapModalClose}/>
                            <FlatList
                                style={styles.equipmentContainer}
                                contentContainerStyle={{alignItems: 'center'}}
                                numColumns={2}
                                data={this.state.configList.equipments}
                                renderItem={({item, index, separators}) => (
                                    <TouchableHighlight
                                        key={item.key}
                                        style={{width: '50%', marginVertical: 10}}
                                        // onPress={() => this._onPress(item)}
                                        onShowUnderlay={separators.highlight}
                                        onHideUnderlay={separators.unhighlight}>
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.checkboxText}>{item}</Text>
                                            <CheckBox
                                                disabled={false}
                                                style={styles.checkbox}
                                                tintColors={'#9E663C'}
                                                onCheckColor={'#6F763F'}
                                                onTintColor={'#F4DCF8'}
                                                value={this.state.equipmentList[item]}
                                                onValueChange={(newValue) => this.setToggleCheckBox(newValue, item)}
                                            />
                                        </View>
                                    </TouchableHighlight>
                                )}
                            />
                        </View>
                        {_.isEmpty(fileEdit.Id) ?
                            <Button style={{flex: 0, marginHorizontal: 10}}
                                    labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                    mode="contained"
                                    onPress={this.insertFile}>
                                ثبت
                            </Button> :
                            <Button style={{flex: 0, marginHorizontal: 10}}
                                    labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                    mode="contained"
                                    onPress={this.editFile}>
                                اصلاح
                            </Button>
                        }
                    </View>

                </KeyboardAvoidingView>
            </View>
        )
    };

    render() {
        let {index, routes} = this.state;
        const renderScene = SceneMap({
            first: this.FirstRoute,
            second: this.SecondRoute,
            third: this.thirdRoute,
        });
        return (
            <BaseScreen navigation={this.props.navigation} title={'افزودن فایل'}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={"لطفا منتظر بمانید..."}
                    textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                    overlayColor={'#000000dd'}
                />
                <TabView
                    ref={(ref) => {
                        this.tabRef = ref
                    }}
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={(index) => {
                        this.setState({index})
                    }}
                    sceneContainerStyle={{backgroundColor: '#13213c'}}
                    style={{backgroundColor: '#13213c'}}
                    indicatorStyle={{backgroundColor: '#13213c'}}
                    initialLayout={{width: Dimensions.get('window').width, backgroundColor: '#13213c'}}
                    renderTabBar={props => {
                        return(
                            <TabBar {...props} style={{backgroundColor: '#13213c'}}/>
                        )
                    }}
                />
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
                <BottomSheet
                    ref={(ref) => {
                        this.mapSheetRef = ref
                    }}
                    snapPoints={['100%', 300, 0]}
                    borderRadius={10}
                    initialSnap={2}
                    enabledContentTapInteraction={false}
                    enabledGestureInteraction={false}
                    renderContent={() => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    padding: 16,
                                    height: '100%',
                                }}
                            >
                                {this.state.renderMapInnerContent && this.state.renderMapInnerContent()}
                            </View>
                        )
                    }}
                />
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        // height: '90%',
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10,
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
        height: 55,
        flex: 1
    },
    backgroundInput: {
        margin: 10,
        // height: 55,
        flex: 1
    },
    equipmentContainer: {
        // flex: 1,
        // width: '100%',
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
    },
    equipmentItem: {
        flexBasis: '50%'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        fontSize: 18,
        marginRight: 10
    },
    checkbox: {
        alignSelf: "center",
        width: 40,
        height: 40,
        marginHorizontal: 10,
        borderColor: '#000'
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFileScreen)
