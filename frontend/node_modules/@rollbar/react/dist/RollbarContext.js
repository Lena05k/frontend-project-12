import { _ as _defineProperty, b as _inherits, c as _createSuper, e as _classCallCheck, f as _assertThisInitialized, d as _createClass } from './_rollupPluginBabelHelpers-b1794394.js';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { g as getRollbarFromContext, C as Context } from './provider-df81bf5c.js';
import 'rollbar';
import './tiny-invariant.esm-c1395f98.js';
import './constant.js';

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
}(Component);

_defineProperty(RollbarContext, "propTypes", {
  context: PropTypes.string.isRequired,
  onRender: PropTypes.bool,
  children: PropTypes.node
});

_defineProperty(RollbarContext, "defaultProps", {
  onRender: false
});

_defineProperty(RollbarContext, "contextType", Context);

export { RollbarContext };
//# sourceMappingURL=RollbarContext.js.map
