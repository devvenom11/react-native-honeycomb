import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Switch } from 'react-native';
import { connect } from 'react-redux';
import ProfileTextInput from '../../component/profile_textinput'
import Header from '../../component/header'
import DeviceInfo from "react-native-device-info/deviceinfo";
class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Vianne',
            email: 'vianne@gmail.com',
            phone: '+63 975 0961907',
            address: 'Nouveau, Pampanga',
            suite: 'Guest',
            tenant: '',
            password: '',
            confirm_pass: '',
            card_number: '',
            card_name: '',
            expiry_date: '',
            security_number: '',
            email_notification: false,
            sms_notification: false,
            app_notification: false
        }
    }
    componentWillMount() {
        const {user} = this.props
        this.setState({
            name: user.firstname + ' ' + user.lastname,
            email: user.email,
            phone: user.phone,
            address: '',
            suite: '',
            tenant: user.tenant,
            password: '',
            confirm_pass: '',
            card_number: '',
            card_name: '',
            expiry_date: '',
            security_number: '',
            email_notification: user.settings.email,
            sms_notification: user.settings.sms,
            app_notification: user.settings.push
        })
    }
    onUpdateinfo() {
        alert(JSON.stringify(this.props.credentials))
        const {name, email, phone, address, suite, email_notification, sms_notification, app_notification} = this.state
        fetch('https://api.honeycomb.be/v4/users/update/info',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: this.props.credentials.idToken
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                address: address,
                suite: suite,
                email_notifications: email_notification,
                sms_notifications: sms_notification,
                push_notifications: app_notification,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
       
        })
        .catch((error)=>console.log('========error', error))
    }
    render() {
        const {get_building } = this.props
        let building_color =  '#F27B28'

        if (get_building && get_building.colors) {
            building_color = get_building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header
                    title={'SETTINGS'}
                    rightButton={require('../../../assets/top_nav/checkbox.png')}
                    leftPress={()=>this.props.navigation.pop()}
                    rightPress={()=>this.onUpdateinfo()}/>

                <ScrollView style={styles.body}>
                    <View style={styles.bodyView}>
                        <Text style={styles.textRegister}>Profile Information</Text>

                        <View style={{marginTop: 7}}>
                            <ProfileTextInput
                                name={'Name'}
                                icon={require('../../../assets/general/black/person.png')}
                                onChangeText={(name) => this.setState({name})}
                                value={this.state.name}
                            />
                            <ProfileTextInput
                                name={'Email'}
                                icon={require('../../../assets/general/black/email.png')}
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                                editable={false}
                            />
                            <ProfileTextInput
                                name={'Cell Phone'}
                                icon={require('../../../assets/general/black/app_push.png')}
                                onChangeText={(phone) => this.setState({phone})}
                                value={this.state.phone}
                            />
                            <ProfileTextInput
                                name={'Address'}
                                icon={require('../../../assets/general/light_grey/home.png')}
                                onChangeText={(address) => this.setState({address})}
                                value={this.state.address}
                            />
                            <ProfileTextInput
                                name={'Suite/Apartment'}
                                icon={require('../../../assets/general/light_grey/home.png')}
                                onChangeText={(suite) => this.setState({suite})}
                                value={this.state.suite}
                            />
                            <ProfileTextInput
                                name={'Select Tenant'}
                                icon={require('../../../assets/general/light_grey/tenant.png')}
                                onChangeText={(tenant) => this.setState({tenant})}
                                value={this.state.tenant}
                                editable={false}
                            />
                        </View>

                        <View style={{flexDirection: 'row', marginTop: 45}}>
                            <Text style={[styles.textRegister, {flex: 1}]}>Payment Method</Text>
                            <Text style={[styles.textRegister, {color: building_color, fontSize: 12}]}>Add Payment</Text>
                        </View>
                        <View>
                            <ProfileTextInput
                                name={'Card Number'}
                                icon={require('../../../assets/images/card_number.png')}
                                onChangeText={(card_number) => this.setState({card_number})}
                                value={this.state.card_number}
                            />
                            <ProfileTextInput
                                name={'Card Holder Name'}
                                icon={require('../../../assets/general/black/person.png')}
                                onChangeText={(card_name) => this.setState({card_name})}
                                value={this.state.card_name}
                            />
                            <ProfileTextInput
                                name={'Expiry Date'}
                                icon={require('../../../assets/general/black/calendar.png')}
                                onChangeText={(expiry_date) => this.setState({expiry_date})}
                                value={this.state.expiry_date}
                            />
                        </View>

                    </View>
                    <View style={styles.bottomView}>
                        <View style={{marginTop: 33}} />
                        <Text style={styles.textRegister}>Notifications</Text>
                        <View style={{marginTop: 33}} />
                        <View style={styles.settings}>
                            <Image style={{tintColor: '#000000', marginRight: 10}} source={require('../../../assets/general/black/location_thin.png')} />
                            <Text style={{flex:1, color: '#000000', fontFamily: 'PingFang-SC-Regular'}}>Push</Text>
                            <Switch onValueChange={()=>this.setState({app_notification: !this.state.app_notification})} value={this.state.app_notification}/>
                        </View>
                        <View style={styles.settings}>
                            <Image style={{tintColor: '#000000', marginRight: 10}} source={require('../../../assets/general/black/email.png')} />
                            <Text style={{flex:1, color: '#000000', fontFamily: 'PingFang-SC-Regular'}}>Email</Text>
                            <Switch onValueChange={()=>this.setState({email_notification: !this.state.email_notification})} value={this.state.email_notification}/>
                        </View>
                        <View style={styles.settings}>
                            <Image style={{tintColor: '#000000', marginRight: 10}} source={require('../../../assets/general/black/sms_push.png')} />
                            <Text style={{flex:1, color: '#000000', fontFamily: 'PingFang-SC-Regular'}}>SMS</Text>
                            <Switch onValueChange={()=>this.setState({sms_notification: !this.state.sms_notification})} value={this.state.sms_notification}/>
                        </View>
                    </View>
                    <View style={{marginBottom: 50}}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        paddingTop: 35,
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
        paddingHorizontal: 20,
    },
    settings: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 23
    },

})

const mapStateToProps = state => {
    // let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
    return {
        user: state.user,
        credentials: state.credentials,
        get_building: state.building
    };
};

const mapDispatchToProps = {
    // listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
