'use strict';

const host = 'http://toolchain.camera360.com/';

export default {
  host: host,
  getIndex: {
    name: '首页列表',
    method: 'GET',
    url: `${host}apollo/listModule`
  },
  login: {
    name: '登录接口',
    method: 'POST',
    url: `${host}apollo/listModule`
  }
};
