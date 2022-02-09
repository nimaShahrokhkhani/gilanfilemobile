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
    Image, StatusBar, SafeAreaView, ScrollView, ImageBackground, Platform
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
import StringUtils from "../../utils/string/StringUtils";
import _ from "underscore";
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from "react-native-flash-message";

class SearchFileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            zonkanName: '',
            fileList: [],
            modalVisible: false,
            editModalVisible: false,
            zonkanArray: [],
            currentFile: undefined
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('@zonkanNameList').then((value) => {
            if (value !== null) {
                this.setState({
                    zonkanArray: JSON.parse(value)
                })
            }
        });
    }

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }

    toggleEditModal(visible) {
        this.setState({editModalVisible: visible});
    }

    onAddPress = () => {
        this.setState({
            modalVisible: true
        })
    };

    onSubmitZonkanName = async () => {
        let zonkanNameList = [];
        this.toggleModal(!this.state.modalVisible);
        AsyncStorage.getItem('@zonkanNameList').then((jsonValue) => {
            if (jsonValue !== null) {
                zonkanNameList = JSON.parse(jsonValue);
            }
            zonkanNameList.push(this.state.zonkanName);
            AsyncStorage.setItem('@zonkanNameList', JSON.stringify(zonkanNameList)).then(() => {
                this.setState({
                    zonkanArray: zonkanNameList,
                    zonkanName: ''
                })
            })
        })
    };

    onEditZonkanName = () => {
        let zonkanNameList = [];
        this.toggleEditModal(!this.state.editModalVisible);
        AsyncStorage.getItem('@zonkanNameList').then((jsonValue) => {
            if (jsonValue !== null) {
                zonkanNameList = JSON.parse(jsonValue);
            }
            let index = zonkanNameList.indexOf(this.state.currentZonkan);
            if (index !== -1) {
                zonkanNameList[index] = this.state.zonkanName;
            }
            AsyncStorage.setItem('@zonkanNameList', JSON.stringify(zonkanNameList)).then(() => {

                AsyncStorage.getItem(this.state.currentZonkan).then((jsonValue) => {
                        AsyncStorage.setItem(this.state.currentZonkan, '').then( () => {
                            AsyncStorage.setItem(this.state.zonkanName, jsonValue).then( () => {

                            this.setState({
                                zonkanArray: zonkanNameList,
                                zonkanName: ''
                            }, this.onEditModalClose)

                        })

                    })
                })

            })
        })
    };

    onZonkanNameTextChange = (text) => {
        this.setState({
            zonkanName: text
        })
    };

    renderInnerZonkanNameModal() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>افزودن زونکن</Text>
                        <View style={styles.innerModal}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""} keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0} enabled={true}
                                                  style={{
                                                      height: '100%',
                                                      backgroundColor: '#13213c',
                                                      width: '100%',
                                                  }}>
                                <View style={{height: '100%', width: '100%'}}>
                                    <ScrollView style={styles.scrollContainer}>
                                        <TextInput
                                            label="نام زونکن"
                                            value={this.state.zonkanName}
                                            onChangeText={this.onZonkanNameTextChange}
                                            style={styles.input}
                                            autoCapitalize={'none'}
                                            autoCompleteType={'off'}
                                            autoCorrect={false}
                                            underlineColor='transparent'
                                            underlineColorAndroid={'transparent'}
                                            contextMenuHidden={false}
                                            accessible={false}
                                        />

                                    </ScrollView>
                                    <Button style={{flex: 0, marginHorizontal: 10}}
                                            labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                            mode="contained"
                                            onPress={this.onSubmitZonkanName}>
                                        افزودن
                                    </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomView}/>
            </View>
        )
    }

    renderInnerZonkanEditNameModal() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>اصلاح زونکن</Text>
                        <View style={styles.innerModal}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""} keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0} enabled={true}
                                                  style={{
                                                      height: '100%',
                                                      backgroundColor: '#13213c',
                                                      width: '100%',
                                                  }}>
                                <View style={{height: '100%', width: '100%'}}>
                                    <ScrollView style={styles.scrollContainer}>
                                        <TextInput
                                            label="نام زونکن"
                                            value={this.state.zonkanName}
                                            onChangeText={this.onZonkanNameTextChange}
                                            style={styles.input}
                                            autoCapitalize={'none'}
                                            autoCompleteType={'off'}
                                            autoCorrect={false}
                                            underlineColor='transparent'
                                            underlineColorAndroid={'transparent'}
                                            contextMenuHidden={false}
                                            accessible={false}
                                        />

                                    </ScrollView>
                                    <Button style={{flex: 0, marginHorizontal: 10}}
                                            labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                            mode="contained"
                                            onPress={this.onEditZonkanName}>
                                        اصلاح
                                    </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomView}/>
            </View>
        )
    }

    navigateToZonkanDetailScreen(zonkan) {
        let {navigation} = this.props;
        let fileList = [];
        AsyncStorage.getItem(zonkan).then((jsonValue) => {
            if (jsonValue !== null) {
                fileList = JSON.parse(jsonValue);
            }
            navigation.navigate('جستجو فایل', {fileList: fileList, zonkanName: zonkan});
        })
    }

    onEditModalClose = () => {
        this.editSheetRef.snapTo(2)
    };

    onEditPickerClick = () => {
        this.editSheetRef.snapTo(0)
    };

    onZonkanItemLongPress = (item) => {
        this.setState({
            currentZonkan: item
        }, () => {
            this.onEditPickerClick()
        })
    };

    editZonkan = () => {
        this.setState({
            zonkanName: this.state.currentZonkan,
            editModalVisible: true
        })
    };

    deleteZonkan = () => {
        let zonkanNameList = [];
        AsyncStorage.getItem('@zonkanNameList').then((jsonValue) => {
            if (jsonValue !== null) {
                zonkanNameList = JSON.parse(jsonValue);
            }
            zonkanNameList = zonkanNameList.filter((zonkan) => (zonkan !== this.state.currentZonkan));
            AsyncStorage.setItem('@zonkanNameList', JSON.stringify(zonkanNameList)).then(() => {
                AsyncStorage.setItem(this.state.currentZonkan, '').then(() => {
                    this.setState({
                        zonkanArray: zonkanNameList,
                    }, this.onEditModalClose)
                })
            })
        })
    };

    renderZonkanItem = ({item}) => {
        return (
            <TouchableOpacity onLongPress={() => this.onZonkanItemLongPress(item)} onPress={() => this.navigateToZonkanDetailScreen(item)}
                              style={styles.zonkanItemContainer}>
                <Image style={{
                    width: (Dimensions.get('window').width / 3) - 20,
                    height: 150,
                    resizeMode: 'stretch',
                    margin: 5
                }} source={require('../images/zonkanItem.png')}/>
                <Text style={{fontSize: 15, color: '#00006e', fontFamily: 'IRANSansMobileFaNum-Bold'}}>{item}</Text>
            </TouchableOpacity>
        )
    };

    render() {
        let {index, routes, zonkanArray} = this.state;
        return (
            <BaseScreen navigation={this.props.navigation} title={'زونکن'} hasAdd={true}
                        onAddPress={this.onAddPress}>
                <ImageBackground source={require('../images/zonkanBg.jpeg')} style={styles.backgroundImage}>

                    <FlatList
                        ref="productFlatList"
                        data={zonkanArray}
                        numColumns={2}
                        renderItem={this.renderZonkanItem}
                    />


                    <Modal animationType={"slide"} transparent={false}
                           visible={this.state.modalVisible}
                           onRequestClose={() => {
                           }}>

                        {this.renderInnerZonkanNameModal()}
                    </Modal>

                    <Modal animationType={"slide"} transparent={false}
                           visible={this.state.editModalVisible}
                           onRequestClose={() => {
                           }}>

                        {this.renderInnerZonkanEditNameModal()}
                    </Modal>

                    <BottomSheet
                        ref={(ref) => {
                            this.editSheetRef = ref
                        }}
                        snapPoints={[260, 200, 0]}
                        borderRadius={10}
                        initialSnap={2}
                        renderContent={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 16,
                                        height: 200,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity onPress={() => this.editZonkan()}
                                                      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image style={{
                                            width: 75,
                                            height: 75,
                                            resizeMode: 'stretch',
                                            margin: 5,
                                            tintColor: '#00f'
                                        }} source={require('../images/edit-zonkan.png')}/>
                                        <Text style={{fontFamily: 'IRANSansMobileFaNum-Light', color: '#00f'}}>ویرایش زونکن</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.deleteZonkan()}
                                                      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image style={{
                                            width: 81,
                                            height: 81,
                                            resizeMode: 'stretch',
                                            margin: 5,
                                            tintColor: '#aa0000'
                                        }} source={require('../images/delete-zonkan.png')}/>
                                        <Text style={{fontFamily: 'IRANSansMobileFaNum-Light', color: '#aa0000'}}>حذف زونکن</Text>
                                    </TouchableOpacity>
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
    fileItemContainer: {
        height: 180,
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#a0a0a0',
        flexDirection: 'row-reverse'
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
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    zonkanItemContainer: {
        borderRadius: 2,
        width: (Dimensions.get('window').width / 2) - 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }

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
