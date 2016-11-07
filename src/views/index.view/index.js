'use strict';

import React, { Component, PropTypes } from 'react';
import { is } from 'immutable';
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
  render() {
    const { store, actions, navigator } = this.props;
    const globalStore = store.global.toJS();
    const mainStore = store.main.toJS();
		return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            leftContent={<Icon name="ios-arrow-back" size={30} color="#fff" />}
            RightContent={<Icon name="md-settings" size={30} color="#fff" />}
            TitleContent={'首页'}
          />
        </View>
        <View style={styles.main}>
          <ScrollView>
          {this.renderList(mainStore.index.list)}
          </ScrollView>
        </View>
      </View>
    );
  }
  renderList(list) {
    if (!list.length) return false;
    return list.map((item, index) => {
      const logoUrl = item.logoUrl.substring(0, item.logoUrl.indexOf('?'));
      const recent = item.recent[0] || {};
      let log = '';
      if (recent.log) {
        log = recent.log[0];
      }
      return (
        <View key={`list-${index}`}>
          <View style={styles.list}>
            <View style={styles.itemImages}>
              <Image source={{uri: `${logoUrl}?imageView2/1/w/192/h/192`}}
                style={styles.itemLogo}
              />
            </View>
            <View style={styles.item}>
              <Text>{item.show}</Text>
              <Text>{item.desc}</Text>
              <Text>{`历史编辑: ${item.compileCount}`}</Text>
            </View>
          </View>
          {
            recent.commitTime || recent.log ? (
              <View style={styles.list}>
                <Text>{`[${recent.commitTime}] ${log}`}</Text>
              </View>
            ) : null
          }
        </View>
      );
    });
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
