'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-41b6ce9e.js');
var React = require('react');
var PropTypes = require('prop-types');
var tinyInvariant_esm = require('./tiny-invariant.esm-50f7ea43.js');
var constant = require('./constant.js');
var Provider = require('./provider-2573078d.js');
require('rollbar');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var INITIAL_ERROR_STATE = {
  hasError: false,
  error: null
};
var ErrorBoundary = /*#__PURE__*/function (_Component) {
  _rollupPluginBabelHelpers._inherits(ErrorBoundary, _Component);

  var _super = _rollupPluginBabelHelpers._createSuper(ErrorBoundary);

  function ErrorBoundary(props) {
    var _this;

    _rollupPluginBabelHelpers._classCallCheck(this, ErrorBoundary);

    _this = _super.call(this, props);

    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "resetError", function () {
      _this.setState(INITIAL_ERROR_STATE);
    });

    tinyInvariant_esm.invariant(Provider.isValidLevel(props.level), "".concat(props.level, " is not a valid level setting for Rollbar"));
    _this.state = _rollupPluginBabelHelpers._objectSpread2({}, INITIAL_ERROR_STATE);
    return _this;
  }

  _rollupPluginBabelHelpers._createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var _this$props = this.props,
          errorMessage = _this$props.errorMessage,
          extra = _this$props.extra,
          targetLevel = _this$props.level,
          callback = _this$props.callback;
      var custom = Provider.value(extra, {}, error, info);

      var data = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, info), custom);

      var level = Provider.value(targetLevel, constant.LEVEL_ERROR, error, info);
      var rollbar = Provider.getRollbarFromContext(this.context);

      if (!errorMessage) {
        rollbar[level](error, data, callback);
      } else {
        var logMessage = Provider.value(errorMessage, '', error, info);
        rollbar[level](logMessage, error, data, callback);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          hasError = _this$state.hasError,
          error = _this$state.error;
      var _this$props2 = this.props,
          FallbackUI = _this$props2.fallbackUI,
          children = _this$props2.children;

      if (!hasError) {
        return children;
      }

      if (!FallbackUI) {
        return null;
      }

      return /*#__PURE__*/React__default["default"].createElement(FallbackUI, {
        error: error,
        resetError: this.resetError
      });
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        error: error
      };
    }
  }]);

  return ErrorBoundary;
}(React.Component);

_rollupPluginBabelHelpers._defineProperty(ErrorBoundary, "contextType", Provider.Context);

_rollupPluginBabelHelpers._defineProperty(ErrorBoundary, "propTypes", {
  fallbackUI: PropTypes__default["default"].func,
  errorMessage: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].func]),
  extra: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func]),
  level: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].func]),
  callback: PropTypes__default["default"].func,
  children: PropTypes__default["default"].node
});

_rollupPluginBabelHelpers._defineProperty(ErrorBoundary, "defaultProps", {
  level: constant.LEVEL_ERROR
});

exports.ErrorBoundary = ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map
