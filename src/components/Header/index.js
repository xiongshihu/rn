'use strict';

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity
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
          {
            this.props.leftContent ? (
              <TouchableOpacity
                underlayColor='transparent'
                onPress={this.props.leftOnPress}
              >
                <View>
                  {this.props.leftContent}
                </View>
              </TouchableOpacity>
            ) : null
          }
        </View>
        <View style={styles.headContent}>
          <Text style={styles.headTitle}>{this.props.TitleContent}</Text>
        </View>
        <View style={styles.headRight}>
          {
            this.props.rightContent ? (
              <TouchableOpacity
                underlayColor='transparent'
                onPress={this.props.rightOnPress}
              >
                {this.props.rightContent}
              </TouchableOpacity>
            ) : null
          }
        </View>
       </View>
     );
   }
 }

export default Header;
