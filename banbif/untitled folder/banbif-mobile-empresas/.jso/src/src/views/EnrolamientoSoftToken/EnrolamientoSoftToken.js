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
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _nativeBase = _$$_REQUIRE(_dependencyMap[10]);
  var _Button = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _Icon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _colors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _storage = _$$_REQUIRE(_dependencyMap[15]);
  var _ModalHandleError2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _spinnerSize = _$$_REQUIRE(_dependencyMap[17]);
  var _softToken = _$$_REQUIRE(_dependencyMap[18]);
  var _strings = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _ModalErrorComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));
  var _reactNativeLoadingSpinnerOverlay = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _DetectID = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23]));
  var _enviroments = _$$_REQUIRE(_dependencyMap[24]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[25]);
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var EnrolamientoSoftToken = exports.default = function (_ModalHandleError) {
    (0, _inherits2.default)(EnrolamientoSoftToken, _ModalHandleError);
    function EnrolamientoSoftToken(props) {
      var _this;
      (0, _classCallCheck2.default)(this, EnrolamientoSoftToken);
      _this = _callSuper(this, EnrolamientoSoftToken, [props]);
      _this.onInputChange = function (value) {
        _this.setState({
          code: value
        });
      };
      _this.onInputChange = _this.onInputChange.bind((0, _assertThisInitialized2.default)(_this));
      _this.state = Object.assign(_this.state, {
        email: '',
        redirect: true,
        size: 0,
        loading: false,
        textError: '',
        showModalError: false,
        code: ''
      });
      return _this;
    }
    (0, _createClass2.default)(EnrolamientoSoftToken, [{
      key: "UNSAFE_componentWillMount",
      value: function () {
        var _UNSAFE_componentWillMount = (0, _asyncToGenerator2.default)(function* () {
          var email = (yield _storage.StorageService.getItem('user')).email;
          this.enviarEmail();
          this.setState({
            email: email
          });
        });
        function UNSAFE_componentWillMount() {
          return _UNSAFE_componentWillMount.apply(this, arguments);
        }
        return UNSAFE_componentWillMount;
      }()
    }, {
      key: "friendlyMessage",
      value: function friendlyMessage(err) {
        err.response.data.meta.mensajes.forEach(function (item) {
          if (_strings.default.messages.enrolamientoSoftToken[item.codigo]) {
            item.mensaje = _strings.default.messages.enrolamientoSoftToken[item.codigo];
          }
        });
        return err;
      }
    }, {
      key: "shouldRedirectToActivationCode",
      value: function shouldRedirectToActivationCode(err) {
        var redirectToActivationCode = false;
        err.response.data.meta.mensajes.forEach(function (item) {
          if (item.codigo == _strings.default.messages.enrolamientoSoftToken.codes.softTokenProcessing) {
            redirectToActivationCode = true;
          }
        });
        return redirectToActivationCode;
      }
    }, {
      key: "enviarEmail",
      value: function () {
        var _enviarEmail = (0, _asyncToGenerator2.default)(function* () {
          yield this.setState({
            loading: true
          });
          try {
            yield _softToken.SoftTokenService.enviarCodigoEmail();
          } catch (err) {
            if (this.hasMessage(err)) {
              if (this.shouldRedirectToActivationCode(err)) {} else {
                var erro = this.friendlyMessage(err);
                this.handleMessages(erro);
              }
            } else {
              yield this.setState({
                textError: 'DNI o correo electrónico no encontrado',
                showModalError: true
              });
            }
          }
          yield this.setState({
            loading: false
          });
        });
        function enviarEmail() {
          return _enviarEmail.apply(this, arguments);
        }
        return enviarEmail;
      }()
    }, {
      key: "hasMessage",
      value: function hasMessage(err) {
        return err && err.response && err.response.data && err.response.data.meta && err.response.data.meta.mensajes && err.response.data.meta.mensajes.length > 0;
      }
    }, {
      key: "validarCodigo",
      value: function () {
        var _validarCodigo = (0, _asyncToGenerator2.default)(function* () {
          if (this.state.code === '') return;
          var navigation = this.props.navigation;
          var response = null;
          var throwErr = false;
          yield this.setState({
            loading: true,
            size: _spinnerSize.SpinnerSize.get()
          });
          try {
            console.log("🚀 --------------------------------------------------------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: EnrolamientoSoftToken.js:118 ~ EnrolamientoSoftToken ~ validarCodigo ~ enviroment.detectIDUrl:", _enviroments.enviroment.detectIDUrl);
            console.log("🚀 --------------------------------------------------------------------------------------------------------------------------------🚀");
            console.log("🚀 ------------------------------------------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: EnrolamientoSoftToken.js:121 ~ EnrolamientoSoftToken ~ validarCodigo ~ this.state.code:", this.state.code);
            console.log("🚀 ------------------------------------------------------------------------------------------------------------------🚀");
            response = yield _DetectID.default.deviceRegistrationByCode(_enviroments.enviroment.detectIDUrl + this.state.code);
            console.log("🚀 ----------------------------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: EnrolamientoSoftToken.js:117 ~ EnrolamientoSoftToken ~ validarCodigo ~ response:", response);
            console.log("🚀 ----------------------------------------------------------------------------------------------------🚀");
            console.log("🚀 1----------------------------------------------------------------------------------------------------🚀");
            yield this.setState({
              loading: false
            });
            var successCode = _strings.default.messages.enrolamientoCodigoActivacion.codes.softokenEnrolledSuccessfully;
            console.log("🚀 ----------------------------------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: EnrolamientoSoftToken.js:128 ~ EnrolamientoSoftToken ~ validarCodigo ~ successCode:", successCode);
            console.log("🚀 ----------------------------------------------------------------------------------------------------------🚀");
            console.log("🚀 2----------------------------------------------------------------------------------------------------🚀");
            if (response === successCode) {
              console.log("🚀 3----------------------------------------------------------------------------------------------------🚀");
              yield _storage.StorageService.setItemStorage('hasSoftToken', 'true');
              navigation.navigate('EnrolamientoListo');
            } else {
              console.log("🚀 4----------------------------------------------------------------------------------------------------🚀");
              var mensaje = _strings.default.messages.enrolamientoCodigoActivacion[response];
              if (typeof mensaje === 'undefined') {
                mensaje = _strings.default.messages.error;
              }
              console.log("🚀 5----------------------------------------------------------------------------------------------------🚀");
              navigation.navigate('EnrolamientoErro', {
                mensaje: mensaje + " (" + response + ")"
              });
              console.log("🚀 6----------------------------------------------------------------------------------------------------🚀");
            }
          } catch (e) {
            console.log("🚀 --------------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: EnrolamientoSoftToken.js:144 ~ EnrolamientoSoftToken ~ validarCodigo ~ e:", JSON.stringify(e));
            console.log("🚀 --------------------------------------------------------------------------------------🚀");
            yield this.setState({
              loading: false,
              size: 0
            });
            navigation.navigate('EnrolamientoErro', {
              mensaje: _strings.default.messages.error + " (0)"
            });
          }
        });
        function validarCodigo() {
          return _validarCodigo.apply(this, arguments);
        }
        return validarCodigo;
      }()
    }, {
      key: "reenviarCodigo",
      value: function () {
        var _reenviarCodigo = (0, _asyncToGenerator2.default)(function* () {
          yield this.setState({
            loading: true
          });
          try {
            yield _softToken.SoftTokenService.enviarCodigoEmail();
            _nativeBase.Toast.show({
              title: '¡Código reenviado!',
              buttonText: 'Ok'
            });
          } catch (err) {
            var erro = this.friendlyMessage(err);
            this.handleMessages(erro);
          }
          yield this.setState({
            loading: false,
            size: 0
          });
        });
        function reenviarCodigo() {
          return _reenviarCodigo.apply(this, arguments);
        }
        return reenviarCodigo;
      }()
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var email = this.state.email;
        return (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: _Styles.default.container,
          children: [(0, _jsxRuntime.jsx)(_reactNativeLoadingSpinnerOverlay.default, {
            visible: this.state.loading,
            textContent: 'Cargando...',
            textStyle: {
              color: '#FFF'
            }
          }), this.getModals(), (0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: _Styles.default.title,
            children: "Te hemos enviado un c\xF3digo"
          }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: _Styles.default.title,
            children: "de activaci\xF3n"
          }), (0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: _Styles.default.description,
            children: ["Revisa tu buz\xF3n de correo electr\xF3nico ", email]
          }), (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _Styles.default.IconAndTextInputContainer,
            children: (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
              style: _Styles.default.TextInputStyle,
              value: this.state.code,
              onChangeText: this.onInputChange,
              placeholderTextColor: '#C4C4C4',
              placeholder: 'Escribir código',
              keyboardType: "default"
            })
          }), (0, _jsxRuntime.jsx)(_reactNativeLinearGradient.default, {
            colors: ['#AD96DC', '#20A6FF'],
            start: {
              x: 0,
              y: 0
            },
            end: {
              x: 1,
              y: 0
            },
            style: _Styles.default.linearGradient,
            children: (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
              underlayColor: "none",
              onPress: function onPress() {
                _this2.validarCodigo();
              },
              children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: _Styles.default.buttonText,
                children: "Validar"
              })
            })
          }), (0, _jsxRuntime.jsx)(_reactNative.TouchableHighlight, {
            underlayColor: "none",
            onPress: function onPress() {
              _this2.reenviarCodigo();
            },
            children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: _Styles.default.buttonTextCodigo,
              children: "Reenviar c\xF3digo de activaci\xF3n"
            })
          }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: _Styles.default.considerations,
            children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
              children: "Ten en cuenta:"
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.row,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.bullet
              }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                children: "Si eres un usuario administrador y no es tu correo electr\xF3nico, comun\xEDcate con la Banca Telef\xF3nica Empresas: Lima (01) 625-3333 Provincias 0-801-0-0457."
              })]
            }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: _Styles.default.row,
              children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: _Styles.default.bullet
              }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
                children: "Si eres un usuario supervisor o ambos y no es tu correo electr\xF3nico, comun\xEDcate con un usuario administrador de tu empresa."
              })]
            })]
          }), (0, _jsxRuntime.jsx)(_ModalErrorComponent.default, {
            TextError: this.state.textError,
            Visibility: this.state.showModalError,
            Callback: function Callback() {
              _this2.setState({
                showModalError: false,
                loading: false
              });
            }
          })]
        });
      }
    }]);
    return EnrolamientoSoftToken;
  }(_ModalHandleError2.default);
