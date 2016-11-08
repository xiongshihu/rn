'use strict';

import React, { Component, PropTypes } from 'react';
import { is } from 'immutable';
import moment from 'moment';
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
    this.renderInfo = this.renderInfo.bind(this);
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
            leftContent={<Icon style={{textAlign: 'center'}} name="ios-arrow-back" size={30} color="#fff" />}
            leftOnPress = { () => navigator.pop()}
            rightContent={<Icon style={{textAlign: 'center'}} name="md-settings" size={30} color="#fff" />}
            rightOnPress = { () => this._navigate(globalStore.routes.LoginView) }
            TitleContent={this.props.info.show || '祥情页'}
          />
        </View>
        <View style={styles.main}>
          <ScrollView>
          {this.renderInfo(this.props.info)}
          </ScrollView>
        </View>
      </View>
    );
  }
  renderInfo(info) {
    console.log(info);
    if (!info) return false;
    const logoUrl = info.logoUrl.substring(0, info.logoUrl.indexOf('?'));
    return (
        <View>
          <View style={styles.list}>
            <View style={styles.itemImages}>
              <Image source={{uri: `${logoUrl}?imageView2/1/w/192/h/192`}}
                style={styles.itemLogo}
              />
            </View>
            <View style={styles.item}>
              {info.show ? <Text>{info.show}</Text> : null}
              {info.desc ? <Text>{info.desc}</Text> : null}
              {info.compileCount ? <Text>{`历史编辑: ${info.compileCount}`}</Text> : null}
            </View>
          </View>
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
