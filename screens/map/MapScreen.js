import React, {Component} from 'react';
import {StyleSheet, View, Animated, Text, TouchableOpacity, Image} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import BaseScreen from "../base/BaseScreen";
import dbHelper from "../../helper/db/dbHelper";
import {FilesSchema} from "../../helper/schema/fileSchema";
import Services from "../../utils/services/Services";
import _ from "underscore";
import Styles from './Styles';
import StringUtils from "../../utils/string/StringUtils";

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

    constructor(props) {
        super(props);

        this.state = {
            markerCoordinate: [-1.54781, 47.2155166],
            fileList: []
        };
    }

    componentDidMount() {
        dbHelper.find(FilesSchema, 'files').then(files => {
            this.setState({
                fileList: files
            })
        });
    }

    onLongPress = (map) => {
        this.setState({
            markerCoordinate: map.geometry.coordinates
        })
    }

    showCallOut = (marker) => {
        let coordinate = [parseFloat(marker.marker.split(',')[0]), parseFloat(marker.marker.split(',')[1])];
        this.moveCameraToCoordinate(coordinate)
        this._callOutView.setMarker(marker);
    }

    moveCameraToCoordinate = (coordinate) => {
        this._camera.setCamera({
            centerCoordinate: coordinate,
            zoomLevel: 15,
            animationDuration: 2000
        })
    }

    render() {
        return (
            <BaseScreen navigation={this.props.navigation} title={'نقشه'}>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView
                            style={styles.map}
                            onPress={() => this._callOutView.hideCallOut()}
                            onLongPress={this.onLongPress}>
                            <MapboxGL.Camera
                                ref={ref => this._camera = ref}
                                centerCoordinate={[49.589674, 37.295316]}
                                zoomLevel={12}
                                defaultSettings={{
                                    centerCoordinate: [49.589674, 37.295316],
                                    zoomLevel: 5,
                                }}
                            />
                            {this.state.fileList && this.state.fileList.map((file) => {
                                if (!_.isEmpty(file.marker)) {
                                    return (
                                        <MapboxGL.PointAnnotation id={file._id.toString()}
                                                                  onSelected={() => {
                                                                      this.showCallOut(file)
                                                                  }}
                                                                  coordinate={[parseFloat(file.marker.split(',')[0]), parseFloat(file.marker.split(',')[1])]}/>
                                    )
                                }
                            })}
                        </MapboxGL.MapView>
                    </View>
                </View>
                <CallOutView ref={ref => this._callOutView = ref}/>
            </BaseScreen>
        );
    }
}

