import React, {Component} from 'react';
import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
import ScalingDrawer from 'react-native-scaling-drawer';
import LeftMenu from '../component/menu';


import home from "../pages/home/index"
import news from "../pages/news/index"
import newsDetail from "../pages/news/newsDetail"
import settings from "../pages/settings/index"
import notification from "../pages/notifications/index"
import perks from "../pages/perks/index"
import perks_detail from "../pages/perks/perkDetail"

import event from "../pages/event/index"
import event_detail from "../pages/event/eventDetail"

import building from "../pages/building/index"

import polls from "../pages/polls/index"
import polls_detail from "../pages/polls/pollsDetail"

import {StackNavigator} from 'react-navigation';

let defaultScalingDrawerConfig = {
    scalingFactor: 0.7,
    minimizeFactor: 0.4,
    swipeOffset: 20
};

class CustomDrawerView extends Component {
    constructor(props) {
        super(props);
        this._drawer = this._drawer
    }

    componentWillReceiveProps(nextProps) {
        /** Active Drawer Swipe **/
        if (nextProps.navigation.state.index === 0)
            this._drawer.blockSwipeAbleDrawer(false);

        if (nextProps.navigation.state.index === 0 && this.props.navigation.state.index === 0) {
            this._drawer.blockSwipeAbleDrawer(false);
            this._drawer.close();
        }

        /** Block Drawer Swipe **/
        if (nextProps.navigation.state.index > 0) {
            this._drawer.blockSwipeAbleDrawer(true);
        }
    }

    setDynamicDrawerValue = (type, value) => {
        defaultScalingDrawerConfig[type] = value;
        /** forceUpdate show drawer dynamic scaling example **/
        this.forceUpdate();
    };

    render() {
        const {routes, index} = this.props.navigation.state;
        // const ActiveScreen = this.props.router.getComponentForState(this.props.navigation.state);
        return (
            <ScalingDrawer
                ref={ref => this._drawer = ref}
                content={<LeftMenu navigation={this.props.navigation}/>}
                {...defaultScalingDrawerConfig}
                onClose={() => {}}
                onOpen={() => {}}
            >
                <AppNavigator
                    openDrawer={() => this._drawer.open()}
                    closeDrawer={() => this._drawer.open()}
                    dynamicDrawerValue={ (type, val) => this.setDynamicDrawerValue(type, val) }
                />
            </ScalingDrawer>
        )
    }
}

const AppNavigator = StackNavigator({
    Home: {
        screen: home
    },
    News: {
        screen: news
    },
    NewsDetail: {
        screen: newsDetail
    },
    Perk : {
        screen: perks
    },
    PerksDetail: {
        screen: perks_detail
    },
    Event: {
        screen: event
    },
    EventDetail: {
        screen: event_detail
    },
    Building: {
        screen: building
    },
    Polls: {
        screen: polls
    },
    PollsDetail: {
        screen: polls_detail
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default CustomDrawerView;