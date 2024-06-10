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
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _DetailsComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _BlueLineWithTextComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _monetaryType = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[15]);
  var _dateFormat = _$$_REQUIRE(_dependencyMap[16]);
  var _monetary = _$$_REQUIRE(_dependencyMap[17]);
  var _IdCollectionComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _storage = _$$_REQUIRE(_dependencyMap[19]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _EntidadNombre = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[22]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var Collections = exports.default = function (_Component) {
    (0, _inherits2.default)(Collections, _Component);
    function Collections(props) {
      var _this;
      (0, _classCallCheck2.default)(this, Collections);
      _this = _callSuper(this, Collections, [props]);
      _this.state = {
        spinner: false,
        size: 0,
        list: true,
        Currency: _this.props.route.params.Currency,
        NrAccount: _this.props.route.params.NrAccount,
        entidad: _this.props.route.params.entidad,
        NrCCI: _this.props.route.params.NrCCI,
        ProductBankIdentifier: _this.props.route.params.ProductBankIdentifier.toUpperCase(),
        Product: _this.props.route.params.Product,
        ProductType: _this.props.route.params.ProductType,
        SaldoActual: _this.props.route.params.SaldoActual,
        SaldoDisponible: _this.props.route.params.SaldoDisponible,
        filteredProducts: [],
        messages: []
      };
      return _this;
    }
    (0, _createClass2.default)(Collections, [{
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
      key: "getCollectionsDetails",
      value: function () {
        var _getCollectionsDetails = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            spinner: true,
            size: _spinnerSize.SpinnerSize.get(),
            list: !this.state.list
          });
          try {
            var user = yield _storage.StorageService.getItem('user');
            var tokenClient = yield _storage.StorageService.getItem('token');
            console.log('Api | Cobranza-Collections.js: api-banca-movil-empresas/v1/consultaCuenta/consultas/detalle/descuentos', this.state.ProductType.codigo, this.state.ProductBankIdentifier);
            var response = yield _api.default.post("api-banca-movil-empresas/v1/consultaCuenta/consultas/detalle/descuentos", {
              tipo: {
                codigo: this.state.ProductType.codigo
              },
              productBankIdentifier: this.state.ProductBankIdentifier
            }, {
              headers: {
                'tokenClient': tokenClient,
                'nombreUsuario': user.nombreLogin,
                'entidad': user.entidad
              }
            });
            yield this.setState({
              size: 0,
              spinner: false,
              filteredProducts: [{
                key: "2",
                text: "Fecha de inicio",
                value: _dateFormat.DateFormat.format(response.data.fechaInicio)
              }, {
                key: "3",
                text: "Saldo y moneda",
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(this.state.SaldoActual)
              }, {
                key: "4",
                text: "Intereses",
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(response.data.intereses)
              }, {
                key: "5",
                text: "Fecha de vencimiento",
                value: _dateFormat.DateFormat.format(response.data.fechaVencimiento)
              }, {
                key: "6",
                text: "Tasa de interés",
                value: _monetary.Monetary.percentage(response.data.tasaInteres) + "%"
              }]
            });
            this.state.messages = [];
          } catch (err) {
            console.log('err!!!: ', err);
            this.handleMessages(err);
          }
          this.setState({
            spinner: false,
            size: 0,
            list: !this.state.list
          });
        });
        function getCollectionsDetails() {
          return _getCollectionsDetails.apply(this, arguments);
        }
        return getCollectionsDetails;
      }()
    }, {
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.getCollectionsDetails();
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
            entidad: this.state.entidad
          }), (0, _jsxRuntime.jsx)(_BlueLineWithTextComponent.default, {
            Text: _strings.default.accountDetais.details
          }), (0, _jsxRuntime.jsx)(_DetailsComponent.default, {
            filteredProducts: this.state.filteredProducts,
            size: this.state.size,
            isvisible: this.state.spinner,
            list: this.state.list
          }), messageViews]
        });
      }
    }]);
    return Collections;
  }(_react.Component);
