  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _InterleavedListComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[12]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var height = _reactNative.Dimensions.get("window").height;
  var DetailsComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(DetailsComponent, _Component);
    function DetailsComponent() {
      (0, _classCallCheck2.default)(this, DetailsComponent);
      return _callSuper(this, DetailsComponent, arguments);
    }
    (0, _createClass2.default)(DetailsComponent, [{
      key: "render",
      value: function render() {
        return (0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({}, this.props, {
          children: (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.viewContainer,
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [_Styles.default.container],
              children: [(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
                style: {
                  paddingTop: this.props.size != 0 ? 40 : 0
                },
                animating: this.props.isvisible,
                size: this.props.size,
                color: _colors.default.lightBlue
              }), this.props.list && (0, _jsxRuntime.jsx)(_reactNative.FlatList, {
                style: {
                  marginHorizontal: 2,
                  maxHeight: height - 285
                },
                data: this.props.filteredProducts,
                renderItem: function renderItem(_ref) {
                  var item = _ref.item;
                  return (0, _jsxRuntime.jsx)(_InterleavedListComponent.default, {
                    BackgroundColor: item.key % 2 == 0 ? _colors.default.white : _colors.default.listGrey,
                    Text: item.text,
                    Value: item.value,
                    children: item.textDetails
                  }, item.value);
                }
              })]
            })
          })
        }));
      }
    }]);
    return DetailsComponent;
  }(_react.Component);
  DetailsComponent.propstype = {
    filteredProducts: _propTypes.default.array
  };
