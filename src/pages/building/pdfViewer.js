import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../../component/header'

export default class pdfViewer extends Component {
    render() {
        const { navigation } = this.props;
        const url = navigation.getParam('url', 'NO-ID');

        return (
            <View style={styles.container}>
                <Pdf
                    source={{uri: url}}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});