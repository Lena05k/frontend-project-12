import { _ as _defineProperty, b as _inherits, c as _createSuper, e as _classCallCheck, f as _assertThisInitialized, g as _objectSpread2, d as _createClass } from './_rollupPluginBabelHelpers-b1794394.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i as invariant } from './tiny-invariant.esm-c1395f98.js';
import { LEVEL_ERROR } from './constant.js';
import { i as isValidLevel, C as Context, v as value, g as getRollbarFromContext } from './provider-df81bf5c.js';
import 'rollbar';

var INITIAL_ERROR_STATE = {
  hasError: false,
  error: null
};
var ErrorBoundary = /*#__PURE__*/function (_Component) {
  _inherits(ErrorBoundary, _Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "resetError", function () {
      _this.setState(INITIAL_ERROR_STATE);
    });

    invariant(isValidLevel(props.level), "".concat(props.level, " is not a valid level setting for Rollbar"));
    _this.state = _objectSpread2({}, INITIAL_ERROR_STATE);
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var _this$props = this.props,
          errorMessage = _this$props.errorMessage,
          extra = _this$props.extra,
          targetLevel = _this$props.level,
          callback = _this$props.callback;
      var custom = value(extra, {}, error, info);

      var data = _objectSpread2(_objectSpread2({}, info), custom);

      var level = value(targetLevel, LEVEL_ERROR, error, info);
      var rollbar = getRollbarFromContext(this.context);

      if (!errorMessage) {
        rollbar[level](error, data, callback);
      } else {
        var logMessage = value(errorMessage, '', error, info);
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

      return /*#__PURE__*/React.createElement(FallbackUI, {
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
}(Component);

_defineProperty(ErrorBoundary, "contextType", Context);

_defineProperty(ErrorBoundary, "propTypes", {
  fallbackUI: PropTypes.func,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  extra: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  callback: PropTypes.func,
  children: PropTypes.node
});

_defineProperty(ErrorBoundary, "defaultProps", {
  level: LEVEL_ERROR
});

export { ErrorBoundary };
//# sourceMappingURL=ErrorBoundary.js.map
