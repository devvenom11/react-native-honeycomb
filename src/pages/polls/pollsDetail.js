import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import Header from '../../component/header'
import {connect} from "react-redux";
var {height, width} = Dimensions.get('window')


export default class PellsDetail extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title={'POLLS'}
                    rightButton={require('../../../assets/general/black/person.png')}
                    leftPress={()=>this.props.navigation.pop()}
                    rightPress={()=>this.props.navigation.pop()}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        width: width,
        height: 189,
        resizeMode: 'stretch'
    },
    info: {
        padding: 18
    },
    title: {
        fontSize: 20,
        fontFamily: 'PingFang-SC-Medium',
        color: "#F27B28"
    },
    description: {
        lineHeight: 22,
        color:'#8F8E94',
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        marginBottom: 10
    },
    articleInfo: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10
    },
    author: {
        fontSize: 10,
        color: "#3B3B3E" ,
        fontFamily: 'PingFang-SC-Medium',
        marginRight: 5,
    },
    time: {
        fontSize: 10,
        fontFamily: 'PingFang-SC-Medium',
        color: "#C7C7CD"
    }
});
