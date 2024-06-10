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
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _AntDesign = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Entypo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _EvilIcons = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _FontAwesome = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _FontAwesome2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _FontAwesome5Pro = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _Foundation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _Ionicons = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _MaterialIcons = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _MaterialCommunityIcons = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _Zocial = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _SimpleLineIcons = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[20]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var Icon = exports.default = function (_Component) {
    (0, _inherits2.default)(Icon, _Component);
    function Icon() {
      (0, _classCallCheck2.default)(this, Icon);
      return _callSuper(this, Icon, arguments);
    }
    (0, _createClass2.default)(Icon, [{
      key: "render",
      value: function render() {
        switch (this.props.family) {
          case Icon.ANT_DESIGN:
            return (0, _jsxRuntime.jsx)(_AntDesign.default, Object.assign({}, this.props));
          case Icon.ENTYPO:
            return (0, _jsxRuntime.jsx)(_Entypo.default, Object.assign({}, this.props));
          case Icon.EVIL_ICONS:
            return (0, _jsxRuntime.jsx)(_EvilIcons.default, Object.assign({}, this.props));
          case Icon.FONT_AWESOME:
            return (0, _jsxRuntime.jsx)(_FontAwesome.default, Object.assign({}, this.props));
          case Icon.FONT_AWESOME_5:
            return (0, _jsxRuntime.jsx)(_FontAwesome2.default, Object.assign({}, this.props));
          case Icon.FONT_AWESOME_5_PRO:
            return (0, _jsxRuntime.jsx)(_FontAwesome5Pro.default, Object.assign({}, this.props));
          case Icon.FOUNDATION:
            return (0, _jsxRuntime.jsx)(_Foundation.default, Object.assign({}, this.props));
          case Icon.IONICONS:
            return (0, _jsxRuntime.jsx)(_Ionicons.default, Object.assign({}, this.props));
          case Icon.MATERIAL_ICONS:
            return (0, _jsxRuntime.jsx)(_MaterialIcons.default, Object.assign({}, this.props));
          case Icon.MATERIAL_COMMUNITY_ICONS:
            return (0, _jsxRuntime.jsx)(_MaterialCommunityIcons.default, Object.assign({}, this.props));
          case Icon.ZOCIAL:
            return (0, _jsxRuntime.jsx)(_Zocial.default, {});
          case Icon.SIMPLE_LINE_ICONS:
            return (0, _jsxRuntime.jsx)(_SimpleLineIcons.default, Object.assign({}, this.props));
        }
      }
    }]);
    return Icon;
  }(_react.Component);
  Icon.ANT_DESIGN = 'antdesign';
  Icon.ENTYPO = 'entypo';
  Icon.EVIL_ICONS = 'evilicons';
  Icon.FONT_AWESOME = 'fontawesome';
  Icon.FONT_AWESOME_5 = 'fontawesome5';
  Icon.FONT_AWESOME_5_PRO = 'fontawesome5pro';
  Icon.FOUNDATION = "foundation";
  Icon.IONICONS = 'ionicons';
  Icon.MATERIAL_ICONS = 'materialicons';
  Icon.MATERIAL_COMMUNITY_ICONS = 'materialcommunityicons';
  Icon.OCTICONS = 'octicons';
  Icon.ZOCIAL = 'zocial';
  Icon.SIMPLE_LINE_ICONS = 'simplelineicons';
  Icon.propTypes = {
    family: _propTypes.default.string
  };
  Icon.defaultProps = {
    family: Icon.FONT_AWESOME
  };
