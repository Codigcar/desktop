  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _assertThisInitialized2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[10]);
  var _ProductNameComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[16]);
  var _storage = _$$_REQUIRE(_dependencyMap[17]);
  var _enum = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _reactNativeLoadingSpinnerOverlay = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _enviroments = _$$_REQUIRE(_dependencyMap[21]);
  var _querystring = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[23]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var ProductName = exports.default = function (_Component) {
    (0, _inherits2.default)(ProductName, _Component);
    function ProductName(props) {
      var _this;
      (0, _classCallCheck2.default)(this, ProductName);
      _this = _callSuper(this, ProductName, [props]);
      _this.ConditionalFooter = function () {
        if (_this.state.productsPage && _this.state.productsPage > 1) {
          return (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: _this.onNextPage.bind((0, _assertThisInitialized2.default)(_this)),
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.pageContainer,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.pageIcon,
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Styles.default.pageIconText,
                  children: "..."
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Styles.default.pageText,
                children: "Ver m\xE1s"
              })]
            })
          });
        } else {
          return (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              height: 100
            }
          });
        }
      };
      _this.title = _this.props.route.params.title;
      _this.state = {
        tipo1e2: false,
        productsPage: 1,
        spinner: false,
        size: 0,
        messages: [],
        filteredProducts: [],
        semRegistros: false,
        load: false
      };
      return _this;
    }
    (0, _createClass2.default)(ProductName, [{
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
      key: "getProducts",
      value: function () {
        var _getProducts = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            spinner: true,
            size: _spinnerSize.SpinnerSize.get(),
            tipo1e2: this.props.route.params.tipo1e2
          });
          if (this.state.productsPage > 1) {
            this.setState({
              spinner: false
            });
            this.setState({
              load: true
            });
          }
          try {
            var _newProducts;
            var tokenClient = yield _storage.StorageService.getItem('token');
            var user = yield _storage.StorageService.getItem('user');
            console.log('this.props.route.params.codigo', this.props.route.params.codigo);
            var response = yield _api.default.get("/api-banca-movil-empresas/v1/productosEmpresa/productos?tipoProducto=" + this.props.route.params.codigo, {
              headers: {
                'entidad': user.entidad,
                'numeroPagina': this.state.productsPage,
                'codigoIBS': user.userId,
                'nombreUsuario': user.nombreLogin,
                'tokenClient': tokenClient
              }
            });
            var products = response.data.datos.map(function (product) {
              var entityId = product.entityId;
              return Object.assign({}, product, {
                entidad: entityId == null ? undefined : entityId.toUpperCase()
              });
            });
            this.state.messages = [];
            this.setNextPage(response);
            var newProducts = this.state.filteredProducts;
            (_newProducts = newProducts).push.apply(_newProducts, (0, _toConsumableArray2.default)(products));
            this.setState({
              filteredProducts: []
            });
            this.setState({
              filteredProducts: newProducts,
              spinner: false,
              size: 0
            });
            newProducts = [];
            this.state.filteredProducts.length == 0 ? this.setState({
              semRegistros: true
            }) : this.setState({
              semRegistros: false
            });
          } catch (err) {
            console.log("api: ", err);
            this.handleMessages(err);
          }
          this.setState({
            spinner: false,
            size: 0,
            load: false
          });
        });
        function getProducts() {
          return _getProducts.apply(this, arguments);
        }
        return getProducts;
      }()
    }, {
      key: "handleMessages",
      value: function handleMessages(err) {
        if (this.hasMessage(err)) {
          this.state.messages = err.response.data.meta.mensajes;
          this.forceUpdate();
        } else {
          this.state.messages = [{
            mensaje: _strings.default.messages.error
          }];
        }
      }
    }, {
      key: "onNextPage",
      value: function onNextPage() {
        this.getProducts();
      }
    }, {
      key: "setNextPage",
      value: function setNextPage(response) {
        var _response$data, _response$data2, _response$data2$meta;
        var nextPage = null;
        console.log('PAGINA SIGUIENTE???', (_response$data = response.data) == null ? undefined : _response$data.meta, response == null ? undefined : (_response$data2 = response.data) == null ? undefined : (_response$data2$meta = _response$data2.meta) == null ? undefined : _response$data2$meta.numeroPaginaSiguiente);
        if (this.state.productsPage != null && response && response.data.meta && response.data.meta.numeroPaginaSiguiente && this.state.productsPage < response.data.meta.numeroPaginaSiguiente) {
          nextPage = response.data.meta.numeroPaginaSiguiente;
        }
        this.setState({
          productsPage: nextPage
        });
      }
    }, {
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.getProducts();
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
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this2.state.messages.length > 0 && i == _this2.state.messages.length - 1,
            Callback: _this2.messageOk.bind(_this2)
          }, message.mensaje);
        });
        return (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Styles.default.container,
          children: [(0, _jsxRuntime.jsx)(_reactNativeLoadingSpinnerOverlay.default, {
            visible: this.state.load,
            textContent: "Cargando...",
            textStyle: {
              color: "#FFF"
            }
          }), !this.state.spinner && !this.state.semRegistros && (0, _jsxRuntime.jsx)(_reactNative.FlatList, {
            data: this.state.filteredProducts,
            keyExtractor: function keyExtractor(item, index) {
              return item.numeroCuenta;
            },
            renderItem: function renderItem(_ref) {
              var item = _ref.item,
                index = _ref.index;
              return (0, _jsxRuntime.jsx)(_ProductNameComponent.default, {
                onPress: function onPress() {
                  _this2.props.navigation.navigate(_this2.title, {
                    NrAccount: item.numero,
                    NrCCI: item.cuentaCCI,
                    ProductBankIdentifier: item.productBankIdentifier.toUpperCase(),
                    Currency: item.monedaIdentificacion,
                    Product: item,
                    ProductType: _this2.props.route.params,
                    SaldoDisponible: item.montoDisponible,
                    SaldoActual: item.saldoActual,
                    LineaAprobada: item.lineaAprobada,
                    DisponibleLinea: item.disponibleLinea,
                    LineaUsada: item.lineaUsada,
                    entidad: item.entidad
                  });
                },
                NrAccount: item.numero,
                NrCCI: item.cuentaCCI,
                ProductType: _enum.default.tipoProducto[_this2.title],
                SaldoDisponible: item.saldoCuentaDisponible,
                SaldoActual: item.saldoActual,
                montoDisponivel: item.montoDisponivel,
                moneda: item.monedaIdentificacion,
                lineaAprobada: item.lineaAprobada,
                disponibleLinea: item.disponibleLinea,
                lineaUsada: item.lineaUsada,
                semRegistros: _this2.state.semRegistros,
                entidad: item.entidad
              }, item.numero);
            },
            ItemSeparatorComponent: function ItemSeparatorComponent() {
              return (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.separator
              });
            },
            ListFooterComponent: this.ConditionalFooter()
          }), !this.state.spinner && this.state.semRegistros && (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.textNotFound,
            children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                fontSize: 15
              },
              children: "Sin registros"
            })
          }), (0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
            style: {
              paddingTop: 30
            },
            animating: this.state.spinner,
            size: this.state.size,
            color: _colors.default.lightBlue
          }), messageViews]
        });
      }
    }]);
    return ProductName;
  }(_react.Component);
