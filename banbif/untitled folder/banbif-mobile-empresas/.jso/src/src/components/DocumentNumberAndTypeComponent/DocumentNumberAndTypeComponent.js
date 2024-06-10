  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _clipboard = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Style = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _nativeBase = _$$_REQUIRE(_dependencyMap[12]);
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[14]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var DocumentNumberAndType = exports.default = function (_Component) {
    (0, _inherits2.default)(DocumentNumberAndType, _Component);
    function DocumentNumberAndType() {
      (0, _classCallCheck2.default)(this, DocumentNumberAndType);
      return _callSuper(this, DocumentNumberAndType, arguments);
    }
    (0, _createClass2.default)(DocumentNumberAndType, [{
      key: "render",
      value: function render() {
        var _this = this;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, Object.assign({}, this.props, {
          style: _Style.default.view,
          children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Style.default.headerOuterContainer1,
            children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.titleContainer,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  paddingHorizontal: 2,
                  flex: 10
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.titleFont,
                  children: "Nro. de Documento"
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  paddingHorizontal: 3,
                  flex: 2
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  onPress: (0, _asyncToGenerator2.default)(function* () {
                    yield _clipboard.default.setString(_this.props.NrDocument);
                    _nativeBase.Toast.show({
                      title: '¡Número de documento copiado!',
                      buttonText: 'Ok'
                    });
                  }),
                  children: (0, _jsxRuntime.jsx)(_Icon.default, {
                    size: 20,
                    name: "content-copy",
                    family: _Icon.default.MATERIAL_ICONS,
                    style: [_Style.default.blueDollar, {
                      marginLeft: 5
                    }]
                  })
                })
              })]
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                flexDirection: 'row'
              },
              children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.accountFont,
                children: this.props.NrDocument
              })
            })]
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Style.default.headerOuterContainer1,
            children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Style.default.titleContainer,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  paddingHorizontal: 2,
                  flex: 10
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Style.default.titleFont,
                  children: "Tipo de Documento"
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: {
                  paddingHorizontal: 3,
                  flex: 2
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  onPress: (0, _asyncToGenerator2.default)(function* () {
                    yield _clipboard.default.setString(_this.props.DocumentType);
                    _nativeBase.Toast.show({
                      title: '¡Tipo de documento copiado!',
                      buttonText: 'Ok'
                    });
                  }),
                  children: (0, _jsxRuntime.jsx)(_Icon.default, {
                    size: 20,
                    name: "content-copy",
                    family: _Icon.default.MATERIAL_ICONS,
                    style: [_Style.default.blueDollar, {
                      marginLeft: 5
                    }]
                  })
                })
              })]
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                flexDirection: 'row'
              },
              children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Style.default.accountFont,
                children: this.props.DocumentType
              })
            })]
          })]
        }));
      }
    }]);
    return DocumentNumberAndType;
  }(_react.Component);
  DocumentNumberAndType.proptype = {
    NrDocument: _propTypes.default.string,
    DocumentType: _propTypes.default.string
  };
