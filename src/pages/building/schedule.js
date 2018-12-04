import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import Header from '../../component/header'
import moment from 'moment'
import Button from '../../component/button'
import { CalendarList } from 'react-native-calendars'
import { getScheduleDate } from "../../redux/reducers";
import { connect } from "react-redux";
var { width } = Dimensions.get('window')
const AUTH_TOKEN =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqZERNek01T1RaQk1rVkRNVEUwTkVFM05qZzNOemMyTlRRMlJrVTVSVEJGUkRnNVJETkRNUSJ9.eyJmdWxsX25hbWUiOiJNYXR0aGV3IE5pY2siLCJ1c2VyX3Bob25lIjoiMjE0NDk5NjgxMSIsInJlZ2lzd' +
    'GVyZWQiOiJhdXRoMHw1YTY3ZjMxZDBjNDI5YjI3Zjk3OTE1OGIiLCJuaWNrbmFtZSI6Impvbm1uaWNrIiwibmFtZSI6Impvbm1uaWNrQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8zNDUwMDc3ZTA4YzI4NDFlNDdmY2U1' +
    'MTVhNjIxMGRiOT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmpvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE4LTA3LTEwVDA0OjA1OjMxLjg3NFoiLCJlbWFpbCI6Impvbm1uaWNrQGdtYWlsLmNvbSIsImVtYWlsX3Zlcmlm' +
    'aWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGguaG9uZXljb21iLmJlLyIsInN1YiI6ImF1dGgwfDVhNjdmMzFkMGM0MjliMjdmOTc5MTU4YiIsImF1ZCI6IjlqUlJpQjc4dll3Z3B2RERDTllTb3l3SVJLWlpLVnNhIiwiaWF0IjoxNTMxMTk1NTMyLCJleHAiOjE1NjI3' +
    'MzE1MzIsImF0X2hhc2giOiJ2YllVTXd4bi15NzFRbVUxa3ZRaUd3Iiwibm9uY2UiOiJ3eC53UnhZa2ZDbVlBdG4tRH45ZEtEX1hMVE5fU0pIdiJ9.ubewa5tSenVDFYrWayBRk6Q13ayww6xn2N9vIHruoieOUhF1ljz2ENyxqfKvC-PYvAzSZZLEis9EeqkNxzrjFWp34aJA' +
    'hIpJgttpXIph9bMrlIoq6Ke7vsmv_fKJaRjt4BAUhIfYLMU0cjgSIR7gfYgheDO5Iz_BjI-mQpXL71eGwxDEOCEEvZS2lfXJL4CEBjYEMi58JK0iECFmdT-722VvHt1ujIa4Dj0kjwgwDvnjmZ0LodaZZZpbeh79GLHD5IlGI8dsatyMYEcnBofOdWo5xtDn1dOBQzheFuwwvo' +
    'XoXvDHGsoR-80i7mv05P4yA7gBK04Bd8nJayO1IGWqIQ'

class Schedule extends Component {
    state = {
        selectDate: '2018-07-17',
        date: ''
    };
    componentWillMount() {
        // console.log(moment(new Date).format('YYYY-MM'))
        // console.log(this.props.credentials.idToken)
        this.onGetDateSlote()
    }
    onGetDateSlote = () => {
        fetch(`https://api.honeycomb.be/v4/amenities/dateslots/${this.props.amenity_id}?date=${moment(new Date).format('YYYY-MM')}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.credentials.idToken
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('========getDataSlote', responseJson)
            })
            .catch((error) => {
                console.log('========getDataSlote', error);
            });
    }
    render() {
        const { navigation } = this.props
        let building_color = '#F27B28'
        const { get_building } = this.props
        if (get_building && get_building.colors) {
            building_color = get_building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header
                    title={'BOOKING DATE'}
                    // rightButton={require('../../../assets/images/icon_Profile.png')}
                    leftPress={() => navigation.pop()}
                // rightPress={()=>this.refs._right_drawer.open()}
                />
                <View style={{ paddingHorizontal: 20, paddingVertical: 25, borderBottomWidth: 1, borderBottomColor: '#D4DCE1' }}>
                    <Text style={{ color: building_color, fontSize: 24, fontFamily: 'PingFang-SC-Regular' }}>Select Date</Text>
                    <Text style={{ color: '#8F8E94', fontSize: 16, fontFamily: 'PingFang-SC-Light' }}>{this.state.selectDate}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <CalendarList
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                        }}

                        hideExtraDays={false}
                        dayComponent={({ date, state }) => {
                            return (
                                <TouchableOpacity
                                    style={{ flex: 1, alignItems: 'center', }}
                                    onPress={() => this.setState({ selectDate: moment(date.dateString).format('YYYY-MM-DD') })}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 14, color: state === 'disabled' ? 'gray' : 'black', marginBottom: 5 }}>{date.day}</Text>
                                    {state === 'disabled' ?
                                        <Image source={require('../../../assets/images/uncheck.png')} /> :
                                        <Image source={require('../../../assets/images/check.png')} />
                                    }
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
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
                    paddingVertical: 15,
                    flexDirection: 'row'
                }}>
                    <Button
                        title={'CLEAR'}
                        style={{ marginTop: 0, width: 120, backgroundColor: '#B7B7B7' }}
                    // onPress={()=> navigation.navigate('BuildingSchedule')}
                    />
                    <Button
                        title={'NEXT'}
                        style={{ marginTop: 0, width: 120, marginLeft: 20, backgroundColor: building_color }}
                        onPress={() => {
                            this.props.getScheduleDate(this.state.selectDate);
                            navigation.navigate('BuilddingTimeSchedule')
                        }}
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
    return {
        get_building: state.building,
        amenity_id: state.amenitity.amenity_id,
        credentials: state.credentials
    };
};

const mapDispatchToProps = {
    getScheduleDate
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);