import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { is } from 'immutable';
import {
  NavigatorIOS
} from 'react-native';

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
		return (
      <NavigatorIOS
        initialRoute={{
          component: LoginView,
          title: 'My Initial Scene',
          passProps: {
            ...this.props
          }
        }}
        style={{flex: 1}}
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
