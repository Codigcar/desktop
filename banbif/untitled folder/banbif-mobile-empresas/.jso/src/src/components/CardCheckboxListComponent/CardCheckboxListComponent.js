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
  var _propTypes = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _HeaderGrupoEconomico = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[13]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var CardCheckboxListComponent = exports.default = function (_Component) {
    (0, _inherits2.default)(CardCheckboxListComponent, _Component);
    function CardCheckboxListComponent(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CardCheckboxListComponent);
      _this = _callSuper(this, CardCheckboxListComponent, [props]);
      _this.state = {
        isChecked: false,
        isOpened: false
      };
      return _this;
    }
    (0, _createClass2.default)(CardCheckboxListComponent, [{
      key: "toggleCheck",
      value: function toggleCheck(isChecked) {
        return (0, _jsxRuntime.jsx)(_Icon.default, {
          size: 25,
          name: isChecked ? 'ios-checkbox' : 'ios-square-outline',
          family: _Icon.default.IONICONS,
          style: isChecked ? _Styles.default.iconBlue : _Styles.default.iconGrey
        });
      }
    }, {
      key: "selectCard",
      value: function selectCard() {
        this.props.onChange(Object.assign(Object.assign({}, this.props), {
          isChecked: !this.state.isChecked
        }));
        this.setState({
          isChecked: !this.state.isChecked
        });
      }
    }, {
      key: "openCard",
      value: function openCard() {
        this.setState({
          isOpened: !this.state.isOpened
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var _this$state = this.state,
          isChecked = _this$state.isChecked,
          isOpened = _this$state.isOpened;
        var _this$props = this.props,
          headerData = _this$props.headerData,
          data = _this$props.data,
          title = _this$props.title,
          flagGrupo = _this$props.flagGrupo,
          hideHeaderLine = _this$props.hideHeaderLine;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, Object.assign({}, this.props, {
          children: [flagGrupo && (0, _jsxRuntime.jsx)(_HeaderGrupoEconomico.default, {
            hideLine: hideHeaderLine,
            headerData: headerData,
            isOpened: isOpened,
            title: title,
            onSelect: this.selectCard.bind(this),
            checkBox: this.toggleCheck(isChecked),
            onOpen: this.openCard.bind(this)
          }), (!flagGrupo || isOpened) && (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.container,
            children: [!flagGrupo && (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              onPress: function onPress() {
                return _this2.selectCard();
              },
              children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.containerTitle,
                children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    width: "87%"
                  },
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.textTitle,
                    ellipsizeMode: "tail",
                    numberOfLines: 2,
                    children: title
                  })
                }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    width: "13%"
                  },
                  children: this.toggleCheck(isChecked)
                })]
              })
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.containerLine,
              children: (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.line
              })
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.containerFlatlist,
              children: (0, _jsxRuntime.jsx)(_reactNative.FlatList, {
                data: data,
                renderItem: function renderItem(_ref) {
                  var item = _ref.item;
                  return (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: {
                      backgroundColor: item.key % 2 == 0 ? _colors.default.listGrey : _colors.default.white,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      height: 40
                    },
                    children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: {
                        flex: 3,
                        paddingLeft: _reactNative.Platform.OS === "ios" ? 15 : 10
                      },
                      children: item.text
                    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: {
                        flex: 3,
                        paddingRight: _reactNative.Platform.OS === "ios" ? 15 : 10
                      },
                      children: item.value
                    })]
                  }, item.value);
                }
              })
            })]
          })]
        }));
      }
    }]);
    return CardCheckboxListComponent;
  }(_react.Component);
  CardCheckboxListComponent.propstype = {
    title: _propTypes.default.string,
    data: _propTypes.default.array
  };
