'use strict';

import TYPE from '../constants';
import configs from '../configs';
const { GLOBAL } = TYPE;

const { API } = configs;
/**
 * [globalAlertCreate 创建alert信息]
 * @param  {[type]} info [参数]
 * @return {[type]}        [description]
 */
export function globalAlertCreate(info) {
  return {
    type: GLOBAL.GLOBAL_ALERT_CREATE,
    alertInfo: {
      title: info.title,
      message: info.message,
      buttons: [{
        text: '确定',
        onPress: () => {}
      }],
      type: ''
    }
  }
}
/**
 * [globalAlertClean 清楚alert信息]
 * @return {[type]}        [description]
 */
export function globalAlertClean() {
  return {
    type: GLOBAL.GLOBAL_ALERT_CLEAN
  }
}
