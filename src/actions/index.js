'use strict';

import * as auth from './auth.action';
import * as global from './global.action';

export default {
  ...auth,
  ...global
}
