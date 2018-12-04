import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import Header from '../../component/header'
import { connect } from 'react-redux';
import Button from '../../component/button'
import TimePicker from '../../component/time_select'
import { getScheduleTime } from '../../redux/reducers'

var {width} = Dimensions.get('window')

class Schedule extends Component {
    state = {
        startTime: null,
        endTime: null
    };

    onNext() {
        this.props.getScheduleTime(this.state.startTime, this.state.endTime)
        if (this.state.startTime || this.state.endTime) {
            fetch(`https://api.honeycomb.be/v4/amenities/timecheck/${this.props.amenitity.amenity_id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqZERNek01T1RaQk1rVkRNVEUwTkVFM05qZzNOemMyTlRRMlJrVTVSVEJGUkRnNVJETkRNUSJ9.eyJmdWxsX25hbWUiOiJNYXR0aGV3IE5pY2siLCJ1c2VyX3Bob25lIjoiMjE0NDk5NjgxMSIsInJlZ2lzdGVyZWQiOiJhdXRoMHw1YTY3ZjMxZDBjNDI5YjI3Zjk3OTE1OGIiLCJuaWNrbmFtZSI6Impvbm1uaWNrIiwibmFtZSI6Impvbm1uaWNrQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8zNDUwMDc3ZTA4YzI4NDFlNDdmY2U1MTVhNjIxMGRiOT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmpvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE4LTA3LTEwVDA0OjA1OjMxLjg3NFoiLCJlbWFpbCI6Impvbm1uaWNrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGguaG9uZXljb21iLmJlLyIsInN1YiI6ImF1dGgwfDVhNjdmMzFkMGM0MjliMjdmOTc5MTU4YiIsImF1ZCI6IjlqUlJpQjc4dll3Z3B2RERDTllTb3l3SVJLWlpLVnNhIiwiaWF0IjoxNTMxMTk1NTMyLCJleHAiOjE1NjI3MzE1MzIsImF0X2hhc2giOiJ2YllVTXd4bi15NzFRbVUxa3ZRaUd3Iiwibm9uY2UiOiJ3eC53UnhZa2ZDbVlBdG4tRH45ZEtEX1hMVE5fU0pIdiJ9.ubewa5tSenVDFYrWayBRk6Q13ayww6xn2N9vIHruoieOUhF1ljz2ENyxqfKvC-PYvAzSZZLEis9EeqkNxzrjFWp34aJAhIpJgttpXIph9bMrlIoq6Ke7vsmv_fKJaRjt4BAUhIfYLMU0cjgSIR7gfYgheDO5Iz_BjI-mQpXL71eGwxDEOCEEvZS2lfXJL4CEBjYEMi58JK0iECFmdT-722VvHt1ujIa4Dj0kjwgwDvnjmZ0LodaZZZpbeh79GLHD5IlGI8dsatyMYEcnBofOdWo5xtDn1dOBQzheFuwwvoXoXvDHGsoR-80i7mv05P4yA7gBK04Bd8nJayO1IGWqIQ'
                },
                body: JSON.stringify({
                    start_time: this.props.selectedDate.toString() + ' ' + this.state.startTime.toString()+':00',
                    end_time: this.props.selectedDate.toString() + ' ' + this.state.endTime.toString()+':00'
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    alert(responseJson.error);
                } else {
                    this.props.navigation.navigate('BuildingComformBooking')
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

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
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#D4DCE1', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{flex: 1, borderBottomWidth: 2, borderColor: '#F27B28', paddingLeft: 20, paddingVertical: 25}}>
                        <Text style={{color: building_color, fontSize: 24, fontFamily: 'PingFang-SC-Regular'}}>Time-in</Text>
                        <Text style={{color: '#8F8E94', fontSize: 16, fontFamily: 'PingFang-SC-Light', marginTop: 6}}>{this.state.startTime}</Text>
                    </View>
                    <View style={{flex: 1, marginRight: 20, paddingVertical: 25, alignItems:'flex-end'}}>
                        <Text style={{color: '#000000', fontSize: 24, fontFamily: 'PingFang-SC-Regular'}}>Time-out</Text>
                        <Text style={{color: '#8F8E94', fontSize: 16, fontFamily: 'PingFang-SC-Light', marginTop: 6}}>{this.state.endTime}</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{flex: 1, padding: 23.5}}>
                    <TimePicker
                        startTime={(startTime) => this.setState({startTime: startTime ? startTime.time : null})}
                        endTime={(endTime) => this.setState({endTime: endTime ? endTime.time : null})}
                    />
                </ScrollView>
                <View style={{
                    borderTopWidth: 1.5,
                    borderColor: 'rgba(0,0,0,0.15)',
                    width:width - 5,
                    backgroundColor: 'white',
                    // height: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 60,
                    borderWidth:1,
                    paddingVertical: 15,
                    flexDirection: 'row'
                }}>
                    <Button
                        title={'CLEAR'}
                        style={{marginTop: 0, width: 120, backgroundColor: '#B7B7B7'}}
                        onPress={()=> this.setState({
                            startTime: null,
                            endTime: null
                        })}
                    />
                    <Button
                        title={'NEXT'}
                        style={{marginTop: 0, width: 120, marginLeft: 20, backgroundColor:building_color}}
                        onPress={()=> this.onNext()}
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
});

const mapStateToProps = state => {
    // let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
    return {
        selectedDate: state.scheduleDate,
        amenitity: state.amenitity,
        get_building: state.building,
    };
};

const mapDispatchToProps = {
    getScheduleTime
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);