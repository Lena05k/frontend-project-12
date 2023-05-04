import { useEffect } from 'react';
import { i as invariant } from './tiny-invariant.esm-c1395f98.js';
import { LEVEL_INFO } from './constant.js';
import { useRollbar } from './useRollbar.js';
import { i as isValidLevel } from './provider-df81bf5c.js';
import './_rollupPluginBabelHelpers-b1794394.js';
import 'prop-types';
import 'rollbar';

function useRollbarCaptureEvent(metadata) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LEVEL_INFO;
  invariant(isValidLevel(level), "".concat(level, " is not a valid level setting for Rollbar"));
  var rollbar = useRollbar();
  useEffect(function () {
    rollbar.captureEvent(metadata, level);
  }, [metadata, level, rollbar]);
}

export { useRollbarCaptureEvent };
//# sourceMappingURL=useRollbarCaptureEvent.js.map
