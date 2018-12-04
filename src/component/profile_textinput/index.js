import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';

export default class ProfileTextInput extends Component {
    render() {
        const {name, icon} = this.props
        return (
            <View style={styles.profileInput}>
                <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{tintColor: '#000000'}} source={icon}/>
                    <Text style={styles.profileInputText}>{name}</Text>
                </View>
                <TextInput
                    {...this.props}
                    style={styles.profileTextInput}
                />
            </View>
        )
    }
}

const styles = Object.assign({}, StyleSheet.create({
    profileInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor: '#B7B7B7',
        marginTop: 24
    },
    profileInputText: {
        marginLeft: 7,
        fontFamily: 'PingFang-SC-Regular',
        color: '#000000',
    },
    profileTextInput: {
        flex:1.5,
        padding:9,
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 12,
        height: 42,
        color: '#B7B7B7'
    }
}));