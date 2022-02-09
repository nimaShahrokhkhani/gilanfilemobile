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
    ImageBackground,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../utils/redux/actions/userLogin';
import Services from "../../utils/services/Services";
import Spinner from "react-native-loading-spinner-overlay";
import {showMessage, hideMessage} from "react-native-flash-message";
import DeviceInfo from 'react-native-device-info';

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isUsernameFocused: false,
            isPasswordFocused: false,
            isSecureTextEntry: false,
            isAgencyCodeFocused: false,
            agencyCode: '',
            isNameFocused : false,
            name: '',
            isLastNameFocused: false,
            lastName: '',
            isRepeatPasswordFocused: false,
            repeatPassword: '',
            spinner: false
        }
    }

    componentDidMount() {

    }

    hideLoading = () => {
        this.setState({spinner: false})
    };

    onRegisterPress = () => {
        let {user, actions, navigation} = this.props;
        let {agencyCode, name, lastName, username, password, repeatPassword} = this.state;
        if (password === repeatPassword) {
            this.setState({spinner: true}, () => {
                let requestObject = {
                    agencyCode : agencyCode,
                    deviceId : DeviceInfo.getDeviceId(),
                    name : name,
                    lastName : lastName,
                    username : username,
                    password : password,
                };
                Services.registerMobilePanel(requestObject).then((res) => {
                    Services.signInPanel({agencyCode : agencyCode, username: username, password: password}).then((res) => {
                        this.hideLoading();
                        showMessage({
                            message: 'موفق',
                            description: 'کاربر با موفقیت در سامانه ثبت شد.',
                            type: "success",
                            style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                            titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                            textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                            icon: {icon: "success", position: "right"}
                        });
                        actions.userLogin(res.data);
                        navigation.navigate('HomeScreen')
                    }).catch(() => {
                        this.hideLoading();
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
                }).catch(() => {
                    this.hideLoading();
                    showMessage({
                        message: 'خطا',
                        description: 'خطا در ثبت کاربر.',
                        type: "danger",
                        style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                        titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                        textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                        icon: {icon: "success", position: "right"}
                    });
                })
            })
        } else {
            showMessage({
                message: 'خطا',
                description: 'رمز عبور و تکرار رمز عبور یکسان نیستند.',
                type: "danger",
                style: {textAlign: 'right', width: '100%', justifyContent: 'flex-end'},
                titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                icon: {icon: "success", position: "right"}
            });
        }
    };

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

    onNameTextChange = (text) => {
        this.setState({
            name: text
        })
    };

    onLastNameTextChange = (text) => {
        this.setState({
            lastName: text
        })
    };

    onRepeatPasswordTextChange = (text) => {
        this.setState({
            repeatPassword: text
        })
    };

    onAgencyCodeFocus = () => {
        this.setState({
            isAgencyCodeFocused: true
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

    onNameFocus = () => {
        this.setState({
            isNameFocused: true
        })
    };

    onLastNameFocus = () => {
        this.setState({
            isLastNameFocused: true
        })
    };

    onRepeatPasswordFocus = () => {
        this.setState({
            isRepeatPasswordFocused: true
        })
    };

    onAgencyCodeBlur = () => {
        this.setState({
            isAgencyCodeFocused: false
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

    onNameBlur = () => {
        this.setState({
            isNameFocused: false
        })
    };

    onLastNameBlur = () => {
        this.setState({
            isLastNameFocused: false
        })
    };

    onRepeatPasswordBlur = () => {
        this.setState({
            isRepeatPasswordFocused: false
        })
    };

    onShowPasswordChange = () => {
        this.setState({
            isSecureTextEntry: !this.state.isSecureTextEntry
        })
    };

    render() {
        const {locale} = this.props;
        let {
            isAgencyCodeFocused,
            agencyCode,
            isNameFocused,
            name,
            isLastNameFocused,
            lastName,
            isRepeatPasswordFocused,
            repeatPassword,
            username,
            password,
            isUsernameFocused,
            isPasswordFocused,
            isSecureTextEntry
        } = this.state;
        return (
            <View>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView>
                    <ImageBackground source={require('../images/register-bg.jpg')} style={styles.backgroundImage}>
                        <View style={{flex: 1}}>

                            <Spinner
                                visible={this.state.spinner}
                                textContent={"لطفا منتظر بمانید..."}
                                textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                                overlayColor={'#000000dd'}
                            />
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""} keyboardVerticalOffset={Platform.OS === 'ios' ? -70 : 70} enabled={true}
                                                  style={{
                                                      height: '100%',
                                                      flex: 1
                                                  }}>
                                <Image style={{width: 150, height: 150, resizeMode: 'contain', alignSelf: 'center'}} source={require('../images/gilan-file-logo.png')}/>
                                <ScrollView style={styles.container}
                                            contentContainerStyle={{flexGrow: 1}}
                                            keyboardShouldPersistTaps={'handled'}>

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
                                                       placeholderTextColor="#000"
                                                       value={agencyCode} onChangeText={this.onAgencyCodeTextChange}/>
                                            <Image source={require('../images/contact.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <View style={{
                                            borderBottomWidth: 2,
                                            borderBottomColor: isNameFocused ? '#0f0' : '#f0f0f0',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TextInput onBlur={this.onNameBlur}
                                                       onFocus={this.onNameFocus}
                                                       style={styles.input} placeholder={"نام"}
                                                       placeholderTextColor="#000"
                                                       value={name} onChangeText={this.onNameTextChange}/>
                                            <Image source={require('../images/contact.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <View style={{
                                            borderBottomWidth: 2,
                                            borderBottomColor: isLastNameFocused ? '#0f0' : '#f0f0f0',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TextInput onBlur={this.onLastNameBlur}
                                                       onFocus={this.onLastNameFocus}
                                                       style={styles.input} placeholder={"نام خانوادگی"}
                                                       placeholderTextColor="#000"
                                                       value={lastName} onChangeText={this.onLastNameTextChange}/>
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
                                                       placeholderTextColor="#000"
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
                                            <TextInput secureTextEntry={!isSecureTextEntry}
                                                       onBlur={this.onPasswordBlur}
                                                       onFocus={this.onPasswordFocus}
                                                       style={styles.input} placeholder={"کلمه عبور"}
                                                       placeholderTextColor="#000"
                                                       value={password} onChangeText={this.onPasswordTextChange}/>
                                            <Image source={require('../images/password.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <View style={{
                                            borderBottomWidth: 2,
                                            borderBottomColor: isRepeatPasswordFocused ? '#0f0' : '#f0f0f0',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TextInput secureTextEntry={!isSecureTextEntry}
                                                       onBlur={this.onRepeatPasswordBlur}
                                                       onFocus={this.onRepeatPasswordFocus}
                                                       style={styles.input} placeholder={"تکرار کلمه عبور"}
                                                       placeholderTextColor="#000"
                                                       value={repeatPassword} onChangeText={this.onRepeatPasswordTextChange}/>
                                            <Image source={require('../images/password.png')}/>
                                        </View>
                                    </View>
                                </ScrollView>
                                <View style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    flexDirection: 'row'
                                }}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('LoginScreen')
                                }} style={{
                                    alignSelf: 'center',
                                    backgroundColor: '#13213c',
                                    flex: 1,
                                    marginHorizontal: 5,
                                    borderRadius: 20,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        fontFamily: 'IRANSansMobileFaNum-Bold'
                                    }}>{'بازگشت'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onRegisterPress} style={{
                                    alignSelf: 'center',
                                    backgroundColor: '#13213c',
                                    flex: 1,
                                    marginHorizontal: 5,
                                    borderRadius: 20,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        fontFamily: 'IRANSansMobileFaNum-Bold'
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
        color: '#000',
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
