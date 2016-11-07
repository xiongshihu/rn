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
    isLogin: true,
    token: 'c360_oa_user_info=MmlNRGFrcWxMVXR2QlFIMURIL2lsdzZTcE9hVUhac2ZQKytDS0U2eDVudFVLdm9ucmtDQWg0ODNveFF5bFE3ZDkva01pRmQwNkk0WWFCQXdKWmxScDczdVc3TmFJaDlFZks5eHUwVnpkb2lHVmhQcndpMVFRN1VDZ0daUmx6VnlDaUxFaTljditRekVTYzlkQUlyQTgxRWt4dzlhMDdKUw%3D%3D; email=hexiao%40camera360.com'
  }
});

export default createReducer(initialState, {
  [AUTH.AUTH_LOGIN_REQUEST]: (state, action) => {
    return state.setIn(['user', 'isFetching'], true);
  },
  [AUTH.AUTH_LOGIN_FAILURE]: (state, action) => {
    const tmpState = state.setIn(['user'], {
      isFetching: false,
      isLogin: false,
      token: ''
    });
    return tmpState;
  },
  [AUTH.AUTH_LOGIN_SUCCESS]: (state, action) => {
    const tmpState = state.setIn(['user'], {
      isFetching: false,
      isLogin: true,
      token: action.token
    });
    return tmpState;
  },
  [AUTH.AUTH_SETNSME]: (state, action) => {
    return state.setIn(['loginName'], action.name)
  },
  [AUTH.AUTH_SETPWD]: (state, action) => {
    return state.setIn(['loginPassword'], action.password)
  }
});
