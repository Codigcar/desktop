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
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _DetailsComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _AccountMovementComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _BlueLineWithTextComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _monetaryType = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[18]);
  var _orderBy = _$$_REQUIRE(_dependencyMap[19]);
  var _dateFormat = _$$_REQUIRE(_dependencyMap[20]);
  var _monetary = _$$_REQUIRE(_dependencyMap[21]);
  var _DollarIconNrAccountComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _storage = _$$_REQUIRE(_dependencyMap[23]);
  var _propTypes = _$$_REQUIRE(_dependencyMap[24]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25]));
  var _EntidadNombre = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[27]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var TimeDeposits = exports.default = function (_Component) {
    (0, _inherits2.default)(TimeDeposits, _Component);
    function TimeDeposits(props) {
      var _this;
      (0, _classCallCheck2.default)(this, TimeDeposits);
      _this = _callSuper(this, TimeDeposits, [props]);
      _this.BodyToggle = function (IsToggle) {
        if (IsToggle) {
          return (0, _jsxRuntime.jsx)(_DetailsComponent.default, {
            filteredProducts: _this.state.detailProducts,
            Currency: _this.state.Currency,
            size: _this.state.sizeDetail,
            isvisible: _this.state.spinnerDetail,
            list: _this.state.list
          });
        } else {
          return (0, _jsxRuntime.jsx)(_AccountMovementComponent.default, {
            filteredProducts: _this.state.movementProducts.sort(_orderBy.OrderBy.order('fechaMovimiento')),
            Currency: _this.state.Currency,
            size: _this.state.sizeMovement,
            isvisible: _this.state.spinnerMovement,
            list: _this.state.list,
            nextPage: _this.state.movementsPage,
            onNextPage: _this.onNextPage.bind((0, _assertThisInitialized2.default)(_this))
          });
        }
      };
      _this.state = {
        tokenClient: "",
        blocked: false,
        movementsPage: 1,
        spinnerDetail: false,
        sizeDetail: 0,
        spinnerMovement: false,
        sizeMovement: 0,
        list: true,
        messages: [],
        toggleBody: true,
        Currency: _this.props.route.params.Currency,
        NrAccount: _this.props.route.params.NrAccount,
        NrCCI: _this.props.route.params.NrCCI,
        ProductBankIdentifier: _this.props.route.params.ProductBankIdentifier.toUpperCase(),
        SaldoActual: _this.props.route.params.SaldoActual,
        SaldoDisponible: _this.props.route.params.SaldoDisponible,
        detailProducts: [],
        movementProducts: [],
        user: _propTypes.any
      };
      return _this;
    }
    (0, _createClass2.default)(TimeDeposits, [{
      key: "getTimeDepositsDetails",
      value: function () {
        var _getTimeDepositsDetails = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            spinnerDetail: true,
            sizeDetail: _spinnerSize.SpinnerSize.get(),
            list: !this.state.list
          });
          try {
            console.log('Api | Deposito a plazo fijo-TimeDeposits.js: api-banca-movil-empresas/v1/cuentasAbiertas/consultas/depositos', this.state.ProductBankIdentifier);
            var response = yield _api.default.post("api-banca-movil-empresas/v1/cuentasAbiertas/consultas/depositos", {
              productBankIdentifier: this.state.ProductBankIdentifier
            }, {
              headers: {
                'tokenClient': this.state.tokenClient,
                'nombreUsuario': this.state.user.nombreLogin,
                'entidad': this.state.user.entidad
              }
            });
            yield this.setState({
              detailProducts: [{
                key: "1",
                text: "Saldo de la cuenta",
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(response.data.datos.saldoDeposito)
              }, {
                key: "2",
                text: "Saldo de interés",
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(response.data.datos.interesGanado)
              }, {
                key: "3",
                text: "Interés al vencimiento",
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(response.data.datos.saldoIntereses)
              }, {
                key: "4",
                text: "Fecha de apertura",
                value: _dateFormat.DateFormat.format(response.data.datos.fechaApertura)
              }, {
                key: "5",
                text: "Fecha de vencimiento",
                value: _dateFormat.DateFormat.format(response.data.datos.fechaVencimiento)
              }, {
                key: "6",
                text: "Tasa de interés",
                value: _monetary.Monetary.percentage(response.data.datos.tasaInteres) + "%"
              }]
            });
          } catch (err) {
            this.handleMessages(err);
          }
          this.setState({
            spinnerDetail: false,
            sizeDetail: 0,
            list: !this.state.list
          });
        });
        function getTimeDepositsDetails() {
          return _getTimeDepositsDetails.apply(this, arguments);
        }
        return getTimeDepositsDetails;
      }()
    }, {
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
      key: "setNextPage",
      value: function setNextPage(response) {
        var nextPage = null;
        if (response && response.meta && response.meta.numeroPaginaSiguiente && this.state.movementsPage < response.meta.numeroPaginaSiguiente) {
          nextPage = response.meta.numeroPaginaSiguiente;
        }
        this.setState({
          movementsPage: nextPage
        });
      }
    }, {
      key: "setFirstPage",
      value: function setFirstPage() {
        this.setState({
          movementsPage: 1,
          movementProducts: []
        });
      }
    }, {
      key: "onNextPage",
      value: function onNextPage() {
        this.getTimeDepositisMovements();
      }
    }, {
      key: "getTimeDepositisMovements",
      value: function getTimeDepositisMovements() {
        var _this2 = this;
        var that = this;
        that.setState({
          spinnerMovement: true,
          sizeMovement: _spinnerSize.SpinnerSize.get(),
          list: !this.state.list,
          blocked: true
        });
        _api.default.post("api-banca-movil-empresas/v1/cuentasAbiertas/consultas/depositos/estado", {
          productBankIdentifier: this.state.ProductBankIdentifier,
          ano: new Date().getFullYear().toString().slice(2, 4),
          mes: new Date().getMonth() + 1
        }, {
          headers: {
            numeroPagina: this.state.movementsPage,
            tokenClient: this.state.tokenClient,
            nombreUsuario: this.state.user.nombreLogin
          }
        }).then(function (response) {
          if (that.hasError(response)) {
            that.mensajePersonalizado(err);
            that.setState({
              spinnerMovement: false,
              sizeMovement: 0,
              list: !_this2.state.list
            });
          } else {
            that.setNextPage(response.data);
            var resposta = response.data.datos.map(function (element) {
              return {
                fechaMovimiento: element.fechaVencimiento,
                numeroOperacion: element.numeroDepositoPlazo,
                descripcion: element.descripcion,
                montoMovimiento: _monetary.Monetary.format(element.monto)
              };
            });
            var newMovements = _this2.state.movementProducts;
            newMovements.push.apply(newMovements, (0, _toConsumableArray2.default)(resposta));
            that.setState({
              movementProducts: newMovements,
              spinnerMovement: false,
              sizeMovement: 0,
              list: !_this2.state.list,
              blocked: false
            });
          }
        }).catch(function (err) {
          that.setState({
            spinnerMovement: false,
            sizeMovement: 0,
            list: !_this2.state.list,
            blocked: false
          });
          that.mensajePersonalizado(err);
        });
      }
    }, {
      key: "mensajePersonalizado",
      value: function mensajePersonalizado(err) {
        if (this.hasMessage(err)) {
          if (err.response.data.meta.mensajes[0].mensaje === "¡Registro no encontrado!") {
            messages = [{
              mensaje: "No presenta movimientos en el mes actual"
            }];
          } else {
            messages = err.response.data.meta.mensajes;
          }
          this.setState({
            messages: messages
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
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          var tokenClient = yield _storage.StorageService.getItem('token');
          this.setState({
            tokenClient: tokenClient
          });
          var user = yield _storage.StorageService.getItem('user');
          this.setState({
            user: user
          });
          yield this.getTimeDepositsDetails();
        });
        function UNSAFE_componentWillMount() {
          return _UNSAFE_componentWillMount.apply(this, arguments);
        }
        return UNSAFE_componentWillMount;
      }()
    }, {
      key: "messageOk",
      value: function messageOk() {
        var _messages = this.state.messages;
        _messages.pop();
        this.setState({
          messages: _messages
        });
        if (this.state.messages.length == 0 && this.state.toggleBody) {
          this.props.navigation.navigate("MainMenu");
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this3.state.messages.length > 0 && i == _this3.state.messages.length - 1,
            Callback: _this3.messageOk.bind(_this3)
          }, message.mensaje);
        });
        return (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Styles.default.containerView,
          children: [(0, _jsxRuntime.jsx)(_DollarIconNrAccountComponent.default, {
            NrAccount: this.state.NrAccount
          }), (0, _jsxRuntime.jsx)(_EntidadNombre.default, {
            entidad: this.props.route.params.entidad
          }), (0, _jsxRuntime.jsx)(_BlueLineWithTextComponent.default, {
            Text: this.state.toggleBody == true ? _strings.default.accountDetais.details : _strings.default.accountDetais.movements
          }), this.BodyToggle(this.state.toggleBody), messageViews]
        });
      }
    }]);
    return TimeDeposits;
  }(_react.Component);
