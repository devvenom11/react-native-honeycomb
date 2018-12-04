import React, { Component } from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import _ from 'lodash'
import Button from '../../component/button'
import { CalendarList } from 'react-native-calendars'
var {width} = Dimensions.get('window')

const times = [
    {index: 1, time: '00:00', select: true},
    {index: 2, time: '00:30', select: true},
    {index: 3, time: '01:00', select: true},
    {index: 4, time: '01:30', select: true},
    {index: 5, time: '02:00', select: true},
    {index: 6, time: '02:30', select: true},
    {index: 7, time: '03:00', select: true},
    {index: 8, time: '03:30', select: true},
    {index: 9, time: '04:00', select: true},
    {index: 10, time: '04:30', select: true},
    {index: 11, time: '05:00', select: true},
    {index: 12, time: '05:30', select: true},
    {index: 13, time: '06:00', select: true},
    {index: 14, time: '06:30', select: true},
    {index: 15, time: '07:00', select: true},
    {index: 16, time: '07:30', select: true},
    {index: 17, time: '08:00', select: true},
    {index: 18, time: '08:30', select: true},
    {index: 19, time: '09:00', select: true},
    {index: 20, time: '09:30', select: true},

    {index: 21, time: '10:00', select: true},
    {index: 22, time: '10:30', select: true},
    {index: 23, time: '11:00', select: true},
    {index: 24, time: '11:30', select: true},
    {index: 25, time: '12:00', select: true},
    {index: 26, time: '12:30', select: true},
    {index: 27, time: '13:00', select: true},
    {index: 28, time: '13:30', select: true},
    {index: 29, time: '14:00', select: true},
    {index: 30, time: '14:30', select: true},
    {index: 31, time: '15:00', select: true},
    {index: 32, time: '15:30', select: true},
    {index: 33, time: '16:00', select: true},
    {index: 34, time: '16:30', select: true},
    {index: 35, time: '17:00', select: true},
    {index: 36, time: '17:30', select: true},
    {index: 37, time: '18:00', select: true},
    {index: 38, time: '18:30', select: true},
    {index: 39, time: '19:00', select: true},
    {index: 40, time: '19:30', select: true},

    {index: 41, time: '20:00', select: true},
    {index: 42, time: '20:30', select: true},
    {index: 43, time: '21:00', select: true},
    {index: 44, time: '21:30', select: true},
    {index: 45, time: '22:00', select: true},
    {index: 46, time: '22:30', select: true},
    {index: 47, time: '23:00', select: true},
    {index: 48, time: '23:30', select: true},
]

export default class TimeSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date : times,
            startTime: null,
            endTime: null,
            time_in: '09:00 AM',
            time_out: '11:00 AM',
        }
    }
    onSetDate(day) {
        const {startTime, endTime, date} = this.state
        if ((!startTime && !endTime) || day.index < startTime.index || (startTime && endTime)) {
            for (var i=0 ; i < times.length; i++){
                times[i].startTime = false
                times[i].midTime = false
                times[i].endTime = false
            }
            this.setState({
                date: times,
                startTime: day,
                endTime: null,
            });
            this.props.startTime(day)
        } else if (startTime && !endTime && day.index > startTime.index) {
          
            this.setState({
                endTime: day,
            });
            this.props.endTime(day)
        }


    }
    _renderDay(day, id2){
        return (
            <TouchableOpacity style={{
                flex: 1, alignItems: 'center',
                paddingVertical: 5, marginVertical: 5,
                backgroundColor : day.startTime || day.endTime || day.midTime ? '#F5F5F5' : '#00000000',
                borderTopLeftRadius:day.startTime ? 100 : 0,
                borderBottomLeftRadius:day.startTime ? 100 : 0,
                borderTopRightRadius:day.endTime ? 100 : 0,
                borderBottomRightRadius:day.endTime ? 100 : 0,
            }} key={id2} onPress={() => this.onSetDate(day)}>
                    <Text style={{fontSize: 14, color: day.select ? '#000000' : 'rgba(0,0,0,0.25)', paddingBottom: 3}}>{day.time}</Text>
                    {!day.select?
                        <Image source={require('../../../assets/images/uncheck.png')}/> :
                        <Image source={require('../../../assets/images/check.png')}/>
                    }
            </TouchableOpacity>
        )
    }
    _renderItems(days, id){
        const week = [];
        days.forEach((day, id2) => {
            week.push(this._renderDay(day, id2));
        }, this);

        return (<View style={{flexDirection: 'row', justifyContent: 'space-around'}} key={id}>{week}</View>)
    }
    render() {
        const { date, startTime, endTime } = this.state
      
        var data = []
       
        data = _.clone(date)
        if (startTime && endTime) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].index >= startTime.index) {
                    // array.push(times[i])
                    if (data[i].index == startTime.index) {
                        data[i].startTime = true
                    } else {
                        data[i].midTime = true
                    }

                    if (data[i].index == endTime.index) {
                        data[i].endTime = true
                        break
                    }
                }
            }
        }
        const weeks = [];
        while (data.length) {
            weeks.push(this._renderItems(data.splice(0, 6), weeks.length));
        }
        return (
            <View>
                {weeks}
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