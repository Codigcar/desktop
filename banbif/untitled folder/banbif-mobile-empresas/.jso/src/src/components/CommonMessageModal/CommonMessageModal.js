  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.MODAL_TYPES = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeSvg = _$$_REQUIRE(_dependencyMap[5]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _svg = _$$_REQUIRE(_dependencyMap[8]);
  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[10]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var MODAL_TYPES = exports.MODAL_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning'
  };
  var CommonMessageModal = function CommonMessageModal(_ref) {
    var visible = _ref.visible,
      title = _ref.title,
      text = _ref.text,
      callback = _ref.callback,
      buttonText = _ref.buttonText,
      status = _ref.status,
      text1 = _ref.text1;
    var getIcon = function getIcon() {
      switch (status) {
        case MODAL_TYPES.SUCCESS:
          return _svg.successIcon;
        case MODAL_TYPES.ERROR:
          return _svg.errorIcon;
        case MODAL_TYPES.WARNING:
          return _svg.informativeIcon;
        default:
          return _svg.errorIcon;
      }
    };
    return (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
      children: (0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _Styles.default.container,
        children: (0, _jsxRuntime.jsx)(_reactNativeModal.default, {
          isVisible: visible,
          style: _Styles.default.ModalStyle,
          children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
            style: _Styles.default.ShadowContainerStyle,
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.ViewStyle,
              children: [(0, _jsxRuntime.jsx)(_reactNativeSvg.SvgXml, {
                xml: getIcon()
              }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.viewText,
                children: [title && (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Styles.default.title,
                  children: title
                }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  ellipsizeMode: "tail",
                  style: _Styles.default.message,
                  children: text
                }), text1 && (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  ellipsizeMode: "tail",
                  style: _Styles.default.message,
                  children: text1
                })]
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.ViewButtonStyle,
                children: (0, _jsxRuntime.jsx)(_reactNativeLinearGradient.default, {
                  colors: ['#AD96DC', '#20A6FF'],
                  start: {
                    x: 0,
                    y: 0
                  },
                  end: {
                    x: 1,
                    y: 0
                  },
                  style: _Styles.default.linearGradient,
                  children: (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
                    underlayColor: "none",
                    onPress: function onPress() {
                      callback && callback();
                    },
                    children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: _Styles.default.buttonText,
                      children: buttonText
                    })
                  })
                })
              })]
            })
          })
        })
      })
    });
  };
  var _default = exports.default = CommonMessageModal;
  CommonMessageModal.propTypes = {
    status: _propTypes.default.string,
    visible: _propTypes.default.bool,
    title: _propTypes.default.string,
    text: _propTypes.default.string.isRequired,
    buttonText: _propTypes.default.string,
    callback: _propTypes.default.func
  };
  CommonMessageModal.defaultProps = {
    visible: false,
    title: '',
    text: '',
    buttonText: 'Aceptar',
    status: MODAL_TYPES.ERROR,
    callback: function callback() {}
  };
