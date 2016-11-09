'use strict';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import TYPE from '../constants';
const { MAIN } = TYPE;
const initialState = fromJS({
  index: {
    isFetching: false,
    list: []
  },
  info: {
    isFetching: false,
    brief: {},
    list: [],
  },
  infoType: 0,
});

export default createReducer(initialState, {
  [MAIN.MAIN_LIST_REQUEST]: (state, action) => {
    return state.setIn(['index', 'isFetching'], true);
  },
  [MAIN.MAIN_LIST_FAILURE]: (state, action) => {
    return state.mergeIn(['index'], {
      isFetching: false,
      list: [],
    });
  },
  [MAIN.MAIN_LIST_SUCCESS]: (state, action) => {
    return state.mergeIn(['index'], {
      isFetching: false,
      list: action.data.data.list,
    });
  },
  [MAIN.MAIN_INFO_REQUEST]: (state, action) => {
    return state.setIn(['info', 'isFetching'], true);
  },
  [MAIN.MAIN_INFO_FAILURE]: (state, action) => {
    return state.mergeIn(['info'], {
      isFetching: false,
      brief: {},
      list: [],
    });
  },
  [MAIN.MAIN_INFO_SUCCESS]: (state, action) => {
    return state.mergeIn(['info'], {
      isFetching: false,
      brief: action.data.data.brief,
      list: action.data.data.list,
    });
  },
  [MAIN.MAIN_SETINFOTAB]: (state, action) => {
    return state.setIn(['infoType'], action.id);
  },
});
