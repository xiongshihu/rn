'use strict';

import React, { Component, PropTypes } from 'react';
import { is } from 'immutable';
import moment from 'moment';
import Button from 'apsl-react-native-button';
import Dimensions from 'Dimensions';
import {
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
class IndexView extends Component {
  constructor (props) {
    super(props);
    this._navigate = this._navigate.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderList = this.renderList.bind(this);
    this.handleShowNav = this.handleShowNav.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.handleGetList = this.handleGetList.bind(this);
    this.handleNav = this.handleNav.bind(this);
    const width = Dimensions.get('window').width;
    this.state = {
      navFadeIn: new Animated.Value(- (width - 100)),
    };
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
    this.handleGetList(0);
  }
  componentWillUpdate(nextProps) {
    const { store, actions } = nextProps;
    const globalStore = store.global.toJS();
    const authStore = store.auth.toJS();
    const mainStore = store.main.toJS();
    const width = Dimensions.get('window').width;
    if (!authStore.user.isLogin) {
      this._navigate(globalStore.routes.LoginView)
    }
    this.handleNav(mainStore.showNav);
  }
  render() {
    const { store, actions, navigator } = this.props;
    const globalStore = store.global.toJS();
    const mainStore = store.main.toJS();
    const width = Dimensions.get('window').width;
    const {
      navFadeIn,
      mainFadeIn,
    } = this.state;
		return (
      <Animated.View
        style={[styles.mainWrap, {
          width: width * 2 - 100,
          marginLeft: this.state.navFadeIn,
          backgroundColor: '#000',
        }]}
      >
        {
          /** 渲染导航组件 **/
          this.renderNav()
        }
        {
          /** 渲染主页 **/
          this.renderMain()
        }
      </Animated.View>
    );
  }
  renderNav() {
    const width = Dimensions.get('window').width;
    return (
        <View
          style={[styles.indexNav,
            {
              width: width - 100
            }
          ]}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              <View style={styles.navItem}>
                <Button style={styles.navBtn}
                  onPress={ () => this.handleGetList(0) }
                >
                  全部
                </Button>
              </View>
              <View style={styles.navItem}>
                <Button style={styles.navBtn}
                  onPress={ () => this.handleGetList(1) }
                >
                  收藏
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
    );
  }
  renderMain() {
    const { store, actions, navigator } = this.props;
    const globalStore = store.global.toJS();
    const mainStore = store.main.toJS();
    const width = Dimensions.get('window').width;
    const list = mainStore.index.tab === 1 ?
                  mainStore.index.likeList :
                  mainStore.index.allList;
    return (
      <View
        style={[styles.mainContainer, {
          width,
          left: width - 100
        }]}
      >
        {
          mainStore.showNav ? (
            <TouchableOpacity
              style = {styles.modal}
              activeOpacity = {1}
              onPress = { () => this.handleShowNav(false) }
            />
          ) : null
        }
        <View style={styles.header}>
          <Header
            leftContent={<Icon style={{textAlign: 'center'}} name="ios-menu" size={25} color="#fff" />}
            leftOnPress = { () => this.handleShowNav(!mainStore.showNav) }
            rightContent={<Icon style={{textAlign: 'center'}} name="md-settings" size={25} color="#fff" />}
            rightOnPress = { () => this._navigate(globalStore.routes.SetView, 'Normal') }
            TitleContent={mainStore.index.tab === 1 ? '持续集成系统-收藏' : '持续集成系统'}
          />
        </View>
        <View style={styles.main}>
          {
            /** 数据列表  **/
            mainStore.index.isFetching ? this.renderLoading() : null
          }
          <ScrollView>
            {this.renderList(list)}
          </ScrollView>
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
  handleShowNav(navState) {
    const { actions } = this.props;
    actions.mainShowNav(navState);
  }
  handleGetList(tab = 0) {
    const { store, actions } = this.props;
    actions.mainGetList({
      platform: 'ALL',
      tab
    });
    this.handleShowNav(false);
    this.setState({
      fadeIn: new Animated.Value(-200)
    });
  }
  handleNav(has) {
    const width = Dimensions.get('window').width;
    Animated.timing(this.state.navFadeIn, {
      toValue: has ? 0 :  - (width - 100), // 目标值
      duration: 500, // 动画时间
      easing: Easing.linear // 缓动函数
    }).start();
  }
}

IndexView.propTypes = {
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
};

export default IndexView;
