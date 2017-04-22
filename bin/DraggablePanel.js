'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraggablePanel = function (_React$Component) {
  _inherits(DraggablePanel, _React$Component);

  function DraggablePanel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DraggablePanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggablePanel.__proto__ || Object.getPrototypeOf(DraggablePanel)).call.apply(_ref, [this].concat(args))), _this), _this.normalizePos = function (x, y) {
      var _this$props = _this.props,
          max = _this$props.max,
          min = _this$props.min;
      var _this$props$styles = _this.props.styles,
          width = _this$props$styles.width,
          height = _this$props$styles.height;

      var convertX = function convertX(value) {
        return parseInt((max.x - min.x) * (value / width), 10) + min.x;
      };
      var convertY = function convertY(value) {
        return parseInt((max.y - min.y) * (value / height), 10) + min.y;
      };
      return {
        x: convertX(Math.min(Math.max(0, x), width)),
        y: convertY(Math.min(Math.max(0, y), height))
      };
    }, _this.updatePosition = function (e) {
      e.preventDefault();

      var _this$props2 = _this.props,
          onChangePosition = _this$props2.onChangePosition,
          styles = _this$props2.styles,
          invertY = _this$props2.invertY;

      var rect = _this.panelRef.getBoundingClientRect();
      var pos = _this.normalizePos(e.clientX - rect.left, invertY ? styles.height - (e.clientY - rect.top) : e.clientY - rect.top);
      onChangePosition(pos.x, pos.y);
    }, _this.startTracking = function (e) {
      document.addEventListener('mousemove', _this.updatePosition);
      document.addEventListener('touchmove', _this.updatePosition);
      document.addEventListener('mouseup', _this.stopTracking);
      document.addEventListener('touchend', _this.stopTracking);
      _this.updatePosition(e);
    }, _this.stopTracking = function () {
      document.removeEventListener('mousemove', _this.updatePosition);
      document.removeEventListener('touchmove', _this.updatePosition);
      document.removeEventListener('mouseup', _this.stopTracking);
      document.removeEventListener('touchend', _this.stopTracking);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraggablePanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.panelRef.getBoundingClientRect();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onChangePosition = _props.onChangePosition,
          styles = _props.styles,
          children = _props.children;


      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref2) {
            return _this2.panelRef = _ref2;
          },
          onMouseDown: this.startTracking,
          style: styles
        },
        children ? children : null
      );
    }
  }]);

  return DraggablePanel;
}(_react2.default.Component);

DraggablePanel.defaultProps = {
  onChangePosition: function onChangePosition() {},
  max: {
    x: 100,
    y: 100
  },
  min: {
    x: 0,
    y: 0
  },
  invertY: false,
  styles: {
    width: 100,
    height: 100
  }
};
exports.default = DraggablePanel;
module.exports = exports['default'];