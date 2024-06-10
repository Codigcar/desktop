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
  var _picker = _$$_REQUIRE(_dependencyMap[11]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _AccountMovementCreditCardComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _BlueLineWithTextComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _CreditCardListComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _DollarIconTextCreditCardComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[21]);
  var _monetary = _$$_REQUIRE(_dependencyMap[22]);
  var _nativeBase = _$$_REQUIRE(_dependencyMap[23]);
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[24]));
  var _storage = _$$_REQUIRE(_dependencyMap[25]);
  var _EntidadNombre = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[27]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  var height = _reactNative.Dimensions.get('window').height;
  var CreditCard = exports.default = function (_Component) {
    (0, _inherits2.default)(CreditCard, _Component);
    function CreditCard(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CreditCard);
      _this = _callSuper(this, CreditCard, [props]);
      _this.MostrarFiltros = function (IsToggle) {
        if (!IsToggle) {
          if (_reactNative.Platform.OS !== 'ios') {
            var _this$state, _this$state$meses;
            return (0, _jsxRuntime.jsx)(_reactNative.View, {
              children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.contentAction,
                children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: _Styles.default.viewTextAction,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.textAction,
                    children: "Seleccione un Mes: "
                  })
                }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: _Styles.default.filterAction,
                  children: (0, _jsxRuntime.jsx)(_picker.Picker, {
                    style: _Styles.default.filterPicker,
                    selectedValue: _this.state.fechaSeleccionada,
                    onValueChange: _this.updateMonth.bind(),
                    children: (_this$state = _this.state) == null ? undefined : (_this$state$meses = _this$state.meses) == null ? undefined : _this$state$meses.map(function (data) {
                      return (0, _jsxRuntime.jsx)(_picker.Picker.Item, {
                        label: data.nombreMes,
                        value: data.ultimoDiaMes
                      }, data.nombreMes);
                    })
                  })
                })]
              })
            });
          } else {
            return (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.contentAction,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.viewTextAction,
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: _Styles.default.textAction,
                  children: "Seleccione un Mes: "
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.filterAction,
                children: (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  onPress: function onPress() {
                    return _this.toggleMonthFilterOptions();
                  },
                  children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: _Styles.default.filterAction,
                    children: [(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                      style: _Styles.default.textFilterAction,
                      children: [" ", _this.state.mesSeleccionado, " "]
                    }), (0, _jsxRuntime.jsx)(_Icon.default, {
                      family: _Icon.default.FONT_AWESOME,
                      name: "calendar",
                      size: 20,
                      style: {
                        color: _colors.default.lightBlue,
                        marginLeft: 5
                      }
                    })]
                  })
                })
              })]
            });
          }
        }
      };
      _this.BodyToggle = function (IsToggle) {
        if (IsToggle) {
          return (0, _jsxRuntime.jsx)(_CreditCardListComponent.default, {
            filteredProducts: _this.state.detailProducts,
            Currency: _this.state.Currency,
            size: _this.state.sizeDetail,
            isvisible: _this.state.spinnerDetails,
            list: _this.state.list
          });
        } else {
          return (0, _jsxRuntime.jsx)(_AccountMovementCreditCardComponent.default, {
            filteredProducts: _this.state.movementProducts,
            Currency: _this.state.Currency,
            size: _this.state.sizeMoviments,
            isvisible: _this.state.spinnerMoviments,
            list: _this.state.list,
            nextPage: _this.state.movementsPage,
            onNextPage: _this.onNextPage.bind((0, _assertThisInitialized2.default)(_this))
          });
        }
      };
      _this.updateMonth = function () {
        var _ref = (0, _asyncToGenerator2.default)(function* (value) {
          var fecha = new Date(value);
          var startDate = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + '01';
          yield _this.setState({
            fechaSeleccionada: value
          });
          yield _this.setFirstPage();
          yield _this.setState({
            fechaInicio: startDate,
            fechaFin: value
          });
          yield _this.getCrediCardMovements();
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
      _this.onClickFilterOption = _this.onClickFilterOption.bind((0, _assertThisInitialized2.default)(_this));
      _this.toggleMonthFilterOptions = _this.toggleMonthFilterOptions.bind((0, _assertThisInitialized2.default)(_this));
      _this.state = {
        blocked: false,
        movementsPage: 0,
        spinnerDetails: false,
        spinnerMoviments: false,
        sizeDetail: 0,
        sizeMoviments: 0,
        list: true,
        messages: [],
        detailProducts: [],
        movementProducts: [],
        toggleBody: true,
        Currency: _this.props.route.params.Currency,
        ProductBankIdentifier: _this.props.route.params.ProductBankIdentifier.toUpperCase(),
        NrAccount: _this.props.route.params.NrAccount,
        NrCCI: _this.props.route.params.NrCCI,
        Product: _this.props.route.params.Product,
        ProductType: _this.props.route.params.ProductType,
        SaldoActual: _this.props.route.params.SaldoActual,
        SaldoDisponible: _this.props.route.params.SaldoDisponible,
        fechaSeleccionada: '',
        fechaInicio: null,
        fechaFin: null,
        mesesIndices: [],
        mesSeleccionado: '',
        indice: '',
        isMonthFilterOpen: false
      };
      return _this;
    }
    (0, _createClass2.default)(CreditCard, [{
      key: "setNextPage",
      value: function setNextPage(response) {
        var nextPage = 1;
        if (response && response.meta && response.meta.numeroPaginaSiguiente && this.state.movementsPage < response.meta.numeroPaginaSiguiente) {
          nextPage = response.meta.numeroPaginaSiguiente;
        }
        this.setState({
          movementsPage: nextPage
        });
      }
    }, {
      key: "setFirstPage",
      value: function () {
        var _setFirstPage = (0, _asyncToGenerator2.default)(function* () {
          yield this.setState({
            movementsPage: 1,
            movementProducts: []
          });
        });
        function setFirstPage() {
          return _setFirstPage.apply(this, arguments);
        }
        return setFirstPage;
      }()
    }, {
      key: "onNextPage",
      value: function () {
        var _onNextPage = (0, _asyncToGenerator2.default)(function* () {
          yield this.getCrediCardMovements();
        });
        function onNextPage() {
          return _onNextPage.apply(this, arguments);
        }
        return onNextPage;
      }()
    }, {
      key: "fechaConsulta",
      value: function () {
        var _fechaConsulta = (0, _asyncToGenerator2.default)(function* () {
          var today = new Date();
          var inicio = '01';
          var fin = today.getDate();
          if (fin < 10) {
            fin = '0' + fin;
          }
          var mes = today.getMonth() + 1;
          if (mes < 10) {
            mes = '0' + mes;
          }
          var year = today.getFullYear();
          this.setState({
            fechaInicio: year + '-' + mes + '-' + inicio,
            fechaFin: year + '-' + mes + '-' + fin
          });
        });
        function fechaConsulta() {
          return _fechaConsulta.apply(this, arguments);
        }
        return fechaConsulta;
      }()
    }, {
      key: "getCrediCardDetails",
      value: function () {
        var _getCrediCardDetails = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            spinnerDetails: true,
            sizeDetail: _spinnerSize.SpinnerSize.get(),
            list: !this.state.list
          });
          try {
            var today = new Date();
            var month = today.getMonth() + 1;
            var year = today.getYear() - 100;
            var user = yield _storage.StorageService.getItem('user');
            var tokenClient = yield _storage.StorageService.getItem('token');
            var response = yield _api.default.post('/api-banca-movil-empresas/v1/consultaTarjetaCredito/consultas/tarjetaCredito', {
              productBankIdentifier: this.state.Product.productBankIdentifier,
              estado: {
                mes: month,
                ano: year
              }
            }, {
              headers: {
                'tokenClient': tokenClient,
                'nombreUsuario': user.nombreLogin
              }
            });
            yield this.setState({
              NrAccount: response.data.datos.numeroTarjetaCredito,
              detailProducts: [{
                key: '1',
                TextTitle: 'SALDOS',
                TextAvailable: 'Línea disponible',
                TextCredit: 'Línea de crédito',
                TextMantle: 'Monto Utilizado (S/ - $)',
                ValueAvailable: this.state.Currency == 'USD' ? '$ ' + _monetary.Monetary.format(response.data.datos.montoRetiroEfectivoDolares) : 'S/ ' + _monetary.Monetary.format(response.data.datos.montoRetiroEfectivoSoles),
                ValueCredit: this.state.Currency == 'USD' ? '$ ' + _monetary.Monetary.format(response.data.datos.lineaLimiteDolares) : 'S/ ' + _monetary.Monetary.format(response.data.datos.lineaLimiteSoles),
                ValueMantle: 'S/ ' + _monetary.Monetary.format(response.data.datos.montoSoles) + ' - ' + '$ ' + _monetary.Monetary.format(response.data.datos.montoDolares)
              }, {
                key: '2',
                TextTitle: 'ÚLTIMO CIERRE',
                TextAvailable: 'Pago total        (S/ - $)',
                TextMantle: 'Pago mínimo     (S/ - $)',
                ValueAvailable: 'S/ ' + _monetary.Monetary.format(response.data.datos.pagoTotalSoles) + ' - ' + '$ ' + _monetary.Monetary.format(response.data.datos.pagoTotalDolares),
                ValueMantle: 'S/ ' + _monetary.Monetary.format(response.data.datos.pagoMinimoSoles) + ' - ' + '$ ' + _monetary.Monetary.format(response.data.datos.PagoMinimoDolares)
              }, {
                key: '3',
                TextTitle: 'INFORMACIÓN',
                TextAvailable: 'Cierre Facturación',
                TextCredit: 'Fecha de pago',
                TextMantle: 'Puntos Banbif',
                ValueAvailable: response.data.datos.fechaCierreFacturacion,
                ValueCredit: response.data.datos.fechaPago,
                ValueMantle: response.data.datos.puntosBanbif
              }]
            });
          } catch (err) {
            this.handleMessages(err);
          }
          this.setState({
            spinnerDetails: false,
            sizeDetail: 0,
            list: !this.state.list
          });
        });
        function getCrediCardDetails() {
          return _getCrediCardDetails.apply(this, arguments);
        }
        return getCrediCardDetails;
      }()
    }, {
      key: "getMonthsAndroid",
      value: function () {
        var _getMonthsAndroid = (0, _asyncToGenerator2.default)(function* () {
          var date = new Date();
          var months = [];
          for (var i = 0; i < 12; i++) {
            var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            months.push({
              'nombreMes': monthNames[date.getMonth()] + ' ' + date.getFullYear(),
              'ultimoDiaMes': date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ultimoDia.getDate()
            });
            date.setMonth(date.getMonth() - 1);
          }
          yield this.setState({
            meses: months
          });
        });
        function getMonthsAndroid() {
          return _getMonthsAndroid.apply(this, arguments);
        }
        return getMonthsAndroid;
      }()
    }, {
      key: "getMonthsIphone",
      value: function () {
        var _getMonthsIphone = (0, _asyncToGenerator2.default)(function* () {
          var date = new Date();
          var months = [],
            mesIndice = [];
          for (var i = 0; i < 12; i++) {
            var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            months.push(monthNames[date.getMonth()] + ' ' + date.getFullYear());
            mesIndice.push(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ultimoDia.getDate());
            date.setMonth(date.getMonth() - 1);
          }
          this.setState({
            meses: months,
            mesesIndices: mesIndice
          });
        });
        function getMonthsIphone() {
          return _getMonthsIphone.apply(this, arguments);
        }
        return getMonthsIphone;
      }()
    }, {
      key: "getCrediCardMovements",
      value: function () {
        var _getCrediCardMovements = (0, _asyncToGenerator2.default)(function* () {
          var _this2 = this;
          var that = this;
          that.setState({
            spinnerMoviments: true,
            sizeMoviments: _spinnerSize.SpinnerSize.get(),
            list: !this.state.list,
            blocked: true
          });
          var user = yield _storage.StorageService.getItem('user');
          var tokenClient = yield _storage.StorageService.getItem('token');
          _api.default.post('/api-banca-movil-empresas/v1/consultaTarjetaCredito/consultas/tarjetaCredito/movimientos', {
            ordenCampos: 'N/A',
            fechaInicio: this.state.fechaInicio,
            fechaFin: this.state.fechaFin,
            tarjetaCredito: {
              productBankIdentifier: this.state.Product.productBankIdentifier,
              numeroTarjetaCredito: this.state.Product.numero
            }
          }, {
            headers: {
              numeroPagina: this.state.movementsPage,
              tokenClient: tokenClient,
              nombreUsuario: user.nombreLogin,
              'entidad': user.entidad
            }
          }).then(function (response) {
            if (that.hasError(response)) {
              that.handleMessages(err);
              that.setState({
                spinnerMoviments: false,
                sizeMoviments: 0,
                list: !_this2.state.list
              });
            } else {
              if (response.data && response.data.datos.length <= 0) {
                var _err = {
                  response: {
                    data: {
                      meta: {
                        mensajes: [{
                          mensaje: '!Registro no encontrado¡'
                        }]
                      }
                    }
                  }
                };
                throw _err;
              }
              var resposta = response.data.datos.map(function (element) {
                return {
                  fechaConsumo: element.fechaMovimiento.replace(/\//g, '-'),
                  fechaProceso: element.fechaProceso.replace(/\//g, '-'),
                  numeroOperacion: element.numeroOperacion,
                  descripcion: element.descripcion,
                  montoDolares: element.tarjetaCredito.montoDolares,
                  montoSoles: element.tarjetaCredito.montoSoles
                };
              });
              var newMovements = null;
              if (_this2.state.movementsPage > 1) {
                var _newMovements;
                newMovements = _this2.state.movementProducts;
                (_newMovements = newMovements).push.apply(_newMovements, (0, _toConsumableArray2.default)(resposta));
              } else {
                newMovements = resposta;
              }
              that.setNextPage(response.data);
              that.setState({
                spinnerMoviments: false,
                sizeMoviments: 0,
                list: !_this2.state.list
              });
              that.setState({
                movementProducts: newMovements,
                blocked: false
              });
            }
          }).catch(function (err) {
            that.mensajePersonalizado(err);
            that.setState({
              spinnerMoviments: false,
              sizeMoviments: 0,
              list: !_this2.state.list,
              blocked: false,
              movementProducts: []
            });
          });
        });
        function getCrediCardMovements() {
          return _getCrediCardMovements.apply(this, arguments);
        }
        return getCrediCardMovements;
      }()
    }, {
      key: "hasMessage",
      value: function hasMessage(err) {
        return err && err.response && err.response.data && err.response.data.meta && err.response.data.meta.mensajes && err.response.data.meta.mensajes.length > 0;
      }
    }, {
      key: "mensajePersonalizado",
      value: function mensajePersonalizado(err) {
        if (this.hasMessage(err)) {
          var messages;
          if (err.response.data.meta.mensajes[0].mensaje === '!Registro no encontrado¡') {
            messages = [{
              mensaje: 'No presenta movimientos en el mes actual'
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
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.getCrediCardDetails();
          _reactNative.Platform.OS !== 'ios' ? yield this.getMonthsAndroid() : yield this.getMonthsIphone();
          yield this.fechaConsulta();
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
          this.props.navigation.navigate('MainMenu');
        }
      }
    }, {
      key: "onClickFilterOption",
      value: function () {
        var _onClickFilterOption = (0, _asyncToGenerator2.default)(function* (buttonIndex) {
          if (typeof buttonIndex === 'number' && buttonIndex !== this.state.indice) {
            var _this$state$meses2;
            yield this.setState({
              mesSeleccionado: (_this$state$meses2 = this.state.meses) == null ? undefined : _this$state$meses2[buttonIndex],
              indice: buttonIndex
            });
            yield this.updateMonth(this.state.mesesIndices[buttonIndex]);
          }
          this.toggleMonthFilterOptions();
        });
        function onClickFilterOption(_x2) {
          return _onClickFilterOption.apply(this, arguments);
        }
        return onClickFilterOption;
      }()
    }, {
      key: "toggleMonthFilterOptions",
      value: function toggleMonthFilterOptions() {
        this.setState({
          isMonthFilterOpen: !this.state.isMonthFilterOpen
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this,
          _this$props$route$par,
          _this$state2,
          _this$state2$meses;
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this3.state.messages.length > 0 && i == _this3.state.messages.length - 1,
            Callback: _this3.messageOk.bind(_this3)
          }, message.mensaje);
        });
        return (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            paddingTop: 10,
            flex: 1,
            backgroundColor: _colors.default.white
          },
          children: [(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: (0, _asyncToGenerator2.default)(function* () {
              if (_this3.state.toggleBody) {
                var _this3$state$meses;
                yield _this3.setFirstPage();
                yield _this3.fechaConsulta();
                yield _this3.setState({
                  fechaSeleccionada: '',
                  mesSeleccionado: (_this3$state$meses = _this3.state.meses) == null ? undefined : _this3$state$meses[0],
                  indice: 0
                });
                yield _this3.getCrediCardMovements();
              }
              return _this3.setState({
                toggleBody: !_this3.state.toggleBody,
                ColorLine: !_this3.state.ColorLine
              });
            }),
            disabled: this.state.blocked,
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: {
                flexDirection: 'column'
              },
              children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: {
                  flexDirection: 'row'
                },
                children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: _Styles.default.alignCenterFlex1,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.blueLineAligCenter,
                    ellipsizeMode: "tail",
                    numberOfLines: 1,
                    children: "DETALLE DEL PRODUCTO"
                  })
                }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: _Styles.default.alignCenterFlex1,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: _Styles.default.blueLineAligCenter,
                    children: "MOVIMIENTO"
                  })
                })]
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: {
                    flexDirection: 'row',
                    paddingTop: 10
                  },
                  children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [{
                      backgroundColor: !this.state.toggleBody ? _colors.default.lightGrey : _colors.default.lightBlue
                    }, _Styles.default.line]
                  }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [{
                      backgroundColor: this.state.toggleBody ? _colors.default.lightGrey : _colors.default.lightBlue
                    }, _Styles.default.line]
                  })]
                })
              })]
            })
          }), (0, _jsxRuntime.jsx)(_DollarIconTextCreditCardComponent.default, {
            NrAccount: this.state.Product.numero,
            moneda: this.state.Currency
          }), (0, _jsxRuntime.jsx)(_EntidadNombre.default, {
            entidad: (_this$props$route$par = this.props.route.params) == null ? undefined : _this$props$route$par.entidad
          }), (0, _jsxRuntime.jsx)(_BlueLineWithTextComponent.default, {
            Text: this.state.toggleBody == true ? _strings.default.accountDetais.details : _strings.default.accountDetais.movements
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              height: height - 247
            },
            children: [this.MostrarFiltros(this.state.toggleBody), this.BodyToggle(this.state.toggleBody)]
          }), messageViews, (0, _jsxRuntime.jsx)(_nativeBase.Actionsheet, {
            isOpen: this.state.isMonthFilterOpen,
            onClose: this.toggleMonthFilterOptions,
            children: (0, _jsxRuntime.jsxs)(_nativeBase.Actionsheet.Content, {
              children: [(0, _jsxRuntime.jsx)(_nativeBase.Box, {
                w: "100%",
                h: 60,
                px: 4,
                justifyContent: "center",
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  children: "Mes"
                })
              }), (_this$state2 = this.state) == null ? undefined : (_this$state2$meses = _this$state2.meses) == null ? undefined : _this$state2$meses.map(function (mes, index) {
                return (0, _jsxRuntime.jsx)(_nativeBase.Actionsheet.Item, {
                  onPress: function onPress() {
                    return _this3.onClickFilterOption(index);
                  },
                  children: mes
                }, mes + index);
              })]
            })
          })]
        });
      }
    }]);
    return CreditCard;
  }(_react.Component);
