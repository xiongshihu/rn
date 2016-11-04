import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class App extends Component {
  constructor (props) {
    super(props);
    this.handleTest = this.handleTest.bind(this);
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
    const { store } = this.props;
		return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.handleTest}>
          <Text>Button</Text>
        </TouchableHighlight>
        <Text style={styles.welcome}>
          {store.test.get('testInfo') || 'Welcome to React Native!'}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit illllndex.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
  handleTest() {
    const { handleTest } =this.props.actions;
    handleTest(`测试数据: ${(new Date).getTime()}`);
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

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
