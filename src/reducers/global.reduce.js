'use strict';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import TYPE from '../constants';
const { GLOBAL } = TYPE;
const initialState = fromJS({
  alert: {
    title: '',
    message: '',
    buttons: [{
      text: '确定',
      onPress: () => {}
    }],
    type: ''
  }
});

export default createReducer(initialState, {
  [GLOBAL.GLOBAL_ALERT_CREATE]: (state, action) => {
    return state.setIn(['alert'], action.alertInfo)
  },
  [GLOBAL.GLOBAL_ALERT_CLEAN]: (state, action) => {
    return state.setIn(['alert'], {
      alert: {
        title: '',
        message: '',
        buttons: [],
        type: ''
      }
    })
  }
});
