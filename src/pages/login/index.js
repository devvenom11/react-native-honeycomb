import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, ActivityIndicator, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import TextInput from '../../component/textInput'
import Button from '../../component/button'
import { building, content_envet, content_news, content_perk, content_poll, get_profile, content_building, getcredentials, setcredentials } from '../../redux/reducers'

import Auth0 from 'react-native-auth0'
import Toast, { DURATION } from 'react-native-easy-toast'

const auth0 = new Auth0({ domain: 'honeycomb-be.auth0.com', clientId: 'HN5pNjBB1WvaCMHJu6jgwhiFqjZiNxYf' });
const domain = 'https://honeycomb-be.auth0.com/userinfo'
// const auth0 = new Auth0({ domain: 'finex.auth0.com', clientId: 'eRUcXAwhXvN3X1b2zhpvFdi84sbfFPQS' });
// const domain = 'https://finex.auth0.com/userinfo'
import DeviceInfo from 'react-native-device-info';
import { subscribeTopics } from '../../fcm';

var {height, width} = Dimensions.get('window');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validated: false,
            loading: false
        }
    }

    async componentWillMount() {


        await AsyncStorage.getItem('@MySuperStore:credentials', (err, result1) => {
            let result = JSON.parse(result1)
            this.props.getcredentials(result)
        })

        await AsyncStorage.getItem('@MySuperStore:email&pass', (err, resultEmail) => {
            if (resultEmail !== null) {
                let result = JSON.parse(resultEmail)
                // this.setState({email: result.email, password: result.pass})
            }
        })

        await AsyncStorage.getItem('@MySuperStore:loginresult', (err, result0) => {
            if (result0 !== null) {
                let result = JSON.parse(result0)
                const { content_envet, content_news, content_perk, content_poll } = this.props
                this.props.building(result.building_id)
                content_envet(result.building_id)
                content_news(result.building_id)
                content_perk(result.building_id)
                content_poll(result.building_id)
                this.props.content_building(result.building_id)
                this.props.get_profile(result)
                // this.props.navigation.navigate('Home')
                this.props.navigation.replace('Home')
                this.setState({ loading: false })
            }
        })
    }
    onSendUDID(accessToken) {
        (async () => {
            await AsyncStorage.getItem('CentrumDevice', (err, result1) => {
                if (result1 == null) {
                    try {
                        var udid = DeviceInfo.getUniqueID();
                        console.log("udid... ", udid);
                        var url = 'http://api.honeycomb.be/v4/users/udid'
                            (async () => {
                                var response = await fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: accessToken,
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body: "uuid=" + udid
                                })
                                if (response.status == 200) {
                                    await AsyncStorage.setItem('CentrumDevice', udid);
                                }
                                else {
                                    console.log("Error")
                                }
                            })();
                    }
                    catch (error) {
                        console.log("send udid" + error)
                    }
                }
            })
        })();
        this.onDoneLogin();
    }
    onDoneLogin() {
        subscribeTopics();
    }
    onGoogleLogin() {
        auth0
            .webAuth
            .authorize({ scope: 'openid profile email offline_access', audience: domain, connection: 'google-oauth2', access_type: 'offline' })
            .then(credentials => {
                console.log('=======onGoogleLogin... credentials', credentials)
                auth0
                    .auth
                    .userInfo({ token: credentials.accessToken })
                    .then((result) => {
                        console.log("result: ", result);
                        this.onDoneLogin();
                        // AsyncStorage.setItem('@MySuperStore:credentials', JSON.stringify(credentials))
                        // AsyncStorage.setItem('@MySuperStore:email&pass', JSON.stringify({ email: this.state.email, pass: this.state.password }))
                        this.props.getcredentials(credentials);
                        if (!result["https://auth.honeycomb.be/user_metadata"].signup_required) {
                            console.log('======RESULT', result)
                            this.props.get_profile(result)
                            this.props.navigation.navigate('Signup')
                        } else {
                            this.onSendUDID(credentials.idToken);
                            console.log('=======credentials', credentials)
                        }
                    })
            }
            )
            .catch(error => {
                console.log("failload" + JSON.stringify(error))
            });
    }

    onOutLookLogin() {
        auth0
            .webAuth
            .authorize({ scope: 'openid profile email', audience: domain, connection: 'windowslive' })
            .then(credentials => {
                this.props.getcredentials(credentials)
                auth0
                    .auth
                    .userInfo({ token: credentials.accessToken })
                    .then((result) => {
                        this.onDoneLogin();
                        AsyncStorage.setItem('@MySuperStore:credentials', JSON.stringify(credentials))
                        AsyncStorage.setItem('@MySuperStore:email&pass', JSON.stringify({ email: this.state.email, pass: this.state.password }))
                        this.props.getcredentials(credentials);
                        if (!result["https://auth.honeycomb.be/user_metadata"].signup_required) {
                            this.props.get_profile(result)
                            this.props.navigation.navigate('Signup')
                        } else {
                            this.onSendUDID(credentials.idToken);
                        }
                    })
            })
            .catch(error => console.log(error))
    }

    onAmazonLogin() {
        auth0
            .webAuth
            .authorize({ scope: 'openid profile email', audience: domain, connection: 'amazon' })
            .then(credentials => {
                console.log('=======credentials', credentials)
                auth0
                    .auth
                    .userInfo({ token: credentials.accessToken })
                    .then((result) => {
                        this.onDoneLogin();
                        AsyncStorage.setItem('@MySuperStore:credentials', JSON.stringify(credentials))
                        AsyncStorage.setItem('@MySuperStore:email&pass', JSON.stringify({ email: this.state.email, pass: this.state.password }))
                        this.props.getcredentials(credentials);
                        if (!result["https://auth.honeycomb.be/user_metadata"].signup_required) {
                            this.props.get_profile(result)
                            this.props.navigation.navigate('Signup')
                        } else {
                            this.onSendUDID(credentials.idToken);
                        }
                    })
            })
            .catch(error => console.log(error))
    }

    onLinkedIn() {
        auth0
            .webAuth
            .authorize({ scope: 'openid profile email', audience: domain, connection: 'linkedin' })
            .then(credentials => {
                auth0
                    .auth
                    .userInfo({ token: credentials.accessToken })
                    .then((result) => {
                        this.onDoneLogin();
                        AsyncStorage.setItem('@MySuperStore:credentials', JSON.stringify(credentials))
                        AsyncStorage.setItem('@MySuperStore:email&pass', JSON.stringify({ email: this.state.email, pass: this.state.password }))
                        this.props.getcredentials(credentials);
                        if (!result["https://auth.honeycomb.be/user_metadata"].signup_required) {
                            this.props.get_profile(result)
                            this.props.navigation.navigate('Signup')
                        } else {
                            this.onSendUDID(credentials.idToken);
                        }
                    })
            }
            )
            .catch(error => console.log(error))
    }

    onLogin = () => {

        if (this.state.email != '' && this.state.password != '') {
            this.setState({ loading: true })
            auth0
                .auth
                .passwordRealm({ username: this.state.email, password: this.state.password, realm: "Email-Login-V4" })
                .then(credentials => {
                    console.log("onLogin.. credentials: ", credentials);
                    AsyncStorage.setItem('@MySuperStore:credentials', JSON.stringify(credentials))
                    AsyncStorage.setItem('@MySuperStore:email&pass', JSON.stringify({ email: this.state.email, pass: this.state.password }))
                    this.props.getcredentials(credentials)
                    fetch('https://api.honeycomb.be/v4/users/individual', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            authorization: credentials.idToken
                        },
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.onSendUDID(credentials.idToken);
                            const { content_envet, content_news, content_perk, content_poll } = this.props
                            AsyncStorage.setItem('@MySuperStore:loginresult', JSON.stringify(responseJson.data))
                            this.props.building(responseJson.data.building_id)
                            content_envet(responseJson.data.building_id)
                            content_news(responseJson.data.building_id)
                            content_perk(responseJson.data.building_id)
                            content_poll(responseJson.data.building_id)
                            this.props.get_profile(responseJson.data)
                            this.props.navigation.replace('Home')
                            this.setState({ loading: false })
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }
                )
                .catch(() => {
                    this.refs.toast.show('Invalid email address or password.\n' +
                        'Please try again.')
                    this.setState({ loading: false })
                });
        } else {
            this.refs.toast.show('Put your email and password in the blank')
        }
    }

    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text, validated: false })
        }
        else {
            this.setState({ email: text, validated: true })
        }
    }

    render() {
        const { get_building } = this.props
        
        console.log("{height, width} = ", {height, width})

        let logo = require('../../../assets/images/logo_retina.png')

        if (get_building && get_building.logo) {
            // logo = {uri: get_building.logo.small}
        }

        let building_color = '#D8AE24'

        if (get_building && get_building.colors) {
            // building_color = get_building.colors.primary
            // building_color = get_building.colors.secondary
        }
        const marginBottom = (height <= 568) ? 30 : 70;
        return (
            <View style={styles.container}>
                <View style={{ marginBottom }}>
                    <Image style={styles.logo} source={logo} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <TextInput
                            icon={require('../../../assets/images/email.png')}
                            fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 16, alignItems: 'center' }}>{Icons.envelope}</FontAwesome>}
                            placeholder='Email'
                            onChangeText={(email) => this.validate(email)}
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                            value={this.state.email}
                        // validated={this.state.validated}
                        />
                        <TextInput
                            icon={require('../../../assets/images/password.png')}
                            fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.lock}</FontAwesome>}
                            placeholder='Password'
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            password
                        />
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={styles.garyText}>New user? <Text style={[styles.colorText, { color: building_color }]} onPress={() => this.props.navigation.navigate('Signup')}>Signup</Text></Text>
                            <Text style={[styles.colorText, { color: building_color }]} onPress={() => this.props.navigation.navigate('Forgort')}>Forgot password?</Text>
                        </View>
                        <Button style={{ backgroundColor: building_color }} title={'LOGIN'} onPress={this.onLogin} />
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.ButtonText}>You also have the option to use your own </Text>
                    <Text style={styles.ButtonText}>social identity to login for your convenience.</Text>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 35 }}>
                        <TouchableWithoutFeedback onPress={() => this.onGoogleLogin()}>
                            <View style={{ flex: 1 }}><Image style={[styles.socialIcon, { tintColor: building_color }]} source={require('../../../assets/images/google_signin.png')} /></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.onAmazonLogin()}>
                            <View style={{ flex: 1 }}><Image style={[styles.socialIcon, { tintColor: building_color }]} source={require('../../../assets/images/social_a_signin.png')} /></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.onLinkedIn()}>
                            <View style={{ flex: 1 }}><Image style={[styles.socialIcon, { tintColor: building_color }]} source={require('../../../assets/images/instagram_signin.png')} /></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.onOutLookLogin()}>
                            <View style={{ flex: 1 }}><Image style={[styles.socialIcon, { tintColor: building_color }]} source={require('../../../assets/images/social_window.png')} /></View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Toast
                    ref="toast"
                    style={{ width: width - 10, alignItems: 'center' }}
                    position='top'
                    positionValue={5}
                />
                {this.state.loading && <ActivityIndicator style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} size="large" color="#F27B28" />}
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
        marginTop: 45,
        marginBottom: (height <= 568 ? 15 : 45),
        alignSelf: 'center',
        width: 234,
        height: 32,
        resizeMode: 'contain'
    },
    socialIcon: {
        marginVertical: 45,
        alignSelf: 'center',
        tintColor: '#D8AE24'
    },
    garyText: {
        color: '#B7B7B7',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Regular',
        flex: 1
    },
    colorText: {
        color: '#D8AE24',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Regular'
    },
    bottomView: {
        alignItems: 'center',
    },
    ButtonText: {
        color: '#B7B7B7',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Regular',
        textAlign: 'center'
    },
})

const mapStateToProps = state => {

    return {
        get_building: state.building,
        building_id: state.building_id
    };
};

const mapDispatchToProps = {
    building,
    content_envet,
    content_news,
    content_poll,
    content_perk,
    get_profile,
    content_building,
    getcredentials,
    setcredentials
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);