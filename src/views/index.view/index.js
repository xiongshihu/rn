'use strict';

import React, { Component, PropTypes } from 'react';
import { is } from 'immutable';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';

class LoginView extends Component {
  constructor (props) {
    super(props);
    this.handleFetch = this.handleFetch.bind(this);
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
  render() {
    const { store, actions } = this.props;
    console.log(1111);
		return (
      <View style={styles.container}>
        <Text>这个是首页</Text>
      </View>
    );
  }
  handleFetch() {
    const { handleTest, handleFetch } =this.props.actions;
    handleFetch(`测试数据: ${(new Date).getTime()}`);
  }
}

LoginView.propTypes = {
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default LoginView;
