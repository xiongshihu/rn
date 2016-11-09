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
    setTimeout(() => {
      actions.mainGetList({});
    }, 2000);
  }
  render() {
    const { store, actions, navigator } = this.props;
    const globalStore = store.global.toJS();
    const mainStore = store.main.toJS();
		return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            rightContent={<Icon style={{textAlign: 'center'}} name="md-settings" size={30} color="#fff" />}
            rightOnPress = { () => this._navigate(globalStore.routes.LoginView) }
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
    const { store } = this.props;
    const globalStore = store.global.toJS();
    if (!list.length) return false;
    return list.map((item, index) => {
      const logoUrl = item.logoUrl.substring(0, item.logoUrl.indexOf('?'));
      const recent = item.recent[0] || {};
      let log = '';
      if (recent.log) {
        log = recent.log[0];
      }
      return (
        <TouchableOpacity
          key={`list-${index}`}
          underlayColor='transparent'
          onPress={() => this._navigate(globalStore.routes.InfoView, 'Normal', {info: item})}
        >
          <View >
            <View style={styles.list}>
              <View style={styles.itemImages}>
                <Image source={{uri: `${logoUrl}?imageView2/1/w/192/h/192`}}
                  style={styles.itemLogo}
                />
              </View>
              <View style={styles.item}>
                {item.show ? <Text>{item.show}</Text> : null}
                {item.desc ? <Text>{item.desc}</Text> : null}
                {item.compileCount ? <Text>{`历史编辑: ${item.compileCount}`}</Text> : null}
              </View>
            </View>
            {
              recent.commitTime || recent.log ? (
                <View style={styles.listMsg}>
                  <Text>{`[${moment(recent.commitTime).month(1).format("YY-MM-DD hh:mm")}] ${log}`}</Text>
                </View>
              ) : null
            }
          </View>
        </TouchableOpacity>
      );
    });
  }
  _navigate(page, type = 'Bottom', passProps) {
    const { store, actions, navigator } = this.props;
    this.props.navigator.push({
      render: page,
      passProps: passProps,
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
