import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, RefreshControl, Platform, Linking } from 'react-native';
import Header from '../../component/header'
import Icon from 'react-native-vector-icons/EvilIcons';
import { connect } from "react-redux";
import LeftMenu from '../../component/menu'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import moment from 'moment'
import ImageC from 'react-native-scalable-image'
import { content_perk, logout } from '../../redux/reducers'
import HTML from 'react-native-render-html';
import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome';

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

class Perk extends Component {
    state = {
        foodstate: 'perk'
    }
    _onRefresh = () => {
        this.props.content_perk(this.props.building_id)
    }
    _renderMain = ({ item, index }) => {

        let yarn = item.body.indexOf("<p>")
        let text = item.body
        // if (text.indexOf('<br>') > -1) {
        //     let brtextarray = text.split('<br>')
        //     let br_text = ''
        //     for (var i = brtextarray.length-1; i >= 0  ; i--){
        //         br_text = brtextarray[i] + '\n' + br_text
        //     }
        //     text = br_text

        // }

        // if (yarn > -1) {
        //     text = text.slice(3, text.length-5);
        // }
        const { get_building } = this.props;
        let color = '#F27B28'
        if (get_building && get_building.colors && get_building.colors.primary) {
            color = get_building.colors.primary
        }
        return (
            <View style={styles.card}>
                <View>
                    <ImageC width={width - 40} style={styles.image} source={{ uri: item.media.url }} />
                    <View style={{ backgroundColor: 'white', height: 5, marginTop: -5 }} />
                    <View style={styles.info}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PerksDetail', { itemId: index })}>
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

                        <TouchableOpacity style={styles.readMore} onPress={() => this.props.navigation.navigate("PerksDetail", { itemId: index })}>
                            <Text style={[styles.readMoreText, { color: color }]}>Read More</Text>
                            <Icon name={"chevron-right"} size={30} color={color} />
                        </TouchableOpacity>
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
        const { navigation, perk, food, products, service, get_building } = this.props;
        let feed = 'perk'
        if (this.state.foodstate == 'perk')
            feed = perk
        if (this.state.foodstate == 'food')
            feed = food
        if (this.state.foodstate == 'products')
            feed = products
        if (this.state.foodstate == 'services')
            feed = service
        let building_color = '#F27B28'

        if (get_building && get_building.colors) {
            building_color = get_building.colors.primary
        }
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
                            title={'PERKS'}
                            leftButton={require('../../../assets/top_nav/menu.png')}
                            rightButton={require('../../../assets/top_nav/profile.png')}
                            leftPress={() => this.refs._drawer.open()}
                            rightPress={() => this.refs._right_drawer.open()}
                        />
                        <View style={[styles.newsCards, { height: height - 125 }]}>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.props.loading}
                                        onRefresh={this._onRefresh}
                                    />
                                }
                                data={feed}
                                renderItem={this._renderMain}
                            />
                        </View>
                        <View style={{ height: 55, borderTopWidth: 1, borderTopColor: 'gray', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ foodstate: 'perk' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome style={{ color: this.state.foodstate == 'perk' ? building_color : '#000000', fontSize: 22 }}>{Icons.clockO}</FontAwesome>
                                    {/* <Image style={{tintColor: this.state.foodstate == 'perk' ? building_color : '#000000'}} source={require('../../../assets/bottom_nav/clock.png')}/> */}
                                    <Text style={[styles.tapText, { color: this.state.foodstate == 'perk' ? building_color : '#000000' }]}>All</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ foodstate: 'food' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome style={{ color: this.state.foodstate == 'food' ? building_color : '#000000', fontSize: 22 }}>{Icons.cutlery}</FontAwesome>
                                    {/* <Image style={{tintColor: this.state.foodstate == 'food' ? building_color : '#000000'}}source={require('../../../assets/bottom_nav/food.png')}/> */}
                                    <Text style={[styles.tapText, { color: this.state.foodstate == 'food' ? building_color : '#000000' }]}>Food</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ foodstate: 'products' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome style={{ color: this.state.foodstate == 'products' ? building_color : '#000000', fontSize: 22 }}>{Icons.gift}</FontAwesome>
                                    {/* <Image style={{tintColor: this.state.foodstate == 'products' ? building_color : '#000000'}}source={require('../../../assets/bottom_nav/products.png')}/> */}
                                    <Text style={[styles.tapText, { color: this.state.foodstate == 'products' ? building_color : '#000000' }]}>Products</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ foodstate: 'services' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome style={{ color: this.state.foodstate == 'services' ? building_color : '#000000', fontSize: 22 }}>{Icons.cog}</FontAwesome>
                                    {/* <Image style={{tintColor: this.state.foodstate == 'services' ? building_color : '#000000'}}source={require('../../../assets/bottom_nav/service.png')}/> */}
                                    <Text style={[styles.tapText, { color: this.state.foodstate == 'services' ? building_color : '#000000' }]}>Services</Text>
                                </View>
                            </TouchableOpacity>
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
        flex: Platform.OS === 'ios' ? 1 : 0,
        padding: 20,
        paddingBottom: 0
    },
    card: {
        borderRadius: 6,
        backgroundColor: "#fff",
        marginBottom: 20
    },
    image: {
        width: width - 40,
        height: 189,
        // resizeMode: 'stretch',
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
        fontFamily: 'PingFang-SC-Semibold',
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
    },
    tapText: {
        color: "#3B3B3E",
        fontFamily: 'PingFang-SC-Semibold',
        fontSize: 12,
        marginTop: 2
    }
});

const mapStateToProps = state => {
    let perk = state.perk.map(repo => ({ key: repo.id, ...repo }));
    let food = perk.filter(repo => repo.subtype == 'FOOD');
    let products = perk.filter(repo => repo.subtype == 'PRODUCTS');
    let service = perk.filter(repo => repo.subtype == 'SERVICE');

    return {
        perk: perk,
        food: food,
        products: products,
        service: service,
        loading: state.loading,
        building_id: state.building_id,
        get_building: state.building
    };
};

const mapDispatchToProps = {
    content_perk,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Perk);
