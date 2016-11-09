'use strict';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import TYPE from '../constants';
const { MAIN } = TYPE;
const initialState = fromJS({
  index: {
    isFetching: false,
    list: []
  }
});

export default createReducer(initialState, {
  [MAIN.MAIN_LIST_REQUEST]: (state, action) => {
    return state.setIn(['index', 'isFetching'], true);
  },
  [MAIN.MAIN_LIST_FAILURE]: (state, action) => {
    return state.mergeIn(['index'], {
      isFetching: false,
      list: []
    });
  },
  [MAIN.MAIN_LIST_SUCCESS]: (state, action) => {
    return state.mergeIn(['index'], {
      isFetching: false,
      list: action.data.data.list
    });
  }
});
