'use strict';

import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
    height: 40
  },
  headLeft: {
    width: 50,
    justifyContent: 'center'
  },
  headContent: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    flexGrow: 1
  },
  headTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
  headRight: {
    width: 50,
    height: 40,
    justifyContent: 'center'
  }
});
