import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dropdown } from 'react-native-material-dropdown';

export default class DropDown extends Component {
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
        const {icon, data, label, fontIcon} = this.props
        return (
            <View style={{flexDirection: 'row', marginBottom: -20}}>
                {!this.state.placeholder &&
                    <View style={styles.photo}>
                        {/* <Image source={icon}/> */}
                        {fontIcon ? fontIcon : <Image style={iconstyle} source={icon}/>}
                    </View>
                }
                <Dropdown
                    {...this.props}
                    containerStyle={{flex:1}}
                    label={label}
                    data={data}
                    onFocus={this.onFocus}
                    onBlur = {this._onBlur}
                    labelFontSize={10}
                    fontSize={this.state.placeholder ? 18 : 12}
                />
            </View>
        )
    }
}

const styles = Object.assign({}, StyleSheet.create({
    photo: {
        // position: 'absolute',
        // left: 0,
        marginTop: 17,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
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