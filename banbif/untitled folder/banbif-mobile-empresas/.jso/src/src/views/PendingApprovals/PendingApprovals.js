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
  var _assertThisInitialized2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _ViewContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _IconTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _CardCheckboxListComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _ShadowContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _ModalSoftToken = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _ModalSuccessComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[22]);
  var _dateFormat = _$$_REQUIRE(_dependencyMap[23]);
  var _monetary = _$$_REQUIRE(_dependencyMap[24]);
  var _storage = _$$_REQUIRE(_dependencyMap[25]);
  var _images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26]));
  var _nativeBase = _$$_REQUIRE(_dependencyMap[27]);
  var _enum = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[28]));
  var _ModalConfirmationComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[29]));
  var _enviroments = _$$_REQUIRE(_dependencyMap[30]);
  var _DetectID = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[31]));
  var _reactNativeLoadingSpinnerOverlay = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[32]));
  var _DynamicTextComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[33]));
  var _ModalResultDetailComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[34]));
  var _orderBy = _$$_REQUIRE(_dependencyMap[35]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[36]));
  var _uppercase = _$$_REQUIRE(_dependencyMap[37]);
  var _reactNativeDeviceInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[38]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[39]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var height = _reactNative.Dimensions.get('window').height;
  var PendingApprovals = exports.default = function (_Component) {
    (0, _inherits2.default)(PendingApprovals, _Component);
    function PendingApprovals(props) {
      var _this;
      (0, _classCallCheck2.default)(this, PendingApprovals);
      _this = _callSuper(this, PendingApprovals, [props]);
      _this.handleBackButtonPressAndroid = function () {
        _this.setState({
          modalVisible: true
        });
        return true;
      };
      _this.aprobacionesFiltro;
      _this.selectAll = _this.selectAll.bind((0, _assertThisInitialized2.default)(_this));
      _this.toggleFilterOptions = _this.toggleFilterOptions.bind((0, _assertThisInitialized2.default)(_this));
      _this.onClickFilterOption = _this.onClickFilterOption.bind((0, _assertThisInitialized2.default)(_this));
      _this.state = {
        allAprobaciones: [],
        selectedAprobaciones: [],
        productTypes: [],
        filteredProducts: [],
        modais: [],
        messages: [],
        tokenFisico: '',
        textFilter: '',
        textTipoFilter: '',
        hasSoftToken: false,
        filtroBuscar: false,
        filtroTipo: false,
        tipoAprovar: false,
        showModalSuccess: false,
        modalSoftToken: false,
        modalSoftTokenRechazo: false,
        showModalError: false,
        showModalConfirmation: false,
        showModalConfirmationRechazo: false,
        showModalTimer: false,
        spinner: false,
        size: 0,
        loadingmessage: false,
        modalWarning: false,
        textError: '',
        diaSistema: '',
        mesSistema: '',
        anioSistema: '',
        horaSistema: '',
        isFilterOpen: false,
        flagGrupo: false
      };
      _this.cards = {};
      return _this;
    }
    (0, _createClass2.default)(PendingApprovals, [{
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.getPendingApprovals();
          var hasSoftToken = Boolean(yield _storage.StorageService.getItemStorage('hasSoftToken'));
          var flagGrupo = Boolean(yield _storage.StorageService.getItemStorage('flagGrupo'));
          this.setState({
            hasSoftToken: hasSoftToken,
            flagGrupo: flagGrupo
          });
          if (!this.aprobacionesFiltro || this.aprobacionesFiltro.length == 0) {
            this.aprobacionesFiltro = this.state.allAprobaciones;
          }
        });
        function UNSAFE_componentWillMount() {
          return _UNSAFE_componentWillMount.apply(this, arguments);
        }
        return UNSAFE_componentWillMount;
      }()
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        this.props.navigation.setOptions({
          headerRight: function headerRight() {
            return (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: {
                flexDirection: 'row'
              },
              children: [(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: function onPress() {
                  _this2.selectAll();
                },
                children: _reactNative.Platform.OS === 'ios' ? (0, _jsxRuntime.jsx)(_reactNative.Image, {
                  style: {
                    width: 30,
                    height: 30,
                    marginRight: 10
                  },
                  source: _images.default.tasks
                }) : (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.FONT_AWESOME_5,
                  name: "tasks",
                  size: 30,
                  style: {
                    color: _colors.default.lightBlue,
                    marginRight: 10
                  }
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                onPress: (0, _asyncToGenerator2.default)(function* () {
                  yield _this2.toggleFilterOptions();
                }),
                children: (0, _jsxRuntime.jsx)(_Icon.default, {
                  family: _Icon.default.FONT_AWESOME,
                  name: "filter",
                  size: 30,
                  style: {
                    color: _colors.default.lightBlue,
                    marginRight: 10
                  }
                })
              })]
            });
          }
        });
      }
    }, {
      key: "setModalVisible",
      value: function setModalVisible(visible) {
        this.setState({
          showModalSuccess: visible
        });
      }
    }, {
      key: "setModalConfirmation",
      value: function () {
        var _setModalConfirmation = (0, _asyncToGenerator2.default)(function* () {
          var countApprove = this.state.selectedAprobaciones.length;
          if (countApprove <= 0) {
            yield this.showModalErrorState(true, '¡Debes seleccionar al menos un elemento!');
            return;
          }
          var maximumApprove = _enviroments.enviroment.maximumApprove;
          if (countApprove <= maximumApprove) {
            this.setState({
              showModalConfirmation: true
            });
            return;
          }
          yield this.showModalErrorState(true, '¡Solo puede aprobar ' + maximumApprove + ' operaciones!');
        });
        function setModalConfirmation() {
          return _setModalConfirmation.apply(this, arguments);
        }
        return setModalConfirmation;
      }()
    }, {
      key: "setModalConfirmacionRechazar",
      value: function () {
        var _setModalConfirmacionRechazar = (0, _asyncToGenerator2.default)(function* () {
          var countApprove = this.state.selectedAprobaciones.length;
          if (countApprove > 0) {
            this.setState({
              showModalConfirmationRechazo: true
            });
            return;
          }
          yield this.showModalErrorState(true, '¡Debes seleccionar al menos un elemento!');
        });
        function setModalConfirmacionRechazar() {
          return _setModalConfirmacionRechazar.apply(this, arguments);
        }
        return setModalConfirmacionRechazar;
      }()
    }, {
      key: "setModalTimer",
      value: function () {
        var _setModalTimer = (0, _asyncToGenerator2.default)(function* () {
          var _this3 = this;
          try {
            var aprobaciones = this.state.selectedAprobaciones.filter(function (item) {
              return item.orquestradorAprobacionesEnum === 'PAGOS_PROVEEDORES';
            }).map(function (_ref2) {
              var formaPago = _ref2.formaPago,
                tipoCarga = _ref2.tipoCarga,
                fechaVencimento = _ref2.fechaVencimento;
              return {
                formaPago: formaPago,
                tipoCarga: tipoCarga,
                fechaVencimento: fechaVencimento
              };
            });
            var despuesDeLaUna = false;
            if (aprobaciones.length > 0) {
              yield this.obtenerFechaActual();
              aprobaciones.forEach(function (data) {
                if (data.formaPago === '5' && (data.tipoCarga === 'M' || data.tipoCarga === 'I')) {
                  var fecha = (0, _moment.default)(data.fechaVencimento);
                  var dia = fecha.format('D');
                  var mes = fecha.format('M');
                  var anio = fecha.format('YYYY');
                  if (dia == _this3.state.diaSistema && mes == _this3.state.mesSistema && anio == _this3.state.anioSistema && parseInt(_this3.state.horaSistema) > 12) {
                    despuesDeLaUna = true;
                    return;
                  }
                }
              });
            }
            if (despuesDeLaUna) {
              if (_reactNative.Platform.OS === 'ios') {
                yield new Promise(function (r) {
                  return setTimeout(function () {
                    return r();
                  }, 500);
                });
              }
              this.setState({
                showModalTimer: true
              });
            } else {
              this.setState({
                showModalTimer: false
              });
              this.settingtValidation();
            }
          } catch (error) {
            this.handleMessages(error);
          }
        });
        function setModalTimer() {
          return _setModalTimer.apply(this, arguments);
        }
        return setModalTimer;
      }()
    }, {
      key: "obtenerFechaActual",
      value: function () {
        var _obtenerFechaActual = (0, _asyncToGenerator2.default)(function* () {
          try {
            var response = yield _api.default.get('/api-banca-movil-empresas/v1/seguridadEmpresas/parametros/FECHASISTEMA');
            if (response.data && response.data.meta.totalRegistros <= 0) {
              throw err;
            }
            var fechaSistema = response.data.datos.parametros[0].descripcion;
            var fecha = (0, _moment.default)(fechaSistema, 'YYYY-MM-DD HH:mm:ss');
            var dia = fecha.format('D');
            var mes = fecha.format('M');
            var anio = fecha.format('YYYY');
            yield this.setState({
              anioSistema: anio,
              mesSistema: mes,
              diaSistema: dia,
              horaSistema: fecha.hours()
            });
          } catch (err) {
            throw err;
          }
        });
        function obtenerFechaActual() {
          return _obtenerFechaActual.apply(this, arguments);
        }
        return obtenerFechaActual;
      }()
    }, {
      key: "settingtValidation",
      value: function () {
        var _settingtValidation = (0, _asyncToGenerator2.default)(function* () {
          if (this.state.hasSoftToken) {
            this.setState({
              showModalConfirmation: false
            });
            yield this.sendToken();
          } else {
            yield this.showModalSoftToken();
          }
        });
        function settingtValidation() {
          return _settingtValidation.apply(this, arguments);
        }
        return settingtValidation;
      }()
    }, {
      key: "setModalSoftToken",
      value: function () {
        var _setModalSoftToken = (0, _asyncToGenerator2.default)(function* (status) {
          if (this.state.selectedAprobaciones.length > 0) {
            this.setState({
              modalSoftToken: status
            });
          } else {
            yield this.showModalErrorState(true, '');
          }
        });
        function setModalSoftToken(_x) {
          return _setModalSoftToken.apply(this, arguments);
        }
        return setModalSoftToken;
      }()
    }, {
      key: "setModalSuccess",
      value: function setModalSuccess(modalSuccess) {
        this.setState({
          modalSuccess: modalSuccess
        });
      }
    }, {
      key: "setTokenFisico",
      value: function setTokenFisico(tokenFisico) {
        this.setState({
          tokenFisico: tokenFisico
        });
      }
    }, {
      key: "getPendingApprovals",
      value: function () {
        var _getPendingApprovals = (0, _asyncToGenerator2.default)(function* () {
          yield this.setState({
            spinner: true,
            size: _spinnerSize.SpinnerSize.get()
          });
          try {
            var lisTransfer = [];
            var user = yield _storage.StorageService.getItem('user');
            var usuarioTipo = yield _storage.StorageService.getItemStorage('usuarioTipo');
            var tokenClient = yield _storage.StorageService.getItem('token');
            var response = yield _api.default.get('/api-banca-movil-empresas/v1/aprobacionesPendientes', {
              headers: {
                'codigoIBS': user.userId,
                'nombreUsuario': _uppercase.UpperCase.upperCase(user.nombreLogin),
                'entidad': _uppercase.UpperCase.upperCase(user.entidad),
                'tokenClient': tokenClient,
                'tipoGrupo': usuarioTipo
              }
            });
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
            response.data.datos.forEach(function (data, i) {
              data.typeTransfer = data.tipoAprobacion === '1' && data.moneda != data.currencyInterbankAccountId ? data.orquestradorAprobacionesEnum + '_2' : data.orquestradorAprobacionesEnum + '_' + data.tipoAprobacion;
              data.key = String(i + 1);
              if (data.orquestradorAprobacionesEnum === 'TRANSFERENCIAS' && data.tipoAprobacion === '1') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Cuenta Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '4',
                  text: 'Moneda de Cargo',
                  value: data.moneda
                }, {
                  key: '5',
                  text: 'Monto de Cargo',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '6',
                  text: 'Cuenta Abono',
                  value: data.creditProductBankIdentifier
                }, {
                  key: '7',
                  text: 'Moneda de Abono',
                  value: data.currencyInterbankAccountId
                }, {
                  key: '8',
                  text: 'Monto de Abono',
                  value: _monetary.Monetary.format(data.montoAbono)
                }, {
                  key: '9',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '10',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'TRANSFERENCIAS') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Cuenta Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '4',
                  text: 'Moneda de Cargo',
                  value: data.moneda
                }, {
                  key: '5',
                  text: 'Monto de Cargo',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '6',
                  text: 'Beneficiario',
                  value: data.beneficiaryName
                }, {
                  key: '7',
                  text: 'Cuenta Abono',
                  value: data.creditProductBankIdentifier
                }, {
                  key: '8',
                  text: 'Moneda de Abono',
                  value: data.currencyInterbankAccountId
                }, {
                  key: '9',
                  text: 'Monto de Abono',
                  value: _monetary.Monetary.format(data.montoAbono)
                }, {
                  key: '10',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '11',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'TRANSFERENCIAS_EXTERIOR') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Cuenta Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '4',
                  text: 'Moneda de Cargo',
                  value: data.moneda
                }, {
                  key: '5',
                  text: 'Monto de Cargo',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '6',
                  text: 'Beneficiario',
                  value: data.beneficiaryName
                }, {
                  key: '7',
                  text: 'Cuenta Abono',
                  value: data.creditProductBankIdentifier
                }, {
                  key: '8',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '9',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'PAGOS_PROVEEDORES' || data.orquestradorAprobacionesEnum === 'PAGOS_HABERES') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Descripción',
                  value: data.description.substring(0, 33)
                }, {
                  key: '3',
                  text: 'Número de registros',
                  value: data.cantidadRegistros
                }, {
                  key: '4',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '5',
                  text: 'Monto',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '6',
                  text: 'Cuenta Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '7',
                  text: 'Moneda',
                  value: data.moneda
                }, {
                  key: '8',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '9',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'PAGO_LETRAS') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Num. Planilla',
                  value: data.numeroPlanilla
                }, {
                  key: '4',
                  text: 'Num. Letra',
                  value: data.numeroLetra
                }, {
                  key: '5',
                  text: 'Girador',
                  value: data.beneficiaryName
                }, {
                  key: '6',
                  text: 'Producto',
                  value: data.tipoAprobacion
                }, {
                  key: '7',
                  text: 'Monto',
                  value: _monetary.Monetary.format(data.montoTotal)
                }, {
                  key: '8',
                  text: 'Fecha emisión',
                  value: _dateFormat.DateFormat.format(data.fechaFacturacion)
                }, {
                  key: '9',
                  text: 'Fecha vencimiento',
                  value: _dateFormat.DateFormat.format(data.fechaVencimento)
                }, {
                  key: '10',
                  text: 'Moneda',
                  value: data.moneda
                }, {
                  key: '11',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '12',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'PLANILLA_LETRAS') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Tipo doc.',
                  value: _enum.default.tipoDocumentoPlanillaElectronica[data.tipoServicio]
                }, {
                  key: '4',
                  text: 'Tipo de Planilla',
                  value: _enum.default.tipoPlanillaElectronica[data.tipoAprobacion]
                }, {
                  key: '5',
                  text: 'Num. Reg.',
                  value: data.cantidadRegistros
                }, {
                  key: '6',
                  text: 'Moneda',
                  value: data.moneda
                }, {
                  key: '7',
                  text: 'Monto',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '8',
                  text: 'Cuenta de Abono',
                  value: data.cuentaCargo
                }, {
                  key: '9',
                  text: 'Moneda de abono',
                  value: data.currencyInterbankAccountId
                }, {
                  key: '10',
                  text: 'Descripción',
                  value: data.description.substring(0, 33)
                }, {
                  key: '11',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '12',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'CARTA_FIANZA_SOLICITUD') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Moneda',
                  value: data.moneda
                }, {
                  key: '3',
                  text: 'Fecha emisión',
                  value: _dateFormat.DateFormat.format(data.fechaFacturacion)
                }, {
                  key: '4',
                  text: 'Fecha vencimiento',
                  value: _dateFormat.DateFormat.format(data.fechaVencimento)
                }, {
                  key: '5',
                  text: 'Monto',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '6',
                  text: 'Modalidad',
                  value: _enum.default.cartaFianzaModalidad[data.tipoServicio]
                }, {
                  key: '7',
                  text: 'Beneficiario',
                  value: data.beneficiaryName
                }, {
                  key: '8',
                  text: 'Cuenta Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '9',
                  text: 'Moneda de Cargo',
                  value: data.currencyInterbankAccountId
                }, {
                  key: '10',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '11',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'CARTA_FIANZA_RENOVACION') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Moneda',
                  value: data.moneda
                }, {
                  key: '3',
                  text: 'Monto',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '4',
                  text: 'Fecha emisión',
                  value: _dateFormat.DateFormat.format(data.fechaFacturacion)
                }, {
                  key: '5',
                  text: 'Fecha vencimiento',
                  value: _dateFormat.DateFormat.format(data.fechaVencimento)
                }, {
                  key: '6',
                  text: 'Modalidad',
                  value: data.tipoServicio
                }, {
                  key: '7',
                  text: 'Beneficiario',
                  value: data.beneficiaryName
                }, {
                  key: '8',
                  text: 'Cuenta Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '9',
                  text: 'Moneda de Cargo',
                  value: data.currencyInterbankAccountId
                }, {
                  key: '10',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '11',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'PAGOS_OTROS_SERVICIOS' || data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_CLARO' || data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_EDELNOR' || data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_LUZDELSUR' || data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_TELEFONICA' || data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_ENTEL') {
                data.data = [{
                  key: '1',
                  text: 'Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Cod. suministro',
                  value: data.codigoSuministro
                }, {
                  key: '4',
                  text: 'Número de recibo',
                  value: data.numeroRecibo
                }, {
                  key: '5',
                  text: 'Cuenta de cargo',
                  value: data.cuentaCargo
                }, {
                  key: '6',
                  text: 'Moneda de cargo',
                  value: data.moneda
                }, {
                  key: '7',
                  text: 'Monto a pagar',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '8',
                  text: 'Moneda a pagar',
                  value: data.currencyInterbankAccountId
                }, {
                  key: '9',
                  text: 'Empresa',
                  value: data.tipoServicio
                }, {
                  key: '10',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '11',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'AUTODESEMBOLSO') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Núm. Línea de Crédito',
                  value: data.numeroLinea
                }, {
                  key: '4',
                  text: 'Monto de Abono',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '5',
                  text: 'Moneda de Abono',
                  value: data.currencyInterbankAccountId
                }, {
                  key: '6',
                  text: 'Cuenta de Abono',
                  value: data.creditProductBankIdentifier
                }, {
                  key: '7',
                  text: 'Cuenta de Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '8',
                  text: 'Moneda Cuenta Cargo',
                  value: data.moneda
                }, {
                  key: '9',
                  text: 'Cantidad Máxima de Días de Pago',
                  value: data.maxDiaPago
                }, {
                  key: '10',
                  text: 'Cuotas Mensuales',
                  value: data.numeroCuota
                }, {
                  key: '11',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '12',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else if (data.orquestradorAprobacionesEnum === 'PAGOS_SERVICIOS_CHEQUES') {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Nro. Lote',
                  value: data.numLote
                }, {
                  key: '3',
                  text: 'Registro Lote',
                  value: data.regLote
                }, {
                  key: '4',
                  text: 'Importe Total',
                  value: data.monto
                }, {
                  key: '5',
                  text: 'Moneda Lote',
                  value: data.moneda
                }, {
                  key: '6',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '7',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              } else {
                data.data = [{
                  key: '1',
                  text: 'Número Referencia',
                  value: data.numeroReferencia
                }, {
                  key: '2',
                  text: 'Fecha',
                  value: _dateFormat.DateFormat.format(data.fecha)
                }, {
                  key: '3',
                  text: 'Monto',
                  value: _monetary.Monetary.format(data.monto)
                }, {
                  key: '4',
                  text: 'Cuenta Cargo',
                  value: data.cuentaCargo
                }, {
                  key: '5',
                  text: 'Moneda',
                  value: data.moneda
                }, {
                  key: '6',
                  text: 'Ingresado Por',
                  value: data.nombreUsuario
                }, {
                  key: '7',
                  text: 'Nro. de Aprobaciones',
                  value: data.numeroAprobador
                }];
              }
            });
            yield this.setState({
              allAprobaciones: response.data.datos.sort(_orderBy.OrderBy.order('fecha'))
            });
            this.aprobacionesFiltro = this.state.allAprobaciones;
          } catch (err) {
            this.handleMessages(err);
          }
          yield this.setState({
            spinner: false,
            size: 0
          });
        });
        function getPendingApprovals() {
          return _getPendingApprovals.apply(this, arguments);
        }
        return getPendingApprovals;
      }()
    }, {
      key: "handleMessages",
      value: function () {
        var _handleMessages = (0, _asyncToGenerator2.default)(function* (err) {
          var messages = [];
          if (_reactNative.Platform.OS === 'ios') {
            yield new Promise(function (r) {
              return setTimeout(function () {
                return r();
              }, 1000);
            });
          }
          if (this.hasMessage(err)) {
            if (err.response.data.meta.mensajes[0].mensaje === 'Campo faltante: softTokenAutorizacion.claveCompartida') {
              messages = [{
                mensaje: 'El cliente no tiene registrado el número de DNI'
              }];
            } else if (err.response.data.meta.mensajes[0].mensaje === '!Registro no encontrado¡') {
              messages = [{
                mensaje: 'No hay operaciones pendientes por aprobar'
              }];
            } else {
              messages = err.response.data.meta.mensajes;
            }
          } else {
            messages = [{
              mensaje: _strings.default.messages.error
            }];
          }
          this.setState({
            messages: messages
          });
        });
        function handleMessages(_x2) {
          return _handleMessages.apply(this, arguments);
        }
        return handleMessages;
      }()
    }, {
      key: "hasMessage",
      value: function hasMessage(err) {
        return err && err.response && err.response.data && err.response.data.meta && err.response.data.meta.mensajes && err.response.data.meta.mensajes.length > 0;
      }
    }, {
      key: "messageOk",
      value: function messageOk() {
        var _messages = this.state.messages;
        _messages.pop();
        this.setState({
          messages: _messages
        });
        if (this.state.messages.length == 0 && this.state.allAprobaciones.length == 0) {
          this.props.navigation.navigate('MainMenu');
        }
      }
    }, {
      key: "onChange",
      value: function () {
        var _onChange = (0, _asyncToGenerator2.default)(function* (item) {
          var selecteds = this.state.selectedAprobaciones;
          if (item.isChecked) {
            if (selecteds.find(function (s) {
              return s.key == item.id;
            })) return;
            var aprobacione = Object.assign({}, this.state.allAprobaciones.find(function (aprobacione) {
              return aprobacione.key == item.id;
            }));
            delete aprobacione.data;
            selecteds.push(aprobacione);
          } else {
            var index = selecteds.findIndex(function (aprobacione) {
              return aprobacione.key == item.id;
            });
            selecteds.splice(index, 1);
          }
          yield this.setState({
            selectedAprobaciones: selecteds
          });
        });
        function onChange(_x3) {
          return _onChange.apply(this, arguments);
        }
        return onChange;
      }()
    }, {
      key: "closeModalSoftToken",
      value: function () {
        var _closeModalSoftToken = (0, _asyncToGenerator2.default)(function* () {
          yield this.setState({
            modalSoftToken: false,
            modalSoftTokenRechazo: false
          });
        });
        function closeModalSoftToken() {
          return _closeModalSoftToken.apply(this, arguments);
        }
        return closeModalSoftToken;
      }()
    }, {
      key: "sendToken",
      value: function () {
        var _sendToken = (0, _asyncToGenerator2.default)(function* () {
          try {
            var aprobacionesSelected = this.state.selectedAprobaciones;
            yield this.setLoadingmessage(true);
            var aprobaciones = this.state.selectedAprobaciones.map(function (ap) {
              delete ap.key;
              delete ap.typeTransfer;
              return ap;
            });
            var _this$state = this.state,
              hasSoftToken = _this$state.hasSoftToken,
              tokenFisico = _this$state.tokenFisico;
            var headers = {};
            var user = yield _storage.StorageService.getItem('user');
            headers.usuarioBancaInternet = user.nombreLogin;
            headers.entidad = user.entidad;
            if (hasSoftToken) {
              headers.numeroDocumento = yield _storage.StorageService.getItem('DNI');
              headers.contrasena = yield _DetectID.default.getTokenValue();
              headers.tipoToken = 'SOFTTOKEN';
            } else {
              headers.numeroDocumento = tokenFisico;
              headers.contrasena = tokenFisico;
              headers.tipoToken = 'HARDTOKEN';
            }
            var tokenClient = yield _storage.StorageService.getItem('token');
            headers.tokenClient = tokenClient;
            console.log('Approbe REQUEST /api-banca-movil-empresas/v1/aprobacionesPendientes/aprobar', {
              aprobaciones: aprobaciones
            }, {
              headers: headers
            });
            var response = yield _api.default.put('/api-banca-movil-empresas/v1/aprobacionesPendientes/aprobar', {
              sesionUsuario: {
                ipDispositivo: yield _reactNativeDeviceInfo.default.getIpAddress(),
                sistemaOperativoDispositivo: _reactNative.Platform.OS + ' ' + _reactNativeDeviceInfo.default.getSystemVersion(),
                nombreDispositivo: _reactNativeDeviceInfo.default.getModel()
              },
              aprobaciones: aprobaciones
            }, {
              headers: headers
            });
            console.log('Approbe RESPONSE: ', response);
            yield this.setLoadingmessage(false);
            yield this.setState({
              selectedAprobaciones: [],
              allAprobaciones: [],
              textFilter: ''
            });
            yield this.handleResponseMeta(response.data.meta, true);
          } catch (e) {
            yield this.setLoadingmessage(false);
            yield this.handleMessages(e);
          }
        });
        function sendToken() {
          return _sendToken.apply(this, arguments);
        }
        return sendToken;
      }()
    }, {
      key: "rechazarOpreaciones",
      value: function () {
        var _rechazarOpreaciones = (0, _asyncToGenerator2.default)(function* () {
          try {
            var aprobacionesSelected = this.state.selectedAprobaciones;
            yield this.setLoadingmessage(true);
            var aprobaciones = this.state.selectedAprobaciones.map(function (ap) {
              delete ap.key;
              delete ap.typeTransfer;
              return ap;
            });
            var _this$state2 = this.state,
              hasSoftToken = _this$state2.hasSoftToken,
              tokenFisico = _this$state2.tokenFisico;
            var headers = {};
            var user = yield _storage.StorageService.getItem('user');
            headers.usuarioBancaInternet = user.nombreLogin;
            headers.entidad = user.entidad;
            if (hasSoftToken) {
              headers.numeroDocumento = yield _storage.StorageService.getItem('DNI');
              headers.contrasena = yield _DetectID.default.getTokenValue();
              headers.tipoToken = 'SOFTTOKEN';
            } else {
              headers.numeroDocumento = tokenFisico;
              headers.contrasena = tokenFisico;
              headers.tipoToken = 'HARDTOKEN';
            }
            var tokenClient = yield _storage.StorageService.getItem('token');
            headers.tokenClient = tokenClient;
            var response = yield _api.default.put('/api-banca-movil-empresas/v1/aprobacionesPendientes/rechazar', {
              aprobaciones: aprobaciones
            }, {
              headers: headers
            });
            yield this.setLoadingmessage(false);
            yield this.setState({
              selectedAprobaciones: [],
              allAprobaciones: [],
              textFilter: ''
            });
            yield this.handleResponseMeta(response.data.meta, false);
          } catch (e) {
            yield this.setLoadingmessage(false);
            yield this.handleMessages(e);
          }
        });
        function rechazarOpreaciones() {
          return _rechazarOpreaciones.apply(this, arguments);
        }
        return rechazarOpreaciones;
      }()
    }, {
      key: "setLoadingmessage",
      value: function () {
        var _setLoadingmessage = (0, _asyncToGenerator2.default)(function* (valor) {
          if (_reactNative.Platform.OS === 'ios') {
            yield new Promise(function (r) {
              return setTimeout(function () {
                return r();
              }, 1000);
            });
          }
          yield this.setState({
            loadingmessage: valor
          });
        });
        function setLoadingmessage(_x4) {
          return _setLoadingmessage.apply(this, arguments);
        }
        return setLoadingmessage;
      }()
    }, {
      key: "handleResponseMeta",
      value: function () {
        var _handleResponseMeta = (0, _asyncToGenerator2.default)(function* (meta, aprobacion) {
          var _this4 = this;
          if (!meta || !meta.mensajes) {
            yield this.getPendingApprovals();
            return;
          }
          var mensajes = meta.mensajes;
          mensajes = mensajes.map(function (men, i) {
            if (men.tipo == 'info') {
              if (aprobacion) {
                men.mensaje = '¡Sus operaciones han sido aprobadas!';
              } else {
                men.mensaje = '¡Sus operaciones han sido rechazadas!';
              }
              return (0, _jsxRuntime.jsx)(_ModalSuccessComponent.default, {
                texto: men.mensaje,
                visible: true,
                Callback: (function () {
                  var _ref3 = (0, _asyncToGenerator2.default)(function* (success) {
                    if (success) {
                      yield _this4.getPendingApprovals();
                    }
                  });
                  return function (_x7) {
                    return _ref3.apply(this, arguments);
                  };
                }())
              }, i);
            }
            if (men.tipo == 'warn') {
              return (0, _jsxRuntime.jsx)(_ModalResultDetailComponent.default, {
                texto: men.mensaje,
                titulo: '¡Alguno de sus operaciones ha fallado!',
                visible: true,
                Callback: (function () {
                  var _ref4 = (0, _asyncToGenerator2.default)(function* (success) {
                    if (success) {
                      yield _this4.getPendingApprovals();
                    }
                  });
                  return function (_x8) {
                    return _ref4.apply(this, arguments);
                  };
                }())
              }, i);
            }
            if (men.tipo = 'error') {
              return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
                TextError: men.mensaje,
                Visibility: true
              }, i);
            }
          });
          if (_reactNative.Platform.OS === 'ios') {
            yield new Promise(function (r) {
              return setTimeout(function () {
                return r();
              }, 1000);
            });
          }
          yield this.setState({
            modais: mensajes
          });
        });
        function handleResponseMeta(_x5, _x6) {
          return _handleResponseMeta.apply(this, arguments);
        }
        return handleResponseMeta;
      }()
    }, {
      key: "filter",
      value: function () {
        var _filter = (0, _asyncToGenerator2.default)(function* (title) {
          var _this5 = this;
          yield this.setState({
            textFilter: title
          });
          var filterList = this.aprobacionesFiltro;
          if (this.state.filtroTipo) {
            filterList = filterList.filter(function (ap) {
              return ap.orquestradorAprobacionesEnum.indexOf(_this5.state.textTipoFilter) > -1;
            });
          }
          var results = filterList.filter(function (a) {
            return a.numeroReferencia.trim().toLowerCase().indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 || _dateFormat.DateFormat.format(a.fecha).trim().toLowerCase().indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 || _monetary.Monetary.format(a.monto).trim().toLowerCase().indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 || a.cuentaCargo.trim().toLowerCase().indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 || a.moneda.trim().toLowerCase().indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 || typeof a.tipoServicio !== 'undefined' && a.tipoServicio.trim().toLowerCase().indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1 || typeof a.beneficiaryName !== 'undefined' && a.beneficiaryName.trim().toLowerCase().indexOf(title.trim().toLowerCase().replace(/ /g, '')) > -1;
          });
          yield this.setState({
            allAprobaciones: results,
            filtroBuscar: title.length == 0 ? false : true
          });
          yield this.checkCards();
          return results;
        });
        function filter(_x9) {
          return _filter.apply(this, arguments);
        }
        return filter;
      }()
    }, {
      key: "selectAll",
      value: function selectAll() {
        var _this6 = this;
        var cardsKeys = Object.keys(this.cards);
        var cardsVerifiy = cardsKeys.filter(function (k) {
          return _this6.cards[k] != null;
        }).length > 0;
        if (!cardsVerifiy) return;
        var cardsSelectLength = cardsKeys.filter(function (k) {
          return _this6.cards[k] && _this6.cards[k].state && _this6.cards[k].state.isChecked;
        }).length;
        var cardsSelect = cardsSelectLength > 0;
        cardsKeys.forEach(function (k) {
          var card = _this6.cards[k];
          if (!card) return;
          if (cardsSelectLength == 0) {
            card.selectCard();
          } else if (cardsSelect && !card.state.isChecked) {
            card.selectCard();
          } else if (cardsSelectLength == _this6.state.allAprobaciones.length) {
            card.selectCard();
          }
        });
      }
    }, {
      key: "checkCards",
      value: function () {
        var _checkCards = (0, _asyncToGenerator2.default)(function* () {
          var _this7 = this;
          var cardsKeys = Object.keys(this.cards);
          cardsKeys.forEach(function (k) {
            var card = _this7.cards[k];
            if (card && card.props && !card.state.isChecked) {
              var aprobacioneSelected = _this7.state.selectedAprobaciones.find(function (sa) {
                return sa.key == card.props.id;
              });
              if (aprobacioneSelected) {
                card.selectCard();
              }
            }
          });
        });
        function checkCards() {
          return _checkCards.apply(this, arguments);
        }
        return checkCards;
      }()
    }, {
      key: "showModalSoftToken",
      value: function () {
        var _showModalSoftToken = (0, _asyncToGenerator2.default)(function* () {
          if (_reactNative.Platform.OS === 'ios') {
            yield new Promise(function (r) {
              return setTimeout(function () {
                return r();
              }, 500);
            });
          }
          this.setState({
            showModalConfirmation: false,
            modalSoftToken: true
          });
        });
        function showModalSoftToken() {
          return _showModalSoftToken.apply(this, arguments);
        }
        return showModalSoftToken;
      }()
    }, {
      key: "showModalSoftTokenRechazo",
      value: function () {
        var _showModalSoftTokenRechazo = (0, _asyncToGenerator2.default)(function* () {
          if (_reactNative.Platform.OS === 'ios') {
            yield new Promise(function (r) {
              return setTimeout(function () {
                return r();
              }, 500);
            });
          }
          this.setState({
            showModalConfirmationRechazo: false,
            modalSoftTokenRechazo: true
          });
        });
        function showModalSoftTokenRechazo() {
          return _showModalSoftTokenRechazo.apply(this, arguments);
        }
        return showModalSoftTokenRechazo;
      }()
    }, {
      key: "showModalErrorState",
      value: function () {
        var _showModalErrorState = (0, _asyncToGenerator2.default)(function* (enable, text) {
          if (_reactNative.Platform.OS === 'ios') {
            yield new Promise(function (r) {
              return setTimeout(function () {
                return r();
              }, 500);
            });
          }
          this.setState({
            showModalError: enable
          });
          this.setState({
            textError: text
          });
        });
        function showModalErrorState(_x10, _x11) {
          return _showModalErrorState.apply(this, arguments);
        }
        return showModalErrorState;
      }()
    }, {
      key: "toggleFilterOptions",
      value: function toggleFilterOptions() {
        this.setState({
          isFilterOpen: !this.state.isFilterOpen
        });
      }
    }, {
      key: "onClickFilterOption",
      value: function () {
        var _onClickFilterOption = (0, _asyncToGenerator2.default)(function* (buttonIndex) {
          var aproEnum = _enum.default.filtrosAprobaciones;
          var options = Object.keys(aproEnum).map(function (k) {
            return aproEnum[k];
          });
          if (typeof buttonIndex === 'number') {
            var indice = options[buttonIndex];
            var valor = Object.keys(aproEnum).find(function (k) {
              return aproEnum[k] == indice;
            });
            this.setState({
              textTipoFilter: valor
            });
            var filterList = this.aprobacionesFiltro;
            if (valor == 'LIMPIAR') {
              if (this.state.filtroBuscar) {
                this.setState({
                  filtroTipo: false
                });
                yield this.filter(this.state.textFilter);
              } else {
                this.setState({
                  allAprobaciones: this.aprobacionesFiltro,
                  filtroTipo: false
                });
              }
              this.toggleFilterOptions();
              yield this.checkCards();
              return;
            }
            if (this.state.filtroBuscar) {
              this.setState({
                filtroTipo: false
              });
              filterList = yield this.filter(this.state.textFilter);
            }
            var results = filterList.filter(function (ap) {
              return ap.orquestradorAprobacionesEnum.indexOf(valor) > -1;
            });
            this.setState({
              allAprobaciones: results,
              filtroTipo: true,
              isFilterOpen: false
            });
            yield this.checkCards();
          }
        });
        function onClickFilterOption(_x12) {
          return _onClickFilterOption.apply(this, arguments);
        }
        return onClickFilterOption;
      }()
    }, {
      key: "render",
      value: function render() {
        var _this8 = this;
        var searchIcon = {
          family: _Icon.default.IONICONS,
          name: 'md-search',
          size: 35,
          style: _Styles.default.searchIcon
        };
        var textInput = {
          placeholder: _strings.default.consolidatedPosition.searchBarPlaceholder,
          style: _Styles.default.searchInput,
          onChangeText: function () {
            var _onChangeText = (0, _asyncToGenerator2.default)(function* (title) {
              return yield _this8.filter(title);
            });
            function onChangeText(_x13) {
              return _onChangeText.apply(this, arguments);
            }
            return onChangeText;
          }()
        };
        var aproEnum = _enum.default.filtrosAprobaciones;
        var filterOptions = Object.keys(aproEnum).map(function (k) {
          return aproEnum[k];
        });
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this8.state.messages.length > 0 && i == _this8.state.messages.length - 1,
            Callback: _this8.messageOk.bind(_this8)
          }, message.mensaje);
        });
        var getTitle = function getTitle(item) {
          return _enum.default.aprobaciones[item.orquestradorAprobacionesEnum === 'TRANSFERENCIAS' ? item.typeTransfer : item.orquestradorAprobacionesEnum];
        };
        return (0, _jsxRuntime.jsxs)(_ViewContainer.default, {
          style: {
            flex: 1,
            backgroundColor: _colors.default.white
          },
          children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
            children: (0, _jsxRuntime.jsx)(_reactNativeLoadingSpinnerOverlay.default, {
              visible: this.state.loadingmessage,
              textContent: 'Procesando...',
              textStyle: {
                color: '#FFF'
              }
            })
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.searchInputContainer,
            children: (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.searchBarContainer,
              children: (0, _jsxRuntime.jsx)(_IconTextInput.default, {
                icon: searchIcon,
                input: textInput
              })
            })
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              height: height - 275
            },
            children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
              children: [(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
                style: {
                  paddingBottom: this.state.spinner ? 10 : 0
                },
                animating: this.state.spinner,
                size: _reactNative.Platform.OS === 'ios' ? _spinnerSize.SpinnerSize.get() : this.state.size,
                color: _colors.default.lightBlue
              }), (0, _jsxRuntime.jsx)(_reactNative.FlatList, {
                data: this.state.allAprobaciones,
                renderItem: function renderItem(_ref5) {
                  var item = _ref5.item,
                    index = _ref5.index;
                  return (0, _jsxRuntime.jsx)(_CardCheckboxListComponent.default, {
                    ref: function ref(_ref7) {
                      _this8.cards[item.key] = _ref7;
                    },
                    id: item.key,
                    hideHeaderLine: index === 0,
                    onChange: (function () {
                      var _ref6 = (0, _asyncToGenerator2.default)(function* (item) {
                        return yield _this8.onChange(item);
                      });
                      return function (_x14) {
                        return _ref6.apply(this, arguments);
                      };
                    }()),
                    title: getTitle(item),
                    data: item.data,
                    flagGrupo: _this8.state.flagGrupo,
                    headerData: {
                      moneda: item.moneda,
                      monto: item.monto,
                      entidad: item.entidad
                    }
                  }, item.key);
                },
                initialNumToRender: this.state.allAprobaciones.length,
                contentContainerStyle: {
                  paddingBottom: 5,
                  paddingRight: 10
                },
                ItemSeparatorComponent: function ItemSeparatorComponent() {
                  return (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: {
                      paddingTop: 15
                    }
                  });
                }
              })]
            })
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.containerButton,
            children: [(0, _jsxRuntime.jsx)(_DynamicTextComponent.default, {
              style: {
                marginTop: 2
              },
              dynamicText: 'Total Seleccionados: ' + this.state.selectedAprobaciones.length
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.containerButtonAprobacion,
              children: [(0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
                onPress: (0, _asyncToGenerator2.default)(function* () {
                  yield _this8.setModalConfirmation();
                }),
                children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
                  style: _Styles.default.textContainer,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: {
                      color: _colors.default.white,
                      fontSize: 15
                    },
                    children: "Aprobar"
                  })
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
                style: {
                  marginTop: 3
                },
                onPress: (0, _asyncToGenerator2.default)(function* () {
                  yield _this8.setModalConfirmacionRechazar();
                }),
                children: (0, _jsxRuntime.jsx)(_ShadowContainer.default, {
                  style: _Styles.default.textContainerRechazar,
                  children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: {
                      color: _colors.default.white,
                      fontSize: 15
                    },
                    children: "Rechazar"
                  })
                })
              })]
            }), !this.state.hasSoftToken && (0, _jsxRuntime.jsx)(_ModalSoftToken.default, {
              showSuccess: (0, _asyncToGenerator2.default)(function* () {
                return yield _this8.sendToken();
              }),
              closeModalSoftToken: (0, _asyncToGenerator2.default)(function* () {
                return yield _this8.closeModalSoftToken();
              }),
              setSoftToken: this.setTokenFisico.bind(this),
              modalSoftToken: this.state.modalSoftToken,
              setModal: (0, _asyncToGenerator2.default)(function* () {
                return yield _this8.setModalSoftToken.bind(_this8);
              })
            }), !this.state.hasSoftToken && (0, _jsxRuntime.jsx)(_ModalSoftToken.default, {
              showSuccess: (0, _asyncToGenerator2.default)(function* () {
                return yield _this8.rechazarOpreaciones();
              }),
              closeModalSoftToken: (0, _asyncToGenerator2.default)(function* () {
                return yield _this8.closeModalSoftToken();
              }),
              setSoftToken: this.setTokenFisico.bind(this),
              modalSoftToken: this.state.modalSoftTokenRechazo,
              setModal: (0, _asyncToGenerator2.default)(function* () {
                return yield _this8.setModalSoftToken.bind(_this8);
              })
            }), (0, _jsxRuntime.jsx)(_ModalConfirmationComponent.default, {
              TextConfirmation: '¿Confirma la aprobación de los registros seleccionados?',
              Callback: (function () {
                var _ref16 = (0, _asyncToGenerator2.default)(function* (success) {
                  if (success) {
                    _this8.setModalTimer();
                    _this8.setState({
                      showModalConfirmation: false
                    });
                  } else {
                    _this8.setState({
                      showModalConfirmation: false
                    });
                  }
                });
                return function (_x15) {
                  return _ref16.apply(this, arguments);
                };
              }()),
              Visibility: this.state.showModalConfirmation
            }), (0, _jsxRuntime.jsx)(_ModalConfirmationComponent.default, {
              TextConfirmation: 'Usted ha seleccionado operaciones BCR, sí son firmadas después de la 01:00 p.m. se procesarán al día siguiente útil. ¿Desea continuar?',
              Callback: (function () {
                var _ref17 = (0, _asyncToGenerator2.default)(function* (success) {
                  if (success) {
                    if (_this8.state.hasSoftToken) {
                      _this8.setState({
                        showModalConfirmation: false
                      });
                      yield _this8.sendToken();
                    } else {
                      yield _this8.showModalSoftToken();
                    }
                  }
                  _this8.setState({
                    showModalTimer: false
                  });
                });
                return function (_x16) {
                  return _ref17.apply(this, arguments);
                };
              }()),
              Visibility: this.state.showModalTimer
            }), (0, _jsxRuntime.jsx)(_ModalConfirmationComponent.default, {
              TextConfirmation: '¿Confirma el rechazo de los registros seleccionados?',
              Callback: (function () {
                var _ref18 = (0, _asyncToGenerator2.default)(function* (success) {
                  if (success) {
                    if (_this8.state.hasSoftToken) {
                      _this8.setState({
                        showModalConfirmationRechazo: false
                      });
                      yield _this8.rechazarOpreaciones();
                    } else {
                      yield _this8.showModalSoftTokenRechazo();
                    }
                  } else {
                    _this8.setState({
                      showModalConfirmationRechazo: false
                    });
                  }
                });
                return function (_x17) {
                  return _ref18.apply(this, arguments);
                };
              }()),
              Visibility: this.state.showModalConfirmationRechazo
            }), (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
              TextError: this.state.textError,
              Visibility: this.state.showModalError,
              Callback: function Callback() {
                return _this8.setState({
                  showModalError: false
                });
              }
            }), this.state.modais]
          }), messageViews, (0, _jsxRuntime.jsx)(_nativeBase.Actionsheet, {
            isOpen: this.state.isFilterOpen,
            onClose: this.toggleFilterOptions,
            children: (0, _jsxRuntime.jsxs)(_nativeBase.Actionsheet.Content, {
              children: [(0, _jsxRuntime.jsx)(_nativeBase.Box, {
                w: "100%",
                h: 60,
                px: 4,
                justifyContent: "center",
                children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  fontSize: "16",
                  color: "gray.500",
                  _dark: {
                    color: 'gray.300'
                  },
                  children: "Filtrar por tipo"
                })
              }), filterOptions.map(function (option, index) {
                return (0, _jsxRuntime.jsx)(_nativeBase.Actionsheet.Item, {
                  onPress: function onPress() {
                    return _this8.onClickFilterOption(index);
                  },
                  children: option
                }, option);
              })]
            })
          })]
        });
      }
    }]);
    return PendingApprovals;
  }(_react.Component);
