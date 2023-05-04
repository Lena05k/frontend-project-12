import { useContext } from 'react';
import { C as Context, g as getRollbarFromContext } from './provider-df81bf5c.js';
import './_rollupPluginBabelHelpers-b1794394.js';
import 'prop-types';
import 'rollbar';
import './tiny-invariant.esm-c1395f98.js';
import './constant.js';

function useRollbar() {
  var context = useContext(Context);
  return getRollbarFromContext(context);
}

export { useRollbar };
//# sourceMappingURL=useRollbar.js.map
