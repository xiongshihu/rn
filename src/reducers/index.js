'use strict';

import { combineReducers } from "redux";
import global from './global.reduce';
import auth from './auth.reduce';
import main from './main.reduce';

export default combineReducers({
  global,
  auth,
  main
});
