import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Switch, Dimensions, TouchableOpacity, Platform } from 'react-native';
var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

import TextInput from '../../component/textInput'
import Button from '../../component/button'
import Header from '../../component/header'
import { building_tantans, post_register, get_building_all, building, get_profile } from '../../redux/reducers'
import DropDown from "../../component/dropdown";
import GooglePlacesInput from "../../component/googleAutocomplete";
import Toast, { DURATION } from 'react-native-easy-toast'
import StripeExpireDate from '../../component/signup/StripeExpireDate';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            address: '',
            suite: '',
            building: '',
            building_number: '',
            tenant: '',
            tenantNumber: '',
            password: '',
            confirm_pass: '',
            card_number: '',
            card_name: '',
            expiry_date: '',
            security_number: '',
            billing_zip_code: '',
            email_notification: true,
            sms_notification: false,
            app_notification: true,
            building_id: '',
            building_name: ''

        }
    }

    componentWillMount() {
        this.props.building_tantans(2)
        this.props.get_building_all()
        const { user } = this.props


        if (user['https://auth.honeycomb.be/user_metadata']) {
            this.setState({
                name: user.name,
                email: user.email
            })
        }
    }
    componentDidMount() {
        if (Platform.OS === 'ios') {
            CardIOUtilities.preload();
        }
        this.setState({
            building_name: this.props.navigation.getParam('building_name'),
            building_id: this.props.navigation.getParam('building_id')
        });
    }

    onSubmit() {
        const { expiry_date, card_number, security_number, billing_zip_code } = this.state

        var payment_token = '';
        if (card_number != '' && expiry_date != '' && security_number != '') {
            (async () => {
                payment_token = await this.onStripe();

                this.onSendData(payment_token);

            })();
        }
        else {
            this.onSendData(payment_token);
        }
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
    }

    onSendData(payment_token) {
        const { name, email, phone, address, suite, tenantNumber, building_number, password, email_notification, sms_notification, app_notification } = this.state;
        var building_id = this.state.building_id ? this.state.building : '2';
        console.log("user: ", this.props.user);
        const { user } = this.props
        if (user['https://auth.honeycomb.be/user_metadata']) {
            const body = {
                name,
                email,
                phone,
                address,
                suite,
                building: building_id,
                tenant: tenantNumber,
                password,
                email_notifications: email_notification,
                sms_notifications: sms_notification,
                push_notifications: app_notification,
                token: this.props.credentials.idToken,
                payment_token: payment_token
            };
            if (this.props.credentials.accessToken) {
                body.access_token = this.props.credentials.accessToken;
            }
            if (this.props.credentials.refreshToken) {
                body.refresh_token = this.props.credentials.refreshToken;
            }
            console.log("body... ", JSON.stringify(body));
            fetch('https://api.honeycomb.be/v4/users/register/social', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: this.props.credentials.idToken,
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("register social done: ", responseJson);
                    if (responseJson.error)
                        this.refs.toast1.show(responseJson.error)
                    else {
                        const { token } = responseJson.data.token;
                        this.onSendUDID(token)
                        this.props.building(building_id)
                        this.props.navigation.replace('Home')
                    }
                })
                .catch((error) => {
                    console.log('==========error', error);
                });
        } else {
            fetch('https://api.honeycomb.be/v4/users/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    address,
                    suite,
                    building: building_id,
                    tenant: tenantNumber,
                    password,
                    email_notifications: email_notification,
                    sms_notifications: sms_notification,
                    push_notifications: app_notification,
                    payment_token: payment_token
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error) {
                        this.refs.toast1.show(responseJson.error)
                    }
                    else {
                        const { token } = responseJson.data.token;
                        this.onSendUDID(token)
                        this.props.building(building_id)
                        this.props.navigation.replace('Home')
                    }
                })
                .catch((error) => {
                    console.log('==========error', error);
                });
        }
    }
    async onStripe() {
        const { card_number, expiry_date, security_number } = this.state;
        var exp_month = expiry_date.split("/")[0];
        var exp_year = expiry_date.split("/")[1];
        try {


            var response = await fetch("https://api.stripe.com/v1/tokens", {
                mode: "cors",
                credentials: "include",
                body: "card[number]=" + card_number + "&card[exp_month]=" + exp_month + "&card[exp_year]=" + exp_year + "&card[cvc]=" + security_number + "",
                // body: "card[number]=4242424242424242&card[exp_month]=12&card[exp_year]=2019&card[cvc]=123",
                headers: {
                    Authorization: "Bearer " + CentrumConstant.stripKey,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            });
            let responseJson = await response.json();
            return responseJson.id;



        }
        catch (error) {
            return '';
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Header rightText={'Login'} leftPress={() => this.props.navigation.pop()} rightPress={() => this.props.navigation.pop()} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={styles.body}>
                    <View style={styles.bodyView}>
                        <Text style={styles.textRegister}>New User Registration</Text>
                        <View style={{ marginTop: 9 }} />
                        <Text style={styles.text}>Thank you for joining the honeycomb platform! we advise using an email you are mostly likely to recieve important updates, as property and office managers will be communicating through these channels.</Text>
                        <View style={{ marginTop: 39 }} />
                        <Text style={styles.textRegister}>Profile Information</Text>
                        <View>
                            <TextInput
                                icon={require('../../../assets/general/black/person.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.user}</FontAwesome>}
                                placeholder='First Name and Last Name'
                                onChangeText={(name) => this.setState({ name })}
                                keyboardType={'email-address'}
                                value={this.state.name}
                            />
                            <TextInput
                                icon={require('../../../assets/general/black/email.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 16, alignItems: 'center' }}>{Icons.envelope}</FontAwesome>}
                                placeholder='Email'
                                onChangeText={(email) => this.setState({ email })}
                                keyboardType={'email-address'}
                                value={this.state.email}
                            />
                            <TextInput
                                icon={require('../../../assets/general/black/app_push.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 26, alignItems: 'center' }}>{Icons.mobile}</FontAwesome>}
                                placeholder='Cell Phone'
                                onChangeText={(phone) => this.setState({ phone })}
                                value={this.state.phone}
                                keyboardType={'phone-pad'}
                            />

                            <GooglePlacesInput
                                onChangeText={(data) => this.setState({ address: data.description })}
                            />

                            <TextInput
                                icon={require('../../../assets/general/light_grey/home.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.home}</FontAwesome>}
                                placeholder='Suite/Apartment (Number Only optional)'
                                onChangeText={(suite) => this.setState({ suite })}
                                value={this.state.suite}
                            />

                            <TextInput
                                placeholder='Building'
                                icon={require('../../../assets/general/light_grey/home.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.home}</FontAwesome>}
                                editable={false}
                                value={this.state.building_name}
                            />
                            {/* <DropDown
                                icon={require('../../../assets/images/address.png')}
                                label='Building'
                                data={this.props.building_all}
                                onChangeText={(building, index, data) => this.setState({ building, building_number: data[index].building_id })}
                                value={this.state.building}
                            /> */}

                            {/*<View style={{paddingVertical: 10}}>*/}
                            {/*<DropDown*/}
                            {/*icon={require('../../../assets/images/address.png')}*/}
                            {/*label='Suite/Apartment (Number Only)'*/}
                            {/*data={[{value: 0},{value: 1},{value: 2},{value: 3},{value: 4},{value: 5},{value: 6},{value: 7},{value: 8},{value: 9},]}*/}
                            {/*onChangeText={(suite) => this.setState({suite})}*/}
                            {/*value={this.state.suite}*/}
                            {/*/>*/}
                            {/*</View>*/}

                            <DropDown
                                icon={require('../../../assets/general/light_grey/tenant.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.user}</FontAwesome>}
                                label='Select Tenant'
                                data={this.props.tantans}
                                onChangeText={(tenant, index, data) => this.setState({ tenant, tenantNumber: data[index].tenant_id })}
                                value={this.state.tenant}
                            />
                            <TextInput
                                icon={require('../../../assets/general/light_grey/lock.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.lock}</FontAwesome>}
                                placeholder='Password'
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                password={true}
                            />
                            <TextInput
                                icon={require('../../../assets/general/black/location_thin.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.lock}</FontAwesome>}
                                placeholder='Confirm Password'
                                onChangeText={(confirm_pass) => this.setState({ confirm_pass })}
                                value={this.state.confirm_pass}
                                password={true}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 45 }}>
                            <Text style={[styles.textRegister, { flex: 1 }]}>Payment Method</Text>
                            <Text style={[styles.textRegister, { color: '#D8AE24', fontSize: 12 }]}>Skip This For Now</Text>
                        </View>
                        <View>
                            <View style={{}}>
                                <TextInput
                                    icon={require('../../../assets/images/card_number.png')}
                                    fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 16, alignItems: 'center' }}>{Icons.creditCard}</FontAwesome>}
                                    placeholder='Card Number'
                                    keyboardType='number-pad'
                                    maxLength={16}
                                    onChangeText={(card_number) => this.setState({ card_number })}
                                    value={this.state.card_number}
                                />
                                <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 4, }} onPress={this.scanCard.bind(this)}>
                                    <FontAwesome style={{ color: '#212121', fontSize: 30, alignItems: 'center' }}>{Icons.qrcode}</FontAwesome>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                icon={require('../../../assets/general/black/person.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.user}</FontAwesome>}
                                placeholder='Card Holder Name'
                                onChangeText={(card_name) => this.setState({ card_name })}
                                value={this.state.card_name}
                            />
                            <StripeExpireDate onChangeValue={(month, year, value) => {
                                console.log("onchange value : ", { month, year, value })
                                this.setState({ expiry_date: value })
                            }} />
                            {/* <TextInput
                                icon={require('../../../assets/general/black/calendar.png')}
                                placeholder='Expiry Date'
                                onChangeText={(expiry_date) => this.setState({ expiry_date })}
                                value={this.state.expiry_date}
                            /> */}
                            <TextInput
                                icon={require('../../../assets/general/light_grey/lock.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.lock}</FontAwesome>}
                                placeholder='CVC'
                                keyboardType='number-pad'
                                maxLength={4}
                                onChangeText={(security_number) => {
                                    this.setState({ security_number })
                                }}
                                value={this.state.security_number}
                            />

                            <TextInput
                                icon={require('../../../assets/general/light_grey/lock.png')}
                                fontIcon={<FontAwesome style={{ color: '#dadada', fontSize: 22, alignItems: 'center' }}>{Icons.mapMarker}</FontAwesome>}
                                placeholder='Billing Zip Code'
                                keyboardType='number-pad'
                                maxLength={5}
                                onChangeText={(billing_zip_code) => {
                                    this.setState({ billing_zip_code })
                                }}
                                value={this.state.billing_zip_code}
                            />
                        </View>
                        <View style={{ alignItems: 'center', marginVertical: 50 }}>
                            <Button style={{ backgroundColor: '#D8AE24' }} title={'SUBMIT'} onPress={() => this.onSubmit()} />
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={{ marginTop: 33 }} />
                        <Text style={styles.textRegister}>User Settings</Text>
                        <View style={{ marginTop: 33 }} />
                        <View style={styles.settings}>
                            <Image style={{ tintColor: '#000000', marginRight: 10 }} source={require('../../../assets/general/black/email.png')} />
                            <Text style={{ flex: 1, color: '#000000', fontFamily: 'PingFang-SC-Regular' }}>Email Notification</Text>
                            <Switch onValueChange={() => this.setState({ email_notification: !this.state.email_notification })} value={this.state.email_notification} />
                        </View>
                        <View style={styles.settings}>
                            <Image style={{ tintColor: '#000000', marginRight: 10 }} source={require('../../../assets/general/black/sms_push.png')} />
                            <Text style={{ flex: 1, color: '#000000', fontFamily: 'PingFang-SC-Regular' }}>SMS Notification</Text>
                            <Switch onValueChange={() => this.setState({ sms_notification: !this.state.sms_notification })} value={this.state.sms_notification} />
                        </View>
                        <View style={styles.settings}>
                            <Image style={{ tintColor: '#000000', marginRight: 10 }} source={require('../../../assets/general/black/app_push.png')} />
                            <Text style={{ flex: 1, color: '#000000', fontFamily: 'PingFang-SC-Regular' }}>APP Notification</Text>
                            <Switch onValueChange={() => this.setState({ app_notification: !this.state.app_notification })} value={this.state.app_notification} />
                        </View>
                    </View>

                    <View style={{ marginBottom: 50 }} />
                </ScrollView>
                <Toast
                    ref="toast1"
                    style={{ width: width - 10, alignItems: 'center' }}
                    position='top'
                    positionValue={5}
                />
            </View>
        );
    }

    scanCard() {
        console.log("scan card...");
        CardIOModule
          .scanCard({
            hideCardIOLogo: true,
          })
          .then(card => {
            // the scanned card
            console.log("card... ", card);
            const { cardNumber, cardholderName, expiryMonth, expiryYear, cvv, postalCode } = card;
            // const { expiry_date, card_number, security_number, billing_zip_code } = this.state
            var expiry_date = moment({ year: expiryYear, month: expiryMonth, day: 1 }).format('MM/YYYY');
            this.setState({ card_name: cardholderName, expiry_date, card_number: cardNumber, security_number: cvv, billing_zip_code: postalCode });
          })
          .catch(() => {
            // the user cancelled
            console.log("user cancelled");
          })
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        paddingTop: 33,
    },
    bodyView: {
        marginHorizontal: 20,
    },
    textRegister: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'PingFang-SC-Light'
    },
    text: {
        color: '#B7B7B7',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Regular'
    },
    bottomView: {
        borderTopWidth: 1,
        borderTopColor: '#979797',
        paddingHorizontal: 20,
    },
    settings: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 23
    }
})

const mapStateToProps = state => {

    return {
        tantans: state.tantans,
        building_all: state.building_all,
        user: state.user,
        credentials: state.credentials
    };
};

const mapDispatchToProps = {
    building_tantans,
    post_register,
    get_building_all,
    building,
    get_profile
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
