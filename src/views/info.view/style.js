'use strict';

import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    margin: 0,
    height: 60,
    backgroundColor: '#6de497'
  },
  main: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  infoWrap: {
    flex: 1,
  },
  infoMain: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  infoImages: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  infoLogo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoDesc: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    height: 100
  },
  infoBtnWrap: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  tabWrap: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tabItem: {
    marginRight: 10,
    marginTop: 10,
  },
  list: {

  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  qlWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  qlBg: {

  },
  qlImages: {
    width: 240,
    height: 240,
    zIndex: 1000,
    margin: 0,
    backgroundColor: '#fefefe',
    borderWidth: 2,
    borderColor: '#ccc',
  }
});
