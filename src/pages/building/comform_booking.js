import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import Header from '../../component/header'
import { connect } from 'react-redux';
import Button from '../../component/button'
import Dailog from '../../component/modal_dailog'
import Swiper from 'react-native-swiper';
var {width} = Dimensions.get('window')

class Schedule extends Component {
    state = {
        showdailog: false
    };

    onNext() {
        fetch(`https://api.honeycomb.be/v4/amenities/book/${this.props.amenitity.amenity_id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqZERNek01T1RaQk1rVkRNVEUwTkVFM05qZzNOemMyTlRRMlJrVTVSVEJGUkRnNVJETkRNUSJ9.eyJmdWxsX25hbWUiOiJNYXR0aGV3IE5pY2siLCJ1c2VyX3Bob25lIjoiMjE0NDk5NjgxMSIsInJlZ2lzdGVyZWQiOiJhdXRoMHw1YTY3ZjMxZDBjNDI5YjI3Zjk3OTE1OGIiLCJuaWNrbmFtZSI6Impvbm1uaWNrIiwibmFtZSI6Impvbm1uaWNrQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8zNDUwMDc3ZTA4YzI4NDFlNDdmY2U1MTVhNjIxMGRiOT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmpvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE4LTA3LTEwVDA0OjA1OjMxLjg3NFoiLCJlbWFpbCI6Impvbm1uaWNrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGguaG9uZXljb21iLmJlLyIsInN1YiI6ImF1dGgwfDVhNjdmMzFkMGM0MjliMjdmOTc5MTU4YiIsImF1ZCI6IjlqUlJpQjc4dll3Z3B2RERDTllTb3l3SVJLWlpLVnNhIiwiaWF0IjoxNTMxMTk1NTMyLCJleHAiOjE1NjI3MzE1MzIsImF0X2hhc2giOiJ2YllVTXd4bi15NzFRbVUxa3ZRaUd3Iiwibm9uY2UiOiJ3eC53UnhZa2ZDbVlBdG4tRH45ZEtEX1hMVE5fU0pIdiJ9.ubewa5tSenVDFYrWayBRk6Q13ayww6xn2N9vIHruoieOUhF1ljz2ENyxqfKvC-PYvAzSZZLEis9EeqkNxzrjFWp34aJAhIpJgttpXIph9bMrlIoq6Ke7vsmv_fKJaRjt4BAUhIfYLMU0cjgSIR7gfYgheDO5Iz_BjI-mQpXL71eGwxDEOCEEvZS2lfXJL4CEBjYEMi58JK0iECFmdT-722VvHt1ujIa4Dj0kjwgwDvnjmZ0LodaZZZpbeh79GLHD5IlGI8dsatyMYEcnBofOdWo5xtDn1dOBQzheFuwwvoXoXvDHGsoR-80i7mv05P4yA7gBK04Bd8nJayO1IGWqIQ'
            },
            body: JSON.stringify({
                start_time: this.props.selectedDate.toString() + ' ' + this.props.scheduleStartTime.toString()+':00',
                end_time: this.props.selectedDate.toString() + ' ' + this.props.scheduleEndTime.toString()+':00'
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.error) {
                alert(responseJson.error);
            } else {
                this.setState({showdailog: true})
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    _renderImageView = () => (
        <View style={{height: 202}}>
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                dotStyle={{
                    backgroundColor: '#00000000', borderWidth:1, borderColor: 'white',
                    width:10, height:10, borderRadius: 5,
                }}
                activeDotStyle={{
                    backgroundColor: 'white', width: 10, height:10, borderRadius: 5,
                }}
                paginationStyle={{
                    bottom: 12, left: 0, right: 0, alignItems: 'center'
                }}
            >
                <Image style={styles.imageSlider} source={{uri: this.props.amenitity.media[0].url}}/>
            </Swiper>
        </View>
    )
    render() {
        const { navigation } = this.props
        let building_color =  '#F27B28'
        const { get_building } = this.props
        if (get_building && get_building.colors) {
            building_color = get_building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header
                    title={'BOOKING TIME'}
                    // rightButton={require('../../../assets/images/icon_Profile.png')}
                    leftPress={()=>navigation.pop()}
                    // rightPress={()=>this.refs._right_drawer.open()}
                />
                {this._renderImageView()}
                <View style={{padding: 20, flex:1}}>
                    <Text style={[styles.title, {color: building_color}]}>{this.props.amenitity.title.toUpperCase()}</Text>
                    <View style={{marginTop: 10}}>
                        <Text style={styles.itemTitle}>Selected Date</Text>
                        <Text style={styles.itemDescription}>{this.props.selectedDate}</Text>
                    </View>
                    <View style={{marginTop: 10, flexDirection: 'row'}}>
                        <View>
                            <Text style={styles.itemTitle}>Time-in</Text>
                            <Text style={styles.itemDescription}>{this.props.scheduleStartTime}</Text>
                        </View>
                        <View style={{marginLeft: 20}}>
                            <Text style={styles.itemTitle}>Time-out</Text>
                            <Text style={styles.itemDescription}>{this.props.scheduleEndTime}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    borderTopWidth: 1.5,
                    borderColor: 'rgba(0,0,0,0.15)',
                    width:width - 5,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 60,
                    borderWidth:1,
                    paddingVertical: 15,
                    flexDirection: 'row'
                }}>
                    <Button
                        title={'BOOK'}
                        style={{marginTop: 0, width: 120, marginLeft: 20}}
                        onPress={()=> this.onNext()}
                    />
                </View>
                <Dailog
                    show={this.state.showdailog}
                    title='Floating Conference Room'
                    image={require('../../../assets/images/booking_check.png')}
                    onClose={()=>this.setState({showdailog: false})}
                    content='You have successfully booked'
                    buttonTitle={'ADD TO GOOGLE CALENDAR'}
                />
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
        borderWidth:1,
        margin:0,
        height:200,
    },
    imageSlider: {
        height: 200,
        width: width
    },
    itemTitle: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Light',
        color: '#000000'
    },
    itemDescription: {
        fontSize: 14,
        fontFamily: 'PingFang-SC-Light',
        color: '#8F8E94'
    }
});

const mapStateToProps = state => {
    return {
        selectedDate: state.scheduleDate,
        scheduleEndTime: state.scheduleEndTime,
        scheduleStartTime: state.scheduleStartTime,
        amenitity: state.amenitity,
        get_building: state.building,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);