import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { building_form, content_amenities, getAmenity, logout } from "../../redux/reducers";
import { connect } from "react-redux";
import FontAwesome, { Icons } from 'react-native-fontawesome';
var { height, width } = Dimensions.get('window');
class Menu extends Component {
    constructor(props) {
        super(props);

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
                    <View style={{ marginLeft: 11.81, flex: 1 }}>
                        <Text style={styles.titleTop}>{name}</Text>
                        <Text style={styles.titleBottom}>Powered by Honeycomb</Text>
                    </View>
                    <TouchableOpacity onPress={close}>
                        <Image source={require('../../../assets/images/drawer_close.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginTop: 55, marginLeft: 18 }}>
                        <TouchableOpacity style={styles.drawerItemView} onPress={home}>
                            <FontAwesome style={{ color: 'white', fontSize: 24 }}>{Icons.home}</FontAwesome>
                            {/* <Image source={require('../../../assets/left_menu/home.png')}/> */}
                            <Text style={styles.drawerText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerItemView} onPress={news}>
                            <FontAwesome style={{ color: 'white', fontSize: 20 }}>{Icons.newspaperO}</FontAwesome>
                            {/* <Image source={require('../../../assets/left_menu/news.png')}/> */}
                            <Text style={styles.drawerText}>News</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerItemView} onPress={perks}>
                            <FontAwesome style={{ color: 'white', fontSize: 22 }}>{Icons.star}</FontAwesome>
                            {/* <Image source={require('../../../assets/left_menu/perks.png')}/> */}
                            <Text style={styles.drawerText}>Perks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerItemView} onPress={events}>
                            <FontAwesome style={{ color: 'white', fontSize: 22 }}>{Icons.calendar}</FontAwesome>
                            {/* <Image source={require('../../../assets/left_menu/events.png')}/> */}
                            <Text style={styles.drawerText}>Events</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerItemView} onPress={polls}>
                            <FontAwesome style={{ color: 'white', fontSize: 22 }}>{Icons.checkSquareO}</FontAwesome>
                            {/* <Image source={require('../../../assets/left_menu/polls.png')}/> */}
                            <Text style={styles.drawerText}>Polls</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerItemView} onPress={building}>
                            <FontAwesome style={{ color: 'white', fontSize: 22 }}>{Icons.building}</FontAwesome>
                            {/* <Image source={require('../../../assets/left_menu/building.png')}/> */}
                            <Text style={styles.drawerText}>Building</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerItemView} onPress={report}>
                            <FontAwesome style={{ color: 'white', fontSize: 18 }}>{Icons.lineChart}</FontAwesome>
                            {/* <Image source={require('../../../assets/images/drawer_report.png')}/> */}
                            <Text style={styles.drawerText}>Report</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.drawerItemView} onPress={logout}>
                            <FontAwesome style={{ color: 'white', fontSize: 22 }}>{Icons.signOut}</FontAwesome>
                   
                            <Text style={styles.drawerText}>Logout</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ flex: 1.5, marginTop: 15, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contain: {
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
        fontSize: 24,
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
        fontFamily: "PingFangSC-Medium",
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
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
