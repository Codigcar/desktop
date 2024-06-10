  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthService = undefined;
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _axios = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _enviroments = _$$_REQUIRE(_dependencyMap[6]);
  var qs = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _storage = _$$_REQUIRE(_dependencyMap[8]);
  var _jwtDecode = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[10]);
  var _errorState = _$$_REQUIRE(_dependencyMap[11]);
  var _navigation = _$$_REQUIRE(_dependencyMap[12]);
  var _cryptoJs = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _CommonMessageModal = _$$_REQUIRE(_dependencyMap[14]);
  var _constants = _$$_REQUIRE(_dependencyMap[15]);
  var _reactNativeDeviceInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _reactNativeSslPublicKeyPinning = _$$_REQUIRE(_dependencyMap[17]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var Auth = function () {
    function Auth() {
      (0, _classCallCheck2.default)(this, Auth);
    }
    (0, _createClass2.default)(Auth, [{
      key: "getInitial",
      value: function () {
        var _getInitial = (0, _asyncToGenerator2.default)(function* () {
          yield this.removeItens();
          var payload = qs.stringify({
            client_id: _enviroments.enviroment.client_id,
            client_secret: _enviroments.enviroment.client_secret,
            grant_type: 'client_credentials'
          });
          var response = yield _axios.default.post(_enviroments.enviroment.ssoUrl + "/auth/realms/" + _enviroments.enviroment.contextUrl + "/protocol/openid-connect/token", payload, {
            timeout: 30000,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          var access_token = response.data.access_token;
          yield _storage.StorageService.setItem('access_token_conf', access_token);
        });
        function getInitial() {
          return _getInitial.apply(this, arguments);
        }
        return getInitial;
      }()
    }, {
      key: "encrypt",
      value: function () {
        var _encrypt = (0, _asyncToGenerator2.default)(function* (data) {
          var key = _cryptoJs.default.enc.Latin1.parse(_enviroments.enviroment.key);
          var iv = _cryptoJs.default.enc.Latin1.parse(_enviroments.enviroment.iv);
          var encrypted = _cryptoJs.default.AES.encrypt(data, key, {
            iv: iv,
            mode: _cryptoJs.default.mode.CBC,
            padding: _cryptoJs.default.pad.ZeroPadding
          });
          return encrypted;
        });
        function encrypt(_x) {
          return _encrypt.apply(this, arguments);
        }
        return encrypt;
      }()
    }, {
      key: "saveSession",
      value: function () {
        var _saveSession = (0, _asyncToGenerator2.default)(function* (username, password, textEntidad) {
          try {
            var _responseSessionUsuar2, _responseSessionUsuar3, _responseSessionUsuar4, _responseSessionUsuar5;
            var access_token_conf = yield _storage.StorageService.getItem('access_token_conf');
            var payloadSessionUsuario = {
              cliente: {
                entidad: {
                  nombre: textEntidad,
                  usuarios: [{
                    nombre: username,
                    contrasenia: password
                  }]
                }
              },
              ipDispositivo: yield _reactNativeDeviceInfo.default.getIpAddress(),
              sistemaOperativoDispositivo: _reactNative.Platform.OS + ' ' + _reactNativeDeviceInfo.default.getSystemVersion(),
              nombreDispositivo: _reactNativeDeviceInfo.default.getModel()
            };
            console.log('payloadSessionUsuario', JSON.stringify(payloadSessionUsuario));
            var responseSessionUsuario = yield _axios.default.post(_enviroments.enviroment.baseURL + "/api-banca-movil-empresas/v1/seguridadEmpresas/iniciar/sesion/usuario", {
              sesionUsuario: payloadSessionUsuario
            }, {
              headers: {
                'Content-Type': 'application/json',
                'codigoCanal': 'APP_BANCA_MOVIL',
                'Authorization': "Bearer " + access_token_conf
              }
            });
            var _responseSessionUsuar = (_responseSessionUsuar2 = responseSessionUsuario.data) == null ? undefined : _responseSessionUsuar2.datos,
              cliente = _responseSessionUsuar.cliente,
              token = _responseSessionUsuar.token;
            console.log('cliente!!!: ', cliente);
            var usuario = cliente.entidad.usuarios[0];
            if (((_responseSessionUsuar3 = responseSessionUsuario.data) == null ? undefined : (_responseSessionUsuar4 = _responseSessionUsuar3.metadata) == null ? undefined : (_responseSessionUsuar5 = _responseSessionUsuar4.mensajes[0]) == null ? undefined : _responseSessionUsuar5.codigo) === '-1') {
              var _responseSessionUsuar6;
              responseSessionUsuario.data.meta = Object.assign({}, (_responseSessionUsuar6 = responseSessionUsuario.data) == null ? undefined : _responseSessionUsuar6.metadata);
              throw responseSessionUsuario == null ? undefined : responseSessionUsuario.data;
            }
            var tokenAcceso = token.tokenAcceso,
              tokenActualizacion = token.tokenActualizacion;
            var decodedToken = (0, _jwtDecode.default)(tokenAcceso);
            if ((decodedToken == null ? undefined : decodedToken.role) === _constants.USER_ROLES.ADMIN) {
              if (!(usuario != null && usuario.softTokenHabilitado)) {
                throw 'No tienes habilitado el enrolamiento en el App Empresas';
              }
              var hasSoftToken = Boolean(yield _storage.StorageService.getItemStorage('hasSoftToken'));
              if (hasSoftToken && usuario != null && usuario.softTokenHabilitado) {
                throw 'Ya te encuentras enrolado al token digital';
              }
            }
            yield _storage.StorageService.setItem('username', username);
            yield _storage.StorageService.setItem('password', password);
            var documento = usuario == null ? undefined : usuario.numeroDocumento;
            var codigo = usuario == null ? undefined : usuario.codigo;
            var softTokenHabilitado = usuario == null ? undefined : usuario.softTokenHabilitado;
            yield _storage.StorageService.setItemStorage("flagGrupo", usuario.tipo === 'M' ? 'true' : 'false');
            yield _storage.StorageService.setItemStorage("usuarioTipo", usuario.tipo);
            var user = {
              nombreLogin: yield _storage.StorageService.getItem('nombreLogin'),
              nombre: decodedToken.name,
              entidad: yield _storage.StorageService.getItem('entidad'),
              entityId: decodedToken.entityId,
              userId: decodedToken.userId,
              role: decodedToken.role,
              email: decodedToken.email
            };
            yield _storage.StorageService.setItem('DNI', '');
            yield _storage.StorageService.setItem('CLIENTTOKEN', 'false');
            yield _storage.StorageService.setItem('token', tokenAcceso);
            yield _storage.StorageService.setItem('refreshToken', tokenActualizacion);
            yield _storage.StorageService.setItem('user', user);
            yield _storage.StorageService.setItem('identificador', codigo);
            if (softTokenHabilitado) {
              yield _storage.StorageService.setItem('CLIENTTOKEN', 'true');
            }
            if (documento) {
              yield _storage.StorageService.setItem('DNI', documento);
            }
          } catch (error) {
            var _error$response, _error$response2, _error$response2$data, _error$response2$data2, _error$response2$data3, _error$response2$data4, _error$meta, _error$meta$mensajes, _error$meta$mensajes$, _error$response3, _error$response3$data, _error$response3$data2, _error$response3$data3, _error$response3$data4, _error$meta2, _error$meta2$mensajes, _error$meta2$mensajes2, _serverErrorMessage$t, _serverErrorMessage$t2;
            console.log('LOGIN ERROR', error, JSON.stringify(error == null ? undefined : (_error$response = error.response) == null ? undefined : _error$response.data));
            var _codigo = (error == null ? undefined : (_error$response2 = error.response) == null ? undefined : (_error$response2$data = _error$response2.data) == null ? undefined : (_error$response2$data2 = _error$response2$data.meta) == null ? undefined : (_error$response2$data3 = _error$response2$data2.mensajes) == null ? undefined : (_error$response2$data4 = _error$response2$data3[0]) == null ? undefined : _error$response2$data4.codigo) || (error == null ? undefined : (_error$meta = error.meta) == null ? undefined : (_error$meta$mensajes = _error$meta.mensajes) == null ? undefined : (_error$meta$mensajes$ = _error$meta$mensajes[0]) == null ? undefined : _error$meta$mensajes$.codigo);
            var serverErrorMessage = (error == null ? undefined : (_error$response3 = error.response) == null ? undefined : (_error$response3$data = _error$response3.data) == null ? undefined : (_error$response3$data2 = _error$response3$data.meta) == null ? undefined : (_error$response3$data3 = _error$response3$data2.mensajes) == null ? undefined : (_error$response3$data4 = _error$response3$data3[0]) == null ? undefined : _error$response3$data4.mensaje) || (error == null ? undefined : (_error$meta2 = error.meta) == null ? undefined : (_error$meta2$mensajes = _error$meta2.mensajes) == null ? undefined : (_error$meta2$mensajes2 = _error$meta2$mensajes[0]) == null ? undefined : _error$meta2$mensajes2.mensaje);
            var errorToShow = serverErrorMessage || 'No fue posible obtener los datos del cliente';
            var title = null;
            var mensaje1 = null;
            var status = _CommonMessageModal.MODAL_TYPES.ERROR;
            if (serverErrorMessage != null && (_serverErrorMessage$t = serverErrorMessage.toLowerCase()) != null && (_serverErrorMessage$t2 = _serverErrorMessage$t.trim()) != null && _serverErrorMessage$t2.includes('los datos de ingreso son incorrectos')) {
              var _error$datos, _error$datos$cliente, _error$datos$cliente$, _error$datos$cliente$2;
              var _usuario = error == null ? undefined : (_error$datos = error.datos) == null ? undefined : (_error$datos$cliente = _error$datos.cliente) == null ? undefined : (_error$datos$cliente$ = _error$datos$cliente.entidad) == null ? undefined : (_error$datos$cliente$2 = _error$datos$cliente$.usuarios) == null ? undefined : _error$datos$cliente$2[0];
              var numAttemps = _usuario == null ? undefined : _usuario.numeroIntentosBloqueo;
              if ((numAttemps == null ? undefined : numAttemps.length) > 0) {
                var titleAttemp = numAttemps === '1' ? 'Primer' : numAttemps === '2' ? 'Segundo' : 'Tercer';
                errorToShow = '¡Nombre de usuario o contraseña inválidos!';
                title = titleAttemp + " intento fallido";
                mensaje1 = numAttemps === '1' || numAttemps === '2' ? "Al tercer intento fallido se bloquear\xE1 \nel usuario por 24 horas." : "Su usuario ha sido bloqueado \npor 24 horas.";
              }
            }
            if (error === 'No tienes habilitado el enrolamiento en el App Empresas') {
              errorToShow = 'No tienes habilitado el token digital.';
              status = _CommonMessageModal.MODAL_TYPES.WARNING;
            }
            if (error === 'Ya te encuentras enrolado al token digital') {
              errorToShow = 'Ya te encuentras enrolado \n al token digital.';
              status = _CommonMessageModal.MODAL_TYPES.WARNING;
            }
            if (errorToShow === 'Debe cambiar la clave por primera vez') {
              errorToShow = 'Aún no has hecho tu cambio \n de contraseña, por favor ingresa a la Banca \n por Internet Empresas desde una laptop o \n computadora.';
              status = _CommonMessageModal.MODAL_TYPES.WARNING;
            }
            if (errorToShow === 'Usted no cuenta con un correo configurado.') {
              status = _CommonMessageModal.MODAL_TYPES.WARNING;
              if (_codigo === '-3') errorToShow = errorToShow + ' Comunícate con la Banca Telefónica Empresas: Lima (01) 625-3333 Provincias 0-801-0-0457.';
              if (_codigo === '-4') errorToShow = errorToShow + ' Solicítelo a su administrador';
            }
            var err = {
              response: {
                data: {
                  meta: {
                    mensajes: [{
                      mensaje: errorToShow,
                      title: title,
                      mensaje1: mensaje1,
                      status: status
                    }]
                  }
                }
              }
            };
            throw err;
          }
        });
        function saveSession(_x2, _x3, _x4) {
          return _saveSession.apply(this, arguments);
        }
        return saveSession;
      }()
    }, {
      key: "doToken",
      value: function () {
        var _doToken = (0, _asyncToGenerator2.default)(function* () {
          var username = yield _storage.StorageService.getItem('username');
          var password = yield _storage.StorageService.getItem('password');
          var payload = qs.stringify({
            grant_type: 'password',
            client_id: _enviroments.enviroment.client_id,
            client_secret: _enviroments.enviroment.client_secret,
            username: username,
            password: password
          });
          var response = yield _axios.default.post(_enviroments.enviroment.ssoUrl + "/auth/realms/" + _enviroments.enviroment.contextUrl + "/protocol/openid-connect/token", payload, {
            timeout: 30000,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          var _response$data = response.data,
            access_token = _response$data.access_token,
            refresh_token = _response$data.refresh_token;
          var decodedToken = (0, _jwtDecode.default)(access_token);
          var user = {
            nombreLogin: yield _storage.StorageService.getItem('nombreLogin'),
            nombre: decodedToken.name,
            entidad: yield _storage.StorageService.getItem('entidad'),
            entityId: decodedToken.entityId,
            userId: decodedToken.userId,
            role: decodedToken.role,
            email: decodedToken.email
          };
          yield _storage.StorageService.setItem('DNI', '');
          yield _storage.StorageService.setItem('CLIENTTOKEN', 'false');
          yield _storage.StorageService.setItem('token', access_token);
          yield _storage.StorageService.setItem('refreshToken', refresh_token);
          yield _storage.StorageService.setItem('user', user);
        });
        function doToken() {
          return _doToken.apply(this, arguments);
        }
        return doToken;
      }()
    }, {
      key: "doRefreshToken",
      value: function () {
        var _doRefreshToken = (0, _asyncToGenerator2.default)(function* () {
          var _this = this;
          var apiLog = _axios.default.create({
            baseURL: _enviroments.enviroment.ssoUrl,
            timeout: 90000
          });
          apiLog.interceptors.response.use(function () {
            var _ref = (0, _asyncToGenerator2.default)(function* (response) {
              return response;
            });
            return function (_x5) {
              return _ref.apply(this, arguments);
            };
          }(), function () {
            var _ref2 = (0, _asyncToGenerator2.default)(function* (error) {
              var config = error.config;
              var originalRequest = config;
              var refreshAttempted = yield _storage.StorageService.getItem('refreshAttempted');
              if (error && error.response && [400].indexOf(error.response.status) > -1) {
                try {
                  yield _this.doToken();
                  return new Promise(function () {
                    var _ref3 = (0, _asyncToGenerator2.default)(function* (resolve) {
                      var refreshToken = yield _storage.StorageService.getItem('refreshToken');
                      var payload = qs.stringify({
                        grant_type: 'refresh_token',
                        client_id: _enviroments.enviroment.client_id,
                        client_secret: _enviroments.enviroment.client_secret,
                        refresh_token: refreshToken
                      });
                      originalRequest.data = payload;
                      resolve(apiLog(originalRequest));
                    });
                    return function (_x7) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                } catch (e) {
                  _errorState.ErrorStateService.setIsLogout(true);
                  yield _storage.StorageService.removeItem('token');
                  yield _storage.StorageService.removeItem('refreshToken');
                  yield _storage.StorageService.removeItem('user');
                  yield _storage.StorageService.removeItem('DNI');
                  (0, _navigation.navigate)('IntermediateScreen');
                }
              } else {
                return Promise.reject(error);
              }
            });
            return function (_x6) {
              return _ref2.apply(this, arguments);
            };
          }());
          var refreshToken = yield _storage.StorageService.getItem('refreshToken');
          var response = yield apiLog.post("/auth/realms/" + _enviroments.enviroment.contextUrl + "/protocol/openid-connect/token", qs.stringify({
            grant_type: 'refresh_token',
            client_id: _enviroments.enviroment.client_id,
            client_secret: _enviroments.enviroment.client_secret,
            refresh_token: refreshToken
          }), {
            timeout: 30000,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          var _response$data2 = response.data,
            access_token = _response$data2.access_token,
            refresh_token = _response$data2.refresh_token;
          var decodedToken = (0, _jwtDecode.default)(access_token);
          var user = {
            nombreLogin: yield _storage.StorageService.getItem('nombreLogin'),
            nombre: decodedToken.name,
            entidad: yield _storage.StorageService.getItem('entidad'),
            entityId: decodedToken.entityId,
            userId: decodedToken.userId,
            role: decodedToken.role,
            email: decodedToken.email
          };
          yield _storage.StorageService.setItem('token', access_token);
          yield _storage.StorageService.setItem('refreshToken', refresh_token);
          yield _storage.StorageService.setItem('user', user);
        });
        function doRefreshToken() {
          return _doRefreshToken.apply(this, arguments);
        }
        return doRefreshToken;
      }()
    }, {
      key: "doLogout",
      value: function () {
        var _doLogout = (0, _asyncToGenerator2.default)(function* () {
          yield AuthService.runSSLPinning();
          var isSessionActive = yield this.checkSesionUser();
          if (isSessionActive == 0) {} else {
            this.deleteSesionUsuario();
          }
          var refreshToken = yield _storage.StorageService.getItem('refreshToken');
          var token = yield _storage.StorageService.getItem('token');
          yield this.removeItens();
        });
        function doLogout() {
          return _doLogout.apply(this, arguments);
        }
        return doLogout;
      }()
    }, {
      key: "removeItens",
      value: function () {
        var _removeItens = (0, _asyncToGenerator2.default)(function* () {
          yield _storage.StorageService.removeItem('token');
          yield _storage.StorageService.removeItem('refreshToken');
          yield _storage.StorageService.removeItem('user');
          yield _storage.StorageService.removeItem('CLIENTTOKEN');
          yield _storage.StorageService.removeItem('user');
          yield _storage.StorageService.removeItem('refreshAttempted');
        });
        function removeItens() {
          return _removeItens.apply(this, arguments);
        }
        return removeItens;
      }()
    }, {
      key: "runSSLPinning",
      value: function () {
        var _runSSLPinning = (0, _asyncToGenerator2.default)(function* () {
          try {
            if (_enviroments.enviroment.shaDomain === '') {
              return;
            }
            var isSslAvailable = (0, _reactNativeSslPublicKeyPinning.isSslPinningAvailable)();
            console.log("🚀 ------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: auth.js:387 ~ Auth ~ runSSLPinning ~ isSslAvailable:", isSslAvailable);
            console.log("🚀 ------------------------------------------------------------------------------🚀");
            var sslPinningConfig = (0, _defineProperty2.default)({}, _enviroments.enviroment.domainName, {
              includeSubdomains: true,
              publicKeyHashes: ["RDIgM0IgNUIgMUIgQkYgOTcgRDEgOUUgMEUgQjMgQzYgRkIgMzkgMEUgN0UgMzYgNEQgRjIgMzMgQjg="]
            });
            console.log("🚀 ----------------------------------------------------------------------------------🚀");
            console.log("🚀 ~ file: auth.js:396 ~ Auth ~ runSSLPinning ~ sslPinningConfig:", JSON.stringify(sslPinningConfig));
            console.log("🚀 ----------------------------------------------------------------------------------🚀");
            yield (0, _reactNativeSslPublicKeyPinning.initializeSslPinning)(sslPinningConfig);
            var result = isSslAvailable;
            console.log("🚀 --------------------------------------------------------------🚀");
            console.log("🚀 ~ file: auth.js:435 ~ Auth ~ runSSLPinning ~ result:", result);
            console.log("🚀 --------------------------------------------------------------🚀");
            _enviroments.enviroment.pinninOk = result;
            return result;
          } catch (e) {
            console.error('Error from ssl pinnig', JSON.stringify(e));
            _enviroments.enviroment.pinninOk = false;
            throw e;
          }
        });
        function runSSLPinning() {
          return _runSSLPinning.apply(this, arguments);
        }
        return runSSLPinning;
      }()
    }, {
      key: "disableSslPinning",
      value: function () {
        var _disableSslPinning = (0, _asyncToGenerator2.default)(function* () {});
        function disableSslPinning() {
          return _disableSslPinning.apply(this, arguments);
        }
        return disableSslPinning;
      }()
    }, {
      key: "deleteSesionUsuarioLogin",
      value: function () {
        var _deleteSesionUsuarioLogin = (0, _asyncToGenerator2.default)(function* () {
          var token = yield _storage.StorageService.getItem('token');
          var user = yield _storage.StorageService.getItem('user');
          var nombreUsuario = qs.stringify({
            'nombreLogin': user.nombreLogin
          }, {
            indices: false
          });
          var newnombreUsuario = nombreUsuario.replace('nombreLogin=', '');
          yield _axios.default.delete(_enviroments.enviroment.baseURL + "/api-banca-movil-empresas/v1/seguridadEmpresas/eliminar/sesiones/" + user.entidad + '/' + user.nombreLogin, {
            headers: {
              'nombreUsuario': newnombreUsuario,
              'entidad': user.entidad,
              'Authorization': "Bearer " + token,
              'tokenClient': token,
              'Content-Type': 'application/json; charset=UTF-8',
              'codigoCanal': 'APP_BANCA_MOVIL'
            }
          });
        });
        function deleteSesionUsuarioLogin() {
          return _deleteSesionUsuarioLogin.apply(this, arguments);
        }
        return deleteSesionUsuarioLogin;
      }()
    }, {
      key: "deleteSesionUsuario",
      value: function () {
        var _deleteSesionUsuario = (0, _asyncToGenerator2.default)(function* () {
          var _this2 = this;
          var apiLog = _axios.default.create({
            baseURL: _enviroments.enviroment.baseURL,
            timeout: 90000,
            headers: {
              'codigoCanal': 'APP_BANCA_MOVIL'
            }
          });
          apiLog.interceptors.request.use(function () {
            var _ref4 = (0, _asyncToGenerator2.default)(function* (config) {
              _errorState.ErrorStateService.setIsLogout(false);
              var token = yield _storage.StorageService.getItem('token');
              if (token) config.headers.Authorization = "Bearer " + token;
              config.headers['Content-Type'] = 'application/json; charset=UTF-8';
              return config;
            });
            return function (_x8) {
              return _ref4.apply(this, arguments);
            };
          }(), function () {
            var _ref5 = (0, _asyncToGenerator2.default)(function* (error) {
              _errorState.ErrorStateService.setIsLogout(true);
              yield _storage.StorageService.removeItem('token');
              yield _storage.StorageService.removeItem('refreshToken');
              yield _storage.StorageService.removeItem('user');
              yield _storage.StorageService.removeItem('DNI');
              (0, _navigation.navigate)('IntermediateScreen');
            });
            return function (_x9) {
              return _ref5.apply(this, arguments);
            };
          }());
          apiLog.interceptors.response.use(function () {
            var _ref6 = (0, _asyncToGenerator2.default)(function* (response) {
              return response;
            });
            return function (_x10) {
              return _ref6.apply(this, arguments);
            };
          }(), function () {
            var _ref7 = (0, _asyncToGenerator2.default)(function* (error) {
              var config = error.config;
              var originalRequest = config;
              var refreshAttempted = yield _storage.StorageService.getItem('refreshAttempted');
              if (error && error.response && [401, 403].indexOf(error.response.status) > -1) {
                try {
                  if (refreshAttempted) {
                    return Promise.reject(error);
                  } else {
                    yield _this2.doRefreshToken();
                    return new Promise(function () {
                      var _ref8 = (0, _asyncToGenerator2.default)(function* (resolve) {
                        originalRequest.headers.Authorization = 'Bearer ' + (yield _storage.StorageService.getItem('token'));
                        originalRequest.headers.tokenClient = yield _storage.StorageService.getItem('token');
                        resolve(apiLog(originalRequest));
                      });
                      return function (_x12) {
                        return _ref8.apply(this, arguments);
                      };
                    }());
                  }
                } catch (e) {
                  _errorState.ErrorStateService.setIsLogout(true);
                  yield _storage.StorageService.removeItem('token');
                  yield _storage.StorageService.removeItem('refreshToken');
                  yield _storage.StorageService.removeItem('user');
                  yield _storage.StorageService.removeItem('DNI');
                  (0, _navigation.navigate)('IntermediateScreen');
                }
              } else {
                return Promise.reject(error);
              }
            });
            return function (_x11) {
              return _ref7.apply(this, arguments);
            };
          }());
          var token = yield _storage.StorageService.getItem('token');
          var user = yield _storage.StorageService.getItem('user');
          var nombreUsuario = qs.stringify({
            'nombreLogin': user.nombreLogin
          }, {
            indices: false
          });
          var newnombreUsuario = nombreUsuario.replace('nombreLogin=', '');
          try {
            yield apiLog.delete('api-banca-movil-empresas/v1/seguridadEmpresas/eliminar/sesiones/' + user.entidad + '/' + user.nombreLogin, {
              headers: {
                'nombreUsuario': newnombreUsuario,
                'entidad': user.entidad,
                'tokenClient': token
              }
            });
          } catch (e) {}
        });
        function deleteSesionUsuario() {
          return _deleteSesionUsuario.apply(this, arguments);
        }
        return deleteSesionUsuario;
      }()
    }, {
      key: "checkSesionUser",
      value: function () {
        var _checkSesionUser = (0, _asyncToGenerator2.default)(function* () {
          var _this3 = this;
          var user = yield _storage.StorageService.getItem('user');
          var identificador = yield _storage.StorageService.getItem('identificador');
          var platform = '';
          if (_reactNative.Platform.OS != 'ios') {
            platform = 'ANDROID';
          } else {
            platform = 'IOS';
          }
          var payload = {
            'sesionUsuario': {
              'cliente': {
                'entidad': {
                  'nombre': user.entidad,
                  'usuarios': [{
                    'nombre': user.nombreLogin
                  }]
                }
              },
              'identificador': identificador
            }
          };
          var apiLog = _axios.default.create({
            baseURL: _enviroments.enviroment.baseURL,
            timeout: 90000,
            headers: {
              'codigoCanal': 'APP_BANCA_MOVIL'
            }
          });
          apiLog.interceptors.request.use(function () {
            var _ref9 = (0, _asyncToGenerator2.default)(function* (config) {
              _errorState.ErrorStateService.setIsLogout(false);
              var token = yield _storage.StorageService.getItem('token');
              if (token) config.headers.Authorization = "Bearer " + token;
              config.headers['Content-Type'] = 'application/json; charset=UTF-8';
              return config;
            });
            return function (_x13) {
              return _ref9.apply(this, arguments);
            };
          }(), function () {
            var _ref10 = (0, _asyncToGenerator2.default)(function* (error) {
              _errorState.ErrorStateService.setIsLogout(true);
              yield _storage.StorageService.removeItem('token');
              yield _storage.StorageService.removeItem('refreshToken');
              yield _storage.StorageService.removeItem('user');
              yield _storage.StorageService.removeItem('DNI');
              (0, _navigation.navigate)('IntermediateScreen');
            });
            return function (_x14) {
              return _ref10.apply(this, arguments);
            };
          }());
          apiLog.interceptors.response.use(function () {
            var _ref11 = (0, _asyncToGenerator2.default)(function* (response) {
              return response;
            });
            return function (_x15) {
              return _ref11.apply(this, arguments);
            };
          }(), function () {
            var _ref12 = (0, _asyncToGenerator2.default)(function* (error) {
              var config = error.config;
              var originalRequest = config;
              var refreshAttempted = yield _storage.StorageService.getItem('refreshAttempted');
              if (error && error.response && [401, 403].indexOf(error.response.status) > -1) {
                try {
                  if (refreshAttempted) {
                    return Promise.reject(error);
                  } else {
                    yield _this3.doRefreshToken();
                    return new Promise(function () {
                      var _ref13 = (0, _asyncToGenerator2.default)(function* (resolve) {
                        originalRequest.headers.Authorization = 'Bearer ' + (yield _storage.StorageService.getItem('token'));
                        originalRequest.headers.tokenClient = yield _storage.StorageService.getItem('token');
                        resolve(apiLog(originalRequest));
                      });
                      return function (_x17) {
                        return _ref13.apply(this, arguments);
                      };
                    }());
                  }
                } catch (e) {
                  _errorState.ErrorStateService.setIsLogout(true);
                  yield _storage.StorageService.removeItem('token');
                  yield _storage.StorageService.removeItem('refreshToken');
                  yield _storage.StorageService.removeItem('user');
                  yield _storage.StorageService.removeItem('DNI');
                  (0, _navigation.navigate)('IntermediateScreen');
                }
              } else {
                return Promise.reject(error);
              }
            });
            return function (_x16) {
              return _ref12.apply(this, arguments);
            };
          }());
          var token = yield _storage.StorageService.getItem('token');
          var resSesionActiva = yield apiLog.post("api-banca-movil-empresas/v1/seguridadEmpresas/listar/sesiones/usuario", payload, {
            headers: {
              'tokenClient': token
            }
          });
          return resSesionActiva.data.meta.totalRegistros;
        });
        function checkSesionUser() {
          return _checkSesionUser.apply(this, arguments);
        }
        return checkSesionUser;
      }()
    }]);
    return Auth;
  }();
  var AuthService = exports.AuthService = new Auth();
