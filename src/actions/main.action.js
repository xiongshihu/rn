'use strict';

import {
  globalAlertCreate,
  globalAlertClean
} from './global.action';
import TYPE from '../constants';
import configs from '../configs';
const { MAIN } = TYPE;

const { API } = configs;
/**
 * [mainGetList 获取首页列表]
 * @param  {[type]} params [参数]
 * @return {[type]}        [description]
 */
export function mainGetList(params) {
  return {
    type: MAIN.MAIN_LIST_REQUEST,
    catFetch: API.getIndex.url,
    catMethod: API.getIndex.method,
    catParams: params,
    callback: (err, data, dispatch, getState) => {
      if (err) {
        dispatch({type: MAIN.MAIN_LIST_FAILURE, massage: err});
        dispatch(globalAlertCreate({
          title: '获取列表失败',
          massage: err + ''
        }));
        return;
      }
      dispatch({type: MAIN.MAIN_LIST_SUCCESS, data});
    }
  }
}

/**
 * [mainGetInfo 获取祥情]
 * @param  {[type]} params [参数]
 * @return {[type]}        [description]
 */
export function mainGetInfo(params) {
  return {
    type: MAIN.MAIN_INFO_REQUEST,
    catFetch: API.getInfo.url,
    catMethod: API.getInfo.method,
    catParams: params,
    callback: (err, data, dispatch, getState) => {
      if (err) {
        dispatch({type: MAIN.MAIN_INFO_FAILURE, massage: err});
        dispatch(globalAlertCreate({
          title: '获取祥情失败',
          massage: err + ''
        }));
        return;
      }
      dispatch({type: MAIN.MAIN_INFO_SUCCESS, data});
    }
  }
}

export function mainSetInfoTab(id) {
  return {
    type: MAIN.MAIN_SETINFOTAB,
    id,
  }
}
