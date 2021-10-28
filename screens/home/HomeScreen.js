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
import {createDrawerNavigator} from '@react-navigation/drawer';
import AddFileScreen from "../addFile/AddFileScreen";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import * as userActions from "../../utils/redux/actions/userLogin";
import {connect} from 'react-redux';
import {DrawerItems} from 'react-navigation-drawer';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import MapScreen from "../map/MapScreen";
import HomeMenuScreen from "../homeMenu/HomeMenuScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#13213c'}}>
                <View style={styles.drawerTopBar}>
                    {(props.screenProps.user && !(Object.keys(props.screenProps.user).length === 0 && props.screenProps.user.constructor === Object)) ?
                        <View style={styles.userLoginContainer}>
                            <Image source={require('../images/user-128.png')}
                                   style={styles.userIcon}/>
                            <Text style={styles.username}>{props.screenProps.user.username}</Text>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={() => {
                                    props.screenProps.actions.userLogin({});
                                    props.navigation.dispatch(DrawerActions.toggleDrawer())
                                }} style={styles.accountBtn}>
                                    <Text
                                        style={styles.accountBtnText}>خروج</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.accountBtn}>
                                    <Text
                                        style={styles.accountBtnText}>ویرایش</Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}
                                          style={styles.contactContainer}>
                            <Text style={{
                                color: '#fff',
                                marginEnd: 10
                            }}>ورود</Text>
                            <Image source={require('../images/contact.png')}
                                   style={styles.icon}/>
                        </TouchableOpacity>
                    }
                </View>
                <ScrollView style={{flex: 1, backgroundColor: 'rgba(252,251,245,1)'}}>
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

class HomeScreen extends React.Component {
    render() {
        let {user} = this.props;
        return (
            <Drawer.Navigator screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerLabelStyle: {
                    textAlign: 'right'
                }
            }} drawerContent={(props) => {
                props.screenProps = {
                    user: user,
                };
                return <CustomDrawerContent {...props} />
            }}>
                <Drawer.Screen name="خانه" component={HomeMenuScreen}/>
                <Drawer.Screen name="افزودن فایل" component={AddFileScreen}/>
                <Drawer.Screen name="نقشه" component={MapScreen}/>
            </Drawer.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    drawerTopBar: {
        flexDirection: 'row',
        backgroundColor: '#13213c',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 10
    },
    icon: {
        tintColor: '#fff',
        width: 20,
        height: 20
    },
    userIcon: {
        tintColor: '#fff',
        width: 60,
        height: 60
    },
    iconMenu: {
        tintColor: '#fff',
        width: 20,
        height: 20,
        margin: 20
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    userLoginContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 10
    },
    username: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        color: '#fff',
        marginTop: 10
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    accountBtnText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        fontSize: 12,
    },
    accountBtn: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 2
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
