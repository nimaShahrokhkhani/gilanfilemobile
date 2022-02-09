import {
    Dimensions,
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },

    mapContainer: {
        flex: 1,
        zIndex: 0
    },

    calloutContainer:{
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 5,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: -5},
        paddingBottom: 20,
        paddingTop: 10
    },

    switchButtonContainer: (topSafeAreaHeight) => {
        return ({
            position: 'absolute',
            zIndex: 1002,
            top: 20 + topSafeAreaHeight,
            alignSelf: 'center'
        })
    },

    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        marginVertical: 5
    },

    iconContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 8
    },

    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    toolBarContainer: (topSafeAreaHeight) => {
        return ({
            position: 'absolute',
            top: 75 + topSafeAreaHeight,
            start: 25,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#000000' + 'bb',
            paddingVertical: 10,
            borderRadius: 20
        })
    },

    toolBarButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        paddingHorizontal: 10
    },

    callOutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '100%'
    },

    callOutCloseButton: {
        padding: 15
    },

    labelTitle: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        fontSize: 18,
        color: '#13213c',
    },

    fileItemContainer: {
        height: 200,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#a0a0a0',
        flexDirection: 'row-reverse',
        // backgroundColor: '#f0f',
    },
    fileListContainer: {
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fileInfoContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    ownerContainer: {
        alignItems: 'flex-end'
    },
    floorContainer: {
        flexDirection: 'row-reverse'
    },
    ownerText: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        marginVertical: 5
    },
    saleText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#b00000'
    },
    typeText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#b00000'
    },
    floorTextTitle: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginRight: 5,
        color: '#b00000'
    },
    floorTextValue: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        color: '#b00000'
    },
    textCurrency: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginLeft: 5,
        color: '#b00000'
    },
    regionCodeText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#00004e'
    },
    regionNameText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#00004e'
    },
    address: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#00001c',
        overflow: 'hidden'
    },
    extraInfoContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row-reverse'
    },
})
