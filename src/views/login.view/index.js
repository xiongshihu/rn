'use strict';

import React, { Component, PropTypes } from 'react';
import { is } from 'immutable';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import TouchableButton from '../../components/TouchableButton';

class LoginView extends Component {
  constructor (props) {
    super(props);
    this._navigate = this._navigate.bind(this);
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
    const { store, actions, navigator } = this.props;
    const authStore = store.auth.toJS();
		return (
      <View style={styles.container}>
        <Image source={require('./images/mobile-login.jpg')}
          style={styles.backgroundImage}
        >
        <Header
          leftContent={<Icon style={{textAlign: 'center', backgroundColor: 'transparent'}} name="ios-arrow-back" size={30} color="#ccc" />}
          leftOnPress = { () => navigator.pop()}
        />
        <View style={styles.wrap}>
          <View style={styles.iptItem}>
            <View style={styles.iptIcon}>
              <Icon style={styles.icon} name="ios-person" size={30} />
            </View>
            <TextInput
              style={styles.ipt}
              placeholder="用户名"
              clearButtonMode="always"
              placeholderTextColor="#fff"
              value={authStore.loginName}
              onChangeText={(text) => actions.authSetName(text)}
            />
          </View>
          <View style={styles.iptItem}>
            <View style={styles.iptIcon}>
              <Icon style={styles.icon} name="ios-lock" size={30} />
            </View>
            <TextInput
              style={styles.ipt}
              placeholder="密码"
              secureTextEntry={true}
              clearButtonMode="always"
              placeholderTextColor="#fff"
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
        </View>
        </Image>
      </View>
    );
  }
  _navigate(page, type = 'Bottom', passProps) {
    const { store, actions, navigator } = this.props;
    this.props.navigator.push({
      render: page,
      passProps: passProps,
      type: type
    })
  }
  handleLogin() {
    const { authLogin } = this.props.actions;
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
