export const GET_REPOS = 'my-awesome-app/repos/LOAD';
export const GET_REPOS_SUCCESS = 'my-awesome-app/repos/LOAD_SUCCESS';
export const GET_REPOS_FAIL = 'my-awesome-app/repos/LOAD_FAIL';

export const GET_CONTENT = 'my-awesome-app/content/LOAD';
export const GET_CONTENT_SUCCESS = 'my-awesome-app/content/LOAD_SUCCESS';
export const GET_CONTENT_FAIL = 'my-awesome-app/content/LOAD_FAIL';

export const GET_CONTENT_NEWS = 'my-awesome-app/news/LOAD';
export const GET_CONTENT_NEWS_SUCCESS = 'my-awesome-app/news/LOAD_SUCCESS';
export const GET_CONTENT_NEWS_FAIL = 'my-awesome-app/news/LOAD_FAIL';

export const GET_CONTENT_EVENT = 'my-awesome-app/event/LOAD';
export const GET_CONTENT_EVENT_SUCCESS = 'my-awesome-app/event/LOAD_SUCCESS';
export const GET_CONTENT_EVENT_FAIL = 'my-awesome-app/event/LOAD_FAIL';

export const GET_CONTENT_PERK = 'my-awesome-app/perk/LOAD';
export const GET_CONTENT_PERK_SUCCESS = 'my-awesome-app/perk/LOAD_SUCCESS';
export const GET_CONTENT_PERK_FAIL = 'my-awesome-app/perk/LOAD_FAIL';

export const GET_CONTENT_POLL = 'my-awesome-app/poll/LOAD';
export const GET_CONTENT_POLL_SUCCESS = 'my-awesome-app/poll/LOAD_SUCCESS';
export const GET_CONTENT_POLL_FAIL = 'my-awesome-app/poll/LOAD_FAIL';

export const GET_AMENITIES = 'my-awesome-app/amenities/LOAD';
export const GET_AMENITIES_SUCCESS = 'my-awesome-app/amenities/LOAD_SUCCESS'
export const GET_AMENITIES_FAIL = 'my-awesome-app/amenities/LOAD_FAIL'

export const GET_BUILDING_FORM = 'my-awesome-app/building_form/LOAD';
export const GET_BUILDING_FORM_SUCCESS = 'my-awesome-app/building_form/LOAD_SUCCESS';
export const GET_BUILDING_FORM_FAIL = 'my-awesome-app/building_form/LOAD_FAIL';

export const GET_BUILDING_TANTANS = 'my-awesome-app/building_tantans/LOAD';
export const GET_BUILDING_TANTANS_SUCCESS = 'my-awesome-app/building_tantans/LOAD_SUCCESS';
export const GET_BUILDING_TANTANS_FAIL = 'my-awesome-app/building_tantans/LOAD_FAIL';

export const POST_RSVP = 'my-awesome-app/building_rsvp/LOAD';
export const POST_RSVP_SUCCESS = 'my-awesome-app/building_rsvp/LOAD_SUCCESS';
export const POST_RSVP_FAIL = 'my-awesome-app/building_rsvp/LOAD_FAIL';

export const POST_POLL = 'my-awesome-app/building_post_poll/LOAD';
export const POST_POLL_SUCCESS = 'my-awesome-app/building_post_poll/LOAD_SUCCESS';
export const POST_POLL_FAIL = 'my-awesome-app/building_post_poll/LOAD_FAIL';

export const POST_BUILDING_REPORT = 'my-awesome-app/building_post_report/LOAD';
export const POST_BUILDING_REPORT_SUCCESS = 'my-awesome-app/building_post_report/LOAD_SUCCESS';
export const POST_BUILDING_REPORT_FAIL = 'my-awesome-app/building_post_report/LOAD_FAIL';

export const POST_REGISTER = 'my-awesome-app/post_register/LOAD';
export const POST_REGISTER_SUCCESS = 'my-awesome-app/post_register/LOAD_SUCCESS';
export const POST_REGISTER_FAIL = 'my-awesome-app/post_register/LOAD_FAIL';

export const GET_BUILDING_ALL = 'my-awesome-app/get_building_all/LOAD';
export const GET_BUILDING_ALL_SUCCESS = 'my-awesome-app/get_building_all/LOAD_SUCCESS';
export const GET_BUILDING_ALL_FAIL = 'my-awesome-app/get_building_all/LOAD_FAIL';

