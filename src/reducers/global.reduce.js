'use strict';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import routes from '../routes';
import TYPE from '../constants';
const { GLOBAL } = TYPE;
const initialState = fromJS({
  history: [],
  routes,
  alert: {
    title: '',
    message: '',
    buttons: [],
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
  },
  [GLOBAL.GLOBAL_ROUTE_CHANGE]: (state, action) => {
    const history = state.get('history');
    history.push(action.route);
    const tmpState = state.setIn(['history'], history);
    return tmpState;
  }
});
