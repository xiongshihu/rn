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
    this.renderInfo = this.renderInfo.bind(this);
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
    const { store, actions, info } = this.props;
    actions.mainGetInfo({
      module: info.name,
      count: 5,
      tab: 0,
    }, `${info.name}_${info.id}`);
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
    const { store, actions, navigator, info } = this.props;
    const globalStore = store.global.toJS();
    const mainStore = store.main.toJS();
    const { isFetching, brief, list } = mainStore.info[`${info.name}_${info.id}`] || {};
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            leftContent={<Icon style={{textAlign: 'center'}} name="ios-arrow-back" size={25} color="#fff" />}
            leftOnPress = { () => navigator.pop()}
            rightContent={<Icon style={{textAlign: 'center'}} name="md-settings" size={25} color="#fff" />}
            rightOnPress = { () => this._navigate(globalStore.routes.SetView, 'Normal') }
            TitleContent={this.props.info.show || '祥情页'}
          />
        </View>
        <View style={styles.main}>
          {isFetching ? this.renderLoading() : this.renderMain()}
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
    const { store, actions, navigator, info } = this.props;
    const globalStore = store.global.toJS();
    const mainStore = store.main.toJS();
    const { brief, list } = mainStore.info[`${info.name}_${info.id}`] || {};
    return (
        <ScrollView>
          <View style={{ flex: 1 }}>
            {this.renderInfo(brief)}
            <View style={{ flex: 1 }}>
              <View style={styles.tabWrap}>
                <View style={styles.tabItem}>
                  <Button isLoading={false} style={{
                    borderRadius: 3, height: 30,
                    backgroundColor: mainStore.infoType === 0 ? '#eee' : 'transparent',
                    paddingLeft: 10, paddingRight: 10,
                    borderBottomWidth: 0,
                    borderColor: '#ddd',
                    borderWidth: 1}} textStyle={{fontSize: 12, color: '#555'}}
                    onPress = {() => actions.mainSetInfoTab(0)}
                  >
                    已发布
                  </Button>
                </View>
                <View style={styles.tabItem}>
                  <Button isLoading={false} style={{ borderRadius: 3, height: 30,
                    backgroundColor: mainStore.infoType === 1 ? '#eee' : 'transparent',
                    paddingLeft: 10, paddingRight: 10,
                    borderBottomWidth: 0,
                    borderColor: '#ddd',
                    borderWidth: 1}} textStyle={{fontSize: 12, color: '#555'}}
                    onPress = {() => actions.mainSetInfoTab(1)}
                  >
                    全部
                  </Button>
                </View>
              </View>
              <View style={styles.list}>
                {this.renderList(list)}
              </View>
            </View>
          </View>
        </ScrollView>
    );
  }
  renderInfo(info) {
    const { store, actions, navigator } = this.props;
    if (!info) return false;
    return (
        <View style={styles.infoWrap}>
          <View style={styles.infoMain}>
            <View style={styles.infoImages}>
              <Image source={{uri: info.logoUrl}}
                style={styles.infoLogo}
              />
            </View>
            <View style={styles.infoDesc}>
              {info.desc ? <Text>{info.desc}</Text> : null}
              {info.compileCount ? <Text>{`历史编辑: ${info.compileCount}`}</Text> : null}
              {info.qrUrl ? <Text>最新包外网二维码下载地址</Text> : null}
            </View>
          </View>
          <View style={styles.infoBtnWrap}>
            <View style={{marginRight: 10}}>
              <Button isLoading={false} style={{ borderRadius: 3, height: 20,
                backgroundColor: '#5bc0de', paddingLeft: 10, paddingRight: 10, borderWidth: 0}} textStyle={{fontSize: 12, color: '#fff'}}>
                聊天室
              </Button>
            </View>
            <View style={{marginRight: 10}}>
              <Button isLoading={false}
                onPress={() => actions.mainSetSub({ mids: info.id },`${info.name}_${info.id}`, info.subscribe)}
                style={{ borderRadius: 3, height: 20,
                  backgroundColor: info.subscribe ? '#2d6ca2' : '#5bc0de', paddingLeft: 10, paddingRight: 10, borderWidth: 0}} textStyle={{fontSize: 12, color: '#fff'}}>
                {info.subscribe ? '取消通知' : '接收通知' }
              </Button>
            </View>
            <View style={{marginRight: 10}}>
            <Button isLoading={false}
              onPress={() => actions.mainSetFavo({ mids: info.id },`${info.name}_${info.id}`, info.favo)}
              style={{ borderRadius: 3, height: 20,
                backgroundColor: info.favo ? '#2d6ca2' : '#5bc0de', paddingLeft: 10, paddingRight: 10, borderWidth: 0}} textStyle={{fontSize: 12, color: '#fff'}}>
              {info.favo ? '取消收藏' : '收藏' }
              </Button>
            </View>
            <View style={{marginRight: 10}}>
              <Button isLoading={false} style={{ borderRadius: 3, height: 20, backgroundColor: '#5bc0de', paddingLeft: 10, paddingRight: 10, borderWidth: 0}} textStyle={{fontSize: 12, color: '#fff'}}>
                构建
              </Button>
            </View>
          </View>
        </View>
      );
  }
  renderList(list) {
    if (!list) return false;
    return list.map((item, index) => {
      return (
        <View backgroundColor={index%2 === 1 ? '#e8e8e8' : '#F3F3F3'} key={`list-${index}`} style={styles.item}>
          <View>
            <Text>
              # {item.commitNo} {item.commitTime} 生效
            </Text>
          </View>
          <View>
          <Text>
            # {item.commitNo}
            {item.application.updateTime}
            发布
            by {item.application.creatorName}
          </Text>
          </View>
          <View>
            {item.desc ? <Text>{item.desc}</Text> : null}
          </View>
          <View>
            <Button isLoading={false} style={{ marginBottom: 0, borderRadius: 3, height: 30, backgroundColor: '#5bc0de', paddingLeft: 10, paddingRight: 10, borderWidth: 0}} textStyle={{fontSize: 12, color: '#fff'}}>
              安装
            </Button>
          </View>
        </View>
      );
    });
  }
  _navigate(page, type = 'Bottom') {
    const { store, actions, navigator } = this.props;
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
