import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Linking, ScrollView } from 'react-native';
import Header from '../../component/header'
import { connect } from "react-redux";
import ProfileMenu from '../../component/menu/profile_menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import ImageC from 'react-native-scalable-image'
var { height, width } = Dimensions.get('window')
import moment from 'moment'
import HTML from 'react-native-render-html';
let rightScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: -0.4,
    swipeOffset: 20
};
class PerksDetail extends Component {
    state = {
        foodstate: 'perk'
    }
    render() {
        const { navigation, perk } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        let text = perk[itemId].body
      
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
                        title={'PERKS'}
                        rightButton={require('../../../assets/general/black/person.png')}
                        leftPress={() => this.props.navigation.pop()}
                        rightPress={() => this.refs._right_drawer.open()}
                    />
                    <View style={{ height: height - 125 }}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
                            <ImageC width={width} style={styles.image} source={{ uri: perk[itemId].media.url }} />
                            <View style={styles.info}>
                                <Text style={[styles.title, { color: color }]}>{perk[itemId].title.toUpperCase()}</Text>

                                <View style={styles.articleInfo}>
                                    <Text style={styles.author}>{perk[itemId].author}</Text>
                                    <Text style={styles.time}>{moment(perk[itemId].publish).format('MMMM Do YYYY, h:mm a')}</Text>
                                </View>
                                <HTML classesStyles={{ 'paragraph': { fontSize: 14, fontFamily: 'PingFang-SC-Semibold', fontWeight: '500', color: '#8F8E94' } }} html={'<p class="paragraph">' + item.body + '</p>'}
                                                    imagesMaxWidth={Dimensions.get('window').width}
                                                    onLinkPress={(evt, href) => { Linking.openURL(href); }}

                                                />


                                {/* <Text style={styles.description}>
                                {text}
                            </Text> */}
                            </View>
                        </ScrollView>
                    </View>
                    {/*<View style={{height: 55, borderTopWidth:1, borderTopColor: 'gray', flexDirection: 'row'}}>*/}
                    {/*<TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}}  onPress={()=>this.setState({foodstate: 'perk'})}>*/}
                    {/*<View style={{alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*<Image style={{tintColor: this.state.foodstate == 'perk' ? '#F27B28' : '#000000'}} source={require('../../../assets/images/all.png')}/>*/}
                    {/*<Text style={[styles.tapText, {color: this.state.foodstate == 'perk' ? '#F27B28' : '#000000'}]}>All</Text>*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({foodstate: 'food'})}>*/}
                    {/*<View style={{alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*<Image style={{tintColor: this.state.foodstate == 'food' ? '#F27B28' : '#000000'}}source={require('../../../assets/images/food.png')}/>*/}
                    {/*<Text style={[styles.tapText, {color: this.state.foodstate == 'food' ? '#F27B28' : '#000000'}]}>Food</Text>*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({foodstate: 'products'})}>*/}
                    {/*<View style={{alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*<Image style={{tintColor: this.state.foodstate == 'products' ? '#F27B28' : '#000000'}}source={require('../../../assets/images/products.png')}/>*/}
                    {/*<Text style={[styles.tapText, {color: this.state.foodstate == 'products' ? '#F27B28' : '#000000'}]}>Products</Text>*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({foodstate: 'services'})}>*/}
                    {/*<View style={{alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*<Image style={{tintColor: this.state.foodstate == 'services' ? '#F27B28' : '#000000'}}source={require('../../../assets/images/services.png')}/>*/}
                    {/*<Text style={[styles.tapText, {color: this.state.foodstate == 'services' ? '#F27B28' : '#000000'}]}>Services</Text>*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            </ScalingDrawer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    },
    tapText: {
        color: "#3B3B3E",
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
        marginTop: 2
    }
});
const mapStateToProps = state => {
    return {
        perk: state.perk,
        get_building: state.building
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PerksDetail);
