'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-41b6ce9e.js');
var React = require('react');
var PropTypes = require('prop-types');
var Rollbar = require('rollbar');
var tinyInvariant_esm = require('./tiny-invariant.esm-50f7ea43.js');
var constant = require('./constant.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var Rollbar__default = /*#__PURE__*/_interopDefaultLegacy(Rollbar);

var VALID_LEVELS = constant["default"];
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
  return VALID_LEVELS[level] >= VALID_LEVELS[constant.LEVEL_DEBUG] && VALID_LEVELS[level] <= VALID_LEVELS[constant.LEVEL_CRITICAL];
}
function isRollbarInstance(instance) {
  var _instance$options;

  return !!(instance !== null && instance !== void 0 && (_instance$options = instance.options) !== null && _instance$options !== void 0 && _instance$options.accessToken);
}

var Context = /*#__PURE__*/React.createContext();
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
  _rollupPluginBabelHelpers._inherits(Provider, _Component);

  var _super = _rollupPluginBabelHelpers._createSuper(Provider);

  function Provider(props) {
    var _this;

    _rollupPluginBabelHelpers._classCallCheck(this, Provider);

    _this = _super.call(this, props);
    var _this$props = _this.props,
        config = _this$props.config,
        _this$props$Rollbar = _this$props.Rollbar,
        ctor = _this$props$Rollbar === void 0 ? Rollbar__default["default"] : _this$props$Rollbar,
        instance = _this$props.instance;
    tinyInvariant_esm.invariant(!instance || isRollbarInstance(instance), '`instance` must be a configured instance of Rollbar');
    var options = typeof config === 'function' ? config() : config;
    var rollbar = instance || new ctor(options); // TODO: use isUncaught to filter if this is 2nd Provider added
    // unless customer wants that

    _this.state = {
      rollbar: rollbar,
      options: options
    };
    return _this;
  } // componentDidUpdate()


  _rollupPluginBabelHelpers._createClass(Provider, [{
    key: "render",
    value: function render() {
      var _ref;

      var _this$props2 = this.props,
          children = _this$props2.children,
          _this$props2$Rollbar = _this$props2.Rollbar,
          ctor = _this$props2$Rollbar === void 0 ? Rollbar__default["default"] : _this$props2$Rollbar;
      var _this$state = this.state,
          rollbar = _this$state.rollbar,
          options = _this$state.options;
      return /*#__PURE__*/React__default["default"].createElement(Context.Provider, {
        value: (_ref = {}, _rollupPluginBabelHelpers._defineProperty(_ref, RollbarInstance, rollbar), _rollupPluginBabelHelpers._defineProperty(_ref, BaseOptions, options), _rollupPluginBabelHelpers._defineProperty(_ref, RollbarCtor, ctor), _ref)
      }, children);
    }
  }]);

  return Provider;
}(React.Component);

_rollupPluginBabelHelpers._defineProperty(Provider, "propTypes", {
  Rollbar: PropTypes__default["default"].func,
  config: function config(props, propName, componentName) {
    if (!props.config && !props.instance) {
      return new Error("One of the required props 'config' or 'instance' must be set for ".concat(componentName, "."));
    }

    if (props.config) {
      var configType = _rollupPluginBabelHelpers._typeof(props.config);

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
  children: PropTypes__default["default"].node
});

exports.BaseOptions = BaseOptions;
exports.Context = Context;
exports.Provider = Provider;
exports.RollbarCtor = RollbarCtor;
exports.RollbarInstance = RollbarInstance;
exports.getRollbarConstructorFromContext = getRollbarConstructorFromContext;
exports.getRollbarFromContext = getRollbarFromContext;
exports.isValidLevel = isValidLevel;
exports.value = value;
//# sourceMappingURL=provider-2573078d.js.map
