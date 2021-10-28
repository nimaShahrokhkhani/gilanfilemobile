import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import BaseScreen from "../base/BaseScreen";

MapboxGL.setAccessToken('pk.eyJ1IjoibmltYXNoYWhyb2toa2hhbmkxMzcwIiwiYSI6ImNrdWU4cWQycjFodjQyem1uYnFjOHhyc2kifQ.Ojr2oC8o5_Aw7FbtdKwROQ');

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'tomato'
    },
    map: {
        flex: 1
    }
});

export default class MapScreen extends Component {
    render() {
        return (
            <BaseScreen navigation={this.props.navigation} title={'نقشه'}>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView style={styles.map}/>
                    </View>
                </View>
            </BaseScreen>
        );
    }
}
