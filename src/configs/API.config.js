'use strict';
// 开发接口host
const devHost = 'http://localhost:5000/api/mock/';
// 生产接口host
const proHost = 'https://toolchain.camera360.com/';

const host = proHost;

export default {
  host: host,
  getIndex: {
    name: '首页列表',
    method: 'GET',
    url: `${host}apollo/listModule`,
  },
  getInfo: {
    name: '祥情',
    method: 'GET',
    url: `${host}apollo/getModuleDetail`,
  },
  login: {
    name: '登录接口',
    method: 'GET',
    url: `${host}user/publicLogin`,
  },
  logout: {
    name: '登出接口',
    method: 'GET',
    url: `${host}user/logout`,
  },
};
