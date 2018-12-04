import React, { Component } from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    ViewPropTypes,
    ScrollView,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
export default class PageControl extends Component {

    propTypes: {
        numberOfPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number,
        hidesForSinglePage: PropTypes.bool,
        pageIndicatorTintColor: PropTypes.string,
        currentPageIndicatorTintColor: PropTypes.string,
        indicatorSize: PropTypes.object,
        indicatorStyle: ViewPropTypes.style,
        currentIndicatorStyle: ViewPropTypes.style,
        onPageIndicatorPress: PropTypes.func
    }

    constructor(props) {
        super(props);

    }
    onPageIndicatorPress = (idx) => {
        this.props.onPageIndicatorPress(idx);
    }
    render() {
        var { style, ...props } = this.props;

        var defaultStyle = {
            height: this.props.indicatorSize.height
        };

        var indicatorItemStyle = {
            width: this.props.indicatorSize.width,
            height: this.props.indicatorSize.height,
            borderRadius: this.props.indicatorSize.height / 2,
            marginLeft: 5,
            marginRight: 5
        };

        var indicatorStyle = {
            ...indicatorItemStyle,
            ...this.props.indicatorStyle,
            ...{
                backgroundColor: this.props.pageIndicatorTintColor
            }
        };

        var currentIndicatorStyle = {
            ...indicatorItemStyle,
            ...this.props.currentIndicatorStyle,
            ...{
                backgroundColor: this.props.currentPageIndicatorTintColor
            }
        };

        var pages = [];
        for (var i = 0; i < this.props.numberOfPages; i++) {
            pages.push(i);
        }
        return (
            this.props.hidesForSinglePage && pages.length <= 1 ? null : <View style={[styles.container, defaultStyle, style]}>
                {pages.map((el, i) => <TouchableWithoutFeedback key={i} onPress={this.onPageIndicatorPress.bind(this, i)}>
                        <View style={i == this.props.currentPage ? currentIndicatorStyle: indicatorStyle} />
                    </TouchableWithoutFeedback>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardImage: {
        width: width-20,
        height: height/2
    },
})
