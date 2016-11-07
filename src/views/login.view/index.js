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
import TouchableButton from '../../components/TouchableButton';

class LoginView extends Component {
  constructor (props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
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
    const authStore = store.auth.toJS();
		return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.iptItem}>
            <Icon style={styles.iptIcon} name="ios-person" size={30} color="#4F8EF7" />
            <TextInput
              style={styles.ipt}
              placeholder="用户名"
              value={authStore.loginName}
              onChangeText={(text) => actions.authSetName(text)}
            />
          </View>
          <View style={styles.iptItem}>
            <Icon style={styles.iptIcon} name="ios-lock" size={30} color="#4F8EF7" />
            <TextInput
              style={styles.ipt}
              placeholder="密码"
              value={authStore.loginPassword}
              onChangeText={(text) => actions.authSetPwd(text)}
            />
          </View>
          <View style={styles.iptItem}>
            <TouchableButton
              style={{}}
              icon={<Icon name="ios-log-in" size={30} color="#4F8EF7" />}
              onPress={this.handleLogin}
              Text="登录"
            />
          </View>
          <View style={styles.copyrightWrap}>
            <Text style={styles.copyright}>
              hexiao-o & 20161106
            </Text>
          </View>
          <TouchableButton
            style={{}}
            icon={<Icon name="ios-arrow-back-outline" size={30} color="#4F8EF7" />}
            onPress={()=>this.props.navigator.pop()}
            Text="返回上一页"
          />
        </View>
      </View>
    );
  }
  handleLogin() {
    const { authLogin } =this.props.actions;
    authLogin({

    });
  }
}

LoginView.propTypes = {
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
};

export default LoginView;
