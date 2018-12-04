import React, { Component } from 'react';
import { View, Image } from 'react-native';
import GooglePlacesAutocomplete from '../../component/GooglePlacesAutocomplete/GooglePlacesAutocomplete';
export default class GooglePlacesInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: false
        };
    }
    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Address'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={false}
                listViewDisplayed={this.state.showPlacesList}
                textInputProps={{
                    onFocus: () => this.setState({showPlacesList: true}),
                    onBlur: () => this.setState({showPlacesList: false}),
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyCC8coNstM5GWiQdnDq-V4E5MMjhnlyqrw',
                    language: 'en', // language of the results
                    types: 'geocode' // default: 'geocode'
                }}
                onPress={(data) => {
                    this.setState({showPlacesList: false, selectData:true})
                    this.props.onChangeText(data)
                }}
                onChangeText={this.props.onChangeText}
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}

                styles={{
                    container: {
                        flex:1,
                        marginTop: 25,
                        marginBottom: -15
                    },
                    description: {
                        // fontWeight: 'bold',
                    },
                    textInputContainer: {
                        // borderTopWidth: 0,
                        // borderBottomWidth: 0,
                        // marginLeft: this.state.showPlacesList ? 0: this.state.selectData?0:10,
                        // height: 31,
                    },
                    listView: {
                        backgroundColor: 'white'
                    },
                    textInput: {
                        // marginLeft: 0,
                        // marginRight: 0,
                        // marginBottom:0,
                        // marginTop:0,
                        // borderRadius: 0,
                        // height: 30,
                        // flex: 1,
                        // fontSize: this.state.selectData ? 18 : 12,
                        // fontFamily: 'PingFang-SC-Medium',
                        // color: '#24272B',
                        // paddingLeft: 0
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                        borderWidth: 1
                    },
                    powered: {
                        width: 0,
                        height: 0
                    }
                }}
                currentLocation={false}
            />
        );

    }
}