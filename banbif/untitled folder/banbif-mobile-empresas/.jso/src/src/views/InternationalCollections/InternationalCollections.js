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
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _DetailsComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _BlueLineWithTextComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _enum = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _monetaryType = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _IdCollectionComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[18]);
  var _dateFormat = _$$_REQUIRE(_dependencyMap[19]);
  var _monetary = _$$_REQUIRE(_dependencyMap[20]);
  var _storage = _$$_REQUIRE(_dependencyMap[21]);
  var _EntidadNombre = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[23]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var InternationalCollections = exports.default = function (_Component) {
    (0, _inherits2.default)(InternationalCollections, _Component);
    function InternationalCollections(props) {
      var _this;
      (0, _classCallCheck2.default)(this, InternationalCollections);
      _this = _callSuper(this, InternationalCollections, [props]);
      _this.state = {
        spinner: false,
        size: 0,
        list: true,
        Currency: _this.props.route.params.Currency,
        NrAccount: _this.props.route.params.NrAccount,
        NrCCI: _this.props.route.params.NrCCI,
        Product: _this.props.route.params.Product,
        ProductType: _this.props.route.params.ProductType,
        SaldoActual: _this.props.route.params.SaldoActual,
        SaldoDisponible: _this.props.route.params.SaldoDisponible,
        ProductBankIdentifier: _this.props.route.params.ProductBankIdentifier.toUpperCase(),
        filteredProducts: [],
        messages: []
      };
      return _this;
    }
    (0, _createClass2.default)(InternationalCollections, [{
      key: "hasMessage",
      value: function hasMessage(err) {
        return err && err.response && err.response.data && err.response.data.meta && err.response.data.meta.mensajes && err.response.data.meta.mensajes.length > 0;
      }
    }, {
      key: "handleMessages",
      value: function handleMessages(err) {
        if (this.hasMessage(err)) {
          this.setState({
            messages: err.response.data.meta.mensajes
          });
        } else {
          this.setState({
            messages: [{
              mensaje: _strings.default.messages.error
            }]
          });
        }
      }
    }, {
      key: "hasError",
      value: function hasError(err) {
        return err && err.status != 200 && err.status != 201;
      }
    }, {
      key: "messageOk",
      value: function messageOk() {
        var _messages = this.state.messages;
        _messages.pop();
        this.setState({
          messages: _messages
        });
        if (this.state.messages.length == 0) {
          this.props.navigation.navigate("MainMenu");
        }
      }
    }, {
      key: "getInternationalCollectionsDetails",
      value: function () {
        var _getInternationalCollectionsDetails = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            spinner: true,
            size: _spinnerSize.SpinnerSize.get(),
            list: !this.state.list
          });
          try {
            var user = yield _storage.StorageService.getItem('user');
            var tokenClient = yield _storage.StorageService.getItem('token');
            console.log('Api | Cobranza importacion exportacion-InternationalCollections.js: api-banca-movil-empresas/v1/consultaCuenta/consultas/cobranzas/detalle/producto', this.state.ProductType.codigo, this.state.ProductBankIdentifier);
            var response = yield _api.default.post("api-banca-movil-empresas/v1/consultaCuenta/consultas/cobranzas/detalle/producto", {
              productBankIdentifier: this.state.ProductBankIdentifier,
              tipo: {
                codigo: this.state.ProductType.codigo
              }
            }, {
              headers: {
                'tokenClient': tokenClient,
                'nombreUsuario': user.nombreLogin,
                'entidad': user.entidad
              }
            });
            yield this.setState({
              filteredProducts: [{
                key: "1",
                text: "Fecha de apertura",
                value: _dateFormat.DateFormat.format(response.data.fechaApertura)
              }, {
                key: "2",
                text: "Fecha expiración",
                value: _dateFormat.DateFormat.format(response.data.fechaExpiracion)
              }, {
                key: "3",
                text: "Tipo de cobranza",
                value: _enum.default.tipoCobranza[response.data.tipoCobranza]
              }, {
                key: "4",
                text: "Monto",
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(this.state.SaldoActual)
              }, {
                key: "5",
                text: "Estado",
                value: _enum.default.estado[response.data.estado]
              }, {
                key: "6",
                text: "Moneda",
                value: this.state.Currency
              }, {
                key: "7",
                text: "Número de referencia",
                value: response.data.numeroReferencia
              }, {
                key: "8",
                text: "Cedente",
                value: response.data.cedente
              }, {
                key: "9",
                text: "Beneficiario",
                value: response.data.beneficiario
              }, {
                key: "10",
                text: "Entrega de documentos",
                value: _enum.default.entregaDocumentos[response.data.entregaDocumentos]
              }]
            });
            this.state.messages = [];
          } catch (err) {
            this.handleMessages(err);
          }
          this.setState({
            spinner: false,
            size: 0,
            list: !this.state.list
          });
        });
        function getInternationalCollectionsDetails() {
          return _getInternationalCollectionsDetails.apply(this, arguments);
        }
        return getInternationalCollectionsDetails;
      }()
    }, {
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.getInternationalCollectionsDetails();
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
          children: [(0, _jsxRuntime.jsx)(_IdCollectionComponent.default, {
            NrAccount: this.state.NrAccount
          }), (0, _jsxRuntime.jsx)(_EntidadNombre.default, {
            entidad: this.props.route.params.entidad
          }), (0, _jsxRuntime.jsx)(_BlueLineWithTextComponent.default, {
            Text: _strings.default.accountDetais.details
          }), (0, _jsxRuntime.jsx)(_DetailsComponent.default, {
            filteredProducts: this.state.filteredProducts,
            isvisible: this.state.spinner,
            size: this.state.size,
            list: this.state.list
          }), messageViews]
        });
      }
    }]);
    return InternationalCollections;
  }(_react.Component);
