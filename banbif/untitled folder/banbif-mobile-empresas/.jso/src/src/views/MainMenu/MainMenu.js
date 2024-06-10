  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _MenuButton = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _storage = _$$_REQUIRE(_dependencyMap[10]);
  var _stringFormat = _$$_REQUIRE(_dependencyMap[11]);
  var _ModalComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _native = _$$_REQUIRE(_dependencyMap[13]);
  var _constants = _$$_REQUIRE(_dependencyMap[14]);
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[16]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var MainMenu = function MainMenu(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)({
        modalVisible: false,
        usuarioNombre: '',
        isSoftToken: null,
        hasSoftToken: false,
        isLogout: false,
        modalVisibleSoftToken: true,
        role: null
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _native.useFocusEffect)(_react.default.useCallback(function () {
      loadStorageData();
      var subscription = _reactNative.BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);
      return function () {
        subscription.remove();
      };
    }, []));
    var loadStorageData = function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        var hasSoftToken = Boolean(yield _storage.StorageService.getItemStorage('hasSoftToken'));
        var user = yield _storage.StorageService.getItem('user');
        var isSoftToken = yield _storage.StorageService.getItem('CLIENTTOKEN');
        setState(function (prevState) {
          return Object.assign({}, prevState, {
            usuarioNombre: _stringFormat.StringUtils.capitalize(user.nombre),
            isSoftToken: isSoftToken,
            role: user.role,
            hasSoftToken: hasSoftToken
          });
        });
      });
      return function loadStorageData() {
        return _ref2.apply(this, arguments);
      };
    }();
    var handleBackButtonPressAndroid = function handleBackButtonPressAndroid() {
      setState(function (prevState) {
        return Object.assign({}, prevState, {
          modalVisible: true
        });
      });
    };
    var toggleModalVisibleSoftToken = function toggleModalVisibleSoftToken() {
      setState(function (prevState) {
        return Object.assign({}, prevState, {
          modalVisibleSoftToken: !prevState.modalVisibleSoftToken
        });
      });
    };
    var mostrarSoftToken = state.isSoftToken && !state.hasSoftToken;
    var content = (0, _jsxRuntime.jsxs)(_reactNative.View, {
      children: [(0, _jsxRuntime.jsxs)(_ShadowContainer.default, {
        style: _Styles.default.headerContainer,
        children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
          children: (0, _jsxRuntime.jsx)(_Icon.default, {
            size: 30,
            name: "person-circle-outline",
            family: _Icon.default.IONICONS,
            style: _Styles.default.blue
          })
        }), (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: _Styles.default.headerOuterContainer,
          children: (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.titleContainer,
            children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.titleFont,
              children: state.usuarioNombre
            })
          })
        })]
      }), (0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          margin: 15
        },
        children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Styles.default.menuLine,
          children: [state.role !== _constants.USER_ROLES.ADMIN && (0, _jsxRuntime.jsx)(_MenuButton.default, {
            onPress: function onPress() {
              return navigation.navigate('ConsolidatedPosition');
            },
            family: _Icon.default.IONICONS,
            icon: "ios-grid",
            text: _strings.default.mainMenu.products
          }), mostrarSoftToken && (0, _jsxRuntime.jsx)(_MenuButton.default, {
            onPress: function onPress() {
              return navigation.navigate('EnrolamientoSoftToken');
            },
            family: _Icon.default.IONICONS,
            icon: "lock-closed",
            text: _strings.default.mainMenu.softtoken
          }), state.role !== '0' && state.role !== _constants.USER_ROLES.ADMIN && (0, _jsxRuntime.jsx)(_MenuButton.default, {
            onPress: function onPress() {
              return navigation.navigate('PendingApprovals');
            },
            family: _Icon.default.IONICONS,
            icon: "ios-notifications",
            text: _strings.default.mainMenu.autorizations
          })]
        })
      }), (0, _jsxRuntime.jsx)(_reactNative.View, {}), mostrarSoftToken && (0, _jsxRuntime.jsx)(_ModalComponent.default, {
        yesButtonAction: function yesButtonAction() {
          toggleModalVisibleSoftToken();
          navigation.navigate('EnrolamientoSoftToken');
        },
        isVisible: state.modalVisibleSoftToken,
        onClose: function onClose() {
          toggleModalVisibleSoftToken();
        },
        textModal: '¿Desea enrolarse al token digital?'
      })]
    });
    var sideBarAndroid = (0, _jsxRuntime.jsx)(_reactNative.View, {
      children: (0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
        style: {
          backgroundColor: 'white',
          height: '100%'
        },
        children: content
      })
    });
    return _reactNative.Platform.OS === 'ios' ? content : sideBarAndroid;
  };
  var _default = exports.default = MainMenu;
