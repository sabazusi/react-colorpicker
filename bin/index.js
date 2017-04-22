'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactColorPicker = function (_React$Component) {
  _inherits(ReactColorPicker, _React$Component);

  function ReactColorPicker() {
    _classCallCheck(this, ReactColorPicker);

    var _this = _possibleConstructorReturn(this, (ReactColorPicker.__proto__ || Object.getPrototypeOf(ReactColorPicker)).call(this));

    _this.onMouseMove = function (e) {
      if (_this.state.isDragging) {
        var _hsv = {
          s: parseInt(100 * e.nativeEvent.offsetX / 300, 10),
          v: parseInt(100 * (300 - e.nativeEvent.offsetY) / 300, 10)
        };
        _this.setState({
          hsv: Object.assign({}, _this.state.hsv, _hsv)
        });
      }
    };

    _this.onClickPallet = function (e) {
      var hsv = {
        s: parseInt(100 * e.nativeEvent.offsetX / 300, 10),
        v: parseInt(100 * (300 - e.nativeEvent.offsetY) / 300, 10)
      };
      _this.setState({
        hsv: Object.assign({}, _this.state.hsv, hsv)
      });
    };

    _this.onClickHueBar = function (e) {
      _this.setState({
        hsv: Object.assign({}, _this.state.hsv, {
          h: parseInt(360 * e.nativeEvent.offsetX / 300, 10)
        })
      });
    };

    _this.state = {
      isDragging: false,
      hsv: {
        h: 0,
        s: 0,
        v: 0
      }
    };
    return _this;
  }

  _createClass(ReactColorPicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var hsv = this.state.hsv;

      var color = (0, _color2.default)(hsv).hsl().color;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', {
          style: {
            width: 50,
            height: 50,
            backgroundColor: 'hsl(' + color[0] + ', ' + color[1] + '%, ' + color[2] + '%)',
            userSelect: 'none'
          }
        }),
        _react2.default.createElement(
          'div',
          {
            onClick: this.onClickPallet,
            onMouseDown: function onMouseDown() {
              return _this2.setState({ isDragging: true });
            },
            onMouseMove: this.onMouseMove,
            onMouseUp: function onMouseUp() {
              return _this2.setState({ isDragging: false });
            },
            onMouseOut: function onMouseOut() {
              return _this2.setState({ isDragging: false });
            },
            style: {
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              width: 300,
              height: 300,
              backgroundColor: '' + (0, _color2.default)({ h: hsv.h, s: 100, v: 100 }).rgb().string()
            } },
          _react2.default.createElement('span', {
            style: {
              position: 'absolute',
              display: 'block',
              left: 300 * hsv.s / 100 - 2,
              bottom: 300 * hsv.v / 100 - 2,
              width: 4,
              height: 4,
              pointerEvents: 'none',
              border: '2px solid #fff'
            }
          }),
          _react2.default.createElement(
            'div',
            { style: {
                width: 300,
                height: 300,
                background: 'linear-gradient(to right, #fff, rgba(204,154,129,0))'
              } },
            _react2.default.createElement('div', { style: {
                width: 300,
                height: 300,
                background: 'linear-gradient(to top, #000, rgba(204,154,129,0))'
              } })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            onClick: this.onClickHueBar,
            style: {
              cursor: 'pointer',
              position: 'relative',
              width: 300,
              height: 40,
              overflow: 'hidden',
              background: 'linear-gradient(to right, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%)'
            }
          },
          _react2.default.createElement('span', {
            style: {
              left: 300 * hsv.h / 360,
              position: 'absolute',
              width: 1,
              height: 36,
              border: '2px solid #000',
              pointerEvents: 'none',
              backgroundColor: '#fff'
            }
          })
        )
      );
    }
  }]);

  return ReactColorPicker;
}(_react2.default.Component);

exports.default = ReactColorPicker;
module.exports = exports['default'];