import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Dimensions } from 'react-native'
import splash from "../pages/splash/index";
import login from "../pages/login/index"
import forgort from "../pages/forgot_password"
import signup from "../pages/signup/index"
import home from "../pages/home/index"
import news from "../pages/news/index"
import newsDetail from "../pages/news/newsDetail"
import settings from "../pages/settings/index"
import notification from "../pages/notifications/index"
import accessControl from '../pages/access_control/index'
import guestInvite from '../pages/access_control/guest_invite';
import perks from "../pages/perks/index"
import perks_detail from "../pages/perks/perkDetail"

import event from "../pages/event/index"
import event_detail from "../pages/event/eventDetail"

import building from "../pages/building/index"
import building_details from "../pages/building/details"
import building_schedule from "../pages/building/schedule"
import building_time_schedule from "../pages/building/time_schedule"
import comform_booking from "../pages/building/comform_booking"

import polls from "../pages/polls/index"
import polls_detail from "../pages/polls/pollsDetail"
import report from "../pages/report"
import pdfViewer from '../pages/building/pdfViewer'
import Search from '../pages/searchs'

export const Stack = StackNavigator({
    Splash: {
        screen: splash,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Login: {
        screen: login,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Signup: {
        screen: signup,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Home: {
        screen: home,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Forgort: {
        screen: forgort,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    News: {
        screen: news,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    NewsDetail: {
        screen: newsDetail,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Settings: {
        screen: settings,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Notifications:{
        screen: notification,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    AccessControl: {
        screen: accessControl,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    GuestInvite: {
        screen: guestInvite,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },
    Perk : {
        screen: perks,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    PerksDetail: {
        screen: perks_detail,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Event: {
        screen: event,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    EventDetail: {
        screen: event_detail,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Building: {
        screen: building,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    BuildingDetails: {
        screen: building_details,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    BuildingSchedule: {
        screen: building_schedule,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    BuilddingTimeSchedule: {
        screen: building_time_schedule,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    BuildingComformBooking: {
        screen: comform_booking,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Polls: {
        screen: polls,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    PollsDetail: {
        screen: polls_detail,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    Report: {
        screen: report,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    },
    PDFViwer: {
        screen: pdfViewer,
        navigationOptions: {
            headerTitle: 'PDFViwer'
        }
    },
    Search: {
        screen: Search,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
    }

},
{
    cardStyle: {
        shadowOpacity: 0,
        shadowOffset: {
            height: 0,
            width:0
        },
        shadowRadius: 0,
    }
});