export const CLEAR_ERROR_MESSAGE = 'my-awesome-app/clear_error_message';

var AUTH_TOKEN = '';

export const GET_PROFILE = 'get_profile';
import { AsyncStorage } from 'react-native'
const initialState = {
    building: {},
    building_id: '',
    contents: [],
    scheduleDate: '',
    scheduleStartTime: '',
    scheduleEndTime: '',
    event: [],
    news: [],
    perk: [],
    poll: [],
    amentities: [],
    amenitity: {},
    building_form: [],
    tantans: [],
    user: {},
    building_all: [],
    report_building_sucess: '',
    credentials: {},
    loading_content: false,
    error_load_content: null,
    loading_activity: false,
}

export default function reducer(state = initialState, action) {
    if (AUTH_TOKEN == '') {
        (async () => {
            await AsyncStorage.getItem('@MySuperStore:credentials', (err, result1) => {

                if (result1 != null) {
                    let result = JSON.parse(result1)
                    AUTH_TOKEN = result.idToken;
                }
            })
        })();
    }
    switch (action.type) {
        case GET_BUILDING_ALL:
            return { ...state, loading: true }
        case GET_BUILDING_ALL_SUCCESS:
            for (var i = 0; i < action.payload.data.data.length; i++) {
                action.payload.data.data[i].value = action.payload.data.data[i].name
            }
            return {
                ...state,
                building_all: action.payload.data.data,
                loading: false
            }
        case GET_BUILDING_ALL_FAIL:
            return { ...state, loading: false }
        case GET_REPOS:
            return { ...state, loading: true };
        case GET_REPOS_SUCCESS:
            return {
                ...state,
                loading: false,
                building: action.payload.data.data[0],
                building_id: action.payload.data.data[0].building_id,
            };
        case GET_REPOS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            };
        case GET_CONTENT_NEWS:
            return {
                ...state,
                loading: true
            }
        case GET_CONTENT_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                news: action.payload.data.data
            }
        case GET_CONTENT_NEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            };
        case GET_CONTENT_EVENT:
            return {
                ...state,
                loading: true
            }
        case GET_CONTENT_EVENT_SUCCESS:
            var contentsTmp = state.contents;
            var eventTmp = action.payload.data.data;
            var event_k = {};
            if (eventTmp.length > 0) {
                event_k.category = 'Events';
                event_k.items = eventTmp;
                //remove event_k first
                contentsTmp.forEach((item, index) => {
                    if (item && item.category === 'Events') {
                        contentsTmp[index] = event_k;
                    }
                })

            }
            return {
                ...state,
                loading: false,
                event: eventTmp,
                contents:contentsTmp, 
            }
        case GET_CONTENT_EVENT_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            };
        case GET_CONTENT_PERK:
            return {
                ...state,
                loading: true
            }
        case GET_CONTENT_PERK_SUCCESS:
            return {
                ...state,
                loading: false,
                perk: action.payload.data.data
            }
        case GET_CONTENT_PERK_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            };
        case GET_CONTENT_POLL:
            return {
                ...state,
                loading: true
            }
        case GET_CONTENT_POLL_SUCCESS:
            return {
                ...state,
                loading: false,
                poll: action.payload.data.data
            }
        case GET_CONTENT_POLL_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            };
        case GET_CONTENT:

            return {
                ...state,
                loading_content: true,
                error_load_content: null,
            };
        case GET_CONTENT_SUCCESS:

            let event = [], news = [], poll = [], perk = [], contents = [];
            let event_k = {}, news_k = {}, poll_k = {}, perk_k = {};
            for (i = 0; i < action.payload.data.data.length; i++) {
                switch (action.payload.data.data[i].type) {
                    case 'EVENT': event.push(action.payload.data.data[i]); break;
                    case 'NEWS': news.push(action.payload.data.data[i]); break;
                    case 'PERK': perk.push(action.payload.data.data[i]); break;
                    case 'POLL': poll.push(action.payload.data.data[i]); break;
                }
            }

            if (event.length > 0) {
                event_k.category = 'Events';
                event_k.items = event;
                contents.push(event_k)
            }
            if (news.length > 0) {
                news_k.category = 'Latest News';
                news_k.items = news
                contents.push(news_k)
            }
            if (poll.length > 0) {
                poll_k.category = 'Polls';
                poll_k.items = poll
                contents.push(poll_k)
            }
            if (perk.length > 0) {
                perk_k.category = 'Perks';
                perk_k.items = perk
                contents.push(perk_k)
            }
            // console.warn(state.loading)
            return {
                ...state,
                loading_content: false,
                contents: contents,
                event,
                news,
                perk,
                poll
            };
        case GET_CONTENT_FAIL:
            console.log("GET_CONTENT_FAIL ... ");
            return {
                ...state,
                loading_content: false,
                error_load_content: 'Error while fetching repositories'
            };
        case GET_AMENITIES:
            return {
                ...state,
                loading: true
            };
        case GET_AMENITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                amentities: action.payload.data.data
            };
        case GET_AMENITIES_FAIL:
            return {
                ...state,
                error: 'Error while fetching repositories'
            }
        case GET_BUILDING_FORM:
            return {
                ...state,
                loading: true,
            }
        case GET_BUILDING_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                building_form: action.payload.data.data
            }
        case GET_BUILDING_FORM_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            }
        case GET_BUILDING_TANTANS:
            return {
                ...state,
                loading: true,
            }
        case GET_BUILDING_TANTANS_SUCCESS:
            let data = action.payload.data.data
            for (var i = 0; i < data.length; i++) {
                data[i].value = data[i].tenant_name
            }
            return {
                ...state,
                loading: false,
                tantans: data
            }
        case GET_BUILDING_TANTANS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            }
        case POST_RSVP:
            return {
                ...state,
                loading_activity: true
            }
        case POST_RSVP_SUCCESS:
            console.log("POST_RSVP_SUCCESS...", action.payload.data.data)
            const { content_id, event_capacity, rsvp_count, rsvp } = action.payload.data.data;
            var { contents } = state;

            contents.forEach((item, index) => {
                if (item && item.category === 'Events' && item.items && item.items.length > 0) {
                    item.items.map((item, key) => {
                        if (item.id == content_id) {
                            console.log("item : ", item);
                            item.event.count = rsvp_count;
                            item.event.rsvp = item.event.rsvp == 'RSVP' ? 'UN_RSVP' : 'RSVP';
                        }
                    })
                }
            })
            return {
                ...state,
                loading_activity: false,
                contents, 
            }
        case POST_RSVP_FAIL:

            return {
                ...state,
                loading_activity: false,
                error: 'Error while fetching repositories'
            }
        case POST_POLL:
            return {
                ...state,
                loading: true
            }
        case POST_POLL_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case POST_POLL_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            }
        case POST_BUILDING_REPORT:
            return {
                ...state,
                loading: true,
                report_building_sucess: ''
            }
        case POST_BUILDING_REPORT_SUCCESS:

            return {
                ...state,
                loading: false,
                report_building_sucess: 'Building Sucess'
            }
        case POST_BUILDING_REPORT_FAIL:

            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            }
        case POST_REGISTER:
            return {
                ...state,
                loading: true,
                error: 'Error while fetching repositories'
            }
        case POST_REGISTER_SUCCESS:

            return {
                ...state,
                loading: false,
            }
        case POST_REGISTER_FAIL:

            return {
                ...state,
                loading: false
            }
        case 'GET_SCHEDUL_DATE':
            return {
                ...state,
                scheduleDate: action.payload
            }
        case 'GET_SCHEDUL_TIME':
            return {
                ...state,
                scheduleStartTime: action.payload.startTime,
                scheduleEndTime: action.payload.endTime
            }
        case 'GET_AMENITITY_date':
            let amenitity = action.payload
            return {
                ...state,
                amenitity: amenitity
            }
        case GET_PROFILE:
            return {
                ...state,
                user: action.payload
            }
        case 'USER_LOGOUT':
            AsyncStorage.clear()
            return {
                ...state,
                building: {}
            }
        case 'GET_CREDENTIAL':
            console.log(data);
            return {
                ...state,
                credentials: action.payload
            }
        case CLEAR_ERROR_MESSAGE:
            return { ...state, error_load_content: null, error: null }
        default:
            return state;
    }
}

