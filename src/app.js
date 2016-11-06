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
import LoginView from './views/login.view';

class App extends Component {
  constructor (props) {
    super(props);
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
		return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) => {
          return (
            <View style={{flex: 1}}>
              <LoginView
                {...this.props}
                title={route.title}
                onForward={ () => {
                  const nextIndex = route.index + 1;
                  navigator.push({
                    title: 'Scene ' + nextIndex,
                    index: nextIndex,
                  });
                }}
                onBack={() => {
                  if (route.index > 0) {
                    navigator.pop();
                  }
                }}
              />
              <AlertComponent actions={actions} alertInfo={globalStore.alert} />
            </View>
          )
        }}
      />
    );
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
