import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { Image, Button, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import { logout } from "../../redux/reducers";
import FontAwesome, { Icons } from 'react-native-fontawesome';
var { height, width } = Dimensions.get('window');
import { unsubcribeAllTopic } from '../../fcm';

class ProfileMenu extends Component {
    constructor(props) {
        super(props);

    }
    profilepage = () => {
        this.props.navigation.navigate('Settings')
    }
    notification = () => {
        this.props.navigation.navigate('Notifications')
    }
    onAccessControl = () => {
        this.props.navigation.navigate('AccessControl')
    }
    render() {
        const { close, home, news, perks, polls, events, building, report, logout, get_building } = this.props
        let backgroundColor = '#F9A726'
        let name = 'THE CENTRUM'

        if (get_building && get_building.name) {
            name = get_building.name
        }
        if (get_building && get_building.colors && get_building.colors.primary) {
            backgroundColor = get_building.colors.primary
        }
        return (
            <View style={[styles.contain, { backgroundColor: backgroundColor }]}>
                <View style={styles.title}>
                    <TouchableOpacity onPress={() => this.props.close()}>
                        <Image source={require('../../../assets/images/drawer_close.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        {/*<Image source={require('../../../assets/images/right_drawer_profile.png')}/>*/}
                    </View>
                    <View style={{ flex: 1, marginTop: 32, marginLeft: 18 }}>
                        <View style={{ alignItems: 'center' }}>
                            {this.props.user.avatar ?
                                <Image style={{ width: 76, height: 76, borderRadius: 40, marginTop: 20 }}
                                    source={{ uri: this.props.user.avatar }} /> :
                                <Image style={{ width: 76, height: 76, borderRadius: 40, marginTop: 20 }}
                                    source={require('../../../assets/images/avatar.png')} />
                            }
                            <Text style={styles.titleBottom}>{this.props.user.firstname} {this.props.user.lastname}</Text>
                            <Text style={styles.titleBottom}>{this.props.user.email}</Text>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <TouchableOpacity style={styles.drawerItemView} onPress={() => this.profilepage()}>
                                <FontAwesome style={{ color: 'white', fontSize: 23, alignItems: 'center' }}>{Icons.userO}</FontAwesome>
                                {/* <Image style={{tintColor: 'white'}} source={require('../../../assets/right_menu/profile.png')}/> */}
                                <Text style={styles.drawerText}>Profile</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.drawerItemView} onPress={this.onAccessControl}>
                                <FontAwesome style={{ color: 'white', fontSize: 22, alignItems: 'center' }}>{Icons.heartO}</FontAwesome>
                               
                                <Text style={styles.drawerText}>{width <= 320 ? "Access\nControl" : "Access Control"}</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.drawerItemView} onPress={() => this.notification()}>
                                <FontAwesome style={{ color: 'white', fontSize: 22, alignItems: 'center' }}>{Icons.bellO}</FontAwesome>
                                {/* <Image source={require('../../../assets/right_menu/notification.png')}/> */}
                                <Text style={styles.drawerText}>Notifications</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerItemView} onPress={() => this.logout()}>
                                <FontAwesome style={{ color: 'white', fontSize: 22, alignItems: 'center' }}>{Icons.signOut}</FontAwesome>
                                {/* <Image source={require('../../../assets/left_menu/logout.png')}/> */}
                                <Text style={styles.drawerText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    logout() {
        unsubcribeAllTopic()
            .then(() => {
                this.props.logout();
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(resetAction);
            })
    }
}
const styles = StyleSheet.create({
    contain: {
        // width: width,
        backgroundColor: '#F9A726',
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 34
    },
    titleTop: {
        fontSize: 20,
        fontFamily: "PingFang-SC-Regular",
        color: 'white'
    },
    titleBottom: {
        fontSize: 10,
        fontFamily: "PingFang-SC-Regular",
        color: 'white'
    },
    drawerText: {
        fontSize: 17.36,
        color: 'white',
        marginLeft: 20,
        fontFamily: "PingFang-SC-Medium",
    },
    drawerItemView: {
        flexDirection: 'row',
        marginTop: 27,
        alignItems: 'center'
    }
})
const mapStateToProps = state => {
    return {
        get_building: state.building,
        user: state.user
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
