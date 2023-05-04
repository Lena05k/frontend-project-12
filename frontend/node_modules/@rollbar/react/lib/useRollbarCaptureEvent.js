'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var tinyInvariant_esm = require('./tiny-invariant.esm-50f7ea43.js');
var constant = require('./constant.js');
var useRollbar = require('./useRollbar.js');
var Provider = require('./provider-2573078d.js');
require('./_rollupPluginBabelHelpers-41b6ce9e.js');
require('prop-types');
require('rollbar');

function useRollbarCaptureEvent(metadata) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : constant.LEVEL_INFO;
  tinyInvariant_esm.invariant(Provider.isValidLevel(level), "".concat(level, " is not a valid level setting for Rollbar"));
  var rollbar = useRollbar.useRollbar();
  React.useEffect(function () {
    rollbar.captureEvent(metadata, level);
  }, [metadata, level, rollbar]);
}

exports.useRollbarCaptureEvent = useRollbarCaptureEvent;
//# sourceMappingURL=useRollbarCaptureEvent.js.map
