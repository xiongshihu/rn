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
 * @param  {[type]} id [参数]
 * @return {[type]}        [description]
 */
export function mainGetInfo(params, id) {
  return {
    type: MAIN.MAIN_INFO_REQUEST,
    catFetch: API.getInfo.url,
    catMethod: API.getInfo.method,
    catParams: params,
    id,
    callback: (err, data, dispatch, getState) => {
      if (err) {
        dispatch({type: MAIN.MAIN_INFO_FAILURE, massage: err, id});
        dispatch(globalAlertCreate({
          title: '获取祥情失败',
          massage: err + ''
        }));
        return;
      }
      dispatch({type: MAIN.MAIN_INFO_SUCCESS, data, id});
    }
  }
}

/**
 * [mainSetSub 设置接收通知]
 * @param  {[type]} params [参数]
 * @param  {[type]} id [参数]
 * @param  {[type]} t [参数]
 * @return {[type]}        [description]
 */
export function mainSetSub(params, id, subscribe) {
  return {
    type: MAIN.MAIN_SETSUB_REQUEST,
    catFetch: subscribe ? API.setUnSub.url : API.setSub.url,
    catMethod: subscribe ? API.setUnSub.method : API.setSub.method,
    catParams: params,
    id,
    callback: (err, data, dispatch, getState) => {
      if (err) {
        dispatch({type: MAIN.MAIN_SETSUB_FAILURE, massage: err, params, id});
        dispatch(globalAlertCreate({
          title: '设置失败',
          massage: err + ''
        }));
        return;
      }
      dispatch({type: MAIN.MAIN_SETSUB_SUCCESS, params, data, id});
    }
  }
}

/**
 * [mainSetFavo 设置是否收藏]
 * @param  {[type]} params [参数]
 * @param  {[type]} id [参数]
 * @param  {[type]} t [参数]
 * @return {[type]}        [description]
 */
export function mainSetFavo(params, id, favo) {
  return {
    type: MAIN.MAIN_SETFAVO_REQUEST,
    catFetch: favo ? API.setUnFavo.url : API.setFavo.url,
    catMethod: favo ? API.setUnFavo.method : API.setFavo.method,
    catParams: params,
    id,
    callback: (err, data, dispatch, getState) => {
      if (err) {
        dispatch({type: MAIN.MAIN_SETFAVO_FAILURE, massage: err, params, id});
        dispatch(globalAlertCreate({
          title: '设置失败',
          massage: err + ''
        }));
        return;
      }
      dispatch({type: MAIN.MAIN_SETFAVO_SUCCESS, params, data, id});
    }
  }
}

export function mainSetInfoTab(id) {
  return {
    type: MAIN.MAIN_SETINFOTAB,
    id,
  }
}
