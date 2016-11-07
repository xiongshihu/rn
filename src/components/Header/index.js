'use strict';

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import styles from './style.js'

class Header extends Component {
   constructor(props) {
     super(props);
   }
   render() {
     return (
       <View style={styles.container}>
        <View style={styles.headLeft}>
          <TouchableHighlight
            underlayColor={this.props.underlayColor}
            activeOpacity={0.5}
            style={this.props.style}
            onPress={this.props.onPress}
          >
            <View>
              {this.props.leftContent}
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.headContent}>
          <Text style={styles.headTitle}>{this.props.TitleContent}</Text>
        </View>
        <View style={styles.headRight}>
          {this.props.RightContent}
        </View>
       </View>
     );
   }
 }

export default Header;
