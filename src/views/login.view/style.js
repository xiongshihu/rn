'use strict';

import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
  },
  iptItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    marginBottom: 50,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  icon: {
    textAlign: 'center',
    color: "#4F8EF7"
  },
  iptIcon: {
    justifyContent: 'center',
    height: 50,
    width: 40
  },
  ipt: {
    flex: 1,
    height: 50,
  },
  copyrightWrap: {
    marginLeft: 10,
    marginRight: 10
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666'
  }
});
