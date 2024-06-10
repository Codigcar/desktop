  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _MainMenu = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Login = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _ProductName = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CheckingAccountDetails = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _ConsolidatedPosition = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Loans = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _TimeDeposits = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _Leasing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[13]);
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _Logout = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _Logo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _Factoring = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _DepositsOfDeposit = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _InternationalCollections = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _Collections = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));
  var _Discounts = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _LetterCreditLine = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23]));
  var _CrediCard = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[24]));
  var _PendingApprovals = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25]));
  var _EnrolamientoSoftToken = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26]));
  var _EnrolamientoListo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[27]));
  var _EnrolamientoErro = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[28]));
  var _CreditLetters = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[29]));
  var _SoftTokenLogin = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[30]));
  var _IntermediateScreen = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[31]));
  var _images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[32]));
  var _NetworkVerification = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[33]));
  var _FrequentQuestions = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[34]));
  var _native = _$$_REQUIRE(_dependencyMap[35]);
  var _nativeStack = _$$_REQUIRE(_dependencyMap[36]);
  var _navigation = _$$_REQUIRE(_dependencyMap[37]);
  var _auth = _$$_REQUIRE(_dependencyMap[38]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[39]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var Stack = (0, _nativeStack.createNativeStackNavigator)();
  var timeout;
  var TIME_TIMEOUT = 180000;
  var Routes = function Routes() {
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isTimeout = _useState2[0],
      setIsTimeout = _useState2[1];
    var refLogout = (0, _react.createRef)();
    var resetInactivityTimeout = function resetInactivityTimeout() {
      clearTimeout(timeout);
      if (isTimeout) {
        timeout = setTimeout(function () {
          logout(refLogout);
        }, TIME_TIMEOUT);
      }
    };
    var logout = function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (ref) {
        yield _auth.AuthService.doLogout();
        (0, _navigation.navigate)('Login', {
          isTimeout: true
        });
      });
      return function logout(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    var handleStateChange = function handleStateChange() {
      setIsTimeout(true);
    };
    (0, _react.useEffect)(function () {
      timeout = setTimeout(function () {
        if (isTimeout) {
          logout(refLogout);
        }
      }, TIME_TIMEOUT);
      var showSubscription = _reactNative.Keyboard.addListener('keyboardDidShow', function () {
        clearTimeout(timeout);
      });
      var hideSubscription = _reactNative.Keyboard.addListener('keyboardDidHide', function () {
        resetInactivityTimeout();
      });
      return function () {
        clearTimeout(timeout);
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, [isTimeout]);
    var panResponder = _reactNative.PanResponder.create({
      onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture() {
        resetInactivityTimeout();
      },
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        resetInactivityTimeout();
      },
      onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture() {
        resetInactivityTimeout();
      }
    });
    return (0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({}, panResponder.panHandlers, {
      style: {
        flex: 1,
        backgroundColor: 'transparent'
      },
      children: (0, _jsxRuntime.jsx)(_native.NavigationContainer, {
        ref: _navigation.navigationRef,
        onStateChange: handleStateChange,
        children: (0, _jsxRuntime.jsxs)(Stack.Navigator, {
          initialRouteName: "Login",
          children: [(0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "Login",
            component: _Login.default,
            options: {
              headerShown: false
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "NetworkVerification",
            component: _NetworkVerification.default,
            options: {
              headerShown: false
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "SoftTokenLogin",
            component: _SoftTokenLogin.default,
            options: {
              headerShown: false
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "MainMenu",
            component: _MainMenu.default,
            options: function options(_ref2) {
              var navigation = _ref2.navigation,
                route = _ref2.route;
              var altura = 60;
              var imagem = (0, _jsxRuntime.jsx)(_Logo.default, {});
              if (route != null && route.params) {
                var _route$params;
                altura = (_route$params = route.params) == null ? undefined : _route$params.altura;
                imagem = altura == 0 ? (0, _jsxRuntime.jsx)(_reactNative.View, {}) : (0, _jsxRuntime.jsx)(_Logo.default, {});
              }
              return {
                gestureEnabled: false,
                headerTitle: function headerTitle() {
                  return (0, _jsxRuntime.jsx)(_reactNative.Image, {
                    style: {
                      width: 110,
                      height: 30
                    },
                    source: _images.default.logo
                  });
                },
                headerStyle: {
                  backgroundColor: _colors.default.lightBlue,
                  justifyContent: 'center'
                },
                headerBackVisible: false,
                headerTintColor: _colors.default.white,
                headerTitleAlign: 'center',
                headerLeft: function headerLeft() {
                  return imagem;
                },
                headerRight: function headerRight() {
                  return (0, _jsxRuntime.jsx)(_Logout.default, {
                    navigation: navigation
                  });
                }
              };
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "ConsolidatedPosition",
            component: _ConsolidatedPosition.default,
            options: {
              title: _strings.default.consolidatedPosition.title,
              headerStyle: {
                backgroundColor: _colors.default.lightBlue,
                height: 60
              },
              headerTintColor: _colors.default.white,
              headerTitleStyle: {
                alignSelf: 'center',
                fontWeight: 'normal'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.white
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "ProductName",
            component: _ProductName.default,
            options: function options(_ref3) {
              var navigation = _ref3.navigation,
                route = _ref3.route;
              return {
                title: route.params.descripcion,
                headerStyle: {
                  backgroundColor: _colors.default.lightBlue,
                  height: 60
                },
                headerTintColor: _colors.default.white,
                headerTitleStyle: {
                  fontWeight: 'normal',
                  textAlign: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center'
                },
                headerBackTitle: '',
                headerBackImage: function headerBackImage() {
                  return (0, _jsxRuntime.jsx)(_Icon.default, {
                    family: _Icon.default.ENTYPO,
                    name: "chevron-small-left",
                    size: 40,
                    style: {
                      color: _colors.default.white
                    }
                  });
                }
              };
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "CheckingAccountDetails",
            component: _CheckingAccountDetails.default,
            options: {
              title: 'Cuentas Corrientes y de Ahorro',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerCheckingAccountDetailsBackImage: (0, _jsxRuntime.jsx)(_Icon.default, {
                family: _Icon.default.ENTYPO,
                name: "chevron-small-left",
                size: 40,
                style: {
                  color: _colors.default.black
                }
              })
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "CreditCard",
            component: _CrediCard.default,
            options: {
              title: 'Tarjeta de Crédito',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "Loans",
            component: _Loans.default,
            options: {
              title: 'Préstamos',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "TimeDeposits",
            component: _TimeDeposits.default,
            options: {
              title: 'Depósitos a Plazo Fijo',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "Leasing",
            component: _Leasing.default,
            options: {
              title: 'Leasing',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "Factoring",
            component: _Factoring.default,
            options: {
              title: 'Factoring Eletrónico',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "DepositsOfDeposit",
            component: _DepositsOfDeposit.default,
            options: {
              title: 'Carta Fianza',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "InternationalCollections",
            component: _InternationalCollections.default,
            options: {
              title: 'Cobranzas Importación - Exportación',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "Collections",
            component: _Collections.default,
            options: {
              title: 'Cobranzas',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "Discounts",
            component: _Discounts.default,
            options: {
              title: 'Descuentos',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "CreditLetters",
            component: _CreditLetters.default,
            options: {
              title: 'Cartas de Crédito',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "LetterCreditLine",
            component: _LetterCreditLine.default,
            options: {
              title: 'Línea de Crédito de Descuentos',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.black
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "PendingApprovals",
            component: _PendingApprovals.default,
            options: function options(_ref4) {
              var route = _ref4.route;
              return {
                title: 'Aprobaciones Pendientes',
                headerStyle: {
                  backgroundColor: _colors.default.white,
                  height: 60
                },
                headerTintColor: _colors.default.black,
                headerTitleStyle: {
                  fontWeight: 'normal',
                  fontSize: 17,
                  alignSelf: 'center'
                },
                headerBackTitle: '',
                headerBackImage: function headerBackImage() {
                  return (0, _jsxRuntime.jsx)(_Icon.default, {
                    family: _Icon.default.ENTYPO,
                    name: "chevron-small-left",
                    size: 40,
                    style: {
                      color: _colors.default.black
                    }
                  });
                }
              };
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "EnrolamientoSoftToken",
            component: _EnrolamientoSoftToken.default,
            options: {
              title: 'Afiliación Digital',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60,
                borderBottomWidth: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0
                },
                shadowColor: 'transparent',
                elevation: 0
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.lightBlue
                  }
                });
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "EnrolamientoListo",
            component: _EnrolamientoListo.default,
            options: {
              headerShown: false
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "EnrolamientoErro",
            component: _EnrolamientoErro.default,
            options: {
              title: 'Enrolamiento al Token',
              headerStyle: {
                backgroundColor: _colors.default.white,
                height: 60,
                borderBottomWidth: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0
                },
                shadowColor: 'transparent',
                elevation: 0
              },
              headerTintColor: _colors.default.black,
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 17,
                alignSelf: 'center'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_reactNative.View, {});
              }
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "IntermediateScreen",
            component: _IntermediateScreen.default,
            options: {
              headerShown: false
            }
          }), (0, _jsxRuntime.jsx)(Stack.Screen, {
            name: "FrequentQuestions",
            component: _FrequentQuestions.default,
            options: {
              title: _strings.default.frequentQuestions.title,
              headerStyle: {
                backgroundColor: _colors.default.lightBlue,
                height: 60
              },
              headerTintColor: _colors.default.white,
              headerTitleStyle: {
                alignSelf: 'center',
                fontWeight: 'normal'
              },
              headerBackTitle: '',
              headerBackImage: function headerBackImage() {
                return (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.ENTYPO,
                  name: "chevron-small-left",
                  size: 40,
                  style: {
                    color: _colors.default.white
                  }
                });
              }
            }
          })]
        })
      })
    }));
  };
  var _default = exports.default = Routes;
