//import liraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-native-picker';
import moment from 'moment';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

// create a component
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
class StripeExpireDate extends Component {
    constructor() {
        super();
        this.state = {
            selectedDate: ['December', 2018],
            value: null
        };
    }
    _createData() {
        var pickData = [
            months
        ];

        const minYear = 2018;
        const maxYear = 2080;
        const years = [];
        for (var year = minYear; year < maxYear; year++) {
            years.push(year);
        }
        pickData.push(years);
        console.log("pickData: ", pickData);
        // this.pickData = pickData;
        return pickData;
    }
    render() {
        const { value } = this.state;
        const textValue = value ? value : 'Expiry Date';
        const textColor = value ? '#212121' : '#b7b7b7';
        const fontSize = value ? 19 : 12;
        return (
            <View style={{ marginTop: 50, flexDirection: 'row', borderBottomColor: '#e0e0e0', borderBottomWidth: 2 }}>
                <TouchableOpacity style={{ paddingBottom: 6, flexDirection: 'row' }} onPress={this._showDatePicker.bind(this)}>
                    {value ?  null : <FontAwesome style={{ color: '#dadada', fontSize: 16, alignItems: 'center', marginRight: 12 }}>{Icons.calendar}</FontAwesome>}
                    {/* <Image source={require('../../../assets/general/black/calendar.png')} style={{ width: 18, height: 18 }} /> */}
                    <Text style={{ fontSize, color: textColor, marginBottom: 2 }}>{textValue}</Text>

                </TouchableOpacity>
            </View>
        );
    }
    _showDatePicker() {
        Picker.init({
            pickerData: this._createData(),
            // selectedValue: this.state.selectedDate,
            pickerTitleText: 'Select Date',
            pickerConfirmBtnText: 'Confirm',
            pickerCancelBtnText: 'Cancel',
            onPickerConfirm: this._handlePickerConfirm.bind(this),
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }

    _handlePickerConfirm(data) {
        console.log("_handlePickerConfirm... ", data);
        const monthText = data[0];
        const year = data[1];
        //convert monthtext to month value
        const month = months.indexOf(monthText);
        var value = moment({ year: year, month: month, day: 1 }).format('MM/YYYY');
        this.setState({ value })
        return this.props.onChangeValue(month + 1, year, value);
    }
}

StripeExpireDate.propTypes = {
    onChangeValue: PropTypes.func.isRequired,
}

//make this component available to the app
export default StripeExpireDate;
