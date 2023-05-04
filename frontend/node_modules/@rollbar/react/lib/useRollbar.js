'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Provider = require('./provider-2573078d.js');
require('./_rollupPluginBabelHelpers-41b6ce9e.js');
require('prop-types');
require('rollbar');
require('./tiny-invariant.esm-50f7ea43.js');
require('./constant.js');

function useRollbar() {
  var context = React.useContext(Provider.Context);
  return Provider.getRollbarFromContext(context);
}

exports.useRollbar = useRollbar;
//# sourceMappingURL=useRollbar.js.map
