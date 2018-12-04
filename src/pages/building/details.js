import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Linking, AsyncStorage } from 'react-native';
import Header from '../../component/header'
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";

import Button from '../../component/button'
import { content_amenities, getAmenity } from "../../redux/reducers";
var { width } = Dimensions.get('window')

class BuildingDetails extends Component {

    _onOpenLink() {

        const { credentials } = this.props;

        (async () => {

            var url = 'https://api.honeycomb.be/v4/access/tokengrant';

            var response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: credentials.idToken,

                },
            });

            if (response.status == 200) {
                let responseJson = await response.json();
                var access_token = responseJson.data.access;

                var extenal = 'https://external.honeycomb.be/app/#/booking/' + this.props.amenitity.amenity_id + '/' + access_token;
                Linking.openURL(extenal);
            }

        })();

        //   navigation.navigate('BuildingSchedule')
    }
    _renderImageView = () => (
        <Swiper
            style={styles.wrapper}
            showsButtons={false}
            dotStyle={{
                backgroundColor: '#00000000', borderWidth: 1, borderColor: 'white',
                width: 10, height: 10, borderRadius: 5,
            }}
            activeDotStyle={{
                backgroundColor: 'white', width: 10, height: 10, borderRadius: 5,
            }}
            paginationStyle={{
                bottom: 12, left: 0, right: 0, alignItems: 'center'
            }}
        >
            <Image style={styles.imageSlider} source={{ uri: this.props.amenitity.media[0].url }} />
        </Swiper>
    )

    _renderDetail = (color) => (
        <View style={styles.newsCards}>
            <TouchableOpacity>
                <Text style={[styles.title, { color: color }]}>{this.props.amenitity.title.toUpperCase()}</Text>
            </TouchableOpacity>

            <Text style={styles.description}>
                {this.props.amenitity.description}
            </Text>
        </View>
    )

    render() {
        const { navigation } = this.props
        let color = '#F27B28'
        const { building } = this.props;


        if (building && building.colors && building.colors.primary) {
            color = building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header
                    title={'BUILDING RESOURCES'}
                    // leftButton={require('../../../assets/images/menu.png')}
                    // rightButton={require('../../../assets/images/icon_Profile.png')}
                    leftPress={() => navigation.pop()}
                // rightPress={()=>this.refs._right_drawer.open()}
                />
                <ScrollView style={{ flex: 1 }}>
                    {this._renderImageView()}
                    {this._renderDetail(color)}
                </ScrollView>

                <View style={{
                    borderTopWidth: 1.5,
                    borderColor: 'rgba(0,0,0,0.15)',
                    width: width - 5,
                    backgroundColor: 'white',
                    // height: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 60,
                    borderWidth: 1,
                    paddingVertical: 15
                }}>
                    <Button
                        title={'SCHEDULE A BOOKING'}
                        style={{ marginTop: 0, backgroundColor: color }}
                        image={<Image style={{ tintColor: 'white', width: 15.61, height: 17.44, marginRight: 15 }} source={require('../../../assets/general/black/calendar.png')} />}
                        onPress={() => {
                            this._onOpenLink();

                        }
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    title: {
        fontSize: 24,
        fontFamily: 'PingFang-SC-Light',
        color: "#F27B28"
    },
    wrapper: {
        margin: 0,
        height: 200
    },
    description: {
        lineHeight: 22,
        marginTop: 6,
        color: '#8F8E94',
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
    },
    newsCards: {
        padding: 20,
        paddingBottom: 0,
        borderBottomWidth: 1, borderColor: '#EFEFF4'
    },
    imageSlider: {
        height: 200,
        width: width
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
    return {
        amenitity: state.amenitity,
        building: state.building,
        credentials: state.credentials
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
