'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Button = require('./components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  'div',
  { style: { padding: '20px' } },
  _react2.default.createElement(
    'h1',
    null,
    'Test for Compoments'
  ),
  _react2.default.createElement(
    'h2',
    null,
    '\u25A0Logo'
  ),
  _react2.default.createElement(
    'div',
    { style: { display: 'inline-block', background: 'purple' } },
    _react2.default.createElement(
      'div',
      null,
      '\u30FBJust Only print Logo image.',
      _react2.default.createElement(_Logo2.default, null)
    )
  ),
  _react2.default.createElement(
    'h2',
    null,
    '\u25A0Button'
  ),
  _react2.default.createElement(
    'div',
    null,
    '\u30FBApply onClick-attribute Button.',
    _react2.default.createElement(
      _Button2.default,
      { onClick: function onClick() {
          return alert('Clicked!');
        } },
      'Button'
    )
  ),
  _react2.default.createElement(
    'div',
    null,
    '\u30FBApply href-attribute Button.',
    _react2.default.createElement(
      _Button2.default,
      { href: 'http://reactjs.com' },
      'Button'
    )
  ),
  _react2.default.createElement(
    'div',
    null,
    '\u30FBApply className-attribute Button.',
    _react2.default.createElement(
      _Button2.default,
      { className: 'custom' },
      'Button'
    )
  )
), document.getElementById('pad'));