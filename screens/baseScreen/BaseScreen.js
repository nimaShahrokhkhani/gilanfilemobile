import {View, TouchableOpacity, Text, StatusBar, StyleSheet, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../utils/redux/actions/userLogin';
import FlashMessage from "react-native-flash-message";

class BaseScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.container}>
                        <View style={styles.topBar}>
                            <View style={styles.topBarStart}>
                            </View>
                            <View style={styles.topBarEnd}>
                            </View>
                        </View>

                        <View style={styles.container}>
                            {children}
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomView}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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
        backgroundColor: '#13213c',
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
        width: 25,
        height: 25
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
    hamburgerContainer: {
        marginHorizontal: 10,
    }
});

const mapStateToProps = state => ({
    user: state.user.user,
});

const ActionCreators = Object.assign(
    {},
    userActions,
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseScreen)
