  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _axios = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _enviroments = _$$_REQUIRE(_dependencyMap[3]);
  var _storage = _$$_REQUIRE(_dependencyMap[4]);
  var _auth = _$$_REQUIRE(_dependencyMap[5]);
  var _navigation = _$$_REQUIRE(_dependencyMap[6]);
  var _errorState = _$$_REQUIRE(_dependencyMap[7]);
  var api = _axios.default.create({
    baseURL: _enviroments.enviroment.baseURL,
    timeout: 90000,
    headers: {
      'codigoCanal': 'APP_BANCA_MOVIL'
    }
  });
  api.interceptors.request.use(function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (config) {
      yield _auth.AuthService.runSSLPinning();
      _errorState.ErrorStateService.setIsLogout(false);
      var token = yield _storage.StorageService.getItem('token');
      if (token) config.headers.Authorization = "Bearer " + token;
      config.headers['Content-Type'] = 'application/json; charset=UTF-8';
      return config;
    });
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), function (error) {
    return Promise.reject(error);
  });
  api.interceptors.response.use(function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (response) {
      try {
        var token = yield _storage.StorageService.getItem('token');
        var isSessionActive = yield _auth.AuthService.checkSesionUser();
        if (isSessionActive == 0) {
          _errorState.ErrorStateService.setIsLogout(true);
          yield _storage.StorageService.removeItem('token');
          yield _storage.StorageService.removeItem('refreshToken');
          yield _storage.StorageService.removeItem('user');
          yield _storage.StorageService.removeItem('DNI');
          (0, _navigation.navigate)("IntermediateScreen");
        }
      } catch (e) {}
      return response;
    });
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }(), function () {
    var _ref3 = (0, _asyncToGenerator2.default)(function* (error) {
      var config = error.config;
      var originalRequest = config;
      var refreshAttempted = yield _storage.StorageService.getItem('refreshAttempted');
      if (error && error.response && [401, 403].indexOf(error.response.status) > -1) {
        try {
          if (refreshAttempted) {
            return Promise.reject(error);
          } else {
            yield _auth.AuthService.doRefreshToken();
            var token = yield _storage.StorageService.getItem('token');
            var isSessionActive = yield _auth.AuthService.checkSesionUser();
            if (isSessionActive == 0) {
              yield _auth.AuthService.doLogout();
              _errorState.ErrorStateService.setIsLogout(true);
              yield _storage.StorageService.removeItem('token');
              yield _storage.StorageService.removeItem('refreshToken');
              yield _storage.StorageService.removeItem('user');
              yield _storage.StorageService.removeItem('DNI');
              (0, _navigation.navigate)("IntermediateScreen");
            } else {
              return new Promise(function () {
                var _ref4 = (0, _asyncToGenerator2.default)(function* (resolve) {
                  originalRequest.headers.Authorization = 'Bearer ' + (yield _storage.StorageService.getItem('token'));
                  originalRequest.headers.tokenClient = yield _storage.StorageService.getItem('token');
                  resolve(api(originalRequest));
                });
                return function (_x4) {
                  return _ref4.apply(this, arguments);
                };
              }());
            }
          }
        } catch (e) {
          yield _auth.AuthService.doLogout();
          _errorState.ErrorStateService.setIsLogout(true);
          yield _storage.StorageService.removeItem('token');
          yield _storage.StorageService.removeItem('refreshToken');
          yield _storage.StorageService.removeItem('user');
          yield _storage.StorageService.removeItem('DNI');
          (0, _navigation.navigate)("IntermediateScreen");
        }
      } else {
        return Promise.reject(error);
      }
    });
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  var _default = exports.default = api;
