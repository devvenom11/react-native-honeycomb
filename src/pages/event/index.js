import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, RefreshControl } from 'react-native';
import Header from '../../component/header'
import ImageC from 'react-native-scalable-image'
import { connect } from "react-redux";
import Button from '../../component/button'
import LeftMenu from '../../component/menu'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import moment from 'moment'
import { content_envet, rsvp_for_action, logout } from '../../redux/reducers'

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

class Events extends Component {
    _onRefresh = () => {
        this.props.content_envet(this.props.building_id)
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
        setTimeout(() => {
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

    onEvent(item) {
        this.props.rsvp_for_action(item.id, item.event.rsvp)
        setTimeout(() => this.props.content_envet(this.props.building_id), 1000)
    }

    _renderMain = ({ item, index }) => {
        let color = '#F27B28'
        const { get_building } = this.props;
        if (get_building && get_building.colors && get_building.colors.primary) {
            color = get_building.colors.primary
        }
        return (
            <View style={styles.card}>
                <View>
                    <ImageC width={width - 40} style={styles.image} source={{ uri: item.media.url }} />
                    <View style={{ backgroundColor: 'white', height: 5, marginTop: -5 }}>
                    </View>

                    <View style={styles.info}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EventDetail', { itemId: index, })}>
                            <Text style={[styles.title, { color: color }]}>{item.title.toUpperCase()}</Text>
                        </TouchableOpacity>

                        <View style={styles.articleInfo}>
                            <Text style={styles.author}>{item.author}</Text>
                            <Text style={styles.time}>{moment(item.publish).format('MMMM Do YYYY, h:mm a')}</Text>
                        </View>
                        <Text numberOfLines={2} style={styles.description}>
                            {item.body}
                        </Text>
                        <View style={{
                            paddingVertical: 20,
                            borderTopWidth: 1,
                            borderTopColor: '#EFEFF4',
                            flexDirection: 'row'
                        }}>
                            <View style={styles.infoItem}>
                                {
                                    item.event.capacity > 0
                                    &&
                                    <View style={styles.itemView}>
                                        <Image style={{ tintColor: '#000000', width: 14, height: 17 }}
                                            source={require('../../../assets/general/black/person.png')} />
                                        <Text style={styles.itemName}>
                                            Remaining:
                                        </Text>
                                    </View>
                                }
                                <View style={styles.itemView}>
                                    <Image style={{ tintColor: '#000000', width: 15.61, height: 17.44 }}
                                        source={require('../../../assets/general/black/calendar.png')} />
                                    <Text style={styles.itemName}>
                                        Event Date:
                                    </Text>
                                </View>
                                <View style={styles.itemView}>
                                    <Image style={{ tintColor: '#000000' }}
                                        source={require('../../../assets/general/black/location_thin.png')} />
                                    <Text style={styles.itemName}>
                                        Location:
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.infoItem, { flex: 2.5 }]}>
                                {
                                    item.event.capacity > 0
                                    &&

                                    <View style={styles.itemViewContent}>
                                        <Text style={[styles.itemContent, { color: color }]}>
                                            {item.event.count}/{item.event.capacity}
                                        </Text>
                                    </View>
                                }
                                <View style={styles.itemView}>
                                    <Text style={[styles.itemContent, { color: color }]}>
                                        {moment(item.event.start).format('dddd -  MMMM, Do, YYYY @ h:mm a')} - {moment(item.event.end).format('h:mm a')}
                                    </Text>
                                </View>
                                <View style={styles.itemViewContent}>
                                    <Text style={[styles.itemContent, { color: color }]}>
                                        {item.event.venue}
                                    </Text>
                                    <Text numberOfLines={1} style={[styles.itemContent, { color: color }]}>
                                        {item.event.address}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.readMore}>
                            <Button
                                title={item.event.rsvp == 'RSVP' ? 'RSVP' : 'Remove RSVP'}
                                style={{
                                    backgroundColor: color,
                                    borderWidth: 1,
                                    borderColor: color,

                                    height: 35,
                                    marginTop: 0
                                }}
                                textStyle={{ color: 'white' }}
                                onPress={() => this.onEvent(item, index)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const { navigation, event } = this.props;
        return (
            <ScalingDrawer
                ref={'_drawer'}
                content={
                    <LeftMenu
                        navigation={navigation}
                        close={this.close}
                        home={this.home}
                        news={this.news}
                        perks={this.perks}
                        polls={this.polls}
                        events={this.events}
                        building={this.building}
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
                            close={() => this.refs._right_drawer.close()}
                            navigation={navigation}
                            profilepage={this.profilepage}
                            notificaiton={this.notification}
                            logout={this.logout}
                        />}
                    {...rightScalingDrawerConfig}
                    onClose={() => console.log('close')}
                    onOpen={() => console.log('open')}
                >
                    <View style={styles.container}>
                        <Header
                            leftButton={require('../../../assets/top_nav/menu.png')}
                            rightButton={require('../../../assets/top_nav/profile.png')}
                            leftPress={() => this.refs._drawer.open()}
                            rightPress={() => this.refs._right_drawer.open()}
                        />
                        <View style={styles.newsCards}>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.props.loading}
                                        onRefresh={this._onRefresh}
                                    />
                                }
                                data={event}
                                renderItem={this._renderMain}
                            />
                        </View>
                    </View>
                </ScalingDrawer>
            </ScalingDrawer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    newsCards: {
        flex: 1,
        padding: 20
    },
    card: {
        borderRadius: 6,
        backgroundColor: "#fff",
        marginBottom: 20
    },
    image: {
        width: width - 40,
        resizeMode: 'stretch',
        borderRadius: 5,
    },
    info: {
        padding: 18
    },
    title: {
        fontSize: 20,
        fontFamily: 'PingFang-SC-Medium',
        color: "#F27B28"
    },
    description: {
        lineHeight: 22,
        color: '#8F8E94',
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
        marginBottom: 10
    },
    articleInfo: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10
    },
    author: {
        fontSize: 10,
        color: "#3B3B3E",
        fontFamily: 'PingFang-SC-Medium',
        marginRight: 5,
    },
    time: {
        fontSize: 10,
        fontFamily: 'PingFang-SC-Medium',
        color: "#C7C7CD"
    },
    readMore: {
        borderTopWidth: 1,
        borderTopColor: "#EFEFF4",
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    readMoreText: {
        color: "#F27B28",
        fontFamily: 'PingFang-SC-Semibold',
        fontSize: 12
    },
    infoItem: {
        flex: 1,
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
        event: event,
        loading: state.loading,
        building_id: state.building_id,
        get_building: state.building
    };
};

const mapDispatchToProps = {
    content_envet,
    rsvp_for_action,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
