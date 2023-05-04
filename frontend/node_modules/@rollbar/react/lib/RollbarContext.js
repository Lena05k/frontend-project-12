'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-41b6ce9e.js');
var React = require('react');
var PropTypes = require('prop-types');
var Provider = require('./provider-2573078d.js');
require('rollbar');
require('./tiny-invariant.esm-50f7ea43.js');
require('./constant.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var RollbarContext = /*#__PURE__*/function (_Component) {
  _rollupPluginBabelHelpers._inherits(RollbarContext, _Component);

  var _super = _rollupPluginBabelHelpers._createSuper(RollbarContext);

  function RollbarContext(props) {
    var _this;

    _rollupPluginBabelHelpers._classCallCheck(this, RollbarContext);

    _this = _super.call(this, props);

    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "firstRender", true);

    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "changeContext", function () {
      var storePrevious = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var rollbar = Provider.getRollbarFromContext(_this.context);
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

  _rollupPluginBabelHelpers._createClass(RollbarContext, [{
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
      var rollbar = Provider.getRollbarFromContext(this.context);
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

_rollupPluginBabelHelpers._defineProperty(RollbarContext, "propTypes", {
  context: PropTypes__default["default"].string.isRequired,
  onRender: PropTypes__default["default"].bool,
  children: PropTypes__default["default"].node
});

_rollupPluginBabelHelpers._defineProperty(RollbarContext, "defaultProps", {
  onRender: false
});

_rollupPluginBabelHelpers._defineProperty(RollbarContext, "contextType", Provider.Context);

exports.RollbarContext = RollbarContext;
//# sourceMappingURL=RollbarContext.js.map
