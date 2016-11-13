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
    backgroundColor: '#b72712'
  },
  main: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#eee',
    flexDirection: 'row'
  },
  listMsg: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#eee'
  },
  itemImages: {
    position: 'relative',
    width: 80,
    height: 80
  },
  itemLogo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    height: 80
  },
  indexNav: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 999,
  },
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  modalContent: {
    position: 'absolute',
    top: 0,
    right: 100,
    bottom: 0,
    left: 0,
    zIndex: 3,
    paddingTop: 50,
    backgroundColor: '#333',
  },
  navBtn: {
    marginBottom: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#eee',
    borderRadius: 0
  },
});
