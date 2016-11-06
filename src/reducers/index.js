'use strict';

import { combineReducers } from "redux";
import auth from './auth.reduce';
import global from './global.reduce';

export default combineReducers({
  auth,
  global
});
