import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, FlatList, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback, Linking, Switch} from 'react-native';
import Header from '../../component/header'
import TextInput from '../../component/textInput'
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
import Button from "../../component/button";

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

var { width } = Dimensions.get('window')

class AccessControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: '',
            packing: true,
            building: true,
            elavator: true
        }
    }

    componentWillMount() {
    }

    _renderMain = (navigation) => {
        let color = '#F27B28'
        const {building} = this.props;
        if (building && building.colors && building.colors.primary) {
            color = building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header
                    title={'ACCESS CONTROL'}
                    leftButton={require('../../../assets/top_nav/menu.png')}
                    rightButton={require('../../../assets/top_nav/profile.png')}
                    leftPress={() => this.refs._drawer.open()}
                    rightPress={() => this.refs._right_drawer.open()}
                />
                <View style={{paddingTop: 35,paddingBottom: 10, alignItems: 'center'}}>
                    <Image source={require('../../../assets/images/QR.png')}/>
                </View>
                <Button style={{backgroundColor: color, marginHorizontal: 56}} title={'SEND GUEST INVITE'} onPress={()=>{
                    this.props.navigation.navigate('GuestInvite')
                }}/>
                <View style={{marginTop: 30, paddingHorizontal: 19}}>
                    <Text style={{fontFamily: "PingFang-SC-Light", fontSize: 18}}>Control Settings</Text>

                    <TextInput
                        icon={require('../../../assets/general/black/location_thin.png')}
                        placeholder='Accessible Location'
                        onChangeText={(name) => this.setState({name})}
                        iconstyle={{tintColor: '#B7B7B7'}}
                        customStyle={{marginTop: 0}}
                        value={this.state.location}
                    />

                    <View style={[styles.settings, {marginTop: 30}]}>
                        <Image style={{tintColor: '#000000', marginRight: 10}} source={require('../../../assets/images/car.png')} />
                        <Text style={{flex:1, color: '#000000', fontFamily: 'PingFang-SC-Regular'}}>Parking Garage</Text>
                        <Switch onValueChange={()=>this.setState({packing: !this.state.packing})} value={this.state.packing}/>
                    </View>

                    <View style={styles.settings}>
                        <Image style={{tintColor: '#000000', marginRight: 10}} source={require('../../../assets/general/black/building.png')} />
                        <Text style={{flex:1, color: '#000000', fontFamily: 'PingFang-SC-Regular'}}>Main Building</Text>
                        <Switch onValueChange={()=>this.setState({building: !this.state.building})} value={this.state.building}/>
                    </View>

                    <View style={styles.settings}>
                        <Image style={{tintColor: '#000000', marginRight: 10}} source={require('../../../assets/images/elavator.png')} />
                        <Text style={{flex:1, color: '#000000', fontFamily: 'PingFang-SC-Regular'}}>Elavator - Floors 21-22</Text>
                        <Switch onValueChange={()=>this.setState({elavator: !this.state.elavator})} value={this.state.elavator}/>
                    </View>

                </View>
            </View>
        )
    }
    close = () => {
        this.refs._drawer.close()
    }
    home = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Home')
        }, 250);
    }
    news = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('News')
        }, 250);
    }
    perks = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Perk')
        }, 250);
    }
    polls = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Polls')
        }, 250);
    }
    events = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Event')
        }, 250);
    }
    building = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Building')
        }, 250);
    }
    report = () => {
        this.refs._drawer.close()
        setTimeout(()=> {
            this.props.navigation.replace('Report')
        }, 250);
    }
    logout = () => {
        this.props.logout()
        this.props.navigation.pop()
    }
    profilepage = () => {
        this.refs._right_drawer.close()
        setTimeout(() => {
            this.props.navigation.navigate('Settings')
        }, 250);
    }
    notification = () => {
        this.refs._right_drawer.close()
        setTimeout(() => {
            this.props.navigation.navigate('Notifications')
        }, 250);
    }
    render() {
        const { navigation } = this.props;
        return (
            <ScalingDrawer
                ref={'_drawer'}
                content={
                    <LeftMenu
                        navigation={navigation}
                        close={this.close}
                        home ={this.home}
                        news ={this.news}
                        perks ={this.perks}
                        polls ={this.polls}
                        events ={this.events}
                        building ={this.building}
                        report={this.report}
                        logout={this.logout}
                    />}
                {...defaultScalingDrawerConfig}
                onClose={() => console.log('close')}
                onOpen={() => console.log('open')}
            >
                <ScalingDrawer
                    ref={'_right_drawer'}
                    content={
                        <ProfileMenu
                            close={()=> this.refs._right_drawer.close()}
                            navigation={navigation}
                            profilepage = {this.profilepage}
                            notificaiton = {this.notification}
                            logout={this.logout}
                        />}
                    {...rightScalingDrawerConfig}
                    onClose={() => console.log('close')}
                    onOpen={() => console.log('open')}
                >
                    {this._renderMain(navigation)}
                </ScalingDrawer>
            </ScalingDrawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

    settings: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 23
    }
});

const mapStateToProps = state => {
    return {
        building: state.building,
        // amentities: amentities,
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
