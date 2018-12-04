import React, { Component, PureComponent } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking, Platform, FlatList, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../component/header'
import LeftMenu from '../../component/menu'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import { content_building, content_envet, logout, rsvp_for_action, post_poll, get_building, clear_error_message } from '../../redux/reducers'
import HTML from 'react-native-render-html';
import moment from 'moment'

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
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    componentDidMount() {

        setTimeout(() => {
            this.props.content_building(this.props.building_id)
        }, 1000);
    }
    _onRefresh = () => {
        this.props.content_building(this.props.building_id);
        this.setState({ refreshing: true });
    }
    onMovePage(category) {

        switch (category) {
            case "Latest News":
                this.props.navigation.replace("News")
                break;
            case "Perks":
                this.props.navigation.replace("Perk")
                break;
            case "Events":
                this.props.navigation.replace("Event")
                break;
            case "Buildings":
                this.props.navigation.replace("Building")
                break;
            case "Polls":
                this.props.navigation.replace("Polls")
                break;
        }
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
        this.props.navigation.navigation('Login');
    }
    profilepage = () => {
        // this.refs._right_drawer.close()
        // setTimeout(() => {
        this.props.navigation.navigate('Settings')
        // }, 200);
    }
    notification = () => {
        // this.refs._right_drawer.close()
        // setTimeout(() => {
        this.props.navigation.navigate('Notifications')
        // }, 200);
    }
    onMoveToScreen(item, index) {

        if (item.type == "NEWS") {
            this.props.navigation.navigate('NewsDetail', { itemId: index })
        }

        if (item.type == "EVENT") {
            this.props.navigation.navigate('EventDetail', { itemId: index })
        }

        if (item.type == "PERK") {
            this.props.navigation.navigate('PerksDetail', { itemId: index })
        }

        if (item.type == 'POLL') {
            this.props.navigation.replace("Polls")
        }
    }
    checkPoll(poll) {
        var x = poll.filter(e => e.user_selected == true);
        return x.length > 0;
    }
    _renderMain = ({ item }) => {

        let c = item.items.map(repo => ({ key: repo.id, ...repo }));
        const { get_building } = this.props

        let building_color = '#F27B28'

        if (get_building && get_building.colors) {
            building_color = get_building.colors.primary
        }
        return (
            <View style={styles.category}>

                {
                    item.items.length > 0 ?
                        item.items.map((item, key) => (

                            <TouchableOpacity onPress={() => this.onMoveToScreen(item, key)} key={key}>
                                <View style={{
                                    borderBottomLeftRadius: 10,
                                    borderRadius: 10, minHeight: 330, borderWidth: 0.5, marginBottom: 20,
                                    borderColor: '#d2dae4',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    overflow: "hidden"

                                }}>
                                    <Image style={{
                                        width: '100%',
                                        height: 189,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}
                                        source={{ uri: item.media.url }} />
                                    <View style={{ margin: 20 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>

                                            <Text style={{ fontSize: 20, fontFamily: 'PingFang-SC-Semibold', color: building_color }}>

                                                {item.title}</Text>
                                            {/* <Image style={{ alignItems: 'flex-end', width: 4, height: 18, right: 0 }} source={require('../../../assets/images/menu_icn.png')} ></Image> */}
                                        </View>

                                        <View style={{ flexDirection: 'row', paddingBottom: 10, alignContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontFamily: 'PingFang-SC-Semibold', color: '#3B3B3E', marginRight: 20 }}>{item.author}</Text>
                                            <Text style={{ fontSize: 10, fontFamily: 'PingFang-SC-Semibold', color: '#C7C7CD' }}>{moment(item.publish).format('DD MMM YYYY')} </Text>
                                        </View>

                                        {
                                            item.type != 'POLL' &&

                                            <View style={{ flexDirection: 'row', paddingBottom: 20 }}>

                                                <HTML classesStyles={{ 'paragraph': { fontSize: 14, fontFamily: 'PingFang-SC-Semibold', fontWeight: '500', color: '#8F8E94' } }} html={'<p class="paragraph">' + item.body + '</p>'}
                                                    imagesMaxWidth={Dimensions.get('window').width}
                                                    onLinkPress={(evt, href) => { Linking.openURL(href); }}

                                                />

                                            </View>
                                        }
                                        {
                                            item.type == 'EVENT' &&
                                            <View>
                                                <View style={{ borderTopColor: '#efeff4', borderTopWidth: 0.5 }}>
                                                    {
                                                        item.event.capacity > 0 &&

                                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                                            <View style={{ flexDirection: 'row', width: 100 }}>
                                                                <Image style={{ width: 14, height: 17, marginRight: 10 }} source={require('../../../assets/images/evt_user.png')} ></Image>
                                                                <Text style={styles.eventLabel}>Remaining: </Text>
                                                            </View>
                                                            <Text style={[styles.eventText, { color: building_color }]} >{item.event.count}/{item.event.capacity}</Text>
                                                        </View>
                                                    }
                                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                                        <View style={{ flexDirection: 'row', width: 100 }}>
                                                            <Image style={{ width: 17, height: 18, marginRight: 10 }} source={require('../../../assets/images/icon_calendar.png')} ></Image>
                                                            <Text style={styles.eventLabel}>Event Date: </Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[styles.eventText, { color: building_color }]} numberOfLines={2}>{moment(item.event.start).format('dddd -  MMMM, DD, YYYY')} </Text>
                                                            <Text style={[styles.eventText, { color: building_color }]} numberOfLines={2}>{moment(item.event.start).format('@ h:mm')} - {moment(item.event.end).format('h:mm a')}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                                        <View style={{ flexDirection: 'row', width: 100 }}>
                                                            <Image style={{ width: 16, height: 20, marginRight: 10 }} source={require('../../../assets/images/location.png')} ></Image>
                                                            <Text style={styles.eventLabel}>Location: </Text>
                                                        </View>
                                                        <Text style={[styles.eventText, { color: building_color }]} numberOfLines={2}>{item.event.address}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ borderTopColor: '#efeff4', borderTopWidth: 0.5, marginTop: 20 }}>
                                                    <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                                                        {

                                                            <TouchableOpacity style={{
                                                                height: 40, borderRadius: 6,
                                                                backgroundColor: building_color, marginBottom: 10, justifyContent: 'center'
                                                            }} onPress={() => {
                                                                this.props.rsvp_for_action(item.id, item.event.rsvp)
                                                                // setTimeout(() => this.props.content_envet(this.props.building_id), 1000)
                                                                // item.event.rsvp = item.event.rsvp == 'RSVP' ? 'Remove RSVP' : 'RSVP';
                                                                // var newEventCount = item.event.count;
                                                                // newEventCount = item.event.rsvp == 'RSVP' ? (newEventCount - 1) : (newEventCount + 1);
                                                                // item.event.count = Math.max(newEventCount, 0);
                                                                // this.setState({ change: true });
                                                            }}>
                                                                <Text style={{ fontSize: 14, fontWeight: '500', fontFamily: 'PingFang-SC-Regular', textAlign: 'center', color: '#fff' }}>{item.event.rsvp == 'RSVP' ? 'RSVP' : 'Remove RSVP'}</Text>
                                                            </TouchableOpacity>

                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                        }
                                        {
                                            item.poll != null && item.poll != undefined && item.poll.length > 0 &&
                                            <View style={{ borderTopColor: '#efeff4', borderTopWidth: 0.5 }}>
                                                <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                                                    {
                                                        this.renderPoll(item, building_color)
                                                    }
                                                </View>
                                            </View>
                                        }
                                    </View>

                                </View>
                            </TouchableOpacity>
                        ))
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 130 }}>
                            <Text>No content currently available</Text>
                        </View>
                }

            </View>
        )
    }
    renderPoll(item, building_color) {
        if (item.polled != undefined || this.checkPoll(item.poll) == true) {
            return (<View>
                <View style={{ height: 100, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <Image style={{ tintColor: '#E3E3E3' }} source={require('../../../assets/images/polls_end.png')} />
                    <Text style={{ fontFamily: 'PingFang-SC-Regular', color: '#000000', fontSize: 20, marginTop: 5 }}>Thanks for</Text>
                    <Text style={{ fontFamily: 'PingFang-SC-Regular', color: '#000000', fontSize: 20 }}>your feedback!</Text>
                </View>
            </View>)
        }
        else {
            return (

                item.poll.map((r, k) => (
                    <TouchableOpacity key={k} style={{ height: 40, borderRadius: 6, backgroundColor: building_color, marginBottom: 10, justifyContent: 'center' }}
                        onPress={() => {
                            this.props.post_poll(item.id);
                            item.polled = true;
                            this.setState({ change: true });
                        }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: '500', fontFamily: 'PingFang-SC-Regular', textAlign: 'center', color: '#fff' }}>{r.answer}</Text>
                    </TouchableOpacity>
                ))
            )
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.error !== nextProps.error && nextProps.error) {
            var { error } = nextProps;
            Alert.alert("Fail", error,
                [
                    {
                        text: 'OK', onPress: () => this.props.clear_error_message()
                    },
    
                ],
                { cancelable: true }
            )
        }
    }
    render() {

        const { navigation, contents } = this.props;
        _keyExtractor = (item, index) => item.id;
        const { loading, error } = this.props;
        console.log("home ... render: ", { loading, error });
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
                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'PingFang-SC-Regular' }}>LASTEST POST</Text>

                            </View>
                            <FlatList showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                                keyExtractor={_keyExtractor}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.props.loading}
                                        onRefresh={this._onRefresh}
                                    />
                                }
                                data={contents}
                                renderItem={this._renderMain}
                            />
                            {this.props.loading_activity && <ActivityIndicator style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} size="large" color="#F27B28" />}
                        </View>
                    </View>
                </ScalingDrawer>
            </ScalingDrawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 17,
        paddingBottom: 20,
    },
    category: {
        marginBottom: 15
    },
    header: {
        position: "relative",
        marginBottom: 15
    },
    readMoreContainer: {
        position: "absolute",
        right: 10
    },
    readMore: {
        flexDirection: "row",
        alignItems: "center",
    },
    readMoreText: {
        color: "#F27B28"
    },
    categoryTitle: {
        fontSize: 18,
        fontFamily: "PingFang-SC-Regular"
    },
    item: {
        marginRight: 15,
        maxWidth: 130
    },
    itemTitle: {
        marginTop: 5,
        fontFamily: "PingFang-SC-Semibold",
        color: "#8F8E94",
        fontSize: 12


    },
    eventText:
    {
        fontSize: 12,
        fontFamily: 'PingFang-SC-Semibold'

    },
    eventLabel:
    {
        fontSize: 12,
        color: '#3b3b3e',
        fontFamily: 'PingFang-SC-Semibold'
    }
})

const mapStateToProps = state => {
    let contents = state.contents.map(repo => ({ key: repo.id, ...repo }));
    return {
        get_building: state.building,
        building_id: state.building_id,
        contents: contents,
        loading: state.loading_content,
        loading_activity: state.loading_activity,
        error: state.error_load_content,
    };
};

const mapDispatchToProps = {
    content_building,
    content_envet,
    rsvp_for_action,
    post_poll,
    get_building,
    logout,
    clear_error_message
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
