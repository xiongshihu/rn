'use strict';

import * as global from './global.action';
import * as auth from './auth.action';
import * as main from './main.action';

export default {
  ...global,
  ...auth,
  ...main
}
