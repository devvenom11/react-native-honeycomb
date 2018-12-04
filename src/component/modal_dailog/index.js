import React, {Component} from 'react';
import {Modal, Text, TouchableWithoutFeedback, View, Image} from 'react-native';
import Button from '../button'
export default class Dailog extends Component {
    state = {
        modalVisible: true,
    };

    setModalVisible(visible){
        this.setState({modalVisible: visible});
    }

    render() {
        const { show, onClose, content, title, image, buttonTitle, download, view } = this.props
        return (
            <Modal
                animationType="fade"
                transparent={true}
                swipeToClose={false}
                swipeArea={0}
                visible={show}
                onRequestClose={onClose}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableWithoutFeedback>
                            <View style={{alignItems: 'center', justifyContent: 'center', width: 320, height:200,
                                borderRadius: 5, backgroundColor: 'white', padding: 37}}>

                                {image ? <Image source={image}/> :<Image source={require('../../../assets/images/icon_pdf.png')}/>}
                                <Text style={{color:'#8F8E94', fontSize: 12, fontFamily: 'PingFang-SC-Light', marginTop: 12}}>{content}</Text>
                                <Text style={{color:'#8F8E94', fontSize: 12, fontFamily: 'PingFang-SC-Semibold',}}>{title}</Text>
                                {buttonTitle && <Button style={{marginTop: 19, height: 46}} title={buttonTitle} onPress={onClose}/>}
                                <View style={{flexDirection: 'row', }}>
                                {download && <Button style={{marginTop: 19, height: 46, flex:1}} title={'DOWNLOAD'} onPress={download}/>}
                                {view && <Button style={{marginTop: 19, height: 46, flex:1, marginLeft: 15}} title={'VIEW'} onPress={view}/>}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}