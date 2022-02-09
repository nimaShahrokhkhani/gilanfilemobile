import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Text,
    ImageBackground,
    Modal,
    StatusBar, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
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
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import _ from "underscore";

class SettingScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            renderInnerContent: undefined,
            fromDate: '',
            toDate: '',
            agencyCode: '',
            username: '',
            password: '',
            modalVisible: false,
            biometricEnable: false
        };
    }

    componentDidMount() {
        RNSecureKeyStore.get("agencyCode")
            .then(agencyCode => {
                RNSecureKeyStore.get("username")
                    .then(username => {
                        RNSecureKeyStore.get("password")
                            .then(password => {
                                if (!_.isEmpty(agencyCode) && !_.isEmpty(username) && !_.isEmpty(password)) {
                                    this.setState({
                                        biometricEnable: true
                                    })
                                }
                            })
                            .catch(error => {
                            })
                    })
                    .catch(error => {
                    })
            })
            .catch(error => {
            })
    }

    onBiometricPress = () => {
        if (!this.state.biometricEnable) {
            this.toggleModal(true)
        } else {
            RNSecureKeyStore.set("agencyCode", '', {accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
                .then(result1 => {
                    RNSecureKeyStore.set("username", '', {accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
                        .then(result1 => {
                            RNSecureKeyStore.set("password", '', {accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
                                .then(result2 => {
                                    this.toggleModal(false);
                                    showMessage({
                                        message: 'موفق',
                                        description: 'اثرانگشت/تشخیص چهره با موفقیت غیر فعال شد.',
                                        type: "success",
                                        style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                                        titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                                        textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                                        icon: {icon: "success", position: "right"}
                                    });
                                }, (error) => {
                                });
                        }, (error) => {
                        });
                }, (error) => {
                });
        }
    };

    toggleModal(visible) {
        this.setState({modalVisible: visible});
    }

    onAgencyCodeTextChange = (text) => {
        this.setState({
            agencyCode: text
        })
    };

    onUsernameTextChange = (text) => {
        this.setState({
            username: text
        })
    };

    onPasswordTextChange = (text) => {
        this.setState({
            password: text
        })
    };

    onSubmitEnable = () => {
        let {agencyCode, username, password} = this.state;
        RNSecureKeyStore.set("agencyCode", agencyCode, {accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
            .then(result1 => {
                RNSecureKeyStore.set("username", username, {accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
                    .then(result1 => {
                        RNSecureKeyStore.set("password", password, {accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
                            .then(result2 => {
                                this.toggleModal(false);
                                showMessage({
                                    message: 'موفق',
                                    description: 'اثرانگشت/تشخیص چهره با موفقیت فعال شد.',
                                    type: "success",
                                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                                    icon: {icon: "success", position: "right"}
                                });
                            }, (error) => {
                                this.toggleModal(false);
                                showMessage({
                                    message: 'خطا',
                                    description: 'خطا در فعالسازی اثرانگشت/تشخیص چهره.',
                                    type: "danger",
                                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                                    icon: {icon: "success", position: "right"}
                                });
                            });
                    }, (error) => {
                        this.toggleModal(false);
                        showMessage({
                            message: 'خطا',
                            description: 'خطا در فعالسازی اثرانگشت/تشخیص چهره.',
                            type: "danger",
                            style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                            titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                            textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                            icon: {icon: "success", position: "right"}
                        });
                    });
            }, (error) => {
                this.toggleModal(false);
                showMessage({
                    message: 'خطا',
                    description: 'خطا در فعالسازی اثرانگشت/تشخیص چهره.',
                    type: "danger",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
            });
    };

    renderInnerFingerPrintEnableModal() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>فعالسازی با اثرانگشت/تشخیص چهره</Text>
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
                                            label="کد آژانس"
                                            value={this.state.agencyCode}
                                            onChangeText={this.onAgencyCodeTextChange}
                                            style={styles.input}
                                            autoCapitalize={'none'}
                                            autoCompleteType={'off'}
                                            autoCorrect={false}
                                            underlineColor='transparent'
                                            underlineColorAndroid={'transparent'}
                                            contextMenuHidden={false}
                                            accessible={false}
                                        />
                                        <TextInput
                                            label="نام کاربری"
                                            value={this.state.username}
                                            onChangeText={this.onUsernameTextChange}
                                            style={styles.input}
                                            autoCapitalize={'none'}
                                            autoCompleteType={'off'}
                                            autoCorrect={false}
                                            underlineColor='transparent'
                                            underlineColorAndroid={'transparent'}
                                            contextMenuHidden={false}
                                            accessible={false}
                                        />
                                        <TextInput
                                            label="کلمه عبور"
                                            value={this.state.password}
                                            onChangeText={this.onPasswordTextChange}
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
                                            onPress={this.onSubmitEnable}>
                                        فعالسازی
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

    render() {
        return (
            <BaseScreen navigation={this.props.navigation} title={'تنظیمات'}>
                <View style={styles.backgroundImage}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={"لطفا منتظر بمانید..."}
                        textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                        overlayColor={'#000000dd'}
                    />
                    <ScrollView style={styles.container}>
                        <TouchableOpacity style={styles.rowContainer} onPress={this.onBiometricPress}>
                            <Image style={{width: 30, height: 30, resizeMode: 'contain', tintColor: 'white'}}
                                   source={require('../images/biometric.png')}/>
                            <Text style={styles.labelText}>فعالسازی با اثرانگشت/تشخیص چهره</Text>
                        </TouchableOpacity>
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
                    <Modal animationType={"slide"} transparent={false}
                           visible={this.state.modalVisible}
                           onRequestClose={() => {
                           }}>

                        {this.renderInnerFingerPrintEnableModal()}
                    </Modal>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#13213c'
    },
    container: {
        width: '100%'
    },
    rowContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.5,
        borderStartWidth: 0,
        borderEndWidth: 0,
        padding: 15
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

    labelText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        fontSize: 15,
        color: 'white',
        marginRight: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
