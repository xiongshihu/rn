'use strict';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import TYPE from '../constants';
const { MAIN } = TYPE;
const initialState = fromJS({
  showNav: false,
  index: {
    isFetching: false,
    navTab: 0,
    list: []
  },
  info: {

  },
  sub: {

  },
  favo: {

  },
  infoType: 0,
});

export default createReducer(initialState, {
  [MAIN.MAIN_SHOWNAV]: (state, action) => {
    return state.setIn(['showNav'], action.navState || false);
  },
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
    return state.mergeIn(['info'], {
      [action.id]: {
        isFetching: true,
        brief: {},
        list: [],
        sp: 0,
      }
    });
  },
  [MAIN.MAIN_INFO_FAILURE]: (state, action) => {
    return state.mergeIn(['info'], {
      [action.id]: {
        isFetching: false,
        brief: {},
        list: [],
        sp: 0,
      }
    });
  },
  [MAIN.MAIN_INFO_SUCCESS]: (state, action) => {
    return state.mergeIn(['info'], {
      [action.id]: {
        isFetching: false,
        brief: action.data.data.brief,
        list: action.data.data.list,
        sp: action.data.data.sp,
      }
    });
  },
  [MAIN.MAIN_SETSUB_REQUEST]: (state, action) => {
    return state.mergeIn(['sub'], {
      [action.id]: {
        isFetching: true,
      }
    });
  },
  [MAIN.MAIN_SETSUB_FAILURE]: (state, action) => {
    return state.mergeIn(['sub'], {
      [action.id]: {
        isFetching: false,
      }
    });
  },
  [MAIN.MAIN_SETSUB_SUCCESS]: (state, action) => {
    let thatState = state.toJS();
    let list = thatState.index.list || [];
    for(var i = 0; i <= list.length; i++) {
      if(list[i].id === action.params.mids) {
        list[i].subscribe = (list[i].subscribe ? 0 : 1);
        break;
      }
    }
    thatState.index.list = list;
    const test = fromJS(thatState);
    return test.mergeIn(['sub'], {
      [action.id]: {
        isFetching: false,
      }
    });
  },
  [MAIN.MAIN_SETFAVO_REQUEST]: (state, action) => {
    return state.mergeIn(['favo'], {
      [action.id]: {
        isFetching: true,
      }
    });
  },
  [MAIN.MAIN_SETFAVO_FAILURE]: (state, action) => {
    return state.mergeIn(['favo'], {
      [action.id]: {
        isFetching: false,
      }
    });
  },
  [MAIN.MAIN_SETFAVO_SUCCESS]: (state, action) => {
    let thatState = state.toJS();
    let list = thatState.index.list || [];
    thatState.info[action.id].brief.favo = (thatState.info[action.id].brief.favo ? 0 : 1);
    for(var i = 0; i <= list.length; i++) {
      if(list[i].id === action.params.mids) {
        list[i].favo = (list[i].favo ? 0 : 1);
        break;
      }
    }
    thatState.index.list = list;
    const test = fromJS(thatState);
    return test.mergeIn(['favo'], {
      [action.id]: {
        isFetching: false,
      }
    });
  },
  [MAIN.MAIN_SETINFOTAB]: (state, action) => {
    return state.setIn(['infoType'], action.id);
  },
});
