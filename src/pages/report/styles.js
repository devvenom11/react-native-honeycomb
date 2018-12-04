import {Dimensions, StyleSheet} from "react-native";
var { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    newsCards: {
        flex:1,
        padding: 20,
        alignItems: 'center'
    },
    headeringView: {
        marginTop: 19,
    },
    headerTitle: {
        fontFamily: 'PingFang-SC-Regular',
        color: '#000000',
        fontSize: 16
    },
    headerDescription:{
        textAlign: 'center',
        fontSize: 12,
        color: '#B7B7B7'
    },
    fileUpload: {
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth:1,
        borderColor: '#E3E3E3'
    },
    dragFile: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Semibold',
        color: '#B7B7B7'
    },
    dragFile_or: {
        fontSize: 12,
        fontFamily: 'PingFang-SC-Semibold',
        color: '#B7B7B7'
    },
    browse_your_conputer: {
        fontSize: 12,
        fontFamily: 'PingFang-SC-Semibold',
        color: '#F27B28'
    },
    description: {
        borderWidth:1,
        borderColor: '#E3E3E3',
        borderRadius: 5,
        height: 200
    }
});