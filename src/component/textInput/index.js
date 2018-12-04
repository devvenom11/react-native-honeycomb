import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    MKTextField,
    MKColor,
    mdl,
} from 'react-native-material-kit';

const CustomTextInput = mdl.Textfield.textfieldWithFloatingLabel()
    .withHighlightColor(MKColor.Lime)
    .withStyle({
        height: 50,  // have to do it on iOS
        flex: 1
    })
    .withFloatingLabelFont({
        fontSize: 14,
        fontFamily: 'PingFang-SC-Regular',
        color: '#3E4A59',
    })
    .withOnFocus(() => {})
    .withOnBlur(() => {})
    .withOnEndEditing((e) => {})
    .withOnSubmitEditing((e) => {})
    .withOnTextChange((e) => {})
    .withOnChangeText((e) => {})
    .build();
export default class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.value == "" ? false : true
        }
    }
    onFocus = () => {
        this.setState({ placeholder: true })
    }
    _onBlur = () => {
        if (this.props.value == "")
            this.setState({ placeholder: false })
        else
            this.setState({ placeholder: true })
    }
    render() {
        const {icon, validated, iconstyle, customStyle, fontIcon } = this.props
        return (
            <View style={[{flexDirection: 'row', alignItems: 'flex-end', marginTop: 21}, customStyle]}>
                <CustomTextInput
                    {...this.props}
                    placeholderTextColor='#B7B7B7'
                    textInputStyle={ this.state.placeholder ? styles.input : [styles.input, {fontSize: 12, paddingLeft: 30}]}
                    onFocus={this.onFocus}
                    onBlur = {this._onBlur}
                    highlightColor={'#0AD487'}
                />
                {!this.state.placeholder &&
                    <View style={styles.photo}>
                        {fontIcon ? fontIcon : <Image style={iconstyle} source={icon}/>}
                    </View>
                }
                {validated &&
                    <Icon name={'check-circle'} size={15} color={'#0AD487'} style={styles.icon}/>
                }
            </View>
        )
    }
}

const styles = Object.assign({}, StyleSheet.create({
    photo: {
        position: 'absolute',
        left: 0,
        bottom: 10,
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'PingFang-SC-Medium',
        color: '#24272B'
    },
    icon: {
        position: 'absolute',
        right: 5,
        bottom: 10,
    }
}));