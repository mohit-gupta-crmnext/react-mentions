'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _substyle = require('substyle');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Suggestion = require('./Suggestion');

var _Suggestion2 = _interopRequireDefault(_Suggestion);

var _LoadingIndicator = require('./LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SuggestionsOverlay = function (_Component) {
  (0, _inherits3.default)(SuggestionsOverlay, _Component);

  function SuggestionsOverlay() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SuggestionsOverlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SuggestionsOverlay.__proto__ || (0, _getPrototypeOf2.default)(SuggestionsOverlay)).call.apply(_ref, [this].concat(args))), _this), _this.performRender = function () {
      var _this$props = _this.props,
          suggestions = _this$props.suggestions,
          isLoading = _this$props.isLoading,
          style = _this$props.style,
          onMouseDown = _this$props.onMouseDown;

      // do not show suggestions until there is some data

      if (_utils2.default.countSuggestions(suggestions) === 0 && !isLoading) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, style, {
          onMouseDown: onMouseDown
        }),
        _react2.default.createElement(
          'ul',
          (0, _extends3.default)({
            ref: 'suggestions'
          }, style("list")),
          _this.renderSuggestions()
        ),
        _this.renderLoadingIndicator()
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SuggestionsOverlay, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var suggestions = this.refs.suggestions;

      if (!suggestions || suggestions.offsetHeight >= suggestions.scrollHeight || !this.props.scrollFocusedIntoView) {
        return;
      }

      var scrollTop = suggestions.scrollTop;

      var _suggestions$children = suggestions.children[this.props.focusIndex].getBoundingClientRect(),
          top = _suggestions$children.top,
          bottom = _suggestions$children.bottom;

      var _suggestions$getBound = suggestions.getBoundingClientRect(),
          topContainer = _suggestions$getBound.top;

      top = top - topContainer + scrollTop;
      bottom = bottom - topContainer + scrollTop;

      if (top < scrollTop) {
        suggestions.scrollTop = top;
      } else if (bottom > suggestions.offsetHeight) {
        suggestions.scrollTop = bottom - suggestions.offsetHeight;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          SuggestionsRenderer = _props.suggestionsRenderer,
          restProps = (0, _objectWithoutProperties3.default)(_props, ['suggestionsRenderer']);

      if (SuggestionsRenderer) {
        return _react2.default.createElement(SuggestionsRenderer, (0, _extends3.default)({}, restProps, {
          render: this.performRender
        }));
      }

      return this.performRender();
    }
  }, {
    key: 'renderSuggestions',
    value: function renderSuggestions() {
      var _this2 = this;

      return _utils2.default.getSuggestions(this.props.suggestions).reduce(function (result, _ref2) {
        var suggestions = _ref2.suggestions,
            descriptor = _ref2.descriptor;
        return [].concat((0, _toConsumableArray3.default)(result), (0, _toConsumableArray3.default)(suggestions.map(function (suggestion, index) {
          return _this2.renderSuggestion(suggestion, descriptor, result.length + index);
        })));
      }, []);
    }
  }, {
    key: 'renderSuggestion',
    value: function renderSuggestion(suggestion, descriptor, index) {
      var _this3 = this;

      var id = this.getID(suggestion);
      var isFocused = index === this.props.focusIndex;

      var mentionDescriptor = descriptor.mentionDescriptor,
          query = descriptor.query;


      return _react2.default.createElement(_Suggestion2.default, {
        style: this.props.style("item"),
        key: id,
        id: id,
        ref: isFocused ? "focused" : null,
        query: query,
        index: index,
        descriptor: mentionDescriptor,
        suggestion: suggestion,
        focused: isFocused,
        onClick: function onClick() {
          return _this3.select(suggestion, descriptor);
        },
        onMouseEnter: function onMouseEnter() {
          return _this3.handleMouseEnter(index);
        } });
    }
  }, {
    key: 'getID',
    value: function getID(suggestion) {
      if (suggestion instanceof String) {
        return suggestion;
      }

      return suggestion.id;
    }
  }, {
    key: 'renderLoadingIndicator',
    value: function renderLoadingIndicator() {
      if (!this.props.isLoading) {
        return;
      }

      return _react2.default.createElement(_LoadingIndicator2.default, this.props.style("loadingIndicator"));
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter(index, ev) {
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(index);
      }
    }
  }, {
    key: 'select',
    value: function select(suggestion, descriptor) {
      this.props.onSelect(suggestion, descriptor);
    }
  }]);
  return SuggestionsOverlay;
}(_react.Component);

SuggestionsOverlay.propTypes = {
  suggestions: _propTypes2.default.object.isRequired,
  focusIndex: _propTypes2.default.number,
  scrollFocusedIntoView: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func
};
SuggestionsOverlay.defaultProps = {
  suggestions: {},
  onSelect: function onSelect() {
    return null;
  }
};


var styled = (0, _substyle.defaultStyle)(function (_ref3) {
  var position = _ref3.position;
  return (0, _extends3.default)({
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
    marginTop: 14,
    minWidth: 100
  }, position, {

    list: {
      margin: 0,
      padding: 0,
      listStyleType: "none"
    }
  });
});

exports.default = styled(SuggestionsOverlay);