class CallOutView extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            marker: undefined
        };
        this._callOutPosition = new Animated.Value(0);
        this._callOutOpacity = new Animated.Value(0);
        this.callOutIsVisible = false;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(this.state.marker, nextState.marker)
    }

    setMarker = (marker) => {
        if (!this.callOutIsVisible || JSON.stringify(marker) !== JSON.stringify(this.state.marker)) {
            this.setState({marker});
            this.showCallOut();
        }
    }

    showCallOut = () => {
        this.callOutIsVisible = true;
        this._callOutOpacity.setValue(0);
        Animated.parallel([
            Animated.timing(this._callOutPosition, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300
            }),
            Animated.timing(this._callOutOpacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300
            })
        ]).start()
    }

    hideCallOut = () => {
        this.callOutIsVisible = false;
        Animated.parallel([
            Animated.timing(this._callOutPosition, {
                toValue: 0,
                useNativeDriver: true,
                duration: 300
            }),
            Animated.timing(this._callOutOpacity, {
                toValue: 0,
                useNativeDriver: true,
                duration: 300
            })
        ]).start()
    }

    render() {
        let {marker} = this.state;

        let anim = {
            transform: [
                {
                    translateY: this._callOutPosition.interpolate({
                        inputRange: [0, 1],
                        outputRange: [250, 0]
                    })
                }
            ]
        }

        if (marker) {
            return (
                <Animated.View style={[Styles.calloutContainer, anim]}>
                    <Animated.View style={{width: '100%', opacity: this._callOutOpacity}}>
                        <TouchableOpacity activeOpacity={2} style={{backgroundColor: '#f0f0f0', height: 250}}>
                            <View style={Styles.fileItemContainer}>
                                <View style={Styles.imageContainer}>
                                    {!_.isEmpty(marker.imageUrl) ?

                                        <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                                               source={{uri: JSON.parse(marker.imageUrl).assets[0].uri}}/> :

                                        <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                                               source={require('../images/home-icon.png')}/>
                                    }
                                </View>
                                <View style={Styles.fileInfoContainer}>
                                    <View style={Styles.ownerContainer}>
                                        <Text style={Styles.ownerText}>
                                            {marker.owner}
                                        </Text>
                                    </View>
                                    <View style={Styles.extraInfoContainer}>
                                        <Text style={Styles.regionCodeText}>
                                            {marker.regionCode}
                                        </Text>
                                        <Text style={Styles.regionNameText}>
                                            {marker.regionName}
                                        </Text>
                                    </View>
                                    <View style={Styles.extraInfoContainer}>
                                        <Text style={Styles.typeText}>
                                            {marker.type}
                                        </Text>
                                        <Text style={Styles.saleText}>
                                            {marker.sale}
                                        </Text>
                                        <View style={Styles.floorContainer}>
                                            <Text style={Styles.floorTextTitle}>
                                                طبقه:
                                            </Text>
                                            <Text style={Styles.floorTextValue}>
                                                {!_.isEmpty(marker.unitFloor) ? StringUtils.convertNumbersToPersian(marker.unitFloor) : '0'}
                                            </Text>
                                        </View>
                                        <View style={Styles.floorContainer}>
                                            <Text style={Styles.floorTextTitle}>
                                                مساحت:
                                            </Text>
                                            <Text style={Styles.floorTextValue}>
                                                {!_.isEmpty(marker.area) ? StringUtils.convertNumbersToPersian(marker.area) : '0'}
                                            </Text>
                                        </View>
                                    </View>
                                    {(marker.sale === 'فروش' || marker.sale === 'معاوضه' || marker.sale === 'مشارکت') ?
                                        <View>
                                            <View style={Styles.extraInfoContainer}>
                                                <View style={Styles.floorContainer}>
                                                    <Text style={Styles.floorTextTitle}>
                                                        قیمت کل:
                                                    </Text>
                                                    <Text style={Styles.floorTextValue}>
                                                        {!_.isEmpty(marker.totalPrice) ? StringUtils.convertNumbersToPersian(StringUtils.commify(marker.totalPrice)) : '0'}
                                                    </Text>
                                                    <Text style={Styles.textCurrency}>
                                                        تومان
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={Styles.extraInfoContainer}>
                                                <View style={Styles.floorContainer}>
                                                    <Text style={Styles.floorTextTitle}>
                                                        قیمت متری:
                                                    </Text>
                                                    <Text style={Styles.floorTextValue}>
                                                        {!_.isEmpty(marker.unitPrice) ? StringUtils.convertNumbersToPersian(StringUtils.commify(marker.unitPrice)) : '0'}
                                                    </Text>
                                                    <Text style={Styles.textCurrency}>
                                                        تومان
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={Styles.extraInfoContainer}>
                                                <View style={Styles.floorContainer}>
                                                    <Text style={Styles.floorTextTitle}>
                                                        رهن:
                                                    </Text>
                                                    <Text style={Styles.floorTextValue}>
                                                        {!_.isEmpty(marker.mortgage) ? StringUtils.convertNumbersToPersian(StringUtils.commify(marker.mortgage)) : '0'}
                                                    </Text>
                                                    <Text style={Styles.textCurrency}>
                                                        تومان
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={Styles.extraInfoContainer}>
                                                <View style={Styles.floorContainer}>
                                                    <Text style={Styles.floorTextTitle}>
                                                        اجاره:
                                                    </Text>
                                                    <Text style={Styles.floorTextValue}>
                                                        {!_.isEmpty(marker.rent) ? StringUtils.convertNumbersToPersian(StringUtils.commify(marker.rent)) : '0'}
                                                    </Text>
                                                    <Text style={Styles.textCurrency}>
                                                        تومان
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                    <View style={Styles.floorContainer}>
                                        <Text style={Styles.address} numberOfLines={1}>
                                            {marker.address}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            )
        } else {
            return null;
        }
    }
}
