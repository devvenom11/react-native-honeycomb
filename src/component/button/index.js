import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class Button extends Component {

    render() {
        const {title, textStyle, style, onPress, image} = this.props
        return (
            <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
                <View style={styles.buttonView}>
                    {image && image}
                    <Text style={[styles.textStyle, textStyle]}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#FAB251',
        alignItems: 'center',
        justifyContent:'center',
        height: 50,
        borderRadius: 5,
        marginTop: 26
    },
    buttonView: {flex:1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'},
    textStyle: {color: 'white', fontSize: 14, fontFamily: 'PingFang-SC-Regular'}
});