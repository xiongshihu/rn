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
        <View style={styles.iptItem}>
          <Icon style={styles.iptIcon} name="ios-person" size={30} color="#4F8EF7" />
          <TextInput
            style={styles.ipt}
            style={{height: 40}}
            placeholder="用户名"
            value={store.test.get('testInfo')}
            onChangeText={(text) => actions.handleTest(text)}
          />
        </View>
        <View style={styles.iptItem}>
          <Icon style={styles.iptIcon} name="ios-lock" size={30} color="#4F8EF7" />
          <TextInput
            style={styles.ipt}
            style={{height: 40}}
            placeholder="密码"
            value={store.test.get('testInfo')}
            onChangeText={(text) => actions.handleTest(text)}
          />
        </View>
        <View style={styles.iptItem}>
          <TouchableHighlight onPress={this.handleFetch}>
            <View>
              <Icon name="ios-log-in" size={30} color="#4F8EF7" />
              <Text>登陆</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text style={styles.copyright}>
          {store.test.get('testInfo') || 'Welcome to React Native!'}
        </Text>
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
