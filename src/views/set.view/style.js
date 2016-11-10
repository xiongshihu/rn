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
  listWrap: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  list: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    width: 60,
    height: 60
  },
  itemLogo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    height: 60
  },
  TitleWrap: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  Title: {
    fontSize: 18,
  },
  userWrap: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#eee'
  },
  userSet: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  userItemName: {
    flexGrow: 1,
  },
  userItemBtn: {
  },
});
