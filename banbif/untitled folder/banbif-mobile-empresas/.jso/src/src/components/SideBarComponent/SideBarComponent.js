  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _Style = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _storage = _$$_REQUIRE(_dependencyMap[9]);
  var _stringFormat = _$$_REQUIRE(_dependencyMap[10]);
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _navigation = _$$_REQUIRE(_dependencyMap[12]);
  var _native = _$$_REQUIRE(_dependencyMap[13]);
  var _constants = _$$_REQUIRE(_dependencyMap[14]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[15]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var SideBarComponent = function SideBarComponent() {
    var _useState = (0, _react.useState)({
        usuarioNombre: '',
        role: null,
        isSoftToken: null
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isMenuOpen = _useState4[0],
      setMenuOpen = _useState4[1];
    (0, _native.useFocusEffect)(_react.default.useCallback(function () {
      loadStorageData();
    }, []));
    var loadStorageData = function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
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
        return _ref.apply(this, arguments);
      };
    }();
    return (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return setMenuOpen(true);
      },
      children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
        children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            flexDirection: 'row'
          },
          children: (0, _jsxRuntime.jsx)(_Icon.default, {
            size: 35,
            name: "ios-menu",
            family: _Icon.default.IONICONS,
            style: {
              color: _colors.default.white,
              paddingLeft: 15
            }
          })
        }), (0, _jsxRuntime.jsx)(_reactNativeModal.default, {
          isVisible: isMenuOpen,
          animationIn: "fadeInLeft",
          animationOut: "fadeOutLeft",
          style: {
            margin: 0
          },
          children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              backgroundColor: _colors.default.white,
              height: '105%',
              width: '70%'
            },
            children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                flexDirection: 'column',
                height: 77,
                backgroundColor: _colors.default.lightBlue
              }
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: {
                flexDirection: 'column'
              },
              children: [(0, _jsxRuntime.jsxs)(_ShadowContainer.default, {
                style: _Style.default.headerContainer,
                children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    flex: 1
                  },
                  children: (0, _jsxRuntime.jsx)(_Icon.default, {
                    size: 30,
                    name: "person-circle-outline",
                    family: _Icon.default.IONICONS,
                    style: _Style.default.blue
                  })
                }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: [_Style.default.headerOuterContainer, {
                    flex: 4
                  }],
                  children: (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: _Style.default.titleContainer,
                    children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: _Style.default.titleFont,
                      children: state.usuarioNombre
                    })
                  })
                }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    flex: 1
                  },
                  children: (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    onPress: function onPress() {
                      return setMenuOpen(false);
                    },
                    children: (0, _jsxRuntime.jsx)(_Icon.default, {
                      style: _Style.default.blue,
                      family: _Icon.default.ENTYPO,
                      name: "chevron-small-left",
                      size: 45
                    })
                  })
                })]
              }), state.role !== _constants.USER_ROLES.ADMIN && (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: function onPress() {
                  setMenuOpen(false);
                  (0, _navigation.navigate)('ConsolidatedPosition');
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    paddingLeft: 20
                  },
                  children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: {
                      paddingTop: 20,
                      elevation: 1,
                      flexDirection: 'row'
                    },
                    children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                      size: 50,
                      name: "ios-grid",
                      family: _Icon.default.IONICONS,
                      style: {
                        color: _colors.default.lightBlue
                      }
                    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: {
                        paddingLeft: 20,
                        alignSelf: 'center',
                        flex: 1
                      },
                      children: "Mis Productos"
                    })]
                  })
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: function onPress() {
                  (0, _navigation.navigate)('EnrolamientoSoftToken');
                  setMenuOpen(false);
                },
                children: state.role !== '0' && !state.hasSoftToken && state.isSoftToken && (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    paddingLeft: 20
                  },
                  children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: {
                      paddingTop: 20,
                      elevation: 1,
                      flexDirection: 'row'
                    },
                    children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                      size: 50,
                      name: "lock-closed",
                      family: _Icon.default.IONICONS,
                      style: {
                        color: _colors.default.lightBlue
                      }
                    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: {
                        paddingLeft: 20,
                        alignSelf: 'center',
                        flex: 1
                      },
                      ellipsizeMode: "tail",
                      children: "Enrolamiento Al Token Digital"
                    })]
                  })
                })
              }), state.role !== _constants.USER_ROLES.ADMIN && (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: function onPress() {
                  (0, _navigation.navigate)('PendingApprovals');
                  setMenuOpen(false);
                },
                children: state.role !== '0' && (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    paddingLeft: 20
                  },
                  children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: {
                      paddingTop: 20,
                      elevation: 1,
                      flexDirection: 'row'
                    },
                    children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                      size: 50,
                      name: "ios-notifications",
                      family: _Icon.default.IONICONS,
                      style: {
                        color: _colors.default.lightBlue
                      }
                    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: {
                        paddingLeft: 20,
                        alignSelf: 'center',
                        flex: 1
                      },
                      ellipsizeMode: "tail",
                      children: "Aprobaciones Pendientes"
                    })]
                  })
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: function onPress() {
                  (0, _navigation.navigate)('FrequentQuestions');
                  setMenuOpen(false);
                },
                children: (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: {
                    paddingLeft: 20
                  },
                  children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: {
                      paddingTop: 15,
                      elevation: 1,
                      flexDirection: 'row'
                    },
                    children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                      size: 50,
                      name: "help-outline",
                      family: _Icon.default.IONICONS,
                      style: {
                        color: _colors.default.lightBlue
                      }
                    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: {
                        paddingLeft: 20,
                        alignSelf: 'center',
                        flex: 1
                      },
                      children: "Preguntas Frecuentes"
                    })]
                  })
                })
              })]
            })]
          })
        })]
      })
    });
  };
  var _default = exports.default = SideBarComponent;
