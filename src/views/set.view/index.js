'use strict';

import React, { Component, PropTypes } from 'react';
import { is } from 'immutable';
import moment from 'moment';
import Button from 'apsl-react-native-button';
import {
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
class IndexView extends Component {
  constructor (props) {
    super(props);
    this._navigate = this._navigate.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.renderList = this.renderList.bind(this);
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
  componentDidMount() {
    const { store, actions } = this.props;
    actions.mainGetList({});
  }
  componentWillUpdate(nextProps) {
    const { store, actions } = nextProps;
    const globalStore = store.global.toJS();
    const authStore = store.auth.toJS();
    if(!authStore.user.isLogin) {
      this._navigate(globalStore.routes.LoginView)
    }
  }
  render() {
    const { store, actions, navigator } = this.props;
    const globalStore = store.global.toJS();
    const mainStore = store.main.toJS();
    console.log(this.props);
		return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            leftContent={<Icon style={{textAlign: 'center'}} name="ios-arrow-back" size={25} color="#fff" />}
            leftOnPress = { () => navigator.pop()}
            TitleContent={'设置'}
          />
        </View>
        <View style={styles.main}>
          {mainStore.index.isFetching ? this.renderLoading() : this.renderMain()}
        </View>
      </View>
    );
  }
  renderLoading() {
    return (
      <Button isLoading={true} style={{
        borderWidth: 0
      }}
      />
    );
  }
  renderMain() {
    const { store, actions, navigator } = this.props;
    const mainStore = store.main.toJS();
    return (
      <ScrollView>
        {this.renderList(mainStore.index.list)}
        <View style={styles.userWrap}>
          <View style={styles.TitleWrap}>
            <Text style={styles.Title}>账户信息</Text>
          </View>
          <View style={styles.userSet}>
            <View style={styles.userItemName}>
              <Text style={{height: 30, lineHeight: 30}}>何潇</Text>
            </View>
            <View style={styles.userItemBtn}>
              <Button isLoading={false} style={{
                borderRadius: 3, height: 30,
                backgroundColor: '#5bc0de',
                paddingLeft: 10, paddingRight: 10,
                borderBottomWidth: 0,
                alignSelf: 'center',
                marginBottom: 0,
                borderWidth: 0}} textStyle={{fontSize: 12, color: '#fff'}}
                onPress = {() => actions.authLogout()}
              >
                注销账户
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  renderList(list) {
    const { store, actions } = this.props;
    const globalStore = store.global.toJS();
    const mainlStore = store.main.toJS();
    const sub = mainlStore.sub || {};
    console.log(sub);
    if (!list.length) return false;
    return (
      <View style={styles.listWrap}>
        {
          list.map((item, index) => {
            const logoUrl = item.logoUrl.substring(0, item.logoUrl.indexOf('?'));
            const thatItem = sub[`${item.name}_${item.id}`] || {};
            console.log(thatItem.isFetching);
            return (
              <View key={`list-${index}`}>
                <View style={styles.list}>
                  <View style={styles.itemImages}>
                    <Image source={{uri: `${logoUrl}?imageView2/1/w/192/h/192`}}
                      style={styles.itemLogo}
                    />
                  </View>
                  <View style={styles.item}>
                    {item.show ? <Text>{item.show}</Text> : null}
                  </View>
                  <View style={styles.item}>
                    <Button isLoading={thatItem.isFetching} style={{
                      borderRadius: 3, height: 30,
                      backgroundColor: item.subscribe ? '#5bc0de' : '#777',
                      paddingLeft: 10, paddingRight: 10,
                      borderBottomWidth: 0,
                      marginBottom: 0,
                      borderWidth: 0}} textStyle={{fontSize: 12, color: '#fff'}}
                      onPress = {() => {actions.mainSetSub({ mids: item.id },`${item.name}_${item.id}`, item.subscribe)}}
                    >
                      {item.subscribe ? '已接收' : '未接收'}
                    </Button>
                  </View>
                </View>
              </View>
            );
          })
        }
      </View>
    );
  }
  _navigate(page, type = 'Bottom') {
    const { store, actions, navigator } = this.props;
    console.log(page);
    this.props.navigator.push({
      render: page,
      passProps: {},
      type: type
    })
  }
}

IndexView.propTypes = {
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
};

export default IndexView;
