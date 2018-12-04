import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import ImageC from 'react-native-scalable-image'
import Header from '../../component/header'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import { connect } from "react-redux";
import moment from 'moment'
import { rsvp_for_action, content_envet } from '../../redux/reducers'
import HTML from 'react-native-render-html';
var { width } = Dimensions.get('window')
import Button from '../../component/button'
let rightScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: -0.4,
    swipeOffset: 20
};
class EventDetail extends Component {
    render() {
        const { navigation, event, get_building } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        let color = '#F27B28'
        if (get_building && get_building.colors && get_building.colors.primary) {
            color = get_building.colors.primary
        }
        return (
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
                        title={'Event'}
                        rightButton={require('../../../assets/general/black/person.png')}
                        leftPress={() => this.props.navigation.pop()}
                        rightPress={() => this.refs._right_drawer.open()}
                    />

                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        <ImageC width={width} source={{ uri: event[itemId].media.url }} />
                        <View style={styles.info}>
                            <Text style={[styles.title, { color: color }]}>{event[itemId].title.toUpperCase()}</Text>

                            <View style={styles.articleInfo}>
                                <Text style={styles.author}>{event[itemId].author}</Text>
                                <Text style={styles.time}>{moment(event[itemId].publish).format('MMMM Do YYYY, h:mm a')}</Text>
                            </View>

                            <Text style={styles.description}>
                                {event[itemId].body}
                            </Text>

                            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#EFEFF4', flexDirection: 'row' }}>
                                <View style={styles.infoItem}>
                                    <View style={styles.itemView}>
                                        <Image style={{ tintColor: '#000000', width: 14, height: 17 }} source={require('../../../assets/general/black/person.png')} />
                                        <Text style={styles.itemName}>
                                            Remaining:
                                        </Text>
                                    </View>
                                    <View style={styles.itemView}>
                                        <Image style={{ tintColor: '#000000', width: 15.61, height: 17.44 }} source={require('../../../assets/general/black/calendar.png')} />
                                        <Text style={styles.itemName}>
                                            Event Date:
                                        </Text>
                                    </View>
                                    <View style={styles.itemView}>
                                        <Image style={{ tintColor: '#000000' }} source={require('../../../assets/general/black/location_thin.png')} />
                                        <Text style={styles.itemName}>
                                            Location:
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.infoItem, { flex: 2.5 }]}>
                                    <View style={styles.itemView}>
                                        <Text style={[styles.itemContent, { color: color }]}>
                                            {event[itemId].event.count}/{event[itemId].event.capacity}
                                        </Text>
                                    </View>
                                    <View style={styles.itemView}>
                                        <Text style={[styles.itemContent, { color: color }]}>
                                            {moment(event[itemId].event.start).format('dddd -  MMMM, Do, YYYY @ h:mm a')} - {moment(event[itemId].event.end).format('h:mm a')}
                                        </Text>
                                    </View>
                                    <View style={[styles.itemView, { flexDirection: 'column' }]}>
                                        <Text style={[styles.itemContent, { color: color }]}>
                                            {event[itemId].event.venue}
                                        </Text>
                                        <Text numberOfLines={1} style={[styles.itemContent, { color: color }]}>
                                            {event[itemId].event.address}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.readMore}>
                                <Button
                                    title={event[itemId].event.rsvp == 'RSVP' ? 'RSVP' : 'Remove RSVP'}
                                    style={{
                                    
                                        backgroundColor: color,
                                        borderWidth: 1,
                                        borderColor: color,
                                        height: 35,
                                        marginTop: 0
                                    }}
                                    textStyle={{ color: 'white' }}
                                    onPress={() => this.onEvent(event[itemId])}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScalingDrawer>
        )
    }
    onEvent(item, index) {

        this.props.rsvp_for_action(item.id, item.event.rsvp)
        setTimeout(() => this.props.content_envet(this.props.building_id), 1000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        width: width,
        height: width,
        resizeMode: 'contain'
    },
    info: {
        padding: 18
    },
    title: {
        fontSize: 20,
        fontFamily: 'PingFang-SC-Semibold',
        color: "#F27B28"
    },
    description: {
        lineHeight: 22,
        color: '#8F8E94',
        fontFamily: 'PingFang-SC-Semibold',
        fontWeight: '500',
        fontSize: 14,
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
        fontFamily: 'PingFang-SC-Semibold',
        fontWeight: '500',
        marginRight: 5,
    },
    time: {
        fontSize: 10,
        fontFamily: 'PingFang-SC-Semibold',
        fontWeight: '500',
        color: "#C7C7CD"
    },
    readMore: {
        borderTopWidth: 1,
        borderTopColor: "#EFEFF4",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
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
        width: 150,
        fontFamily: 'PingFang-SC-Semibold',
        fontSize: 12,
        color: '#F27B28'
    },
    itemView: {
        flexDirection: 'row',
        marginTop: 6,
        height: 35
    }
});
const mapStateToProps = state => {
    return {
        event: state.event,
        building_id: state.building_id,
        get_building: state.building
    };
};

const mapDispatchToProps = {
    content_envet,
    rsvp_for_action
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
