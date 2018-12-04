
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Header from '../../component/header'


class Search extends Component {
    coordinate = {
        latitude: 37.78825,
        longitude: -122.4324
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            text: '',
            message: false,

            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,

            }
        }
        this.onLatLngSearch = this.onLatLngSearch.bind(this);

    }
    onLatLngSearch = () => {
        this.setState({ loading: true })
        fetch('https://api.honeycomb.be/v4/building/search?latlng=' + this.state.region.latitude + "," + this.state.region.longitude + '&api_key=c955fb9df40708149cd6f836da3c5b52', {
            method: 'GET',

        })
            .then((response) => response.json())
            .then((responseJson) => {
            
                this.state.total = responseJson.results;
                this.state.data = responseJson.data;
                this.state.message = true;
                this.setState({ loading: false })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    onSearch = () => {
        this.setState({ loading: true })
        fetch('https://api.honeycomb.be/v4/building/search?query=' + this.state.text + '&api_key=c955fb9df40708149cd6f836da3c5b52', {
            method: 'GET',

        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.total = responseJson.results;
                this.state.data = responseJson.data;
                this.state.message = true;
                this.setState({ loading: false })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    componentDidMount() {

    }
    render() {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                var region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,

                };
                this.coordinate = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }

                this.setState({ region: region });

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
        return (
            <View style={styles.container}>

                <MapView
                    style={styles.map}
                    provider={null}
                    region={this.state.region}>

                    <Marker styles={{ width: 24, height: 24 }}
                        coordinate={this.coordinate}


                    >
                        <Image style={{ height: 24, width: 24 }} source={require('../../../assets/images/pin.png')} />
                    </Marker>
                </MapView>
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20 }} onPress={() => this.props.navigation.pop()}>


                        <Image source={require('../../../assets/top_nav/back.png')} />

                    </TouchableOpacity>

                </SafeAreaView>
                <View style={styles.search}>

                    <TextInput style={{ padding: 10, width: '100%', fontFamily: 'PingFang-SC-Light' }} placeholder="Dalas, Texas"
                        onChangeText={(text) => this.setState({ text })}
                        onSubmitEditing={() => this.onSearch()}></TextInput>

                    <Image style={{ alignItems: 'flex-end', right: 30 }} source={require('../../../assets/images/search.png')} ></Image>
                </View>
                <View style={{ right: 0, padding: 20, alignItems: 'flex-end' }}>

                    <Text style={{
                        textDecorationLine: 'underline', textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#D8AE24", color: '#D8AE24', fontWeight: 'bold',
                    }} onPress={() => this.onLatLngSearch()}>USE CURRENT LOCATION</Text>

                </View>



                <View style={styles.content}>
                    {
                        this.state.message &&

                        <Text style={{ fontSize: 14, paddingBottom: 15, fontFamily: 'PingFang-SC-Light' }}>
                            <Text style={{ fontWeight: 'bold' }}>{this.state.total}</Text> results found</Text>
                    }
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {
                            this.state.data != undefined && this.state.data.map((item, key) => (

                                <View style={styles.article} key={key}>
                                    <View style={{ height: 92, width: '100%', padding: 15 }}>
                                        <Image style={{ height: '100%', width: '100%' }} source={{ uri: item.logo }}>

                                        </Image>
                                    </View>
                                    <View style={{ padding: 15 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontFamily: '' }}>
                                            <Text style={{ fontSize: 20, fontFamily: 'PingFang-SC-Light' }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ color: '#727272', fontSize: 12 }}>{item.distance} (mi)</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', paddingBottom: 15, paddingTop: 15, alignItems: 'center' }}>
                                            <Image style={{ alignItems: 'flex-end', width: 13, height: 18, marginRight: 5 }} source={require('../../../assets/general/black/location_thin.png')} ></Image>
                                            <Text style={{ color: '#B7B7B7', fontSize: 12, fontFamily: 'PingFang-SC-Regular' }}>{item.address}</Text>
                                        </View>


                                        <View style={{ height: 1, width: '100%', backgroundColor: '#EFEFF4' }}></View>
                                        <View style={{ padding: 20 }}>
                                            <TouchableOpacity style={{ borderRadius: 6, backgroundColor: '#D8AE24', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Signup',{building_id:item.building_id,building_name:item.name})}>
                                                <Text style={{ padding: 10, color: 'white', fontFamily: 'PingFang-SC-Regular', fontSize: 14 }}>REGISTER</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>

                {this.state.loading && <ActivityIndicator style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} size="large" color="#F27B28" />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        height: 50,
        top: 0,
        left: 0,
        position: 'absolute',
    },
    map: {

        top: 0,
        left: 0,
        right: 0,
        height: 250,
        marginBottom: 20
    },
    search:
    {
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        height: 47,
        position: 'absolute',
        top: 225,
        left: 20,
        right: 20,
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 5,
        borderColor: '#d2dae4',
        shadowColor: "#d2dae4",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2,
    },

    content:
    {
        flex: 1,
        padding: 20,
    },
    article:
    {
        height: 270,
        marginBottom: 15,
        backgroundColor: "white",
        borderRadius: 5,
        borderColor: '#d2dae4',
        shadowColor: "#d2dae4",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2,
    }
});
const mapStateToProps = state => {
    return {
        get_building: state.building,
        building_id: state.building_id
    };
};

const mapDispatchToProps = {
    // listRepos
};

export default Search;
