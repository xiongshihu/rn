'use strict';

import {
  globalAlertCreate,
  globalAlertClean
} from './global.action';
import TYPE from '../constants';
import configs from '../configs';
const { GLOBAL, AUTH } = TYPE;

const { API } = configs;
/**
 * [authLogin 登录]
 * @param  {[type]} params [参数]
 * @return {[type]}        [description]
 */
export function authLogin(params) {
  return {
    type: AUTH.AUTH_LOGIN_REQUEST,
    catFetch: API.login.url,
    catMethod: API.login.method,
    catParams: params,
    callback: (err, data, dispatch, getState) => {
      if (err) {
        dispatch({type: AUTH.AUTH_LOGIN_FAILURE, massage: err});
        dispatch(globalAlertCreate({
          title: '登录错误',
          massage: err
        }));
        return;
      }
      dispatch({type: AUTH.AUTH_LOGIN_SUCCESS, data});
    }
  }
}
/**
 * [authSetName 登录名称]
 * @param  {[type]} params [参数]
 * @return {[type]}        [description]
 */
export function authSetName(params) {
  return {
    type: AUTH.AUTH_SETNSME,
    name: params
  }
}
/**
 * [authSetPwd 登录密码]
 * @param  {[type]} params [参数]
 * @return {[type]}        [description]
 */
export function authSetPwd(params) {
  return {
    type: AUTH.AUTH_SETPWD,
    password: params
  }
}
