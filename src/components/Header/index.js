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
            onPress={this.props.leftOnPress}
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
          <TouchableHighlight
            underlayColor={this.props.underlayColor}
            activeOpacity={0.5}
            onPress={this.props.rightOnPress}
          >
            {this.props.rightContent}
          </TouchableHighlight>
        </View>
       </View>
     );
   }
 }

export default Header;
