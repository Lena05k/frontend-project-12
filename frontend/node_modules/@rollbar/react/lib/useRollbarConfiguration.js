'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useRollbar = require('./useRollbar.js');
require('react');
require('./provider-2573078d.js');
require('./_rollupPluginBabelHelpers-41b6ce9e.js');
require('prop-types');
require('rollbar');
require('./tiny-invariant.esm-50f7ea43.js');
require('./constant.js');

function useRollbarConfiguration(config) {
  var rollbar = useRollbar.useRollbar();
  rollbar.configure(config);
}

exports.useRollbarConfiguration = useRollbarConfiguration;
//# sourceMappingURL=useRollbarConfiguration.js.map
