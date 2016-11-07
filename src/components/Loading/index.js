'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Text
} from 'react-native';

class Loading extends Component {
   constructor(props) {
     super(props);
     this.state = {
       fadeAnim: new Animated.Value(0), // init opacity 0
     };
   }
   componentDidMount() {
     Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 1},           // Configuration
     ).start();                // Don't forget start!
   }
   render() {
     return (
       <Animated.View          // Special animatable View
         style={{opacity: this.state.fadeAnim}}> // Binds

       </Animated.View>
     );
   }
 }

export default Loading;
