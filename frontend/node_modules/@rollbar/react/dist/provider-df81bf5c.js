import { _ as _defineProperty, a as _typeof, b as _inherits, c as _createSuper, d as _createClass, e as _classCallCheck } from './_rollupPluginBabelHelpers-b1794394.js';
import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import Rollbar from 'rollbar';
import { i as invariant } from './tiny-invariant.esm-c1395f98.js';
import constants, { LEVEL_DEBUG, LEVEL_CRITICAL } from './constant.js';

var VALID_LEVELS = constants;
function value(val, defaultTo) {
  if (typeof val === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return val.apply(void 0, args);
  }

  return val;
}
function isValidLevel(level) {
  return VALID_LEVELS[level] >= VALID_LEVELS[LEVEL_DEBUG] && VALID_LEVELS[level] <= VALID_LEVELS[LEVEL_CRITICAL];
}
function isRollbarInstance(instance) {
  var _instance$options;

  return !!(instance !== null && instance !== void 0 && (_instance$options = instance.options) !== null && _instance$options !== void 0 && _instance$options.accessToken);
}

var Context = /*#__PURE__*/createContext();
Context.displayName = 'Rollbar';
var RollbarInstance = Symbol('RollbarInstance');
var BaseOptions = Symbol('BaseOptions');
var RollbarCtor = Symbol('RollbarCtor');
function getRollbarFromContext(context) {
  var rollbar = context[RollbarInstance];
  return rollbar;
}
function getRollbarConstructorFromContext(context) {
  var ctor = context[RollbarCtor];
  return ctor;
}
var Provider = /*#__PURE__*/function (_Component) {
  _inherits(Provider, _Component);

  var _super = _createSuper(Provider);

  function Provider(props) {
    var _this;

    _classCallCheck(this, Provider);

    _this = _super.call(this, props);
    var _this$props = _this.props,
        config = _this$props.config,
        _this$props$Rollbar = _this$props.Rollbar,
        ctor = _this$props$Rollbar === void 0 ? Rollbar : _this$props$Rollbar,
        instance = _this$props.instance;
    invariant(!instance || isRollbarInstance(instance), '`instance` must be a configured instance of Rollbar');
    var options = typeof config === 'function' ? config() : config;
    var rollbar = instance || new ctor(options); // TODO: use isUncaught to filter if this is 2nd Provider added
    // unless customer wants that

    _this.state = {
      rollbar: rollbar,
      options: options
    };
    return _this;
  } // componentDidUpdate()


  _createClass(Provider, [{
    key: "render",
    value: function render() {
      var _ref;

      var _this$props2 = this.props,
          children = _this$props2.children,
          _this$props2$Rollbar = _this$props2.Rollbar,
          ctor = _this$props2$Rollbar === void 0 ? Rollbar : _this$props2$Rollbar;
      var _this$state = this.state,
          rollbar = _this$state.rollbar,
          options = _this$state.options;
      return /*#__PURE__*/React.createElement(Context.Provider, {
        value: (_ref = {}, _defineProperty(_ref, RollbarInstance, rollbar), _defineProperty(_ref, BaseOptions, options), _defineProperty(_ref, RollbarCtor, ctor), _ref)
      }, children);
    }
  }]);

  return Provider;
}(Component);

_defineProperty(Provider, "propTypes", {
  Rollbar: PropTypes.func,
  config: function config(props, propName, componentName) {
    if (!props.config && !props.instance) {
      return new Error("One of the required props 'config' or 'instance' must be set for ".concat(componentName, "."));
    }

    if (props.config) {
      var configType = _typeof(props.config);

      if (configType === 'function' || configType === 'object' && !Array.isArray(configType)) {
        return;
      }

      return new Error("".concat(propName, " must be either an Object or a Function"));
    }
  },
  instance: function instance(props, propName, componentName) {
    if (!props.config && !props.instance) {
      return new Error("One of the required props 'config' or 'instance' must be set for ".concat(componentName, "."));
    }

    if (props.instance && !isRollbarInstance(props.instance)) {
      return new Error("".concat(propName, " must be a configured instance of Rollbar"));
    }
  },
  children: PropTypes.node
});

export { BaseOptions as B, Context as C, Provider as P, RollbarInstance as R, RollbarCtor as a, getRollbarConstructorFromContext as b, getRollbarFromContext as g, isValidLevel as i, value as v };
//# sourceMappingURL=provider-df81bf5c.js.map
