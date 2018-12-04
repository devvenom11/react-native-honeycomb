import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import SwipeCards from '../../component/SwipeCards/SwipeCards';
import Header from '../../component/header'
import Button from '../../component/button'
import { connect } from "react-redux"
import { post_poll, content_poll, logout } from '../../redux/reducers'
import LeftMenu from '../../component/menu'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer'
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

var { height, width } = Dimensions.get('window')

class NoMoreCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let color = '#F27B28'
        const { get_building } = this.props;
        if (get_building && get_building.colors && get_building.colors.primary) {
            color = get_building.colors.primary
        }
        return (
            <View>
                <View style={{ width: width - 40, height: height - 180, backgroundColor: 'white', margin: 10, borderRadius: 20, borderColor: '#979797', alignItems: 'center', justifyContent: 'center', }}>
                    <Image style={{ tintColor: '#E3E3E3' }} source={require('../../../assets/images/polls_end.png')} />
                    <Text style={{ fontFamily: 'PingFang-SC-Regular', color: '#000000', fontSize: 20, marginTop: 5 }}>Thanks for</Text>
                    <Text style={{ fontFamily: 'PingFang-SC-Regular', color: '#000000', fontSize: 20 }}>your feedback!</Text>
                </View>
            </View>
        )
    }
}

class Polls extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.content_poll(this.props.building_id)
    }
    _renderCard = (props) => {
        let color = '#F27B28'
        const { get_building } = this.props;
        if (get_building && get_building.colors && get_building.colors.primary) {
            color = get_building.colors.primary
        }
        return (
            <View style={styles.card}>
                <View>
                    <Image style={styles.image} source={{ uri: props.media.url }} />

                    <View style={styles.info}>
                        <Text style={[styles.title, { color: color }]}>{props.title.toUpperCase()}</Text>

                        <View style={styles.articleInfo}>
                            <Text style={styles.author}>{props.author}</Text>
                            <Text style={styles.time}>{moment(props.publish).format('MMMM Do YYYY, h:mm a')}</Text>
                        </View>

                        <View style={styles.readMore}>
                            {props.poll.map((poll, index) => (
                                <Button title={poll.answer}
                                    style={{
                                        backgroundColor: poll.user_selected ? color : 'white',
                                        borderWidth: 1,
                                        borderColor: color,
                                        height: 35,
                                    }}
                                    textStyle={{ color: poll.user_selected ? 'white' : color }}
                                    onPress={() => this.onCardswipe(poll, index)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    onCardswipe(poll, index) {
        this.props.post_poll(poll.poll_id)
        if (index > 0) {
            this.refs['swiper']._forceRightSwipe()
        } else {
            this.refs['swiper']._forceLeftSwipe()
        }
    }
    _renderMain = (navigation, poll) => (
        <View style={styles.container}>
            <Header
                title={'POLLS'}
                leftButton={require('../../../assets/top_nav/menu.png')}
                rightButton={require('../../../assets/top_nav/profile.png')}
                leftPress={() => this.refs._drawer.open()}
                rightPress={() => this.refs._right_drawer.open()}
            />
            <View style={{ height: height - 120 }}>
                <SwipeCards
                    ref={'swiper'}
                    cards={poll}
                    renderCard={this._renderCard}
                    renderNoMoreCards={() => <NoMoreCards get_building={this.props.get_building} />}
                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    handleMaybe={this.handleMaybe}
                    hasMaybeAction={false}
                    hasYupAction={false}
                    showNope={false}
                    showYup={false}
                    showMaybe={false}
                    hasNopeAction={false}
                />
            </View>
            <View style={{ marginBottom: 22, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontFamily: 'PingFang-SC-Regular', color: '#8F8E94', fontSize: 16, marginHorizontal: 50 }}>Swipe Left for the Next Poll</Text>
            </View>
        </View>
    )
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
    render() {
        const { navigation, poll } = this.props;
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
                    {this._renderMain(navigation, poll)}
                </ScalingDrawer>
            </ScalingDrawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingBottom: 20
    },
    newsCards: {
        padding: 20
    },
    card: {
        borderRadius: 6,
        backgroundColor: "#fff",
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'grey',
        width: width - 40,
    },
    image: {
        width: width - 40,
        height: 189,
        resizeMode: 'stretch'
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
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#EFEFF4",
        paddingTop: 5,
    },
    readMoreText: {
        color: "#F27B28",
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12
    }
});

const mapStateToProps = state => {
    return {
        poll: state.poll,
        building_id: state.building_id,
        get_building: state.building
    };
};

const mapDispatchToProps = {
    post_poll,
    content_poll,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
