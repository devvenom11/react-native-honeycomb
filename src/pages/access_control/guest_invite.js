import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, FlatList, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback, Linking} from 'react-native';
import Header from '../../component/header'
import moment from 'moment'
import Icon from 'react-native-vector-icons/EvilIcons';
import {connect} from "react-redux";
import LeftMenu from '../../component/menu'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import Swiper from 'react-native-swiper';
import Stars from 'react-native-stars';
import Dailog from '../../component/modal_dailog/index'
import {content_amenities, getAmenity, building_form, logout} from '../../redux/reducers'
import RNFetchBlob from 'rn-fetch-blob'
import Communications from 'react-native-communications';

let defaultScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: 0.4,
    swipeOffset: 20
};
let rightScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: -0.4,
    swipeOffset: 20
};
import Button from "../../component/button";
var { width } = Dimensions.get('window')

class AccessControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tap_item: true,
        }
    }

    componentWillMount() {
    }

    render() {
        let color = '#F27B28'
        const {building} = this.props;
        if (building && building.colors && building.colors.primary) {
            color = building.colors.primary
        }
        let logo = require('../../../assets/logo/honeycomb.png')

        if (building && building.logo) {
            logo = {uri: building.logo.small}
        }
        return (
            <View style={styles.container}>
                <Header
                    title={'GUEST INVITE'}
                    leftPress={()=>this.props.navigation.pop()}
                />
                <ScrollView>
                <View style={styles.inviteProfileView}>
                    <Image style={{width: 30, height: 30}} source={require('../../../assets/images/avatar.png')}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.profile}>
                            from: Vianne Amber Chua
                        </Text>
                        <Text style={styles.time}>
                            3:57 PM, 25 Sep 2018
                        </Text>
                    </View>
                </View>

                <View style={[styles.inviteProfileView, {backgroundColor: '#ffffff', borderBottomWidth:0.5}]}>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur amet si adipiscing elit, sed do eiusmod tempor…
                    </Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 20}}><Image style={{width: 234, height: 32, resizeMode: 'contain'}} source={logo}/></View>
                <View style={{paddingVertical: 23, alignItems: 'center'}}>
                    <Image source={require('../../../assets/images/QR.png')}/>
                </View>
                <View style={{
                    paddingVertical: 20,
                    paddingHorizontal: 30,
                    borderTopWidth: 1,
                    borderTopColor: '#EFEFF4',
                    flexDirection: 'row'
                }}>
                    <View style={styles.infoItem}>
                        <View style={styles.itemView}>
                            <Image style={{tintColor: '#000000', width: 15.61, height: 17.44}}
                                   source={require('../../../assets/general/black/calendar.png')}/>
                            <Text style={styles.itemName}>
                                Event Date:
                            </Text>
                        </View>
                        <View style={styles.itemView}>
                            <Image style={{tintColor: '#000000'}}
                                   source={require('../../../assets/general/black/location_thin.png')}/>
                            <Text style={styles.itemName}>
                                Location:
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.infoItem, {flex: 2.5}]}>
                        <View style={styles.itemView}>
                            <Text style={[styles.itemContent, {color: color}]}>
                                {moment('Thursday - June 07, 2018@ 05:30-0630pm').format('dddd -  MMMM, Do, YYYY @ h:mm a')}
                            </Text>
                        </View>
                        <View style={styles.itemViewContent}>
                            <Text style={[styles.itemContent, {color: color}]}>
                                Amenety Lounge:
                            </Text>
                            <Text numberOfLines={1} style={[styles.itemContent, {color: color}]}>
                                750 N. St Paul
                            </Text>
                        </View>
                    </View>
                </View>
                <Button style={{backgroundColor: color, marginHorizontal: 56}} title={'OPEN IN MAPS'} onPress={()=>{
                }}/>
                <Button style={{backgroundColor: color, marginHorizontal: 56}} title={'ADD TO CALENDAR'} onPress={()=>{
                }}/>
                <Button style={{backgroundColor: color, marginHorizontal: 56}} title={'BLUETOOTH BUILDING ACCESS'} onPress={()=>{
                    this.props.navigation.navigate('GuestInvite')
                }}/>
                <View style={{paddingBottom: 20}}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    inviteProfileView: {
        paddingVertical: 15,
        paddingHorizontal: 22,
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profile: {
        color: '#000000',
        fontSize: 14,
        fontFamily: "PingFang-SC-Medium",
    },
    time: {
        color: '#B7B7B7',
        fontSize: 12,
        fontFamily: "PingFang-SC-Regular"
    },
    description: {
        flex:1,
        color: '#8F8E94',
        fontSize: 14,
        fontFamily: "PingFang-SC-Regular"
    },
    infoItem: {
        flex:1,
        marginTop: 6,
    },
    itemName: {
        marginLeft: 20,
        fontFamily: 'PingFang-SC-Semibold',
        fontSize: 12,
        color: '#3B3B3E'
    },
    itemContent: {
        marginLeft: 20,
        fontFamily: 'PingFang-SC-Semibold',
        fontSize: 12,
        color: '#F27B28',
        width: 200
    },
    itemView: {
        flexDirection: 'row',
        marginTop: 6,
        height: 35
    },
    itemViewContent: {
        marginTop: 6,
        height: 35
    }
});

const mapStateToProps = state => {
    let event = state.event.map(repo => ({ key: repo.id, ...repo }));
    return {
        building: state.building,
        event: event,
        // building_form_data: state.building_form,
        // building_id: state.building_id,
    };
};

const mapDispatchToProps = {
    // content_amenities,
    // getAmenity,
    // building_form,
    // logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AccessControl);
