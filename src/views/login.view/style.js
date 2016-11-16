'use strict';

import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoWrap: {
    paddingTop: 102,
    height: 322,
    paddingBottom: 90,
    justifyContent: 'center',
  },
  logoIcon: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
  },
  logoTitle: {
    marginTop: 17,
    textAlign: 'center',
    fontSize: 19,
    color: '#a4f1a0',
  },
  loginFrom: {
    flex: 1,
    marginLeft: 38,
    marginRight: 38,
  },
  iptItem: {
    position: 'relative',
    paddingTop: 25,
    height: 35,
    marginBottom: 28,
    marginRight: 0,
    marginLeft: 0,
  },
  iptLabel: {
    flex: 1,
    position: 'absolute',
    left: 0,
    height: 25,
    zIndex: 3,
  },
  iptContent: {
    position: 'absolute',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    left: 0,
    right: 0,
    bottom: 0,
    height: 35,
    zIndex: 4,
  },
  ipt: {
    marginLeft: 0,
    height: 35,
    marginRight: 0,
    color: '#666666',
  },
  iptItemInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoContent: {
    height: 14,
    fontSize: 14,
    color: '#999999',
  },
});