export function getAmenity(detail) {
    return {
        type: 'GET_AMENITITY_date',
        payload: detail
    }
}

export function getScheduleDate(date) {
    return {
        type: 'GET_SCHEDUL_DATE',
        payload: date
    }
}

export function getScheduleTime(startTime, endTime) {
    return {
        type: 'GET_SCHEDUL_TIME',
        payload: {
            startTime: startTime,
            endTime: endTime,
            request:
            {
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
            }
        }
    }
}

export function building(id) {
    return {
        type: GET_REPOS,
        payload: {
            request: {
                method: 'GET',
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                url: `/building/${id}`
            }
        }
    };
}

export function content_building(id) {
    console.log({ AUTH_TOKEN, id });
    return {
        type: GET_CONTENT,
        payload: {
            request: {
                method: 'GET',
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                url: `/content/building/${id}`
            }
        }
    };
}

export function content_news(id) {
    return {
        type: GET_CONTENT_NEWS,
        payload: {
            request: {
                method: 'GET',
                url: `/content/type/news/${id}`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                }
            }
        }
    };
}

export function content_perk(id) {
    return {
        type: GET_CONTENT_PERK,
        payload: {
            request: {
                method: 'GET',
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                url: `/content/type/perk/${id}`
            }
        }
    };
}

