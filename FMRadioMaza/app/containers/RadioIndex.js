import { Provider } from 'react-redux';

import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import store from '../store';
import Home from './Home';

export default class RadioIndex extends Component {
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    }
}
