(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rollbar'), require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'rollbar', 'react', 'prop-types'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Rollbar = global.Rollbar || {}, global.Rollbar.react = {}), global.Rollbar, global.React, global.PropTypes));
})(this, (function (exports, Rollbar, React, PropTypes) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Rollbar__default = /*#__PURE__*/_interopDefaultLegacy(Rollbar);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var _LEVEL_DEBUG$LEVEL_IN;

  var LEVEL_DEBUG = 'debug';
  var LEVEL_INFO = 'info';
  var LEVEL_WARN = 'warn';
  var LEVEL_ERROR = 'error';
  var LEVEL_CRITICAL = 'critical';
  var constants = (_LEVEL_DEBUG$LEVEL_IN = {}, _defineProperty(_LEVEL_DEBUG$LEVEL_IN, LEVEL_DEBUG, 1), _defineProperty(_LEVEL_DEBUG$LEVEL_IN, LEVEL_INFO, 2), _defineProperty(_LEVEL_DEBUG$LEVEL_IN, LEVEL_WARN, 3), _defineProperty(_LEVEL_DEBUG$LEVEL_IN, LEVEL_ERROR, 4), _defineProperty(_LEVEL_DEBUG$LEVEL_IN, LEVEL_CRITICAL, 5), _LEVEL_DEBUG$LEVEL_IN);

  var isProduction = process.env.NODE_ENV === 'production';
  var prefix = 'Invariant failed';
  function invariant(condition, message) {
      if (condition) {
          return;
      }
      if (isProduction) {
          throw new Error(prefix);
      }
      var provided = typeof message === 'function' ? message() : message;
      var value = provided ? prefix + ": " + provided : prefix;
      throw new Error(value);
  }

  function historyContext(rollbar) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        formatter = _ref.formatter,
        filter = _ref.filter;

    invariant(rollbar instanceof Rollbar__default["default"], 'historyContext must have an instance of Rollbar');
    invariant(formatter == null || typeof formatter === 'function', "formatter option must be a function, received ".concat(_typeof(formatter), " instead"));
    invariant(filter == null || typeof filter === 'function', "filter option must be a function, received ".concat(_typeof(filter), " instead")); // v4 of history.listen callback signature is (location, action)
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
      invariant(typeof context === 'string', 'formatter must return a string value to set the context');
      rollbar.configure({
        payload: {
          context: context
        }
      });
    };
  }

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

  var Context = /*#__PURE__*/React.createContext();
  Context.displayName = 'Rollbar';
  var RollbarInstance = Symbol('RollbarInstance');
  var BaseOptions = Symbol('BaseOptions');
  var RollbarCtor = Symbol('RollbarCtor');
  function getRollbarFromContext(context) {
    var rollbar = context[RollbarInstance];
    return rollbar;
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
          ctor = _this$props$Rollbar === void 0 ? Rollbar__default["default"] : _this$props$Rollbar,
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
            ctor = _this$props2$Rollbar === void 0 ? Rollbar__default["default"] : _this$props2$Rollbar;
        var _this$state = this.state,
            rollbar = _this$state.rollbar,
            options = _this$state.options;
        return /*#__PURE__*/React__default["default"].createElement(Context.Provider, {
          value: (_ref = {}, _defineProperty(_ref, RollbarInstance, rollbar), _defineProperty(_ref, BaseOptions, options), _defineProperty(_ref, RollbarCtor, ctor), _ref)
        }, children);
      }
    }]);

    return Provider;
  }(React.Component);

  _defineProperty(Provider, "propTypes", {
    Rollbar: PropTypes__default["default"].func,
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
    children: PropTypes__default["default"].node
  });

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

  _defineProperty(ErrorBoundary, "contextType", Context);

  _defineProperty(ErrorBoundary, "propTypes", {
    fallbackUI: PropTypes__default["default"].func,
    errorMessage: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].func]),
    extra: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func]),
    level: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].func]),
    callback: PropTypes__default["default"].func,
    children: PropTypes__default["default"].node
  });

  _defineProperty(ErrorBoundary, "defaultProps", {
    level: LEVEL_ERROR
  });

  var RollbarContext = /*#__PURE__*/function (_Component) {
    _inherits(RollbarContext, _Component);

    var _super = _createSuper(RollbarContext);

    function RollbarContext(props) {
      var _this;

      _classCallCheck(this, RollbarContext);

      _this = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this), "firstRender", true);

      _defineProperty(_assertThisInitialized(_this), "changeContext", function () {
        var storePrevious = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var rollbar = getRollbarFromContext(_this.context);
        var context = _this.props.context;

        if (storePrevious) {
          _this.setState({
            previousContext: rollbar.options.payload.context
          });
        }

        rollbar.configure({
          payload: {
            context: context
          }
        });
      });

      _this.state = {
        previousContext: null
      };
      return _this;
    }

    _createClass(RollbarContext, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var onRender = this.props.onRender;

        if (!onRender) {
          this.changeContext(true);
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var onRender = this.props.onRender;

        if (!onRender) {
          this.changeContext(false);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var rollbar = getRollbarFromContext(this.context);
        var previousContext = this.state.previousContext;
        rollbar.configure({
          payload: {
            context: previousContext
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var onRender = this.props.onRender;

        if (onRender && this.firstRender) {
          this.changeContext(true);
        }

        this.firstRender = false;
        return this.props.children;
      }
    }]);

    return RollbarContext;
  }(React.Component);

  _defineProperty(RollbarContext, "propTypes", {
    context: PropTypes__default["default"].string.isRequired,
    onRender: PropTypes__default["default"].bool,
    children: PropTypes__default["default"].node
  });

  _defineProperty(RollbarContext, "defaultProps", {
    onRender: false
  });

  _defineProperty(RollbarContext, "contextType", Context);

  function useRollbar() {
    var context = React.useContext(Context);
    return getRollbarFromContext(context);
  }

  function useRollbarConfiguration(config) {
    var rollbar = useRollbar();
    rollbar.configure(config);
  }

  // export function useRollbarContext(context) {
  //   useRollbarConfiguration({ payload: { context }});
  // }
  // Complex version will set the context when part of the tree and reset back to original context when removed

  function useRollbarContext() {
    var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var isLayout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    invariant(typeof ctx === 'string', '`ctx` must be a string');
    var rollbar = useRollbar();
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

  function useRollbarPerson(person) {
    useRollbarConfiguration({
      payload: {
        person: person
      }
    });
  }

  function useRollbarCaptureEvent(metadata) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LEVEL_INFO;
    invariant(isValidLevel(level), "".concat(level, " is not a valid level setting for Rollbar"));
    var rollbar = useRollbar();
    React.useEffect(function () {
      rollbar.captureEvent(metadata, level);
    }, [metadata, level, rollbar]);
  }

  exports.Context = Context;
  exports.ErrorBoundary = ErrorBoundary;
  exports.LEVEL_CRITICAL = LEVEL_CRITICAL;
  exports.LEVEL_DEBUG = LEVEL_DEBUG;
  exports.LEVEL_ERROR = LEVEL_ERROR;
  exports.LEVEL_INFO = LEVEL_INFO;
  exports.LEVEL_WARN = LEVEL_WARN;
  exports.Provider = Provider;
  exports.RollbarContext = RollbarContext;
  exports.getRollbarFromContext = getRollbarFromContext;
  exports.historyContext = historyContext;
  exports.isValidLevel = isValidLevel;
  exports.useRollbar = useRollbar;
  exports.useRollbarCaptureEvent = useRollbarCaptureEvent;
  exports.useRollbarConfiguration = useRollbarConfiguration;
  exports.useRollbarContext = useRollbarContext;
  exports.useRollbarPerson = useRollbarPerson;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=browser.umd.js.map
