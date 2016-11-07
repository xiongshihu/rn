'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { is } from 'immutable';
import {
  Navigator,
  View
} from 'react-native';

import AlertComponent from './components/AlertComponent';
import Loading from './components/Loading';

class App extends Component {
  constructor (props) {
    super(props);
    this.configureScene = this.configureScene.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handerDidFocus = this.handerDidFocus.bind(this);
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
    const globalStore = store.global.toJS();
    const authStore = store.auth.toJS();
    // 初始路由
    const initialRoute = {
      render: globalStore.routes.LoginView
    }
    // 判断是否登录
    if (authStore.user.isLogin) {
      initialRoute.render = globalStore.routes.IndexView;
    }
		return (
      <View style={{flex: 1}}>
        <Navigator
          style={{flex:1}}
          initialRoute={initialRoute}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          onDidFocus={this.handerDidFocus}
        />
        <AlertComponent actions={actions} alertInfo={globalStore.alert} />
      </View>
    );
  }
  configureScene(route, routeStack) {
   if (route.type == 'Bottom') {
     return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
   }
   return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
  }
  renderScene(route, navigator) {
    const { store, actions } = this.props;
    return (<route.render.component
              navigator={navigator}
              store={store}
              actions={actions}
              {...route.passProps}
             />);
  }
  handerDidFocus(route) {
    const { actions } = this.props;
    actions.globalRouteChange(route);
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    store: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions.default, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
