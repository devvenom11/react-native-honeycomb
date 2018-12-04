import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
class Header extends Component {

    render() {
        const { rightText, title, leftPress, rightPress, leftButton, rightButton, get_building, fontAwesome } = this.props
        let logo = require('../../../assets/logo/honeycomb.png')

        if (get_building && get_building.logo) {
            logo = { uri: get_building.logo.small }
        }
        return (
            <SafeAreaView style={styles.header}>
                <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20 }} onPress={leftPress}>
                    {leftButton ?
                        <Image source={leftButton} /> :
                        <Image source={require('../../../assets/images/back.png')} />
                    }
                </TouchableOpacity>
                {title ?
                    <Text style={{ fontSize: 18, fontFamily: "PingFang-SC-Semibold" }}>{title}</Text> :
                    <Image style={{ width: 146.11, height: 28.33, resizeMode: 'contain' }} source={logo} />
                }
                <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20 }} onPress={rightPress}>
                    {rightButton ?
                        fontAwesome ?
                            rightButton :
                            <Image source={rightButton} /> :
                        <Text style={{
                            color: '#3B3B3E',
                            fontSize: 14,
                            fontFamily: 'PingFang-SC-Semibold'
                        }}>{rightText}</Text>
                    }
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = Object.assign({}, StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#979797',
        backgroundColor: 'white'
    }
}));

const mapStateToProps = state => {
    return {
        get_building: state.building,
        building_id: state.building_id
    };
};

const mapDispatchToProps = {
    // listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