export function content_poll(id) {
    return {
        type: GET_CONTENT_POLL,
        payload: {
            request: {

                method: 'GET',
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                url: `/content/type/poll/${id}`,

            }
        }
    };
}

export function content_envet(id) {

    return {
        type: GET_CONTENT_EVENT,
        payload: {
            request: {
                method: 'GET',
                url: `/content/type/event/${id}`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                }
            }
        }
    };
}

export function content_amenities(id) {
    return {
        type: GET_AMENITIES,
        payload: {
            request: {
                method: 'GET',
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                url: `/amenities/building/${id}`
            }
        }
    }
}

export function building_form(id) {
    return {
        type: GET_BUILDING_FORM,
        payload: {
            request: {
                method: 'GET',
                url: `/building/forms/${id}`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
            }

        }
    }
}

export function building_tantans(id) {
    return {
        type: GET_BUILDING_TANTANS,
        payload: {
            request: {
                method: 'GET',
                url: `/building/tenants/${id}`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
            }
        }
    }
}

export function rsvp_for_action(content_id, type) {

    return {
        type: POST_RSVP,
        payload: {
            request: {
                method: 'post',
                url: `/content/rsvp/${content_id}`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                params: {
                    type: type,
                }
            }
        }
    }
}

export function post_poll(id) {
    return {
        type: POST_POLL,
        payload: {
            request: {
                method: 'post',
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                url: `/content/poll/${id}`,
            }
        }
    }
}

export function post_building_report(building_id, type, imageURL, desc) {
    console.log("reducers..post_building_report");
    console.log({ building_id, type, imageURL, desc })
    return {
        type: POST_BUILDING_REPORT,
        payload: {
            request: {
                method: 'post',
                url: `/building/report/${building_id}`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                params: {
                    report_type: type,
                    report_image: imageURL,
                    report_desc: desc
                }
            }
        }
    }
}

export function post_register(name, email, phone, address, suite, building, tenant, password, email_notifications, sms_notifications, push_notifications) {
    return {
        type: POST_REGISTER,
        payload: {
            request: {
                method: 'post',
                url: `/users/register`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
                params: {
                    name,
                    email,
                    phone,
                    address,
                    suite,
                    building,
                    tenant,
                    password,
                    email_notifications,
                    sms_notifications,
                    push_notifications,
                }
            }
        }
    }
}


export function get_profile(profile) {
    return {
        type: GET_PROFILE,
        payload: profile,
        headers:
        {
            Authorization: AUTH_TOKEN
        }
    }
}

export function get_building_all() {
    return {
        type: GET_BUILDING_ALL,
        payload: {
            request: {
                method: 'get',
                url: `/building/all`,
                headers:
                {
                    Authorization: AUTH_TOKEN
                },
            }
        }

    }

}

export function logout() {
    return {
        type: 'USER_LOGOUT',
    }
}

export function getcredentials(data) {

    return {
        type: 'GET_CREDENTIAL',
        payload: data
    }
}

export function clear_error_message() {
    return {
        type: CLEAR_ERROR_MESSAGE
    };
}