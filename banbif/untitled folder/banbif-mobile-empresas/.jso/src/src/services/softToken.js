  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SoftTokenService = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _api = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _storage = _$$_REQUIRE(_dependencyMap[5]);
  var SoftToken = function () {
    function SoftToken() {
      (0, _classCallCheck2.default)(this, SoftToken);
    }
    (0, _createClass2.default)(SoftToken, [{
      key: "enviarCodigoEmail",
      value: function () {
        var _enviarCodigoEmail = (0, _asyncToGenerator2.default)(function* () {
          var documento = yield _storage.StorageService.getItem('DNI');
          var user = yield _storage.StorageService.getItem('user');
          var email = user.email;
          var nombre = user == null ? undefined : user.nombre;
          var tokenClient = yield _storage.StorageService.getItem('token');
          if (documento === null || documento === 'undefined' || documento === '' || email === null || email === 'undefined' || email === '') {
            throw 'DNI o correo electrónico no encontrado';
          }
          var payload = {
            documento: {
              numero: documento
            },
            contacto: {
              email: email
            },
            nombre: nombre
          };
          return yield _api.default.put("/api-banca-movil-empresas/v1/seguridadEmpresas/softToken", payload, {
            headers: {
              'tokenClient': tokenClient,
              'entidad': user.entidad,
              'nombreUsuario': user.nombreLogin
            }
          });
        });
        function enviarCodigoEmail() {
          return _enviarCodigoEmail.apply(this, arguments);
        }
        return enviarCodigoEmail;
      }()
    }]);
    return SoftToken;
  }();
  var SoftTokenService = exports.SoftTokenService = new SoftToken();
