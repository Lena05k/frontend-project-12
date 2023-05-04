'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-41b6ce9e.js');
var Rollbar = require('rollbar');
var tinyInvariant_esm = require('./tiny-invariant.esm-50f7ea43.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Rollbar__default = /*#__PURE__*/_interopDefaultLegacy(Rollbar);

function historyContext(rollbar) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      formatter = _ref.formatter,
      filter = _ref.filter;

  tinyInvariant_esm.invariant(rollbar instanceof Rollbar__default["default"], 'historyContext must have an instance of Rollbar');
  tinyInvariant_esm.invariant(formatter == null || typeof formatter === 'function', "formatter option must be a function, received ".concat(_rollupPluginBabelHelpers._typeof(formatter), " instead"));
  tinyInvariant_esm.invariant(filter == null || typeof filter === 'function', "filter option must be a function, received ".concat(_rollupPluginBabelHelpers._typeof(filter), " instead")); // v4 of history.listen callback signature is (location, action)
  // v5 of history.listen callback signature is ({ location, action })
  // this implementation translates it to work for both

  return function (v4location, v4action) {
    var action = v4location.action,
        location = v4location.location;

    if (v4action) {
      action = v4action;
      location = v4location;
    }

    if (filter && !filter(location, action)) {
      return;
    }

    var context = formatter ? formatter(location, action) : location.pathname;
    tinyInvariant_esm.invariant(typeof context === 'string', 'formatter must return a string value to set the context');
    rollbar.configure({
      payload: {
        context: context
      }
    });
  };
}

exports.historyContext = historyContext;
//# sourceMappingURL=historyContext.js.map
