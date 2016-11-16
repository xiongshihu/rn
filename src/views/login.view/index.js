'use strict';

import React, { Component, PropTypes } from 'react';
import { is } from 'immutable';
import Button from 'apsl-react-native-button';
import {
  StatusBar,
  Animated,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Easing,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableButton from '../../components/TouchableButton';

class LoginView extends Component {
  constructor (props) {
    super(props);
    this._navigate = this._navigate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.renderLogo = this.renderLogo.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.state = {
      labelPwdTop: new Animated.Value(0),
      labelNameTop: new Animated.Value(0),
      labelNameSize: new Animated.Value(15),
      labelPwdSize: new Animated.Value(15),
    }
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
		return (
      <View style={styles.container}>
        <StatusBar
          barStyle="default"
        />
        <View style={styles.loginWrap}>
          { /** logo **/ }
          { this.renderLogo() }
          { /** from **/ }
          { this.renderForm() }
        </View>
      </View>
    );
  }
  renderLogo() {
    let Logo = null;
    Logo = (
      <Image
        style={{
          width: 90,
          height: 90,
        }}
        source={require('./images/logo.png')}
      />
    );
    return (
      <View style={styles.logoWrap}>
        <View style={styles.logoIcon}>
          {Logo}
        </View>
        <Text style={styles.logoTitle}>
          wellcome to toolchain
        </Text>
      </View>
    );
  }
  renderForm() {
    const { store, actions, navigator } = this.props;
    const authStore = store.auth.toJS();
    return (
      <View style={styles.loginFrom}>
        <View style={styles.iptItem}>
          <Animated.View
            style={[
              {
                top: this.state.labelNameTop,
              },
              styles.iptLabel,
            ]}
          >
            <View style={styles.iptLabelContent}>
            <TouchableOpacity onPress={() => this.handleOnFocus('name') }>
              <Animated.Text
                style={
                  {
                    fontSize: this.state.labelNameSize,
                    color: '#999',
                  }
                }
              >
                camera360邮箱/手机号
              </Animated.Text>
            </TouchableOpacity>
            </View>
          </Animated.View>
          <View
            style={styles.iptContent}
          >
            <TextInput
              style={styles.ipt}
              value={authStore.loginName}
              autoFocus={this.state.onFocusName}
              onFocus = { (e) => this.handleOnFocus('name') }
              onBlur  = { (e) => this.handleOnBlur('name') }
              onChangeText={(text) => actions.authSetName(text)}
            />
          </View>
        </View>
        <View style={styles.iptItem}>
          <Animated.View
            style={[
              {
                top: this.state.labelPwdTop,
              },
              styles.iptLabel,
            ]}
          >
            <View style={styles.iptLabelContent}>
              <TouchableOpacity onPress={() => this.handleOnFocus('pwd') }>
                <Animated.Text
                  style={
                    {
                      fontSize: this.state.labelPwdSize,
                      color: '#999',
                    }
                  }
                >
                  密码
                </Animated.Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <View
            style={styles.iptContent}
          >
            <TextInput
              style= { styles.ipt }
              secureTextEntry = { true }
              clearButtonMode = "always"
              returnKeyType = "go"
              value = { authStore.loginPassword }
              onFocus = { (e) => this.handleOnFocus('pwd') }
              onBlur  = { (e) => this.handleOnBlur('pwd') }
              onChangeText = { (text) => actions.authSetPwd(text) }
              onSubmitEditing = { this.handleLogin }
            />
          </View>
        </View>
        <View style={styles.iptItem}>
          <Button isLoading={authStore.user.isFetching} style={{ borderRadius: 3, height: 30,
            backgroundColor: '#3ad88f'|| 'transparent',
            borderBottomWidth: 0,
            height: 50,
            borderRadius: 50,
            borderWidth: 0}} textStyle={{fontSize: 17, color: '#fff'}}
            onPress = { this.handleLogin }
          >
            登 录
          </Button>
        </View>
        <View style={[
          styles.iptItem,
          styles.iptItemInfo,
        ]}>
          <Text style={styles.infoContent}>
            还没有账号？点击
          </Text>
          <TouchableOpacity onPress={() => this._navigate() }>
            <Text style={[styles.infoContent,{
              color: '#a4f1a0',
            }]}>
              注册
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleOnFocus(type) {
    const { store } = this.props;
    const authStore = store.auth.toJS();
    if(type === 'name' && !authStore.loginName) {
      Animated.timing(this.state.labelNameTop, {
        toValue: -15, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
      Animated.timing(this.state.labelNameSize, {
        toValue: 12, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
    }
    if(type === 'pwd' && !authStore.loginPassword) {
      Animated.timing(this.state.labelPwdTop, {
        toValue: -15, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
      Animated.timing(this.state.labelPwdSize, {
        toValue: 12, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
    }
  }
  handleOnBlur(type) {
    const { store } = this.props;
    const authStore = store.auth.toJS();
    if(type === 'name' && !authStore.loginName) {
      Animated.timing(this.state.labelNameTop, {
        toValue: 0, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
      Animated.timing(this.state.labelNameSize, {
        toValue: 15, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
    }
    if(type === 'pwd' && !authStore.loginPassword) {
      Animated.timing(this.state.labelPwdTop, {
        toValue: 0, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
      Animated.timing(this.state.labelPwdSize, {
        toValue: 15, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
    }
  }
  _navigate(page, type = 'Bottom', passProps) {
    if (!page) return;
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
