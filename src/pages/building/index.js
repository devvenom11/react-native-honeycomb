import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, FlatList, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native';
import Header from '../../component/header'
import Icon from 'react-native-vector-icons/EvilIcons';
import { connect } from "react-redux";
import LeftMenu from '../../component/menu'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import Swiper from 'react-native-swiper';
import Stars from 'react-native-stars';
import Dailog from '../../component/modal_dailog/index'
import { content_amenities, getAmenity, building_form, logout } from '../../redux/reducers'
import RNFetchBlob from 'rn-fetch-blob'
import Communications from 'react-native-communications';

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

class Building extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tap_item: true,
            showdailog: false,
            businesses: [],
            formUrl: ''
        }
    }

    componentWillMount() {
        this.props.content_amenities(this.props.building_id)
        this.props.building_form(this.props.building_id)
        fetch('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972&radius=8000&categories=bars,french', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer DGoHrnyMwST-11dIlwEmXzZlJmG7Ngltbl6d8pju8rK5fYzxEIAueAjmEYoe9q4gToKoPIvCy4p4M9QmsPr1m_Zi4FTRZTQ_e1bu8uXGwsLQ1MUMAiWbYQSo-YaQW3Yx',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //   console.log('responseJson', responseJson)
                this.setState({ businesses: responseJson.businesses })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderMain = (navigation) => {
        let color = '#F27B28'
        const { building } = this.props;
        if (building && building.colors && building.colors.primary) {
            color = building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header
                    title={'BUILDING RESOURCES'}
                    leftButton={require('../../../assets/top_nav/menu.png')}
                    rightButton={require('../../../assets/top_nav/profile.png')}
                    leftPress={() => this.refs._drawer.open()}
                    rightPress={() => this.refs._right_drawer.open()}
                />

                <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
                    {this._renderTap(color)}
                    {this.state.tap_item ? this._renderDetail(color) : this._renderForms(color)}
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                        <Text style={styles.name}>AMENITIES</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            styles={styles.container}
                            data={this.props.amentities}
                            renderItem={({ item }) => this._renderAmenities(item, color)}
                        />
                    </View>
                    {this._renderAround()}
                </ScrollView>

                <Dailog
                    show={this.state.showdailog}
                    onClose={() => this.setState({ showdailog: false })}
                    content={''}
                    title={'Fitness Center Rules PDF'}
                    download={() => this.onDownload(this.state.formUrl)}
                    view={() => this.onGoPdfViewer(this.state.formUrl)}
                />

            </View>
        )
    }

    _renderImageView = () => {
        {/*<Swiper*/ }
        {/*style={styles.wrapper}*/ }
        {/*showsButtons={false}*/ }
        {/*dotStyle={{*/ }
        {/*backgroundColor: '#00000000', borderWidth:1, borderColor: 'white',*/ }
        {/*width:10, height:10, borderRadius: 5,*/ }
        {/*}}*/ }
        {/*activeDotStyle={{*/ }
        {/*backgroundColor: 'white', width: 10, height:10, borderRadius: 5,*/ }
        {/*}}*/ }
        {/*paginationStyle={{*/ }
        {/*bottom: 12, left: 0, right: 0, alignItems: 'center'*/ }
        {/*}}*/ }
        {/*>*/ }
        {/*{news.imageUri.map((image, key)=>(*/ }
        {/*<Image key={key} style={styles.imageSlider} source={image}/>*/ }
        {/*))}*/ }
        {/*</Swiper>*/ }
    }

    _renderTap = (color) => (
        <View style={styles.renderTap}>
            <TouchableOpacity style={[styles.tapItemView, this.state.tap_item && { borderBottomWidth: 2, borderBottomColor: color }]} onPress={() => this.setState({ tap_item: true })}>
                <Text style={[styles.tapItemText, this.state.tap_item && { color: color }]}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tapItemView, !this.state.tap_item && { borderBottomWidth: 2, borderBottomColor: color }]} onPress={() => this.setState({ tap_item: false })}>
                <Text style={[styles.tapItemText, !this.state.tap_item && { color: color }]} style={styles.tapItemText}>Forms</Text>
            </TouchableOpacity>
        </View>
    )

    _renderDetail = (color) => (
        <View style={styles.newsCards}>
            <TouchableOpacity>
                <Text style={[styles.title, { color: color }]}>{this.props.building.name}</Text>
            </TouchableOpacity>

            <Text numberOfLines={2} style={styles.description}>
                {/*{this.props.building.description}*/}
            </Text>
            <View style={{ paddingBottom: 20, flexDirection: 'row', marginTop: 10 }}>
                <View style={styles.infoItem}>
                    <View style={styles.itemView}>
                        <Image style={{ tintColor: '#000000', width: 15, height: 21 }} source={require('../../../assets/general/black/location_thin.png')} />
                    </View>
                    <View style={styles.itemView}>
                        <Image style={{ tintColor: '#000000', width: 20, height: 16 }} source={require('../../../assets/general/black/wifi.png')} />
                    </View>
                    <View style={styles.itemView}>
                        <Image style={{ tintColor: '#000000', width: 16, height: 21 }} source={require('../../../assets/general/black/building.png')} />
                    </View>
                    <View style={styles.itemView}>
                        <Image style={{ tintColor: '#000000', width: 19, height: 19 }} source={require('../../../assets/general/black/phone_headset.png')} />
                    </View>
                    <View style={styles.itemView}>
                        <Image style={{ tintColor: '#000000', width: 21, height: 13 }} source={require('../../../assets/general/black/email_push.png')} />
                    </View>
                </View>
                <View style={[styles.infoItem, { flex: 13 }]}>
                    <View style={styles.itemView}>
                        <Text style={styles.itemContent}>
                            {this.props.building.address}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemContent}>
                            Name/SSID: {this.props.building.wifi && this.props.building.wifi.ssid} {'\n' + 'Password:' + this.props.building.wifi && this.props.building.wifi.password}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemContent}>
                            {this.props.building.contact.person + '\n' + this.props.building.contact.position + ' | ' + this.props.building.contact.company}
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => Communications.phonecall(this.props.building.contact.phone, true)}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemContent}>
                                {this.props.building.contact.phone}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${this.props.building.contact.email}`)}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemContent}>
                                {this.props.building.contact.email}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )

    onGoPdfViewer(form_url) {
        this.setState({ showdailog: false })
        this.props.navigation.navigate('PDFViwer', {
            url: form_url,
        });
    }

    onDownload(form_url) {
        this.setState({ showdailog: false })
        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache: true,
            })
            .fetch('GET', form_url, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.warn(res.path())
            })
    }
    _onOpenLink(item) {
        const { credentials } = this.props;
 
        (async () => {
            var cookies = credentials.idToken;

            var url = 'https://api.honeycomb.be/v4/access/tokengrant';
            var response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': cookies,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (response.status == 200) {
                let responseJson = await response.json();
                var access_token = responseJson.data.access;

                var url = 'https://external.honeycomb.be/app/#/forms/' + item.form_id + '/' + access_token;
                Linking.openURL(url);
            }
        })();


    }
    _renderForms = (color) => (

        <View style={{ padding: 20 }}>
            {this.props.building_form_data.length > 0 ? this.props.building_form_data.map((item, key) => (
                <TouchableOpacity key={key} onPress={() => {
                    this._onOpenLink(item);

                }}
                    style={{
                        borderWidth: 1, borderColor: color, borderRadius: 5, marginVertical: 10, paddingVertical: 5,
                        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
                    }}>
                    <Image style={{ width: 17, height: 20, tintColor: color }} source={require('../../../assets/images/pdf.png')} />
                    <Text style={{ fontSize: 12, marginLeft: 15, fontFamily: 'PingFang-SC-Semibold', color: color, flex: 1 }}>{item.form_name}</Text>
                    <Icon name={"chevron-right"} size={25} color={color} style={{ fontWeight: '500' }} />
                </TouchableOpacity>
            )) :
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>No forms available</Text>
                </View>
            }
        </View>
    )

    onDetail(detail) {
        this.props.getAmenity(detail)
        this.props.navigation.navigate("BuildingDetails")
    }

    _renderAmenities = (item, color) => {
        return (
            <View style={styles.item}>
                <Image style={styles.itemImage} source={{ uri: item.media[0].url }} />
                <View style={{ flex: 1, padding: 15, paddingBottom: 0 }}>
                    <Text style={[styles.itemTitle, { color: color }]}>{item.title}</Text>
                    <Text numberOfLines={2} style={styles.itemDescription}>{item.description}</Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={styles.readMore} onPress={() => this.onDetail(item)}>
                        <Text style={[styles.readMoreText, { color: color }]}>Book Now</Text>
                        <Icon name={"chevron-right"} size={20} color={color} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderAround = () => {
        return (
            <View>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <Text style={styles.name}>AROUND US</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {this.state.businesses.map((item, key) => (
                            <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)} key={key}>
                                <View key={key} style={styles.item}>
                                    <Image style={styles.itemImage} source={{ uri: item.image_url }} />
                                    <View style={{ width: 15, marginTop: -15 }} />

                                    <View style={{ padding: 15 }}>
                                        <Text style={[styles.itemTitle, { color: '#000000' }]} numberOfLines={1}>{item.name}</Text>
                                        <View style={{ alignItems: 'flex-start' }}>
                                            <Stars
                                                half={true}
                                                default={item.rating}
                                                update={(val) => { this.setState({ stars: val }) }}
                                                spacing={4}
                                                starSize={26}
                                                count={5}
                                                fullStar={require('../../../assets/general/yelp/star_full.png')}
                                                emptyStar={require('../../../assets/general/yelp/star_empty.png')}
                                                halfStar={require('../../../assets/general/yelp/star_half.png')} />
                                        </View>
                                        <Text style={[styles.itemTitle, { color: '#000000' }]} numberOfLines={1}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </ScrollView>
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
        const { navigation } = this.props;
        console.log(this.props.building_form_data);
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
    newsCards: {
        padding: 20,
        paddingBottom: 0,
        borderBottomWidth: 1, borderColor: '#EFEFF4'
    },
    card: {
        borderRadius: 6,
        backgroundColor: "#fff",
        marginBottom: 20
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
        fontSize: 24,
        fontFamily: 'PingFang-SC-Light',
        color: "#F27B28"
    },
    description: {
        lineHeight: 22,
        marginTop: 6,
        color: '#8F8E94',
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 12,
    },
    articleInfo: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10
    },
    author: {
        fontSize: 10,
        color: "#3B3B3E",
        fontFamily: 'PingFang-SC-Regular',
        marginRight: 5,
    },
    time: {
        fontSize: 10,
        fontFamily: 'PingFang-SC-Regular',
        color: "#C7C7CD"
    },
    readMore: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#EFEFF4",
        paddingVertical: 10
    },
    readMoreText: {
        color: "#F27B28",
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 10
    },
    imageSlider: {
        height: 200,
        width: width
    },
    wrapper: {
        margin: 0,
        height: 200
    },
    renderTap: {
        flexDirection: 'row',
        height: 50,
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#B7B7B7'
    },
    tapItemView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tapItemText: {
        color: "#B7B7B7",
        fontFamily: 'PingFang-SC-Semibold',
        fontSize: 18
    },
    selectTap: {
        borderBottomWidth: 2,
        borderBottomColor: '#F27B28'
    },
    infoItem: {
        flex: 1,
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
        color: '#B7B7B7'
    },
    itemView: {
        flexDirection: 'row',
        marginTop: 6,
        height: 35,
        alignItems: 'center'
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: 255,
        // height: 284,
        borderWidth: 1,
        borderColor: '#B7B7B7',
        marginRight: 20,
    },
    itemImage: {
        width: 253,
        height: 150,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden'
    },
    name: {
        fontSize: 18,
        fontFamily: 'PingFang-SC-Regular',
        color: '#000000',
        paddingBottom: 20
    },
    itemTitle: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Regular',
        color: '#F27B28',
        marginVertical: 5
    },
    itemDescription: {
        fontSize: 10,
        fontFamily: 'PingFang-SC-Regular',
        color: '#8F8E94',
        marginBottom: 5
    }
});

const mapStateToProps = state => {
    let amentities = state.amentities.map(repo => ({ key: repo.amenity_id, ...repo }));
    return {
        building: state.building,
        amentities: amentities,
        building_form_data: state.building_form,
        building_id: state.building_id,
        credentials: state.credentials

    };
};

const mapDispatchToProps = {
    content_amenities,
    getAmenity,
    building_form,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Building);
