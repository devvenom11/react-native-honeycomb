import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export default class App extends Component {
    componentWillMount() {
        setTimeout(() => {
            // this.props.navigation.navigate('Login')
            this.props.navigation.replace('Login')
        }, 500);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={{
                    alignContent: 'center',

                    width: '80%',
                    height: '80%'
                }}

                    source={require('../../../assets/images/logo_retina.png')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
