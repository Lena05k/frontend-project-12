import { i as invariant } from './tiny-invariant.esm-c1395f98.js';
import { useLayoutEffect, useEffect } from 'react';
import { useRollbar } from './useRollbar.js';
import './provider-df81bf5c.js';
import './_rollupPluginBabelHelpers-b1794394.js';
import 'prop-types';
import 'rollbar';
import './constant.js';

// export function useRollbarContext(context) {
//   useRollbarConfiguration({ payload: { context }});
// }
// Complex version will set the context when part of the tree and reset back to original context when removed

function useRollbarContext() {
  var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var isLayout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  invariant(typeof ctx === 'string', '`ctx` must be a string');
  var rollbar = useRollbar();
  (isLayout ? useLayoutEffect : useEffect)(function () {
    var origCtx = rollbar.options.payload.context;
    rollbar.configure({
      payload: {
        context: ctx
      }
    });
    return function () {
      rollbar.configure({
        payload: {
          context: origCtx
        }
      });
    };
  }, [ctx]);
}

export { useRollbarContext };
//# sourceMappingURL=useRollbarContext.js.map
