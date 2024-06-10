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
  var _DetailsComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _AccountMovementComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _AccountDetailComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _monetaryType = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[21]);
  var _monetary = _$$_REQUIRE(_dependencyMap[22]);
  var _nativeBase = _$$_REQUIRE(_dependencyMap[23]);
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[24]));
  var _storage = _$$_REQUIRE(_dependencyMap[25]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[26]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  var CheckingAccountDetails = exports.default = function (_Component) {
    (0, _inherits2.default)(CheckingAccountDetails, _Component);
    function CheckingAccountDetails(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CheckingAccountDetails);
      _this = _callSuper(this, CheckingAccountDetails, [props]);
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
          yield _this.getCheckingAccountMovements();
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
      _this.handleBackButtonPressAndroid = function () {
        _this.setState({
          modalVisible: true
        });
        return true;
      };
      _this.MostrarFiltros = function (IsToggle) {
        if (!IsToggle) {
          if (_reactNative.Platform.OS !== 'ios') {
            var _this$state$meses;
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
                    children: (_this$state$meses = _this.state.meses) == null ? undefined : _this$state$meses.map(function (data) {
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
                  onPress: _this.toggleMounthOptions,
                  children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: _Styles.default.monthFilter,
                    children: [(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                      style: _Styles.default.textFilterAction,
                      children: [_this.state.mesSeleccionado, " "]
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
          return (0, _jsxRuntime.jsx)(_DetailsComponent.default, {
            filteredProducts: _this.state.detailProducts,
            isvisible: _this.state.spinnerDetails,
            size: _this.state.spinnerDetails ? _spinnerSize.SpinnerSize.get() : 0,
            list: _this.state.list
          });
        } else {
          return (0, _jsxRuntime.jsx)(_AccountMovementComponent.default, {
            filteredProducts: _this.state.movementProducts,
            Currency: _this.state.Currency,
            isvisible: _this.state.spinnerMovements,
            size: _this.state.spinnerMovements ? _spinnerSize.SpinnerSize.get() : 0,
            list: _this.state.list,
            nextPage: _this.state.movementsPage,
            onNextPage: _this.onNextPage.bind((0, _assertThisInitialized2.default)(_this))
          });
        }
      };
      _this.toggleMounthOptions = _this.toggleMounthOptions.bind((0, _assertThisInitialized2.default)(_this));
      _this.onChooseMounth = _this.onChooseMounth.bind((0, _assertThisInitialized2.default)(_this));
      _this.state = {
        blocked: false,
        movementsPage: 0,
        spinnerDetails: false,
        spinnerMovements: false,
        list: true,
        messages: [],
        toggleBody: true,
        Currency: _this.props.route.params.Currency,
        NrAccount: _this.props.route.params.NrAccount,
        entidad: _this.props.route.params.entidad,
        NrCCI: _this.props.route.params.NrCCI,
        ProductBankIdentifier: _this.props.route.params.ProductBankIdentifier.toUpperCase(),
        Product: _this.props.route.params.Product,
        ProductType: _this.props.route.params.ProductType,
        SaldoActual: _this.props.route.params.SaldoActual,
        SaldoDisponible: _this.props.route.params.SaldoDisponible,
        detailProducts: [],
        movementProducts: [],
        meses: [],
        fechaSeleccionada: '',
        fechaInicio: null,
        fechaFin: null,
        mesesIndices: [],
        mesSeleccionado: '',
        indice: '',
        isMounthOptionsOpen: false
      };
      return _this;
    }
    (0, _createClass2.default)(CheckingAccountDetails, [{
      key: "getCheckingAccountDetails",
      value: function () {
        var _getCheckingAccountDetails = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            spinnerDetails: true,
            list: !this.state.list
          });
          try {
            var user = yield _storage.StorageService.getItem('user');
            var tokenClient = yield _storage.StorageService.getItem('token');
            console.log('Api | Cuentas Corrientes y de Ahorros-CheckingAccountDetails.js: api-banca-movil-empresas/v1/productosEmpresa/consultas/detalleCuenta', {
              'nombreUsuario': user.nombreLogin,
              'entidad': user.entidad,
              productBankIdentifier: this.state.ProductBankIdentifier
            });
            var response = yield _api.default.post('/api-banca-movil-empresas/v1/productosEmpresa/consultas/detalleCuenta', {
              productBankIdentifier: this.state.ProductBankIdentifier
            }, {
              headers: {
                'tokenClient': tokenClient,
                'nombreUsuario': user.nombreLogin,
                'entidad': user.entidad
              }
            }).catch(function (error) {
              var _error$response;
              console.log('error', error, error == null ? undefined : (_error$response = error.response) == null ? undefined : _error$response.data, error.message);
            });
            yield this.setState({
              spinnerDetails: false,
              list: !this.state.list,
              sizeDetails: 0,
              detailProducts: [{
                key: '1',
                text: 'Saldo Contable',
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(response.data.datos.cuenta.saldoContable)
              }, {
                key: '2',
                text: 'Saldo Disponible',
                value: _monetaryType.default[this.state.Currency] + _monetary.Monetary.format(response.data.datos.cuenta.saldoDisponible)
              }]
            });
          } catch (err) {
            console.log('err!!', err);
            this.handleMessages(err);
            this.setState({
              spinnerDetails: false
            });
          }
          this.setState({
            spinnerDetails: false
          });
        });
        function getCheckingAccountDetails() {
          return _getCheckingAccountDetails.apply(this, arguments);
        }
        return getCheckingAccountDetails;
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
      key: "hasError",
      value: function hasError(err) {
        return err && err.status != 200 && err.status != 201;
      }
    }, {
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
          yield this.getCheckingAccountMovements();
        });
        function onNextPage() {
          return _onNextPage.apply(this, arguments);
        }
        return onNextPage;
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
          this.setState({
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
      key: "getCheckingAccountMovements",
      value: function () {
        var _getCheckingAccountMovements = (0, _asyncToGenerator2.default)(function* () {
          var _this2 = this;
          var that = this;
          var user = yield _storage.StorageService.getItem('user');
          var tokenClient = yield _storage.StorageService.getItem('token');
          that.setState({
            spinnerMovements: true,
            list: !this.state.list,
            blocked: true
          });
          _api.default.post('/api-banca-movil-empresas/v1/consultaCuenta/consultas/cuenta/movimientos', {
            cuenta: {
              productBankIdentifier: this.state.ProductBankIdentifier
            },
            tipoMovimiento: 'TODO',
            tipoBusca: 'FILTRO_FECHAS',
            fechaInicio: this.state.fechaInicio,
            fechaFin: this.state.fechaFin
          }, {
            headers: {
              numeroPagina: this.state.movementsPage,
              tokenClient: tokenClient,
              nombreUsuario: user.nombreLogin,
              entidad: user.entidad
            }
          }).then(function (response) {
            if (that.hasError(response)) {
              that.handleMessages(err);
              that.setState({
                spinnerMovements: false,
                list: !_this2.state.list
              });
            } else {
              var newMovements = null;
              if (_this2.state.movementsPage > 1) {
                var _newMovements;
                newMovements = _this2.state.movementProducts;
                (_newMovements = newMovements).push.apply(_newMovements, (0, _toConsumableArray2.default)(response.data.datos));
              } else {
                newMovements = response.data.datos;
              }
              that.setNextPage(response.data);
              that.setState({
                movementProducts: newMovements,
                spinnerMovements: false,
                list: !_this2.state.list,
                blocked: false
              });
            }
          }).catch(function (err) {
            that.mensajePersonalizado(err);
            that.setState({
              movementProducts: [],
              spinnerMovements: false,
              list: !_this2.state.list,
              blocked: false
            });
          });
        });
        function getCheckingAccountMovements() {
          return _getCheckingAccountMovements.apply(this, arguments);
        }
        return getCheckingAccountMovements;
      }()
    }, {
      key: "mensajePersonalizado",
      value: function mensajePersonalizado(err) {
        if (this.hasMessage(err)) {
          var messages;
          if (err.response.data.meta.mensajes[0].mensaje === '¡Registro no encontrado!') {
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
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.fechaConsulta();
          _reactNative.Platform.OS !== 'ios' ? yield this.getMonthsAndroid() : yield this.getMonthsIphone();
          yield this.getCheckingAccountDetails();
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
      key: "onChooseMounth",
      value: function () {
        var _onChooseMounth = (0, _asyncToGenerator2.default)(function* (buttonIndex) {
          if (typeof buttonIndex === 'number' && buttonIndex !== this.state.indice) {
            var _this$state$meses2;
            yield this.setState({
              mesSeleccionado: (_this$state$meses2 = this.state.meses) == null ? undefined : _this$state$meses2[buttonIndex],
              indice: buttonIndex
            });
            yield this.updateMonth(this.state.mesesIndices[buttonIndex]);
          }
          this.toggleMounthOptions();
        });
        function onChooseMounth(_x2) {
          return _onChooseMounth.apply(this, arguments);
        }
        return onChooseMounth;
      }()
    }, {
      key: "toggleMounthOptions",
      value: function toggleMounthOptions() {
        this.setState({
          isMounthOptionsOpen: !this.state.isMounthOptionsOpen
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this,
          _this$state$meses3;
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this3.state.messages.length > 0 && i == _this3.state.messages.length - 1,
            Callback: _this3.messageOk.bind(_this3)
          }, message.mensaje);
        });
        return (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Styles.default.container,
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
                yield _this3.getCheckingAccountMovements();
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
                  style: _Styles.default.alignCenterFlex2,
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
          }), (0, _jsxRuntime.jsx)(_AccountDetailComponent.default, {
            type: this.state.toggleBody ? _strings.default.accountDetais.details : _strings.default.accountDetais.movements,
            NrAccount: this.state.NrAccount,
            entidad: this.state.entidad,
            NrCCI: this.state.NrCCI,
            SaldoActual: this.state.SaldoActual,
            SaldoDisponible: this.state.SaldoDisponible,
            moneda: this.state.Currency
          }), this.MostrarFiltros(this.state.toggleBody), this.BodyToggle(this.state.toggleBody), messageViews, (0, _jsxRuntime.jsx)(_nativeBase.Actionsheet, {
            isOpen: this.state.isMounthOptionsOpen,
            onClose: this.toggleMounthOptions,
            children: (0, _jsxRuntime.jsx)(_nativeBase.Actionsheet.Content, {
              children: (_this$state$meses3 = this.state.meses) == null ? undefined : _this$state$meses3.map(function (mounth, index) {
                return (0, _jsxRuntime.jsx)(_nativeBase.Actionsheet.Item, {
                  onPress: function onPress() {
                    return _this3.onChooseMounth(index);
                  },
                  children: mounth
                }, mounth + index);
              })
            })
          })]
        });
      }
    }]);
    return CheckingAccountDetails;
  }(_react.Component);
