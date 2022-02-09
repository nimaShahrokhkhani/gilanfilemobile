import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    KeyboardAvoidingView,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image, StatusBar, SafeAreaView, ScrollView, Platform
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
import StringUtils from "../../utils/string/StringUtils";
import _ from "underscore";
import {SwipeListView} from 'react-native-swipe-list-view';
import CustomShowFile from "../components/CustomShowFile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showMessage} from "react-native-flash-message";
import CustomSinglePicker from "../components/CustomSinglePicker";
import FlashMessage from "react-native-flash-message";
import {CustomTextInput} from "../components/CustomTextInput";

class SearchFileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            configList: [],
            fileList: [],
            modalVisible: false,
            zonkanArray: [],
            currentFile: undefined,
            isEdit: false,
            currentZonkanName: undefined
        };
    }

    componentDidMount() {
        dbHelper.find(FilesSchema, 'files', '').then(files => {
            console.log('filesssssss=>', JSON.stringify(files[0]))
            this.setState({
                fileList: files
            })
        });

        Services.getConfigList().then(response => {
            this.setState({
                configList: response.data[0]
            })
        }).catch(error => {

        })

        this.props.navigation.addListener(
            'focus',
            async payload => {
                let finalFileList = [];
                let {fileList, zonkanName} = this.props.route.params ? this.props.route.params : {fileList: {}};
                this.onModalClose();
                if (!_.isEmpty(zonkanName)) {
                    for (let file of fileList) {
                        let files = await dbHelper.find(FilesSchema, 'files', '_id == "' + file + '"');
                        finalFileList.push(files[0])
                    }
                    this.setState({
                        isEdit: true,
                        currentZonkanName: zonkanName,
                        fileList: finalFileList
                    })
                } else {
                    dbHelper.find(FilesSchema, 'files', '').then(files => {
                        this.setState({
                            isEdit: false,
                            currentZonkanName: zonkanName,
                            fileList: files
                        })
                    });
                }
            }
        );
    }

    onFilterPress = () => {
        this.toggleModal(true)
    };

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }

    navigateToMenu(menu) {
        let {navigation} = this.props;
        navigation.navigate(menu)
    }

    onModalClose = () => {
        this.sheetRef.snapTo(2)
    };

    onShowFileClick = (file) => {
        this.setState({
            currentFile: file
        }, () => {
            this.sheetRef.snapTo(0)
        })
    };

    editFile = (file) => {
        let {navigation} = this.props;
        navigation.navigate('افزودن فایل', {file: file});
    };

    onZonkanShowModal = (file) => {
        AsyncStorage.getItem('@zonkanNameList').then((value) => {
            if (value !== null) {
                this.setState({
                    zonkanArray: JSON.parse(value)
                })
            }
        });
        this.setState({
            currentFile: file
        }, () => {
            this.zoonkanSheetRef.snapTo(0)
        })
    };

    deleteFile = (file) => {
        dbHelper.deleteInnerFile(FilesSchema, 'files', file, () => {
            showMessage({
                message: 'موفق',
                description: 'فایل با موفقیت حذف شد.',
                type: "success",
                style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                icon: {icon: "success", position: "right"}
            });
            dbHelper.find(FilesSchema, 'files', '').then(files => {
                this.setState({
                    fileList: files
                })
            });
        });
    };

    deleteFileFromZonkan = (file) => {
        let {currentZonkanName} = this.state;
        let fileList = [];
        AsyncStorage.getItem(currentZonkanName).then((jsonValue) => {
            if (jsonValue !== null) {
                fileList = JSON.parse(jsonValue);
            }
            fileList = fileList.filter((currentFile) => currentFile !== file._id);
            AsyncStorage.setItem(currentZonkanName, JSON.stringify(fileList)).then(async () => {
                showMessage({
                    message: 'موفق',
                    description: 'فایل با موفقیت از زونکن حذف شد.',
                    type: "success",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
                let finalFileList = [];
                for (let file of fileList) {
                    let files = await dbHelper.find(FilesSchema, 'files', '_id == "' + file + '"');
                    finalFileList.push(files[0])
                }
                this.setState({
                    fileList: finalFileList
                })
            })
        })
    };

    onZonkanDataPress = (zonkan) => {
        let fileList = [];
        AsyncStorage.getItem(zonkan).then((jsonValue) => {
            if (jsonValue !== null) {
                fileList = JSON.parse(jsonValue);
            }
            if (!fileList.includes(this.state.currentFile._id)) {
                fileList.push(this.state.currentFile._id);
            }
            AsyncStorage.setItem(zonkan, JSON.stringify(fileList)).then(() => {
                showMessage({
                    message: 'موفق',
                    description: 'فایل در زونکن ' + zonkan + ' ثبت شد.',
                    type: "success",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
            })
        })
        this.zoonkanSheetRef.snapTo(2)
    };

    onZonkanModalClose = () => {
        this.zoonkanSheetRef.snapTo(2)
    };

    onFilterModalClose = () => {
        this.filterSheetRef.snapTo(2)
    };

    onFilterPickerClick = (innerView, snap) => {
        this.setState({
            renderInnerContent: innerView
        });
        this.filterSheetRef.snapTo(0)
    };

    getNoeMelk(noeMelk) {
        var noeMelkValue = "";
        switch (noeMelk) {
            case "آپارتمان":
                noeMelkValue = "apartment";
                break;
            case "ویلا":
                noeMelkValue = "vila";
                break;
            case "مستغلات":
                noeMelkValue = "building";
                break;
            case "کلنگی":
                noeMelkValue = "oldHouse";
                break;
            case "دفتر کار":
                noeMelkValue = "office";
                break;
            case "زمین":
                noeMelkValue = "land";
                break;
            case "مغازه":
                noeMelkValue = "store";
                break;
            case "سوییت":
                noeMelkValue = "suit";
                break;
        }
        return noeMelkValue;
    }

    getFileType(file) {
        if (!_.isEmpty(file.apartment)) {
            return "آپارتمان";
        } else if (!_.isEmpty(file.vila)) {
            return "ویلا";
        } else if (!_.isEmpty(file.building)) {
            return "مستغلات";
        } else if (!_.isEmpty(file.oldHouse)) {
            return "کلنگی";
        } else if (!_.isEmpty(file.office)) {
            return "دفتر کار";
        } else if (!_.isEmpty(file.land)) {
            return "زمین";
        } else if (!_.isEmpty(file.store)) {
            return "مغازه";
        } else if (!_.isEmpty(file.suit)) {
            return "سوییت";
        }
    }

    onSearchSubmit = (values) => {
        console.log('valuessssss=>', values)
        let filter = '';
        if (!_.isEmpty(values.owner)) {
            filter += !_.isEmpty(filter) ? (' && owner == "' + values.owner + '"') : ('owner == "' + values.owner + '"');
        }
        if (!_.isEmpty(values.tel1)) {
            filter += !_.isEmpty(filter) ? (' && tel1 == "' + values.tel1 + '"') : ('tel1 == "' + values.tel1 + '"');
        }
        if (!_.isEmpty(values.fromDate)) {
            filter += !_.isEmpty(filter) ? (' && date == "' + values.fromDate + '"') : ('date == "' + values.fromDate + '"');
        }
        if (!_.isEmpty(values.toDate)) {
            filter += !_.isEmpty(filter) ? (' && date == "' + values.toDate + '"') : ('date == "' + values.toDate + '"');
        }
        if (!_.isEmpty(values.sale)) {
            filter += !_.isEmpty(filter) ? (' && sale == "' + values.sale + '"') : ('sale == "' + values.sale + '"');
        }
        if (!_.isEmpty(values.type)) {
            filter += !_.isEmpty(filter) ? (' && ' + this.getNoeMelk(values.type) + ' != nil AND ' + this.getNoeMelk(values.type) + ' != ""') : (this.getNoeMelk(values.type) + ' != nil AND ' + this.getNoeMelk(values.type) + ' != ""');
            // filter[values.type] = true;
        }
        if (!_.isEmpty(values.fromUnitPrice)) {
            filter += !_.isEmpty(filter) ? (' && unitPrice >= "' + values.fromUnitPrice + '"') : ('unitPrice >= "' + values.fromUnitPrice + '"');
        }
        if (!_.isEmpty(values.toUnitPrice)) {
            filter += !_.isEmpty(filter) ? (' && unitPrice <= "' + values.toUnitPrice + '"') : ('unitPrice <= "' + values.toUnitPrice + '"');
        }
        if (!_.isEmpty(values.fromTotalPrice)) {
            filter += !_.isEmpty(filter) ? (' && totalPrice >= "' + values.fromTotalPrice + '"') : ('totalPrice >= "' + values.fromTotalPrice + '"');
        }
        if (!_.isEmpty(values.toTotalPrice)) {
            filter += !_.isEmpty(filter) ? (' && totalPrice <= "' + values.toTotalPrice + '"') : ('totalPrice <= "' + values.toTotalPrice + '"');
        }
        if (!_.isEmpty(values.fromRent)) {
            filter += !_.isEmpty(filter) ? (' && rent >= "' + values.fromRent + '"') : ('rent >= "' + values.fromRent + '"');
        }
        if (!_.isEmpty(values.toRent)) {
            filter += !_.isEmpty(filter) ? (' && rent <= "' + values.toRent + '"') : ('rent <= "' + values.toRent + '"');
        }
        if (!_.isEmpty(values.fromMortgage)) {
            filter += !_.isEmpty(filter) ? (' && mortgage >= "' + values.fromMortgage + '"') : ('mortgage >= "' + values.fromMortgage + '"');
        }
        if (!_.isEmpty(values.toMortgage)) {
            filter += !_.isEmpty(filter) ? (' && mortgage <= "' + values.toMortgage + '"') : ('mortgage <= "' + values.toMortgage + '"');
        }
        if (!_.isEmpty(values.regionCode)) {
            filter += !_.isEmpty(filter) ? (' && regionCode == "' + values.regionCode + '"') : ('regionCode == "' + values.regionCode + '"');
        }
        if (!_.isEmpty(values.regionName)) {
            filter += !_.isEmpty(filter) ? (' && regionName == "' + values.regionName + '"') : ('regionName == "' + values.regionName + '"');
        }
        if (!_.isEmpty(values.unitNo)) {
            filter += !_.isEmpty(filter) ? (' && unitNo == "' + values.unitNo + '"') : ('unitNo == "' + values.unitNo + '"');
        }
        console.log('filterrrrrrrrr=>', filter)
        dbHelper.find(FilesSchema, 'files', filter).then(files => {
            this.setState({
                fileList: files
            })
        });
        this.toggleModal(!this.state.modalVisible)
    };

    renderHiddenItem = (data) => {
        let {isEdit} = this.state;
        if (isEdit) {
            return (
                <View style={styles.rowBack}>
                    <TouchableOpacity onPress={() => this.deleteFileFromZonkan(data.item)}
                                      style={[styles.backRightBtn, styles.backRightBtnRight]}>
                        <Text style={styles.backTextWhite}>حذف</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.rowBack}>
                    <TouchableOpacity onPress={() => this.deleteFile(data.item)}
                                      style={[styles.backRightBtn, styles.backRightBtnRight]}>
                        <Text style={styles.backTextWhite}>حذف</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onZonkanShowModal(data.item)}
                                      style={[styles.backRightBtn, styles.backRightBtnRight, {
                                          right: 75,
                                          backgroundColor: '#0000ff'
                                      }]}>
                        <Text style={styles.backTextWhite}>زونکن</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    renderFileItem = (item, index, separators) => {
        return (
            <TouchableOpacity activeOpacity={2} style={{backgroundColor: '#f0f0f0'}}
                              onPress={() => this.onShowFileClick(item)}>
                <View style={styles.fileItemContainer}>
                    <View style={styles.imageContainer}>
                        {!_.isEmpty(item.imageUrl) && JSON.parse(item.imageUrl).assets ?

                            <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                                   source={{uri: JSON.parse(item.imageUrl).assets[0].uri}}/> :

                            <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                                   source={require('../images/home-icon.png')}/>
                        }
                    </View>
                    <View style={styles.fileInfoContainer}>
                        <View style={styles.ownerContainer}>
                            <View style={{alignItems: 'flex-end', flex: 1}}>
                                <Text style={styles.ownerText}>
                                    {item.owner}
                                </Text>
                            </View>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={styles.dateText}>
                                    {item.date && StringUtils.convertMillisecondToShamsi(parseInt(item.date))}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.extraInfoContainer}>
                            <Text style={styles.regionCodeText}>
                                {item.regionCode}
                            </Text>
                            <Text style={styles.regionNameText}>
                                {item.regionName}
                            </Text>
                        </View>
                        <View style={styles.extraInfoContainer}>
                            <Text style={styles.typeText}>
                                {this.getFileType(item)}
                            </Text>
                            <Text style={styles.saleText}>
                                {item.sale}
                            </Text>
                            <View style={styles.floorContainer}>
                                <Text style={styles.floorTextTitle}>
                                    طبقه:
                                </Text>
                                <Text style={styles.floorTextValue}>
                                    {!_.isEmpty(item.unitFloor) ? StringUtils.convertNumbersToPersian(item.unitFloor) : '0'}
                                </Text>
                            </View>
                            <View style={styles.floorContainer}>
                                <Text style={styles.floorTextTitle}>
                                    مساحت:
                                </Text>
                                <Text style={styles.floorTextValue}>
                                    {!_.isEmpty(item.area) ? StringUtils.convertNumbersToPersian(item.area) : '0'}
                                </Text>
                            </View>
                        </View>
                        {(item.sale === 'فروش' || item.sale === 'معاوضه' || item.sale === 'مشارکت') ?
                            <View>
                                <View style={styles.extraInfoContainer}>
                                    <View style={styles.floorContainer}>
                                        <Text style={styles.floorTextTitle}>
                                            قیمت کل:
                                        </Text>
                                        <Text style={styles.floorTextValue}>
                                            {!_.isEmpty(item.totalPrice) ? StringUtils.convertNumbersToPersian(StringUtils.commify(item.totalPrice)) : '0'}
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
                                            {!_.isEmpty(item.unitPrice) ? StringUtils.convertNumbersToPersian(StringUtils.commify(item.unitPrice)) : '0'}
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
                                            {!_.isEmpty(item.mortgage) ? StringUtils.convertNumbersToPersian(StringUtils.commify(item.mortgage)) : '0'}
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
                                            {!_.isEmpty(item.rent) ? StringUtils.convertNumbersToPersian(StringUtils.commify(item.rent)) : '0'}
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
                                {item.address}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    renderInnerFilterModal() {
        let initialValues = {
            owner: '',
            tel1: '',
            fromDate: '',
            toDate: '',
            sale: '',
            type: '',
            fromUnitPrice: '',
            toUnitPrice: '',
            fromTotalPrice: '',
            toTotalPrice: '',
            fromRent: '',
            toRent: '',
            fromMortgage: '',
            toMortgage: '',
            regionCode: '',
            regionName: '',
            unitNo: '',
        };
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView style={{flex: 1}}>
                    <ScrollView contentContainerStyle={styles.modal}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => this.toggleModal(!this.state.modalVisible)}>
                                <Image style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                    tintColor: 'white'
                                }}
                                       source={require('../images/cancel.png')}/>
                            </TouchableOpacity>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 30}}>
                                <Text style={styles.modalTitle}>فیلترها</Text>
                            </View>
                        </View>
                        <View style={styles.innerModal}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""}
                                                  keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                                                  enabled={true}
                                                  style={{
                                                      height: '100%',
                                                      backgroundColor: '#13213c',
                                                      width: '100%',
                                                  }}>
                                <Formik initialValues={initialValues} onSubmit={values => this.onSearchSubmit(values)}>
                                    {({handleChange, handleBlur, handleSubmit, values}) => (
                                        <View style={{height: '100%', paddingBottom: 60}}>
                                            <ScrollView style={styles.scrollContainer}>
                                                <CustomTextInput
                                                    placeholder="نام مالک"
                                                    onChangeText={handleChange('owner')}
                                                    onBlur={handleBlur('owner')}
                                                    value={values.owner}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="تلفن"
                                                    onChangeText={handleChange('tel1')}
                                                    onBlur={handleBlur('tel1')}
                                                    value={values.tel1}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomDatePicker
                                                    placeholder="تاریخ از"
                                                    currentDate={new Date()}
                                                    value={values.fromDate}
                                                    onChangeText={handleChange('fromDate')}
                                                    underlineColor='transparent'
                                                    onDatePickerClick={this.onFilterPickerClick}
                                                    onModalClose={this.onFilterModalClose}
                                                />
                                                <CustomDatePicker
                                                    placeholder="تاریخ تا"
                                                    currentDate={new Date()}
                                                    value={values.toDate}
                                                    onChangeText={handleChange('toDate')}
                                                    underlineColor='transparent'
                                                    onDatePickerClick={this.onFilterPickerClick}
                                                    onModalClose={this.onFilterModalClose}
                                                />
                                                <CustomSinglePicker
                                                    label="نوع فروش"
                                                    onChangeText={handleChange('sale')}
                                                    onBlur={handleBlur('sale')}
                                                    value={values.sale}
                                                    style={styles.input}
                                                    underlineColor='transparent'
                                                    dataArray={['رهن و اجاره', 'رهن کامل', 'اجاره', 'فروش']}
                                                    onSinglePickerClick={this.onFilterPickerClick}
                                                    onModalClose={this.onFilterModalClose}
                                                />
                                                <CustomSinglePicker
                                                    label="نوع ملک"
                                                    onChangeText={handleChange('type')}
                                                    onBlur={handleBlur('type')}
                                                    value={values.type}
                                                    style={styles.input}
                                                    underlineColor='transparent'
                                                    dataArray={['آپارتمان', 'ویلا', 'مستغلات', 'کلنگی', 'زمین', 'دفتر کار', 'مغازه']}
                                                    onSinglePickerClick={this.onFilterPickerClick}
                                                    onModalClose={this.onFilterModalClose}
                                                />
                                                <CustomTextInput
                                                    placeholder="از قیمت متری"
                                                    onChangeText={handleChange('fromUnitPrice')}
                                                    onBlur={handleBlur('fromUnitPrice')}
                                                    value={values.fromUnitPrice}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="تا قیمت متری"
                                                    onChangeText={handleChange('toUnitPrice')}
                                                    onBlur={handleBlur('toUnitPrice')}
                                                    value={values.toUnitPrice}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="از قیمت کل"
                                                    onChangeText={handleChange('fromTotalPrice')}
                                                    onBlur={handleBlur('fromTotalPrice')}
                                                    value={values.fromTotalPrice}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="تا قیمت کل"
                                                    onChangeText={handleChange('toTotalPrice')}
                                                    onBlur={handleBlur('toTotalPrice')}
                                                    value={values.toTotalPrice}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="از قیمت اجاره"
                                                    onChangeText={handleChange('fromRent')}
                                                    onBlur={handleBlur('fromRent')}
                                                    value={values.fromRent}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="تا قیمت اجاره"
                                                    onChangeText={handleChange('toRent')}
                                                    onBlur={handleBlur('toRent')}
                                                    value={values.toRent}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="از قیمت رهن"
                                                    onChangeText={handleChange('fromMortgage')}
                                                    onBlur={handleBlur('fromMortgage')}
                                                    value={values.fromMortgage}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                                <CustomTextInput
                                                    placeholder="تا قیمت رهن"
                                                    onChangeText={handleChange('toMortgage')}
                                                    onBlur={handleBlur('toMortgage')}
                                                    value={values.toMortgage}
                                                    backgroundStyles={[styles.backgroundInput]}
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
                                                    onSinglePickerClick={this.onFilterPickerClick}
                                                    onModalClose={this.onFilterModalClose}
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
                                                    onSinglePickerClick={this.onFilterPickerClick}
                                                    onModalClose={this.onFilterModalClose}
                                                />
                                                <CustomTextInput
                                                    placeholder="طبقه"
                                                    onChangeText={handleChange('unitNo')}
                                                    onBlur={handleBlur('unitNo')}
                                                    value={values.unitNo}
                                                    backgroundStyles={[styles.backgroundInput]}
                                                    underlineColor='transparent'
                                                />
                                            </ScrollView>
                                            <Button style={{flex: 0, marginHorizontal: 10}}
                                                    labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                                    mode="contained"
                                                    onPress={handleSubmit}>
                                                جستجو
                                            </Button>
                                        </View>
                                    )}
                                </Formik>
                            </KeyboardAvoidingView>
                        </View>

                        <BottomSheet
                            ref={(ref) => {
                                this.filterSheetRef = ref
                            }}
                            snapPoints={[400, 300, 0]}
                            borderRadius={10}
                            initialSnap={2}
                            renderContent={() => {
                                return (
                                    <ScrollView>
                                        <View
                                            style={{
                                                backgroundColor: 'white',
                                                padding: 16,
                                                height: 600,
                                            }}
                                        >
                                            {this.state.renderInnerContent && this.state.renderInnerContent()}
                                        </View>
                                    </ScrollView>
                                )
                            }}
                        />
                        {/*<Text style={styles.text}>Modal is open!</Text>

                        <TouchableOpacity onPress={() => {
                            this.toggleModal(!this.state.modalVisible)
                        }}>

                            <Text style={styles.text}>Close Modal</Text>
                        </TouchableOpacity>*/}
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomView}/>
            </View>
        )
    }

    render() {
        let {index, routes, zonkanArray} = this.state;
        return (
            <BaseScreen navigation={this.props.navigation} title={'جستجو فایل'} hasFilter={true}
                        onFilterPress={this.onFilterPress}>
                <SwipeListView
                    style={styles.fileListContainer}
                    data={this.state.fileList}
                    renderItem={({item, index, separators}) => this.renderFileItem(item, index, separators)}
                    renderHiddenItem={(data, rowMap) => this.renderHiddenItem(data)}
                    rightOpenValue={-150}
                />
                <Modal animationType={"slide"} transparent={false}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {
                       }}>

                    {this.renderInnerFilterModal()}
                </Modal>

                <BottomSheet
                    ref={(ref) => {
                        this.sheetRef = ref
                    }}
                    snapPoints={['100%', 300, 0]}
                    borderRadius={10}
                    initialSnap={2}
                    renderContent={() => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    padding: 16,
                                    height: 1200,
                                }}
                            >
                                <CustomShowFile
                                    file={this.state.currentFile}
                                    editFile={this.editFile}/>
                            </View>
                        )
                    }}
                />

                <BottomSheet
                    ref={(ref) => {
                        this.zoonkanSheetRef = ref
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
                                <View>
                                    <Text style={styles.labelTitle}>زونکن</Text>
                                    <View style={styles.modalContainerAndroid}>
                                        {zonkanArray && zonkanArray.map(data => {
                                            return (
                                                <TouchableOpacity style={styles.dataContainer}
                                                                  onPress={() => this.onZonkanDataPress(data)}>
                                                    <Text style={styles.dataText}>{data}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                    <View style={styles.buttonsContainer}>
                                        <Button style={{marginVertical: 20, marginHorizontal: 5}}
                                                labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                                mode="contained"
                                                onPress={this.onZonkanModalClose}>
                                            لغو
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />

            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    fileItemContainer: {
        height: 220,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#a0a0a0',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        // backgroundColor: '#f0f',
    },
    fileListContainer: {
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fileInfoContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    ownerContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row-reverse',
    },
    floorContainer: {
        flexDirection: 'row-reverse'
    },
    ownerText: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        marginVertical: 5,
        alignSelf: 'flex-end'
    },
    dateText: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        marginVertical: 5,
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

    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
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
    bottomView: {
        backgroundColor: '#13213c',
        flex: 0
    },
    topView: {
        backgroundColor: '#13213c',
        flex: 0
    },
    scrollContainer: {
        // height: '90%',
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10,
        // backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#eff9f9'
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
    },

    backTextWhite: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchFileScreen)
