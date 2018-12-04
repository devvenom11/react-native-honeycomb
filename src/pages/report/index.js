import React, { Component } from 'react';
import { Image, ScrollView, Text, TextInput, View, Dimensions, StyleSheet, Modal, TouchableOpacity, Animated, TouchableHighlight, ActivityIndicator, Platform, Alert } from 'react-native';
import Header from '../../component/header'
import { connect } from "react-redux";
import Button from '../../component/button'
import CustomTextInput from '../../component/textInput'
import LeftMenu from '../../component/menu'
import ScalingDrawer from 'react-native-scaling-drawer';
import Dropdown from '../../component/dropdown';
import { post_building_report } from '../../redux/reducers'
import ImagePicker from 'react-native-image-crop-picker'
import AWS from 'aws-sdk'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import randomString from 'random-string';

let defaultScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: 0.4,
    swipeOffset: 20
};
let rightScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: -0.4,
    swipeOffset: 20
};
var { width } = Dimensions.get('window')

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            description: '',
            ctype: '',
            imageurl: '',
            imageURI: null,
            loading: false,
            allowPointerEvents: true,
            modalVisible: false,
        }
    }

    _renderMain = (navigation) => {
        let building_color = '#F27B28'
        const { get_building } = this.props
        if (get_building && get_building.colors) {
            building_color = get_building.colors.primary
        }
        return (
            <View style={styles.container}>
                <Header
                    fontAwesome={true}
                    title={'REPORT'}
                    rightText={''}
                    leftButton={require('../../../assets/top_nav/menu.png')}
                    leftPress={() => this.refs._drawer.open()}

                    rightButton={<FontAwesome style={{ color: 'black', fontSize: 22 }}>{Icons.camera}</FontAwesome>}

                    // rightPress={() => { this.onFileUpload(); }}
                    rightPress={() => this.setModalVisible(true)}

                />

                <ScrollView style={styles.newsCards}>
                    <View style={{ marginBottom: 80 }}>

                        <View style={styles.headeringView}>
                            <Text style={styles.headerTitle}>Send us your Report</Text>
                            <Text style={styles.headerDescription}>
                                Use this form to report an issue in the building. please
                                select the type of issue and include a description
                                Thank you for helping us keep our building safe and enjoyable for all.
                            </Text>
                        </View>

                        <Dropdown

                            label={'Select Type'}
                            icon={require('../../../assets/images/report_type.png')}
                            data={[{ value: 'HVAC', cvalue: 'HVAC' }, {
                                value: 'Electrical',
                                cvalue: 'ELEC'
                            }, { value: 'Janitorial', cvalue: 'JANT' },
                            { value: 'Suspicious Person/Item', cvalue: 'SUPS' }, { value: 'Other', cvalue: 'OTH' }]}
                            onChangeText={this.onSelectItem}
                            value={this.state.type}
                        />

                        {this.state.imageURI &&

                            <View style={styles.fileUpload}>
                                <Image style={{

                                    width: width - 40,
                                    height: 140,
                                    resizeMode: 'contain'
                                }} source={{ uri: this.state.imageURI }} />
                                {this.state.loading && <ActivityIndicator style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} size="large" color="#F27B28" />}
                            </View>

                        }


                        <TextInput
                            placeholder={'Description (Required)'}
                            style={styles.description}
                            editable={true}
                            maxLength={40}
                            multiline={true}
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                        />

                        <Button style={{ backgroundColor: building_color }} title={'SUBMIT'}
                            onPress={() => this.post_building_report()} />
                    </View>
                </ScrollView>
            </View>
        )
    }
    onSelectItem = (type, index, data) => {

        this.setState({ type, ctype: data[index].cvalue })
    }

    post_building_report() {
        const { ctype, imageurl, description } = this.state
        console.log(ctype);
        if (ctype == null || ctype == undefined || ctype == '') {
            var msg = 'Please select type';
            Alert.alert("Fail", msg,
                [
                    {
                        text: 'OK'
                    },

                ],
                { cancelable: true }
            )
        }
        else {
            this.props.post_building_report(this.props.building_id, ctype, imageurl, description)
        }
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.report_building_sucess != '') {
            var msg = 'Thank you for your feedback, managment has been notified.';
            this.setState({ description: '', imageURI: null, type: '',  ctype: '', imageurl: ''})
            Alert.alert("Success", msg,
                [
                    {
                        text: 'OK'
                    },

                ],
                { cancelable: true }
            )
        }


    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    renderModal() {
        return (
            <Modal

                transparent={true}
                animationType="none"
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setModalVisible(false); }}
            >
                <View style={{
                    flex: 1,
                }}>
                    <TouchableHighlight style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        backgroundColor: '#00000077',

                    }}
                        underlayColor='#00000077'
                        onPress={() => { this.setModalVisible(false); }}
                    >

                        <View style={{ flex: 1 }}>
                            <Animated.View
                                style={{

                                    overflow: 'hidden',
                                    height: 200
                                }}
                            >
                                <View pointerEvents={this.state.allowPointerEvents ? 'auto' : 'none'} style={{ marginTop: 20 }}>
                                    <View style={{ marginHorizontal: 20, borderRadius: 6, overflow: 'hidden' }}>

                                        <TouchableOpacity style={{
                                            flexDirection: 'row', height: 40, alignContent: 'center', justifyContent: 'center',
                                            alignItems: 'center', backgroundColor: 'white', borderBottomColor: '#e4e7ec', borderBottomWidth: 0.5
                                        }}
                                            onPress={() => { this.onTakePhoto(); }}>

                                            <Text style={{ color: '#2c79b9', fontWeight: 'bold', textAlign: 'center' }}>Take photo...</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center',
                                            height: 40, backgroundColor: 'white', borderBottomColor: '#e4e7ec', borderBottomWidth: 0.5
                                        }}
                                            onPress={() => {

                                                this.onFileUpload()
                                            }}>

                                            <Text style={{ color: '#2c79b9', fontWeight: 'bold', textAlign: 'center' }}>Choose from library..</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20, marginHorizontal: 20, height: 40, backgroundColor: 'white', alignContent: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center', borderRadius: 6
                                        }}
                                        onPress={() => this.setState({ modalVisible: false })}>
                                        <Text style={{ color: '#2c79b9', fontWeight: 'bold', textAlign: 'center' }}>Cancel</Text>
                                    </TouchableOpacity>


                                </View>

                            </Animated.View>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        )
    }
    onFileUpload = () => {
        ImagePicker.openPicker({
            multiple: false,
            cropping: true
        }).then(image => {
            this.setState({ loading: true, imageURI: Platform.OS === 'ios' ? image.sourceURL : image.path, modalVisible: false })
            var imageName = randomString({length: 20});
            var s3KeyImage = `report/${imageName}.jpg`;
            var s3 = new AWS.S3({ accessKeyId: 'AKIAJWVSSVU5W4HZ7ZRQ', secretAccessKey: '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', region: 'us-east-2' });
            var that = this
            var params = { Bucket: 'honeycomb-cdn-images', Key: s3KeyImage, ContentType: 'image/jpeg' };
            s3.getSignedUrl('putObject', params, function (err, url) {
                const xhr = new XMLHttpRequest()
                xhr.open('PUT', url)
                xhr.setRequestHeader('Content-Type', 'image/jpeg')
                xhr.send({ uri: image.sourceURL, type: 'image/jpeg', name: `${imageName}.png`  })
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {

                            var params2 = { Bucket: 'honeycomb-cdn-images', Key: s3KeyImage };
                            s3.getSignedUrl('getObject', params2, function (err, url) {
                                that.setState({ imageurl: url, loading: false })

                            });
                        } else {
                            console.log('Error while sending the image to S3')
                        }
                    }
                }
            });
        });
    }
    onTakePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log("get image ok");
            console.log(image);
            const imageURI = (Platform.OS === 'ios' && image.sourceURL) ? image.sourceURL : image.path;
            console.log("imageURI: ", imageURI);
            this.setState({ loading: true, imageURI, modalVisible: false })
            var imageName = randomString({length: 20});
            var s3KeyImage = `report/${imageName}.jpg`;
            var s3 = new AWS.S3({ accessKeyId: 'AKIAJWVSSVU5W4HZ7ZRQ', secretAccessKey: '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', region: 'us-east-2' });
            var that = this
            var params = { Bucket: 'honeycomb-cdn-images', Key: s3KeyImage, ContentType: 'image/jpeg' };
            s3.getSignedUrl('putObject', params, function (err, url) {
                const xhr = new XMLHttpRequest()
                xhr.open('PUT', url)
                xhr.setRequestHeader('Content-Type', 'image/jpeg')
                xhr.send({ uri: imageURI, type: 'image/jpeg', name: `${imageName}.png` })
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var params2 = { Bucket: 'honeycomb-cdn-images', Key: s3KeyImage };
                            s3.getSignedUrl('getObject', params2, function (err, url) {
                                console.log("url from s3: ", url);
                                that.setState({ imageurl: url, loading: false })
                            });
                        } else {
                            console.log('Error while sending the image to S3')
                        }
                    }
                }
            });
        });
    }
    close = () => {
        this.refs._drawer.close()
    }
    home = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Home')
        }, 250);
    }
    news = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('News')
        }, 250);
    }
    perks = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Perk')
        }, 250);
    }
    polls = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Polls')
        }, 250);
    }
    events = () => {
        this.props.logout()
        this.props.navigation.pop()
    }
    building = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Building')
        }, 250);
    }
    report = () => {
        this.refs._drawer.close()
        setTimeout(() => {
            this.props.navigation.replace('Report')
        }, 250);
    }
    logout = () => {
        this.refs._drawer.close()
        this.props.logout()
        setTimeout(() => {
            this.props.navigation.goBack()
        }, 250);
    }
    profilepage = () => {
        this.refs._right_drawer.close()
        setTimeout(() => {
            this.props.navigation.navigate('Settings')
        }, 250);
    }
    notification = () => {
        this.refs._right_drawer.close()
        setTimeout(() => {
            this.props.navigation.navigate('Notifications')
        }, 250);
    }

    render() {
        const { navigation } = this.props;

        return (
            <ScalingDrawer
                ref={'_drawer'}
                content={
                    <LeftMenu
                        navigation={navigation}
                        close={this.close}
                        home={this.home}
                        news={this.news}
                        perks={this.perks}
                        polls={this.polls}
                        events={this.events}
                        building={this.building}
                        report={this.report}
                        logout={this.logout}
                    />}
                {...defaultScalingDrawerConfig}

            >
                {this.renderModal()}
                {this._renderMain(navigation)}
            </ScalingDrawer>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    newsCards: {
        flex: 1,
        padding: 20,
    },

    headerTitle: {
        fontFamily: 'PingFang-SC-Regular',
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
    headerDescription: {
        textAlign: 'center',
        fontSize: 12,
        color: '#B7B7B7',
        marginTop: 7
    },
    fileUpload: {
        width: width - 40,
        height: 140,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E3E3E3'
    },
    dragFile: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Semibold',
        color: '#B7B7B7'
    },
    dragFile_or: {
        fontSize: 12,
        fontFamily: 'PingFang-SC-Semibold',
        color: '#B7B7B7'
    },
    browse_your_conputer: {
        fontSize: 12,
        fontFamily: 'PingFang-SC-Semibold',
        color: '#F27B28'
    },
    description: {
        marginTop: 35,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 5,
        padding: 20,
        height: 200,
    }
});
const mapStateToProps = state => {
    // let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
    return {
        building_id: state.building_id,
        report_building_sucess: state.report_building_sucess,
        get_building: state.building,
    };
};

const mapDispatchToProps = {
    post_building_report
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
