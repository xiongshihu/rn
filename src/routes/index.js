'use strict';
import LoginView from '../views/login.view';
import IndexView from '../views/index.view';
import InfoView from '../views/info.view';

export default {
  prPage: '',
  nextPage: '',
  thatPage: '',
  LoginView: {
    name: '登录页',
    component: LoginView,
  },
  IndexView: {
    name: '首页',
    component: IndexView,
  },
  InfoView: {
    name: '祥情页',
    component: InfoView,
  }
}
