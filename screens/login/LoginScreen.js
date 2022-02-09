import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    StyleSheet,
    FlatList,
    StatusBar,
    SafeAreaView,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../utils/redux/actions/userLogin';
import Services from "../../utils/services/Services";
import Spinner from "react-native-loading-spinner-overlay";
import {showMessage, hideMessage} from "react-native-flash-message";
import CheckBox from '@react-native-community/checkbox';
import FlashMessage from "react-native-flash-message";
import FingerprintPopup from "../components/biometric/FingerprintPopup";
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import _ from "underscore";
import dbHelper from "../../helper/db/dbHelper";
import {FilesSchema} from "../../helper/schema/fileSchema";
import {CustomTextInput} from "../components/CustomTextInput";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            agencyCode: '',
            isUsernameFocused: false,
            isPasswordFocused: false,
            isAgencyCodeFocused: false,
            isSecureTextEntry: false,
            spinner: false,
            biometricEnable: false
        }
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'focus',
            payload => {
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
        );
    }

    onBiometricPress = () => {
        this.setState({biometricEnable: false}, () => {
            this.setState({biometricEnable: true})
        })
    };

    hideLoading = () => {
        this.setState({spinner: false})
    };

    onLoginPress = () => {
        let {user, actions, navigation} = this.props;
        this.setState({spinner: true}, () => {
            Services.signInPanel({
                username: this.state.username,
                password: this.state.password,
                agencyCode: this.state.agencyCode
            }).then((res) => {
                this.hideLoading();
                // showMessage({
                //     message: 'موفق',
                //     description: 'ورود کاربر با موفقیت انجام شد.',
                //     type: "success",
                //     style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                //     titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                //     textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                //     icon: {icon: "success", position: "right"}
                // });
                actions.userLogin(res.data);
                navigation.navigate('HomeScreen')
            }).catch((error) => {
                this.hideLoading();
                showMessage({
                    message: 'خطا',
                    description: 'نام کاربری یا رمز عبور اشتباه است.',
                    type: "danger",
                    style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: {icon: "success", position: "right"}
                });
            })
        })
    };

    onBiometricLoginPress = () => {
        let {user, actions, navigation} = this.props;
        this.setState({spinner: true}, () => {

            RNSecureKeyStore.get("agencyCode")
                .then(agencyCode => {
                    RNSecureKeyStore.get("username")
                        .then(username => {
                            RNSecureKeyStore.get("password")
                                .then(password => {
                                    if (!_.isEmpty(agencyCode) && !_.isEmpty(username) && !_.isEmpty(password)) {
                                        Services.signInPanel({
                                            username: username,
                                            password: password,
                                            agencyCode: agencyCode
                                        }).then((res) => {
                                            this.hideLoading();
                                            actions.userLogin(res.data);
                                            navigation.navigate('HomeScreen')
                                        }).catch((error) => {
                                            this.hideLoading();
                                            showMessage({
                                                message: 'خطا',
                                                description: 'نام کاربری یا رمز عبور اشتباه است.',
                                                type: "danger",
                                                style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                                                titleStyle: {
                                                    textAlign: 'right',
                                                    fontFamily: 'IRANSansMobileFaNum-Bold'
                                                },
                                                textStyle: {
                                                    textAlign: 'right',
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                },
                                                icon: {icon: "success", position: "right"}
                                            });
                                        })
                                    } else {
                                        showMessage({
                                            message: 'خطا',
                                            description: 'خطا در ورود کاربر.',
                                            type: "danger",
                                            style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                                            titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                                            textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                                            icon: {icon: "success", position: "right"}
                                        });
                                    }
                                })
                                .catch(error => {
                                    showMessage({
                                        message: 'خطا',
                                        description: 'خطا در ورود کاربر.',
                                        type: "danger",
                                        style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                                        titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                                        textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                                        icon: {icon: "success", position: "right"}
                                    });
                                })
                        })
                        .catch(error => {
                            showMessage({
                                message: 'خطا',
                                description: 'خطا در ورود کاربر.',
                                type: "danger",
                                style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                                titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                                textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                                icon: {icon: "success", position: "right"}
                            });
                        })
                })
                .catch(error => {
                    showMessage({
                        message: 'خطا',
                        description: 'خطا در ورود کاربر.',
                        type: "danger",
                        style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                        titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                        textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                        icon: {icon: "success", position: "right"}
                    });
                })
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

    onAgencyCodeTextChange = (text) => {
        this.setState({
            agencyCode: text
        })
    };

    onUsernameFocus = () => {
        this.setState({
            isUsernameFocused: true
        })
    };

    onPasswordFocus = () => {
        this.setState({
            isPasswordFocused: true
        })
    };

    onAgencyCodeFocus = () => {
        this.setState({
            isAgencyCodeFocused: true
        })
    };

    onUsernameBlur = () => {
        this.setState({
            isUsernameFocused: false
        })
    };

    onPasswordBlur = () => {
        this.setState({
            isPasswordFocused: false
        })
    };

    onAgencyCodeBlur = () => {
        this.setState({
            isAgencyCodeFocused: false
        })
    };

    onShowPasswordChange = () => {
        this.setState({
            isSecureTextEntry: !this.state.isSecureTextEntry
        })
    };

    onRegisterPress = () => {
        let {navigation} = this.props;
        navigation.navigate('RegisterScreen')
    };

    handleFingerPrintPopup = () => {
        this.onBiometricLoginPress();
    };

    render() {
        let {username, password, agencyCode, isUsernameFocused, isPasswordFocused, isAgencyCodeFocused, isSecureTextEntry, biometricEnable} = this.state;
        return (
            <View>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView>
                    <ImageBackground source={require('../images/loginBg.jpeg')} style={styles.backgroundImage}>
                        <View>

                            <Spinner
                                visible={this.state.spinner}
                                textContent={"لطفا منتظر بمانید..."}
                                textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                                overlayColor={'#000000dd'}
                            />
                            {biometricEnable &&
                            <FingerprintPopup handlePopupDismissedLegacy={this.handleFingerPrintPopup}
                                              onAuthenticate={this.handleFingerPrintPopup}
                                              handlePopupDismissed={this.handleFingerPrintPopup}/>
                            }
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""}
                                                  keyboardVerticalOffset={Platform.OS === 'ios' ? -70 : 70}
                                                  enabled={true}
                                                  style={{
                                                      height: '100%',
                                                  }}>
                                <Image style={{width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center'}}
                                       source={require('../images/gilan-file-logo.png')}/>
                                <ScrollView style={styles.container}>

                                    <View style={styles.inputContainer}>
                                        <View style={{
                                            borderBottomWidth: 2,
                                            borderBottomColor: isAgencyCodeFocused ? '#0f0' : '#f0f0f0',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TextInput onBlur={this.onAgencyCodeBlur}
                                                       onFocus={this.onAgencyCodeFocus}
                                                       style={styles.input} placeholder={"کد آژانس"}
                                                       value={agencyCode} onChangeText={this.onAgencyCodeTextChange}
                                            textAlign={'right'}/>
                                            <Image source={require('../images/contact.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <View style={{
                                            borderBottomWidth: 2,
                                            borderBottomColor: isUsernameFocused ? '#0f0' : '#f0f0f0',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TextInput onBlur={this.onUsernameBlur}
                                                       onFocus={this.onUsernameFocus}
                                                       style={styles.input} placeholder={"نام کاربری"}
                                                       value={username} onChangeText={this.onUsernameTextChange}/>
                                            <Image source={require('../images/contact.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <View style={{
                                            borderBottomWidth: 2,
                                            borderBottomColor: isPasswordFocused ? '#0f0' : '#f0f0f0',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {biometricEnable &&
                                            <TouchableOpacity onPress={this.onBiometricPress}>
                                                <Image style={{
                                                    width: 20,
                                                    height: 20,
                                                    resizeMode: 'contain',
                                                    tintColor: 'blue'
                                                }}
                                                       source={require('../images/biometric.png')}/>
                                            </TouchableOpacity>
                                            }
                                            <TextInput secureTextEntry={!isSecureTextEntry}
                                                       onBlur={this.onPasswordBlur}
                                                       onFocus={this.onPasswordFocus}
                                                       style={styles.input} placeholder={"کلمه عبور"}
                                                       value={password} onChangeText={this.onPasswordTextChange}/>
                                            <Image source={require('../images/password.png')}/>
                                        </View>
                                    </View>


                                </ScrollView>
                                <View style={{marginBottom: Platform.OS === 'ios' ? 120 : 0}}>
                                    <TouchableOpacity onPress={this.onLoginPress} style={{
                                        alignSelf: 'center',
                                        backgroundColor: '#13213c',
                                        width: '80%',
                                        marginTop: 50,
                                        borderRadius: 20,
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 20,
                                            fontFamily: 'IRANSansMobileFaNum-Bold'
                                        }}>{'ورود'}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.onRegisterPress} style={{
                                        alignSelf: 'center',
                                        width: '80%',
                                        marginTop: 10,
                                        marginBottom: 10,
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{
                                            color: '#9a184c',
                                            fontSize: 18,
                                            fontFamily: 'IRANSansMobileFaNum-Bold',
                                        }}>{'ثبت نام'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>

                        </View>
                    </ImageBackground>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomView}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: '80%'
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
        marginHorizontal: 10,
        color: '#000'
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
