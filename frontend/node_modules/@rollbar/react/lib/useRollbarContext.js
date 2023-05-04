'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tinyInvariant_esm = require('./tiny-invariant.esm-50f7ea43.js');
var React = require('react');
var useRollbar = require('./useRollbar.js');
require('./provider-2573078d.js');
require('./_rollupPluginBabelHelpers-41b6ce9e.js');
require('prop-types');
require('rollbar');
require('./constant.js');

// export function useRollbarContext(context) {
//   useRollbarConfiguration({ payload: { context }});
// }
// Complex version will set the context when part of the tree and reset back to original context when removed

function useRollbarContext() {
  var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var isLayout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  tinyInvariant_esm.invariant(typeof ctx === 'string', '`ctx` must be a string');
  var rollbar = useRollbar.useRollbar();
  (isLayout ? React.useLayoutEffect : React.useEffect)(function () {
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

exports.useRollbarContext = useRollbarContext;
//# sourceMappingURL=useRollbarContext.js.map
