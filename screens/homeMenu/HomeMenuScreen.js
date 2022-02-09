import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Image, Text, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {TextInput, Button, Appbar} from 'react-native-paper';
import * as userActions from "../../utils/redux/actions/userLogin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Picker} from '@react-native-picker/picker';
import CustomDatePicker from "../components/CustomDatePicker";
import BaseScreen from "../base/BaseScreen";

class HomeMenuScreen extends Component {

    navigateToMenu(menu) {
        let {navigation} = this.props;
        navigation.navigate(menu)
    }

    render() {
        return (
            <BaseScreen navigation={this.props.navigation} title={'خانه'}>
                <ImageBackground source={require('../images/homeBg.jpg')} style={styles.backgroundImage}>
                <ScrollView style={styles.container}>
                    <Image style={{width: 200, height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 50}}
                           source={require('../images/gilan-file-logo.png')}/>
                    <View>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => this.navigateToMenu('افزودن فایل')} style={styles.menuItem}>
                                <View style={styles.menuItemContainer}>
                                    <Image style={{width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center'}}
                                           source={require('../images/addFile.png')}/>
                                    <Text style={styles.menuText}>افزودن فایل</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigateToMenu('جستجو فایل')} style={styles.menuItem}>
                                <View style={styles.menuItemContainer}>
                                    <Image style={{width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center'}}
                                           source={require('../images/searchFile.png')}/>
                                    <Text style={styles.menuText}>جستجو فایل</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigateToMenu('دریافت فایل')} style={styles.menuItem}>
                                <View style={styles.menuItemContainer}>
                                    <Image style={{width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center'}}
                                           source={require('../images/getFiles.png')}/>
                                    <Text style={styles.menuText}>دریافت فایل</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity onPress={() => this.navigateToMenu('زونکن')} style={styles.menuItem}>
                                <View style={styles.menuItemContainer}>
                                    <Image style={{width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center'}}
                                           source={require('../images/zonkan.png')}/>
                                    <Text style={styles.menuText}>زونکن</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigateToMenu('نقشه')} style={styles.menuItem}>
                                <View style={styles.menuItemContainer}>
                                    <Image style={{width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center'}}
                                           source={require('../images/map.png')}/>
                                    <Text style={styles.menuText}>نقشه</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigateToMenu('تنظیمات')} style={styles.menuItem}>
                                <View style={styles.menuItemContainer}>
                                    <Image style={{width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center'}}
                                           source={require('../images/settings.png')}/>
                                    <Text style={styles.menuText}>تنظیمات</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeMenuScreen)
