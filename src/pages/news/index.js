import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, RefreshControl ,Linking} from 'react-native';
import Header from '../../component/header'
import ImageC from 'react-native-scalable-image'
import Icon from 'react-native-vector-icons/EvilIcons';
import { connect } from "react-redux";
import LeftMenu from '../../component/menu'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import moment from 'moment'
import { content_news, logout } from '../../redux/reducers'
import HTML from 'react-native-render-html';
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

class News extends Component {
    _onRefresh = () => {
        this.props.content_news(this.props.building_id)
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
        this.props.navigation.navigate('Settings')
    }
    notification = () => {
        this.props.navigation.navigate('Notifications')
    }
    _renderMain = ({ item, index }) => {

        let text = item.body

        const { get_building } = this.props;
        let color = '#F27B28'
        if (get_building && get_building.colors && get_building.colors.primary) {
            color = get_building.colors.primary
        }
        return (
            <View style={styles.card}>
                <View>
                    <ImageC width={width - 40} style={styles.image} source={{ uri: item.media.url }} />

                    <View style={styles.info}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsDetail', { itemId: index, })}>
                            <Text style={[styles.title, { color: color }]}>{item.title.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <View style={styles.articleInfo}>
                            <Text style={styles.author}>{item.author}</Text>
                            <Text style={styles.time}>{moment(item.publish).format('MMMM Do YYYY, h:mm a')}</Text>
                        </View>
                        <HTML classesStyles={{ 'paragraph': { fontSize: 14, fontFamily: 'PingFang-SC-Semibold', fontWeight: '500', color: '#8F8E94' } }} html={'<p class="paragraph">' + item.body + '</p>'}
                                                    imagesMaxWidth={Dimensions.get('window').width}
                                                    onLinkPress={(evt, href) => { Linking.openURL(href); }}

                                                />
                        {/* <HTML html={text} imagesMaxWidth={Dimensions.get('window').width}
                            onLinkPress={(evt, href) => { Linking.openURL(href); }}
                        /> */}
                        {/* <Text numberOfLines={2} style={styles.description}>
                            {text}
                        </Text> */}

                        <TouchableOpacity style={styles.readMore} onPress={() => this.props.navigation.navigate("NewsDetail", { itemId: index, })}>
                            <Text style={[styles.readMoreText, { color: color }]}>Read More</Text>
                            <Icon name={"chevron-right"} size={30} color={color} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const { navigation, news } = this.props;
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
                            title={'LATEST NEWS'}
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
                                data={news}
                                renderItem={this._renderMain}
                            />
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
        backgroundColor: "#F8F8F8"
    },
    newsCards: {
        flex: 1,
        padding: 20,
        paddingBottom: 35
    },
    card: {
        borderRadius: 6,
        backgroundColor: "#fff",
        marginBottom: 20
    },
    image: {
        width: width - 40,
        height: 189,
        resizeMode: 'stretch',
        borderRadius: 5,
        marginBottom: -10
    },
    info: {
        padding: 18,
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
        fontWeight: '500',
        marginRight: 5,
    },
    time: {
        fontSize: 10,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: '500',
        color: "#C7C7CD"
    },
    readMore: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#EFEFF4",
        paddingTop: 5,
        height: 35,
    },
    readMoreText: {
        color: "#F27B28",
        fontFamily: 'PingFang-SC-Semibold',
        fontSize: 12
    }
});

const mapStateToProps = state => {
    let news = state.news.map(repo => ({ key: repo.id, ...repo }));
    return {
        news: news,
        loading: state.loading,
        building_id: state.building_id,
        get_building: state.building
    };
};

const mapDispatchToProps = {
    content_news,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
