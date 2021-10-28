import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView, Image} from 'react-native';
import {Formik} from 'formik';
import {TextInput, Button, Appbar} from 'react-native-paper';
import * as userActions from "../../utils/redux/actions/userLogin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Picker} from '@react-native-picker/picker';
import CustomDatePicker from "../components/CustomDatePicker";
import BaseScreen from "../base/BaseScreen";

class HomeMenuScreen extends Component {
    render() {
        return (
            <BaseScreen navigation={this.props.navigation} title={'خانه'}>
                <ScrollView style={styles.container}>
                    <Image style={{width: 200, height: 100, resizeMode: 'contain', alignSelf: 'center'}} source={require('../images/gilan-file-logo.png')}/>
                    <View>

                    </View>
                </ScrollView>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeMenuScreen)
