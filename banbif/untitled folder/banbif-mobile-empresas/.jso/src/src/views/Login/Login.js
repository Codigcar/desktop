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
  var _reactNativeSplashScreen = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeElements = _$$_REQUIRE(_dependencyMap[11]);
  var _Button = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _storage = _$$_REQUIRE(_dependencyMap[18]);
  var _auth = _$$_REQUIRE(_dependencyMap[19]);
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _ModalErrorComponentUpdate = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));
  var _reactNativeLoadingSpinnerOverlay = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _DetectID = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23]));
  var _enviroments = _$$_REQUIRE(_dependencyMap[24]);
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25]));
  var _ModalComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26]));
  var _version = _$$_REQUIRE(_dependencyMap[27]);
  var _cryptoJs = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[28]));
  var _reactNativeExitApp = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[29]));
  var _TimerViewComponent2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[30]));
  var _CommonMessageModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[31]));
  var _CommonMessageModal2 = _$$_REQUIRE(_dependencyMap[32]);
  var _deviceInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[33]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[34]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var playstore = 'https://play.google.com/store/apps/details?id=com.banbifbancaempresasapp';
  var appstore = 'https://apps.apple.com/us/app/banbif-empresas/id1270782715';
  var maxIntentos = 0;
  var versionAppEmpresasIOS = [];
  var versionAppEmpresasAndroid = [];
  var currentVersionAnd = [];
  var currentVersionIOS = [];
  var Login = exports.default = function (_TimerViewComponent) {
    (0, _inherits2.default)(Login, _TimerViewComponent);
    function Login(props) {
      var _this;
      (0, _classCallCheck2.default)(this, Login);
      _this = _callSuper(this, Login, [props]);
      _this.handleBackButtonPressAndroid = function () {
        if (_reactNative.Platform.OS != 'ios') {
          _reactNative.BackHandler.exitApp();
        } else {
          _reactNative.BackHandler.exitApp();
        }
      };
      _this.doSesion = function () {
        var _ref = (0, _asyncToGenerator2.default)(function* (event) {
          try {
            _this.closeDialogSesion();
            yield _auth.AuthService.deleteSesionUsuarioLogin();
            yield _this.guardarRecordarMe();
            _this.props.navigation.navigate('MainMenu');
            _this.setState({
              textContrasena: ''
            });
          } catch (e) {
            _this.setState({
              messages: [{
                mensaje: _strings.default.messages.error
              }]
            });
          }
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
      _this.onMessage = function (event) {
        if (event && event.nativeEvent.data) {
          if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
            return;
          } else {
            setTimeout(function () {
              _this.handleLogin();
            }, 1500);
          }
        }
      };
      _this.messageOk = _this.messageOk.bind((0, _assertThisInitialized2.default)(_this));
      _this.state = {
        isConnected: null,
        avisoEntidad: false,
        avisoNombre: false,
        avisoContrasena: false,
        textEntidad: 'COOPPACI',
        textNombre: 'MHERRERA',
        textContrasena: '123456',
        textButtonLogin: _strings.default.login.buttonLogin,
        textButtonSofttoken: _strings.default.login.butonSofttoken,
        errorMessage: 'A',
        loggedInUser: null,
        userResponse: null,
        recordarMe: false,
        messages: [],
        root: [],
        messagesSesion: [],
        messagesUpdate: [],
        spinner: false,
        hasSoftToken: false,
        lastUsername: '',
        showTimeoutModal: false
      };
      _this.captchaRef = null;
      _this.focusListener = null;
      _this.buttonAtributes = [{
        style: {
          flex: 1,
          elevation: 8,
          backgroundColor: _colors.default.lightBlue,
          width: '50%',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5
        },
        text: {
          title: 'Iniciar de todos modos'
        },
        onPress: {
          onPress: function () {
            var _onPress = (0, _asyncToGenerator2.default)(function* () {
              _this.doSesion();
            });
            function onPress() {
              return _onPress.apply(this, arguments);
            }
            return onPress;
          }()
        }
      }, {
        style: {
          flex: 1,
          elevation: 8,
          backgroundColor: _colors.default.customGrey,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          margin: 5
        },
        text: {
          title: 'Cancelar'
        },
        onPress: {
          onPress: function () {
            var _onPress2 = (0, _asyncToGenerator2.default)(function* () {
              _this.closeDialogSesion();
            });
            function onPress() {
              return _onPress2.apply(this, arguments);
            }
            return onPress;
          }()
        }
      }];
      return _this;
    }
    (0, _createClass2.default)(Login, [{
      key: "componentDidUpdate",
      value: function () {
        var _componentDidUpdate = (0, _asyncToGenerator2.default)(function* (prevProps, prevState) {
          var _this$props$route, _this$props$route$par;
          var isTimeout = (_this$props$route = this.props.route) == null ? undefined : (_this$props$route$par = _this$props$route.params) == null ? undefined : _this$props$route$par.isTimeout;
          if (this.state.showTimeoutModal !== isTimeout && isTimeout) {
            this.setState({
              showTimeoutModal: true
            });
          }
        });
        function componentDidUpdate(_x2, _x3) {
          return _componentDidUpdate.apply(this, arguments);
        }
        return componentDidUpdate;
      }()
    }, {
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2.default)(function* () {
          var _this2 = this;
          this._unsubscribe = this.props.navigation.addListener('focus', (0, _asyncToGenerator2.default)(function* () {
            var statusRecordar = yield _storage.StorageService.getItemNotBase64('recordarMe');
            if (statusRecordar) {
              var textEntidadNumeric = yield _storage.StorageService.getItemNotBase64('textEntidad');
              var textEntidad = textEntidadNumeric.toString();
              var textNombre = yield _storage.StorageService.getItemNotBase64('textNombre');
              _this2.setState({
                recordarMe: true,
                textEntidad: textEntidad,
                textNombre: textNombre
              });
            }
            var hasSoftToken = Boolean(yield _storage.StorageService.getItemStorage('hasSoftToken'));
            try {
              if (hasSoftToken) {
                _DetectID.default.init(_enviroments.enviroment.detectIDUrl);
              }
            } catch (e) {}
            _this2.setState({
              hasSoftToken: hasSoftToken
            });
          }));
          if (_enviroments.enviroment.disableDebugEmulators) {
            this.isRooted();
          }
          if (_reactNative.Platform.OS !== 'ios') {
            _reactNativeSplashScreen.default.hide();
          }
        });
        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }
        return componentDidMount;
      }()
    }, {
      key: "componentWillUnmount",
      value: function () {
        var _componentWillUnmount = (0, _asyncToGenerator2.default)(function* () {
          this._unsubscribe();
        });
        function componentWillUnmount() {
          return _componentWillUnmount.apply(this, arguments);
        }
        return componentWillUnmount;
      }()
    }, {
      key: "getConfigurationInitial",
      value: function () {
        var _getConfigurationInitial = (0, _asyncToGenerator2.default)(function* () {
          try {
            var _enviroment$versionAp, _enviroment$versionAp2;
            var response = yield _api.default.get(_enviroments.enviroment.clientInformationInitial + "/api-empresas-mobile-conf/v1/client-information");
            console.log("🚀 ------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: Login.js:185 ~ Login ~ getConfigurationInitial ~ response:", response);
            console.log("🚀 ------------------------------------------------------------------------------🚀");
            var configuration = response.data;
            yield this.configuracion(configuration);
            this.state.messages = [];
            maxIntentos = _enviroments.enviroment.numeroIntentosLogin;
            versionAppEmpresasIOS = (_enviroment$versionAp = _enviroments.enviroment.versionAppEmpresasIOS) == null ? undefined : _enviroment$versionAp.split('.').map(Number);
            versionAppEmpresasAndroid = (_enviroment$versionAp2 = _enviroments.enviroment.versionAppEmpresasAndroid) == null ? undefined : _enviroment$versionAp2.split('.').map(Number);
            currentVersionAnd = _version.versionAnd == null ? undefined : _version.versionAnd.split('.').map(Number);
            currentVersionIOS = _version.versionIOS == null ? undefined : _version.versionIOS.split('.').map(Number);
            this.isUpdate();
          } catch (err) {
            this.setState({
              messages: [{
                mensaje: _strings.default.messages.error
              }]
            });
          }
        });
        function getConfigurationInitial() {
          return _getConfigurationInitial.apply(this, arguments);
        }
        return getConfigurationInitial;
      }()
    }, {
      key: "configuracion",
      value: function () {
        var _configuracion = (0, _asyncToGenerator2.default)(function* (configuration) {
          _enviroments.enviroment.baseURL = configuration.clientBaseUrl;
          _enviroments.enviroment.ssoUrl = configuration.clientSsoUrl;
          _enviroments.enviroment.client_id = configuration.clientId;
          _enviroments.enviroment.client_secret = configuration.clientSecret;
          _enviroments.enviroment.maximumApprove = configuration.maximumApproveApprovalsSlopes;
          _enviroments.enviroment.whiteMarchProduction = configuration.whiteMarchProduction;
          _enviroments.enviroment.numeroIntentosLogin = configuration.numeroIntentosLogin;
          _enviroments.enviroment.versionAppEmpresasAndroid = configuration.versionAppEmpresasAndroid;
          _enviroments.enviroment.versionAppEmpresasIOS = configuration.versionAppEmpresasIOS;
          _enviroments.enviroment.templateEmailInicioSesion = configuration.templateEmailInicioSesion;
          _api.default.defaults.baseURL = _enviroments.enviroment.baseURL;
          _enviroments.enviroment.detectIDUrl = configuration.clientDetectIdUrl;
          _enviroments.enviroment.key = configuration.encriptKey;
          _enviroments.enviroment.iv = configuration.encriptIv;
          _enviroments.enviroment.siteKeyCaptcha = configuration.siteKeyCaptcha;
          _enviroments.enviroment.emailBanbif = configuration.emailBanbif;
          _enviroments.enviroment.shaDomain = configuration.certificateShaDomain;
        });
        function configuracion(_x4) {
          return _configuracion.apply(this, arguments);
        }
        return configuracion;
      }()
    }, {
      key: "handleLogin",
      value: function () {
        var _handleLogin = (0, _asyncToGenerator2.default)(function* () {
          var _this$state = this.state,
            textEntidad = _this$state.textEntidad,
            textNombre = _this$state.textNombre,
            textContrasena = _this$state.textContrasena;
          yield _storage.StorageService.setItem('entidad', textEntidad.trim());
          yield _storage.StorageService.setItem('nombreLogin', textNombre.trim());
          this.setState({
            avisoEntidad: false,
            avisoContrasena: false,
            avisoNombre: false
          });
          yield this.setState({
            spinner: true
          });
          try {
            yield _auth.AuthService.getInitial();
            var encrypted = yield _auth.AuthService.encrypt(textContrasena);
            this.doLogin(encrypted.toString());
          } catch (e) {
            yield this.setState({
              spinner: false
            });
          }
        });
        function handleLogin() {
          return _handleLogin.apply(this, arguments);
        }
        return handleLogin;
      }()
    }, {
      key: "doLogin",
      value: function () {
        var _doLogin = (0, _asyncToGenerator2.default)(function* (string) {
          var _this$state2 = this.state,
            textEntidad = _this$state2.textEntidad,
            textNombre = _this$state2.textNombre;
          try {
            var enutf = string.toString(_cryptoJs.default.enc.Utf8);
            yield _auth.AuthService.saveSession(textNombre, enutf, textEntidad);
            yield this.guardarRecordarMe();
            yield this.setState({
              spinner: false
            });
            this.props.navigation.navigate('MainMenu');
            _reactNative.BackHandler.removeEventListener();
            this.setState({
              textContrasena: ''
            });
            this.setState({
              lastUsername: ''
            });
          } catch (e) {
            yield this.setState({
              spinner: false
            });
            this.handleMessages(e);
          }
        });
        function doLogin(_x5) {
          return _doLogin.apply(this, arguments);
        }
        return doLogin;
      }()
    }, {
      key: "guardarRecordarMe",
      value: function () {
        var _guardarRecordarMe = (0, _asyncToGenerator2.default)(function* () {
          if (this.state.recordarMe) {
            var _this$state3 = this.state,
              textEntidad = _this$state3.textEntidad,
              textNombre = _this$state3.textNombre;
            yield _storage.StorageService.setItemNotBase64('textEntidad', textEntidad.trim());
            yield _storage.StorageService.setItemNotBase64('textNombre', textNombre.trim());
            yield _storage.StorageService.setItemNotBase64('recordarMe', 'true');
          } else {
            this.setState({
              textNombre: '',
              textContrasena: '',
              textEntidad: ''
            });
            var oldStatusRecordar = yield _storage.StorageService.getItemNotBase64('recordarMe');
            if (oldStatusRecordar) {
              yield _storage.StorageService.removeItem('textEntidad');
              yield _storage.StorageService.removeItem('textNombre');
              yield _storage.StorageService.removeItem('recordarMe');
            }
          }
        });
        function guardarRecordarMe() {
          return _guardarRecordarMe.apply(this, arguments);
        }
        return guardarRecordarMe;
      }()
    }, {
      key: "runSSLPinningLogin",
      value: function () {
        var _runSSLPinningLogin = (0, _asyncToGenerator2.default)(function* () {
          yield _auth.AuthService.runSSLPinning();
          if (_enviroments.enviroment.pinninOk) {
            yield this.validateFields();
          }
        });
        function runSSLPinningLogin() {
          return _runSSLPinningLogin.apply(this, arguments);
        }
        return runSSLPinningLogin;
      }()
    }, {
      key: "validateFields",
      value: function () {
        var _validateFields = (0, _asyncToGenerator2.default)(function* () {
          var _this$state4 = this.state,
            textEntidad = _this$state4.textEntidad,
            textNombre = _this$state4.textNombre,
            textContrasena = _this$state4.textContrasena;
          if (!textEntidad) {
            this.setState({
              avisoEntidad: true
            });
            yield this.setState({
              messages: [{
                mensaje: '¡Ingrese los campos obligatorios!'
              }]
            });
          } else {
            this.setState({
              avisoEntidad: false
            });
          }
          if (!textNombre) {
            this.setState({
              avisoNombre: true
            });
            yield this.setState({
              messages: [{
                mensaje: '¡Ingrese los campos obligatorios!'
              }]
            });
          } else {
            this.setState({
              avisoNombre: false
            });
          }
          if (!textContrasena) {
            this.setState({
              avisoContrasena: true
            });
            yield this.setState({
              messages: [{
                mensaje: '¡Ingrese los campos obligatorios!'
              }]
            });
          } else {
            if (textContrasena.length > 10) {
              this.setState({
                avisoContrasena: true
              });
              yield this.setState({
                messages: [{
                  mensaje: 'Longitud de contraseña inválida'
                }]
              });
            } else {
              if (textEntidad && textNombre && textContrasena) {
                this.setState({
                  avisoEntidad: false,
                  avisoContrasena: false,
                  avisoNombre: false
                });
                this.handleLogin();
              }
            }
          }
        });
        function validateFields() {
          return _validateFields.apply(this, arguments);
        }
        return validateFields;
      }()
    }, {
      key: "hasMessage",
      value: function hasMessage(err) {
        return err && err.response && err.response.data && err.response.data.meta && err.response.data.meta.mensajes && err.response.data.meta.mensajes.length > 0;
      }
    }, {
      key: "handleMessages",
      value: function () {
        var _handleMessages = (0, _asyncToGenerator2.default)(function* (err) {
          var _this$state5 = this.state,
            textEntidad = _this$state5.textEntidad,
            textNombre = _this$state5.textNombre;
          if (err && err.message && err.message.indexOf('401') > -1) {
            try {
              this.setState({
                lastUsername: textNombre
              });
              this.setState({
                messages: [{
                  mensaje: '¡Nombre de usuario o contraseña inválidos!'
                }]
              });
            } catch (err) {
              try {
                if (err.response.data.meta.mensajes[0].mensaje == 'El usuario se encuentra suspendido') {
                  this.setState({
                    messages: [{
                      mensaje: 'Usuario Suspendido. Comunícate con el administrador de BIFnet Empresarial de tu Empresa'
                    }]
                  });
                } else {
                  this.setState({
                    messages: [{
                      mensaje: '¡Nombre de usuario o contraseña inválidos!'
                    }]
                  });
                }
              } catch (err) {
                this.setState({
                  messages: [{
                    mensaje: '¡Nombre de usuario o contraseña inválidos!'
                  }]
                });
              }
            }
          } else if (this.hasMessage(err)) {
            try {
              var _err$response$data$me;
              var message = err.response.data.meta.mensajes[0].mensaje;
              if (message == 'El usuario se encuentra suspendido') {
                var initialState = {
                  textEntidad: '',
                  textNombre: '',
                  textContrasena: '',
                  recordarMe: false
                };
                var storageKeysToRemove = ['password', 'entidad', 'nombreLogin', 'DNI', 'identificador', 'access_token_conf', 'textNombre'];
                this.setState(initialState);
                yield _storage.StorageService.removeItems(storageKeysToRemove);
              }
              if (err.response.data.meta.mensajes[0].mensaje.includes('sesión')) {
                this.setState({
                  messagesSesion: [{
                    mensaje: 'Ya existe una sesión abierta en otro dispositivo. ¿Desea continuar en este dispositivo?'
                  }]
                });
              } else if (err.response.data.meta.mensajes[0].mensaje == '¡Registro no encontrado!') {
                this.setState({
                  messages: [{
                    mensaje: '¡Nombre de usuario o contraseña inválidos!'
                  }]
                });
              } else if ((_err$response$data$me = err.response.data.meta.mensajes[0].mensaje) != null && _err$response$data$me.includes('inválido')) {
                var _err$response$data$me2;
                this.setState({
                  messages: [{
                    title: err.response.data.meta.mensajes[0].title,
                    mensaje: 'Contraseña incorrecta',
                    mensaje1: (_err$response$data$me2 = err.response.data.meta.mensajes[0]) == null ? undefined : _err$response$data$me2.mensaje1
                  }]
                });
              } else {
                this.setState({
                  messages: err.response.data.meta.mensajes
                });
              }
            } catch (err) {
              this.setState({
                messages: err.response.data.meta.mensajes
              });
            }
          } else {
            this.setState({
              messages: [{
                mensaje: _strings.default.messages.error
              }]
            });
          }
        });
        function handleMessages(_x6) {
          return _handleMessages.apply(this, arguments);
        }
        return handleMessages;
      }()
    }, {
      key: "hasError",
      value: function hasError(err) {
        return err && err.status != 200 && err.status != 201;
      }
    }, {
      key: "closeDialogSesion",
      value: function closeDialogSesion() {
        var _messages = this.state.messagesSesion;
        _messages.pop();
        this.setState({
          messagesSesion: _messages
        });
      }
    }, {
      key: "messageOk",
      value: function messageOk() {
        var _messages = this.state.messages;
        _messages.pop();
        this.setState({
          messages: _messages
        });
      }
    }, {
      key: "messageOkUpdate",
      value: function messageOkUpdate() {
        var _messages = this.state.messagesUpdate;
        _messages.pop();
        if (_reactNative.Platform.OS != 'ios') {
          _reactNative.Linking.openURL(playstore);
        } else {
          _reactNative.Linking.openURL(appstore);
        }
      }
    }, {
      key: "isRooted",
      value: function () {
        var _isRooted = (0, _asyncToGenerator2.default)(function* () {
          var isRoot = yield _deviceInfo.default.isRoot();
          if (isRoot) {
            this.setState({
              root: [{
                mensaje: 'No es posible ejecutar la App en este equipo rooteado'
              }]
            });
          }
        });
        function isRooted() {
          return _isRooted.apply(this, arguments);
        }
        return isRooted;
      }()
    }, {
      key: "showAlertForUpdate",
      value: function () {
        var _showAlertForUpdate = (0, _asyncToGenerator2.default)(function* () {
          this.setState({
            messagesUpdate: [{
              mensaje: 'Hay una actualización disponible, por favor proceda a instalarla para continuar.'
            }]
          });
        });
        function showAlertForUpdate() {
          return _showAlertForUpdate.apply(this, arguments);
        }
        return showAlertForUpdate;
      }()
    }, {
      key: "isUpdate",
      value: function () {
        var _isUpdate = (0, _asyncToGenerator2.default)(function* () {
          if (_reactNative.Platform.OS != 'ios') {} else {
            if (versionAppEmpresasIOS[0] <= currentVersionIOS[0]) {
              if (versionAppEmpresasIOS[1] <= currentVersionIOS[1]) {
                if (versionAppEmpresasIOS[2] <= currentVersionIOS[2]) {} else {
                  this.showAlertForUpdate();
                }
              } else {
                this.showAlertForUpdate();
              }
            } else {
              this.showAlertForUpdate();
            }
          }
        });
        function isUpdate() {
          return _isUpdate.apply(this, arguments);
        }
        return isUpdate;
      }()
    }, {
      key: "messageOkRoot",
      value: function messageOkRoot() {
        if (_reactNative.Platform.OS != 'ios') {
          _reactNative.BackHandler.exitApp();
        } else {
          _reactNativeExitApp.default.exitApp();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        var navigate = this.props.navigation.navigate;
        var hasSoftToken = this.state.hasSoftToken;
        var messageViewsUpdate = this.state.messagesUpdate.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponentUpdate.default, {
            TextError: message.mensaje,
            Visibility: _this3.state.messagesUpdate.length > 0 && i == _this3.state.messagesUpdate.length - 1,
            Callback: _this3.messageOkUpdate.bind(_this3)
          }, message.mensaje);
        });
        var messageViews = this.state.messages.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_CommonMessageModal.default, {
            title: message == null ? undefined : message.title,
            text: message.mensaje,
            text1: message == null ? undefined : message.mensaje1,
            visible: _this3.state.messages.length > 0 && i == _this3.state.messages.length - 1,
            buttonText: "Cerrar",
            callback: _this3.messageOk,
            status: (message == null ? undefined : message.status) || _CommonMessageModal2.MODAL_TYPES.ERROR
          }, message.mensaje);
        });
        var messageRoot = this.state.root.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: message.mensaje,
            Visibility: _this3.state.root.length > 0 && i == _this3.state.root.length - 1,
            Callback: _this3.messageOkRoot.bind(_this3)
          }, message.mensaje);
        });
        var messageRootSesion = this.state.messagesSesion.map(function (message, i) {
          return (0, _jsxRuntime.jsx)(_ModalComponent.default, {
            buttons: _this3.buttonAtributes,
            isVisible: _this3.state.messagesSesion.length > 0 && i == _this3.state.messagesSesion.length - 1,
            onClose: function onClose() {
              _this3.closeDialogSesion.bind(_this3);
            },
            textModal: message.mensaje
          }, message.mensaje);
        });
        return (0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
          children: [this.state.showTimeoutModal && (0, _jsxRuntime.jsx)(_CommonMessageModal.default, {
            title: 'Su sesión ha expirado',
            visible: true,
            callback: function callback() {
              _this3.props.navigation.setParams({
                isTimeout: false
              });
              _this3.setState({
                showTimeoutModal: false
              });
            },
            status: _CommonMessageModal2.MODAL_TYPES.WARNING
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.LoginContainer,
            children: [(0, _jsxRuntime.jsx)(_reactNativeLoadingSpinnerOverlay.default, {
              visible: this.state.spinner,
              textContent: 'Cargando...',
              textStyle: {
                color: '#FFF'
              }
            }), (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: _Styles.default.LogoContainer,
              children: (0, _jsxRuntime.jsx)(_reactNative.Image, {
                style: {
                  width: 139,
                  height: 63
                },
                source: _images.default.logoTextoLogin
              })
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.ContentContainer,
              children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.IconAndTextInputContainer,
                children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                  size: 30,
                  name: "ios-briefcase",
                  family: _Icon.default.IONICONS,
                  color: this.state.avisoEntidad == false ? _colors.default.lightBlue : 'red'
                }), (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                  style: [_Styles.default.TextInputStyle, {
                    borderLeftColor: this.state.avisoEntidad == false ? _colors.default.lightBlue : 'red'
                  }],
                  placeholder: _strings.default.login.inputEntidadPlaceholder,
                  maxLength: 10,
                  onChangeText: function onChangeText(textEntidad) {
                    return _this3.setState({
                      textEntidad: textEntidad.trim(),
                      avisoEntidad: false
                    });
                  },
                  value: this.state.textEntidad,
                  placeholderTextColor: _colors.default.lightGrey,
                  keyboardType: "default"
                })]
              }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.IconAndTextInputContainer,
                children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                  size: 30,
                  name: "person-circle-outline",
                  family: _Icon.default.IONICONS,
                  color: this.state.avisoNombre == false ? _colors.default.lightBlue : 'red'
                }), (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                  style: [_Styles.default.TextInputStyle, {
                    borderLeftColor: this.state.avisoNombre == false ? _colors.default.lightBlue : 'red'
                  }],
                  placeholder: _strings.default.login.inputNombrePlaceholder,
                  maxLength: 10,
                  onChangeText: function onChangeText(textNombre) {
                    return _this3.setState({
                      textNombre: textNombre.trim(),
                      avisoNombre: false
                    });
                  },
                  value: this.state.textNombre,
                  placeholderTextColor: _colors.default.lightGrey,
                  keyboardType: "default"
                })]
              }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: _Styles.default.IconAndTextInputContainer,
                children: [(0, _jsxRuntime.jsx)(_Icon.default, {
                  style: {
                    transform: [{
                      rotate: '180deg'
                    }]
                  },
                  size: 30,
                  name: "ios-key",
                  family: _Icon.default.IONICONS,
                  color: this.state.avisoContrasena == false ? _colors.default.lightBlue : 'red'
                }), (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
                  style: [_Styles.default.TextInputStyle, {
                    borderLeftColor: this.state.avisoContrasena == false ? _colors.default.lightBlue : 'red'
                  }],
                  placeholder: _strings.default.login.inputContrasenaPlaceholder,
                  onChangeText: function onChangeText(textContrasena) {
                    _this3.setState({
                      textContrasena: textContrasena,
                      avisoContrasena: false
                    });
                  },
                  value: this.state.textContrasena,
                  maxLength: 10,
                  placeholderTextColor: _colors.default.lightGrey,
                  secureTextEntry: true,
                  keyboardType: "numeric",
                  contextMenuHidden: true
                })]
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.PaddingTopView,
                children: (0, _jsxRuntime.jsx)(_Button.default, {
                  color: _colors.default.lightBlue,
                  width: 150,
                  height: 40,
                  textButton: _strings.default.login.buttonLogin,
                  action: (0, _asyncToGenerator2.default)(function* () {
                    return yield _this3.runSSLPinningLogin();
                  })
                })
              }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                children: (0, _jsxRuntime.jsx)(_reactNativeElements.CheckBox, {
                  title: _strings.default.login.checkBoxText,
                  textStyle: _Styles.default.TextCheckBoxStyle,
                  center: true,
                  checked: this.state.recordarMe,
                  onPress: (0, _asyncToGenerator2.default)(function* () {
                    return yield _this3.setState({
                      recordarMe: !_this3.state.recordarMe
                    });
                  }),
                  uncheckedColor: _colors.default.darkGrey,
                  containerStyle: {
                    backgroundColor: _colors.default.white,
                    borderColor: _colors.default.white
                  }
                })
              })]
            }), hasSoftToken && (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                alignSelf: 'center',
                paddingTop: '10%'
              },
              children: (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: [_Styles.default.ContainerSofttoken],
                children: (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  onPress: function onPress() {
                    _this3.goToPosicion(navigate);
                  },
                  children: (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: _Styles.default.ViewSofttoken,
                    children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                      children: (0, _jsxRuntime.jsx)(_Icon.default, {
                        family: _Icon.default.IONICONS,
                        name: 'lock-closed',
                        size: 27,
                        style: {
                          color: _colors.default.white
                        }
                      })
                    }), (0, _jsxRuntime.jsx)(_reactNative.View, {
                      children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: _Styles.default.TextSofttoken,
                        children: _strings.default.login.butonSofttoken
                      })
                    })]
                  })
                })
              })
            }), messageViews, messageRoot, messageRootSesion, messageViewsUpdate]
          })]
        });
      }
    }, {
      key: "goToPosicion",
      value: function goToPosicion(navigate) {
        _reactNative.BackHandler.removeEventListener('hardwareBackPress');
        navigate('SoftTokenLogin', {
          isConnected: true
        });
      }
    }, {
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          yield this.getConfigurationInitial();
        });
        function UNSAFE_componentWillMount() {
          return _UNSAFE_componentWillMount.apply(this, arguments);
        }
        return UNSAFE_componentWillMount;
      }()
    }]);
    return Login;
  }(_TimerViewComponent2.default);
