import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Switch } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../component/header'
import moment from 'moment'

let notificaitons = [
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
    {
        title: 'Important Advisory: Lorem Ipsum  dolor sit amet consectetur dolor…',
        description: 'Lorem ipsum dolor sit amet, consectetur…',
        date: "2018-07-29"
    },
]

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
    render() {
        const {get_building } = this.props
        let building_color =  '#F27B28'

        if (get_building && get_building.colors) {
            building_color = get_building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header title={'NOTIFICATIONS'} rightText={''} leftPress={()=>this.props.navigation.pop()} rightPress={()=>{}}/>

                <ScrollView style={styles.body}>
                    {notificaitons.map((notification, key) => (
                        <View key={key} style={{flexDirection: 'row', marginHorizontal: 20, borderBottomColor: '#979797', borderBottomWidth: 1}}>
                            <View style={styles.titleView}>
                                <Text style={[styles.titleText, {color: building_color}]}>{notification.title}</Text>
                                <Text style={styles.titleDescription}>{notification.description}</Text>
                            </View>
                            <View style={{flex:1, alignItems: 'flex-end', justifyContent: 'center',}}>
                                <Text style={styles.date}>{moment(notification.date).fromNow()}</Text>
                                <Image style={[styles.closeImage, {tintColor: building_color}]} source={require('../../../assets/images/close.png')}/>
                            </View>
                        </View>
                    ))}
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
    },
    titleView: {
        flex: 2,
        paddingVertical: 15
    },
    titleText: {
        color: '#F27B28',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "PingFang-SC-Regular",
    },
    titleDescription: {
        color: '#8F8E94',
        fontSize: 12,
        fontFamily: "PingFang-SC-Regular",
    },
    date: {
        color: '#B7B7B7',
        fontSize: 12,
        fontFamily: "PingFang-SC-Regular"
    },
    closeImage: {
        position: 'absolute',
        top: 20,
        right: 0,
        width: 11,
        height: 11,
        tintColor: '#F27B28'
    }
})

const mapStateToProps = state => {
    // let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
    return {
        get_building: state.building
    };
};

const mapDispatchToProps = {
    // listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);