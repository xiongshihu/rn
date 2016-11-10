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
  setSub: {
    name: '接收',
    method: 'GET',
    url: `${host}apollo/submitSubscribe`,
  },
  setUnSub: {
    name: '不接收',
    method: 'GET',
    url: `${host}apollo/submitUnsubscribe`,
  },
  setUnFavo: {
    name: '收藏',
    method: 'GET',
    url: `${host}apollo/submitFavo`,
  },
  setUnFavo: {
    name: '不收藏',
    method: 'GET',
    url: `${host}apollo/submitUnfavo`,
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
