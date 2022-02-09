import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import createNativeStackNavigator from "@react-navigation/native-stack/src/navigators/createNativeStackNavigator";
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/register/RegisterScreen";
import HomeScreen from "./screens/home/HomeScreen";
import FlashMessage from "react-native-flash-message";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <View style={{flex: 1}}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} initialRouteName="Login">
                    <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                    <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
            <FlashMessage position="top" />
        </View>
    );
}


// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import createNativeStackNavigator from "@react-navigation/native-stack/src/navigators/createNativeStackNavigator";
// import LoginScreen from "./screens/login/LoginScreen";
// import {createStackNavigator} from '@react-navigation/stack';
// import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button} from 'react-native';
// import {createAppContainer, SafeAreaView} from 'react-navigation';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import FlashMessage from "react-native-flash-message";
//
// const MyNavigator = createStackNavigator({
//     LoginScreen: {
//         screen: LoginScreen
//     },
// });
//
// const MyApp = createAppContainer(MyNavigator);
//
// class App extends React.Component {
//     render() {
//         let {locale, user, actions} = this.props;
//         return (
//             <View style={{flex: 1}}>
//                 <FlashMessage position="top" /><MyApp
//                 screenProps={
//                     {
//                         locale: locale,
//                         user: user,
//                         actions: actions
//                     }
//                 }/>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     drawerTopBar: {
//         flexDirection: 'row',
//         backgroundColor: '#13213c',
//         alignItems: 'flex-end',
//         justifyContent: 'flex-end',
//         paddingTop: 10
//     },
//     icon: {
//         tintColor: '#fff',
//         width: 20,
//         height: 20
//     },
//     userIcon: {
//         tintColor: '#fff',
//         width: 60,
//         height: 60
//     },
//     iconMenu: {
//         tintColor: '#fff',
//         width: 20,
//         height: 20,
//         margin: 20
//     },
//     contactContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal: 20,
//         marginBottom: 30,
//     },
//     userLoginContainer: {
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 30,
//         marginTop: 10
//     },
//     username: {
//         fontFamily: 'IRANSansMobileFaNum-Bold',
//         color: '#fff',
//         marginTop: 10
//     },
//     btnContainer: {
//         flexDirection: 'row',
//         marginTop: 10
//     },
//     accountBtnText: {
//         fontFamily: 'IRANSansMobileFaNum-Light',
//         fontSize: 12,
//     },
//     accountBtn: {
//         padding: 10,
//         backgroundColor: '#fff',
//         borderRadius: 20,
//         marginHorizontal: 2
//     }
// });
// const mapStateToProps = state => ({
//     user: state.user.user,
// });
//
// const ActionCreators = Object.assign(
//     {},
//     userActions
// );
//
// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(ActionCreators, dispatch),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(App)
