'use strict';
import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { is } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './style';

class TouchableButton extends Component {
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
    console.log(this.props);
    return (
        <TouchableHighlight
          underlayColor={this.props.underlayColor}
          activeOpacity={0.5}
          style={this.props.style}
          onPress={this.props.onPress}
        >
          <View>
            <Icon name="ios-log-in" size={30} color="#4F8EF7" />
            <Text style={{fontSize:16,color:'#fff'}}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
    );
  }
}

export default TouchableButton;
