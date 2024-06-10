  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _CurrencyComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _monetaryType = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _monetary = _$$_REQUIRE(_dependencyMap[7]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8]);
  var HeaderGrupoEconomico = function HeaderGrupoEconomico(_ref) {
    var _ref$headerData = _ref.headerData,
      moneda = _ref$headerData.moneda,
      monto = _ref$headerData.monto,
      _ref$headerData$entid = _ref$headerData.entidad,
      entidad = _ref$headerData$entid === undefined ? '' : _ref$headerData$entid,
      title = _ref.title,
      onSelect = _ref.onSelect,
      checkBox = _ref.checkBox,
      onOpen = _ref.onOpen,
      hideLine = _ref.hideLine,
      isOpened = _ref.isOpened;
    return (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: onSelect,
      children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: Object.assign({}, _Styles.default.headerContainer, {
          paddingTop: 15,
          borderTopColor: _colors.default.lightGrey,
          borderTopWidth: hideLine ? 0 : 2
        }),
        children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
          children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: _Styles.default.headerTitle,
            children: title
          })
        }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Styles.default.headerDetailsContainer,
          children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.headerCurrency,
            children: (0, _jsxRuntime.jsx)(_CurrencyComponent.default, {
              moneda: moneda
            })
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.headerDetails,
            children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [_Styles.default.accountFont, {
                color: monto > 0 ? _colors.default.green : _colors.default.red
              }],
              children: _monetaryType.default[moneda] + _monetary.Monetary.format(monto)
            }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
              children: "Entidad: " + entidad.toUpperCase()
            }), (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              onPress: onOpen,
              style: {
                paddingTop: 5,
                paddingBottom: 10
              },
              children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: {
                  color: _colors.default.lightBlue
                },
                children: isOpened ? "Ocultar detalle" : "Ver detalle"
              })
            })]
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.headerCheckbox,
            children: checkBox
          })]
        })]
      })
    });
  };
  var _default = exports.default = HeaderGrupoEconomico;
