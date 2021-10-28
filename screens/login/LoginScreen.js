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
    ImageBackground
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../utils/redux/actions/userLogin';
import Services from "../../utils/services/Services";
import Spinner from "react-native-loading-spinner-overlay";
import {showMessage, hideMessage} from "react-native-flash-message";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: 'admin',
            isUsernameFocused: false,
            isPasswordFocused: false,
            isSecureTextEntry: false,
            spinner: false
        }
    }

    componentDidMount() {

    }

    hideLoading = () => {
        this.setState({spinner: false})
    };

    onLoginPress = () => {
        let {user, actions, navigation} = this.props;
        this.setState({spinner: true}, () => {
            Services.signInPanel({username: this.state.username, password: this.state.password}).then((res) => {
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
            }).catch(() => {
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

    onShowPasswordChange = () => {
        this.setState({
            isSecureTextEntry: !this.state.isSecureTextEntry
        })
    };

    render() {
        const {locale} = this.props;
        let {username, password, isUsernameFocused, isPasswordFocused, isSecureTextEntry} = this.state;
        return (
            <View>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView>
                    <ImageBackground source={require('../images/login-bg.jpeg')} style={styles.backgroundImage}>
                        <View>

                            <Spinner
                                visible={this.state.spinner}
                                textContent={"لطفا منتظر بمانید..."}
                                textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                                overlayColor={'#000000dd'}
                            />
                            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={70} enabled={true}
                                                  style={{
                                                      height: '100%',
                                                  }}>
                                <Image style={{width: 200, height: 300, resizeMode: 'contain', alignSelf: 'center'}} source={require('../images/gilan-file-logo.png')}/>
                                <ScrollView style={styles.container}>

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
                                            <TextInput secureTextEntry={!isSecureTextEntry}
                                                       onBlur={this.onPasswordBlur}
                                                       onFocus={this.onPasswordFocus}
                                                       style={styles.input} placeholder={"کلمه عبور"}
                                                       value={password} onChangeText={this.onPasswordTextChange}/>
                                            <Image source={require('../images/password.png')}/>
                                        </View>
                                    </View>

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
                                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
