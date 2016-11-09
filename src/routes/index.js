'use strict';
import LoginView from '../views/login.view';
import IndexView from '../views/index.view';
import InfoView from '../views/info.view';
import SetView from '../views/set.view';
import ChatView from '../views/chat.view';

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
  },
  SetView: {
    name: '设置页',
    component: SetView,
  }
  ,
  ChatView: {
    name: '聊天页',
    component: ChatView,
  }
}
