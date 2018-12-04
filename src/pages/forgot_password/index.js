import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TextInput from '../../component/textInput'
import Button from '../../component/button'
import Icon from 'react-native-vector-icons/EvilIcons'

class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            validated: false
        }
    }
    onLogin = () => {
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.closeView}>
                    <View style={{flex:1}} />
                    {/*<Image source={require('../../../assets/images/close.png')} />*/}
                </View>
                <Image style={styles.logo} source={require('../../../assets/logo/honeycomb.png')} />
                <View style={{flex:1, paddingHorizontal: 30}}>
                    <View style={{marginTop:43, marginBottom: 15}}>
                        <Text style={styles.garyText}>
                            Please enter your phone number to reset your
                            password. You will receive and email and text
                            message with a reset link
                        </Text>
                    </View>
                    <TextInput
                        icon={require('../../../assets/general/black/app_push.png')}
                        placeholder='Mobile'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <Button style={{backgroundColor: '#D8AE24', marginTop: 37}} title={'RESET'} onPress={this.onLogin}/>
                </View>
                <TouchableOpacity style={styles.close} onPress={()=>this.props.navigation.pop()}>
                    <Icon name={'close'} size={25} color={'#3B3B3E'} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    closeView: {
        flexDirection: 'row',
    },
    logo: {
        marginVertical: 45,
        alignSelf: 'center',
    },
    garyText: {
        color: '#B7B7B7',
        fontSize:12,
        fontFamily: 'PingFang-SC-Regular',
        textAlign: 'center'
    },
    colorText: {
        color: '#D8AE24',
        fontSize:12,
        fontFamily: 'PingFang-SC-Regular'
    },
    bottomView: {
        alignItems: 'center',
    },
    ButtonText: {
        color: '#B7B7B7',
        fontSize:12,
        fontFamily: 'PingFang-SC-Regular',
        textAlign: 'center'
    },
    close: {
        position: 'absolute',
        right:10,
        top: 10
    }
})

const mapStateToProps = state => {
    // let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
    return {
        // repos: storedRepositories
    };
};

const mapDispatchToProps = {
    // listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
