import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { Stack } from './navigation/navigation';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './redux/reducers'
import * as FCM from './fcm';

const client = axios.create({
    baseURL: 'https://api.honeycomb.be/v4',
    timeout: 60000,
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

class App extends Component {
    componentDidMount() {
        FCM.initFCM();
    }
    render() {
        return (
            <Provider store={store}>
                <Stack />
            </Provider>
        );
    }
}

export default App;