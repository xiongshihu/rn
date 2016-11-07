'use strict';

import React, { Component } from 'react';
import { is } from 'immutable';
import {
  Alert,
  View
} from 'react-native';

class AlertComponent extends Component {
  constructor (props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {}, thisState = this.state || {};
    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }
  componentWillUpdate(nextProps) {
    this.handleShow(nextProps);
  }
  render() {
    return (
      <View></View>
    );
  }
  handleShow(nextProps) {
    const { alertInfo, actions } = nextProps;
    if (alertInfo.title) {
      Alert.alert(
        alertInfo.title,
        alertInfo.massage || ''
      );
      actions.globalAlertClean();
    }
  }
}

export default AlertComponent;
