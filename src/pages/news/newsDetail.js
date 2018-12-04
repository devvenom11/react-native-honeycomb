import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions,Linking } from 'react-native';
import Header from '../../component/header'
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
var { height, width } = Dimensions.get('window')
import { connect } from "react-redux";
import moment from 'moment'
import ImageC from 'react-native-scalable-image'
import HTML from 'react-native-render-html';
let rightScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: -0.4,
    swipeOffset: 20
};
class NewsDetail extends Component {
    componentWillMount() {

    }
    render() {
        const { navigation, news } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        let yarn = news[itemId].body.indexOf("<p>")
        let text = news[itemId].body

        const { get_building } = this.props;
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
                        title={'LATEST NEWS'}
                        rightButton={require('../../../assets/top_nav/profile.png')}
                        leftPress={() => this.props.navigation.pop()}
                        rightPress={() => this.refs._right_drawer.open()}
                    />

                    <View>
                        <ImageC width={width} style={styles.image} source={{ uri: news[itemId].media.url }} />
                        <View style={styles.info}>
                            <Text style={[styles.title, { color: color }]}>{news[itemId].title.toUpperCase()}</Text>

                            <View style={styles.articleInfo}>
                                <Text style={styles.author}>{news[itemId].author}</Text>
                                <Text style={styles.time}>{moment(news[itemId].publish).format('MMMM Do YYYY, h:mm a')}</Text>
                            </View>
                            <HTML classesStyles={{ 'paragraph': { fontSize: 14, fontFamily: 'PingFang-SC-Semibold', fontWeight: '500', color: '#8F8E94' } }} html={'<p class="paragraph">' + news[itemId].body + '</p>'}
                                imagesMaxWidth={Dimensions.get('window').width}
                                onLinkPress={(evt, href) => { Linking.openURL(href); }}

                            />


                            {/* <Text style={styles.description}>
                            {text}
                        </Text> */}
                        </View>
                    </View>
                </View>
            </ScalingDrawer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        width: width,
        height: 189,
        resizeMode: 'stretch'
    },
    info: {
        padding: 18
    },
    title: {
        fontSize: 20,
        fontFamily: 'PingFang-SC-Light',
        color: "#F27B28"
    },
    description: {
        lineHeight: 22,
        color: '#8F8E94',
        fontFamily: 'PingFang-SC-Medium',
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
        fontFamily: 'PingFang-SC-Medium',
        marginRight: 5,
    },
    time: {
        fontSize: 10,
        fontFamily: 'PingFang-SC-Medium',
        color: "#C7C7CD"
    }
});
const mapStateToProps = state => {
    return {
        news: state.news,
        get_building: state.building
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
