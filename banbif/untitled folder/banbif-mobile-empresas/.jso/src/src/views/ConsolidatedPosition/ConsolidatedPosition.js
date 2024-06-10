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
  var _ViewContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _IconTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _ProductListItem = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[18]);
  var _storage = _$$_REQUIRE(_dependencyMap[19]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[20]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var height = _reactNative.Dimensions.get("window").height;
  var ConsolidatedPosition = exports.default = function (_Component) {
    (0, _inherits2.default)(ConsolidatedPosition, _Component);
    function ConsolidatedPosition(props) {
      var _this;
      (0, _classCallCheck2.default)(this, ConsolidatedPosition);
      _this = _callSuper(this, ConsolidatedPosition, [props]);
      _this.checkVisibility = function (productType) {
        return _this.state.productTypes.filter(function (p) {
          return productType.agrupation.includes(parseInt(p.codigo)) && parseInt(p.cantSoles) + parseInt(p.cantDolares) + parseInt(p.cantEuro) > 0;
        }).length > 0;
      };
      _this.handleBackButtonPressAndroid = function () {
        _this.setState({
          modalVisible: true
        });
        return true;
      };
      _this.state = {
        spinner: false,
        messages: [],
        size: 0,
        tipo1e2: false,
        allProducts: [{
          key: "1,2",
          agrupation: [1, 2, 21, 22, 23],
          text: "Cuentas Corrientes y de Ahorros",
          route: "ProductName",
          params: {
            title: "CheckingAccountDetails"
          }
        }, {
          key: "24",
          agrupation: [24],
          text: "Depósitos a Plazo Fijo",
          route: "ProductName",
          params: {
            title: "TimeDeposits"
          }
        }, {
          key: "12",
          agrupation: [12],
          text: "Cartas de Crédito",
          route: "ProductName",
          params: {
            title: "CreditLetters"
          }
        }, {
          key: "11",
          agrupation: [11],
          text: "Carta Fianza",
          route: "ProductName",
          params: {
            title: "DepositsOfDeposit"
          }
        }, {
          key: "10",
          agrupation: [10, 41],
          text: "Cobranzas",
          route: "ProductName",
          params: {
            title: "Collections"
          }
        }, {
          key: "42",
          agrupation: [42],
          text: "Cobranzas Importación - Exportación",
          route: "ProductName",
          params: {
            title: "InternationalCollections"
          }
        }, {
          key: "5",
          agrupation: [5],
          text: "Descuentos",
          route: "ProductName",
          params: {
            title: "Discounts"
          }
        }, {
          key: "7",
          agrupation: [7],
          text: "Factoring Eletrónico",
          route: "ProductName",
          params: {
            title: "Factoring"
          }
        }, {
          key: "8",
          agrupation: [8],
          text: "Leasing",
          route: "ProductName",
          params: {
            title: "Leasing"
          }
        }, {
          key: "6",
          agrupation: [6],
          text: "Préstamos",
          route: "ProductName",
          params: {
            title: "Loans"
          }
        }, {
          key: "4",
          agrupation: [4],
          text: "Tarjetas de Crédito",
          route: "ProductName",
          params: {
            title: "CreditCard"
          }
        }],
        productTypes: [],
        filteredProducts: []
      };
      return _this;
    }
    (0, _createClass2.default)(ConsolidatedPosition, [{
      key: "navigationProducts",
      value: function navigationProducts(item) {
        this.props.navigation.navigate(item.route, {
          codigo: item.key,
          descripcion: item.text,
          title: item.params.title,
          tipo1e2: this.state.tipo1e2
        });
      }
    }, {
      key: "messageOk",
      value: function messageOk() {
        this.state.messages.pop();
        this.forceUpdate();
        if (this.state.messages.length == 0) {
          this.props.navigation.navigate("MainMenu");
        }
      }
    }, {
      key: "hasMessage",
      value: function hasMessage(err) {
        return err && err.response && err.response.data && err.response.data.meta && err.response.data.meta.mensajes && err.response.data.meta.mensajes.length > 0;
      }
    }, {
      key: "getConsolidaterPosition",
      value: function () {
        var _getConsolidaterPosition = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            spinner: true,
            size: _spinnerSize.SpinnerSize.get()
          });
          try {
            var user = yield _storage.StorageService.getItem('user');
            var tokenClient = yield _storage.StorageService.getItem('token');
            var response = yield _api.default.get("/api-banca-movil-empresas/v1/productosEmpresa/tiposProductos?codigoIBS=" + user.userId.trim(), {
              headers: {
                'numeroPagina': '1',
                'tokenClient': tokenClient,
                'entidad': user.entidad,
                'nombreUsuario': user.nombreLogin
              }
            });
            this.tirandoValorRepetido(response.data.datos);
            yield this.setState({
              productTypes: response.data.datos,
              spinner: false,
              size: 0
            });
            this.state.messages = [];
          } catch (err) {
            this.handleMessages(err);
          }
          this.setState({
            spinner: false,
            size: 0
          });
        });
        function getConsolidaterPosition() {
          return _getConsolidaterPosition.apply(this, arguments);
        }
        return getConsolidaterPosition;
      }()
    }, {
      key: "tirandoValorRepetido",
      value: function tirandoValorRepetido(response) {
        var tipo1 = "9999123123123";
        var tipo2 = "999991231231231313123123";
        for (var i = 0; response.length > i; i++) {
          if (response[i].codigo == "01") {
            tipo1 = response[i].codigo;
          }
          if (response[i].codigo == "02") {
            tipo2 = response[i].codigo;
          }
          if (tipo1 == tipo2 - 1) {
            this.setState({
              tipo1e2: true
            });
            response[i].codigo = "--";
            tipo2 = "999991231231231313123123";
          }
        }
      }
    }, {
      key: "handleMessages",
      value: function handleMessages(err) {
        if (this.hasMessage(err)) {
          this.state.messages = err.response.data.meta.mensajes;
        } else {
          this.state.messages = [{
            mensaje: _strings.default.messages.error
          }];
        }
      }
    }, {
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.getConsolidaterPosition();
          var allProducts = this.state.allProducts.filter(this.checkVisibility);
          yield this.setState({
            allProducts: allProducts,
            filteredProducts: allProducts
          });
        });
        function UNSAFE_componentWillMount() {
          return _UNSAFE_componentWillMount.apply(this, arguments);
        }
        return UNSAFE_componentWillMount;
      }()
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var searchIcon = {
          family: _Icon.default.IONICONS,
          name: "md-search",
          size: 35,
          style: _Styles.default.searchIcon
        };
        var textInput = {
          placeholder: _strings.default.consolidatedPosition.searchBarPlaceholder,
          style: _Styles.default.searchInput,
          onChangeText: function onChangeText(text) {
            return _this2.filterProducts(text);
          }
        };
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this2.state.messages.length > 0 && i == _this2.state.messages.length - 1,
            Callback: _this2.messageOk.bind(_this2)
          }, message.mensaje);
        });
        return (0, _jsxRuntime.jsxs)(_ViewContainer.default, {
          style: _Styles.default.flex1,
          children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.searchInputContainer,
            children: (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.searchBarContainer,
              children: (0, _jsxRuntime.jsx)(_IconTextInput.default, {
                icon: searchIcon,
                input: textInput
              })
            })
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              height: height - 185
            },
            children: [(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
              style: {
                paddingBottom: this.state.spinner ? 10 : 0
              },
              animating: this.state.spinner,
              size: this.state.size,
              color: _colors.default.lightBlue
            }), (0, _jsxRuntime.jsx)(_reactNative.FlatList, {
              styles: {
                flex: 1
              },
              data: this.state.filteredProducts,
              renderItem: function renderItem(_ref) {
                var item = _ref.item;
                return (0, _jsxRuntime.jsx)(_ProductListItem.default, {
                  onPress: function onPress() {
                    _this2.navigationProducts(item);
                  },
                  children: item.text
                }, item.text);
              },
              ItemSeparatorComponent: function ItemSeparatorComponent() {
                return (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: _Styles.default.separator
                });
              }
            })]
          }), messageViews]
        });
      }
    }, {
      key: "filterProducts",
      value: function filterProducts(text) {
        var array = this.state.allProducts.filter(function (item) {
          return item.text.toLowerCase().includes(text.toLowerCase());
        });
        this.setState({
          filteredProducts: array
        });
      }
    }]);
    return ConsolidatedPosition;
  }(_react.Component);
