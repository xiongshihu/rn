'use strict';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import TYPE from '../constants';
const { AUTH } = TYPE;
const initialState = fromJS({
  loginName: '',
  loginPassword: '',
  user: {
    isFetching: false,
    token: ''
  }
});

export default createReducer(initialState, {
  [AUTH.AUTH_LOGIN_REQUEST]: (state, action) => {
    return state.setIn(['user', 'isFetching'], true);
  },
  [AUTH.AUTH_LOGIN_FAILURE]: (state, action) => {
    return state.setIn(['user', 'isFetching'], false);
  },
  [AUTH.AUTH_LOGIN_SUCCESS]: (state, action) => {
    return state.setIn(['user'], action.data)
  },
  [AUTH.AUTH_SETNSME]: (state, action) => {
    return state.setIn(['loginName'], action.name)
  },
  [AUTH.AUTH_SETPWD]: (state, action) => {
    return state.setIn(['loginPassword'], action.password)
  }
});
