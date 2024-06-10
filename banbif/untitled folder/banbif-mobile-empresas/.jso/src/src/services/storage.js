  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StorageService = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeSensitiveInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeBase = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var Storage = function () {
    function Storage() {
      (0, _classCallCheck2.default)(this, Storage);
      this.prefix = '@BB-';
      this.prefixStorage = '@CC-';
      this.pref = 'Pref';
      this.keyChain = '12345KEYANDROIDIOS6789';
    }
    (0, _createClass2.default)(Storage, [{
      key: "getItem",
      value: function () {
        var _getItem = (0, _asyncToGenerator2.default)(function* (item) {
          try {
            var value = yield _reactNativeSensitiveInfo.default.getItem(item, {
              sharedPreferencesName: this.pref,
              keychainService: this.keyChain
            });
            var dataDecode = _reactNativeBase.default.decode(value);
            if (dataDecode !== null) {
              try {
                var jsonValue = JSON.parse(dataDecode);
                return jsonValue;
              } catch (e) {
                return dataDecode;
              }
            }
            return null;
          } catch (e) {
            return null;
          }
        });
        function getItem(_x) {
          return _getItem.apply(this, arguments);
        }
        return getItem;
      }()
    }, {
      key: "setItem",
      value: function () {
        var _setItem = (0, _asyncToGenerator2.default)(function* (key, value) {
          if (typeof value == 'object') {
            value = JSON.stringify(value);
          }
          var dataEncode = _reactNativeBase.default.encode(value);
          yield _reactNativeSensitiveInfo.default.setItem(key, dataEncode, {
            sharedPreferencesName: this.pref,
            keychainService: this.keyChain
          });
        });
        function setItem(_x2, _x3) {
          return _setItem.apply(this, arguments);
        }
        return setItem;
      }()
    }, {
      key: "getItemNotBase64",
      value: function () {
        var _getItemNotBase = (0, _asyncToGenerator2.default)(function* (item) {
          try {
            var value = yield _reactNativeSensitiveInfo.default.getItem(item, {
              sharedPreferencesName: this.pref,
              keychainService: this.keyChain
            });
            if (value !== null) {
              try {
                var jsonValue = JSON.parse(value);
                return jsonValue;
              } catch (e) {
                return value;
              }
            }
            return null;
          } catch (e) {
            return null;
          }
        });
        function getItemNotBase64(_x4) {
          return _getItemNotBase.apply(this, arguments);
        }
        return getItemNotBase64;
      }()
    }, {
      key: "setItemNotBase64",
      value: function () {
        var _setItemNotBase = (0, _asyncToGenerator2.default)(function* (key, value) {
          if (typeof value == 'object') {
            value = JSON.stringify(value);
          }
          yield _reactNativeSensitiveInfo.default.setItem(key, value, {
            sharedPreferencesName: this.pref,
            keychainService: this.keyChain
          });
        });
        function setItemNotBase64(_x5, _x6) {
          return _setItemNotBase.apply(this, arguments);
        }
        return setItemNotBase64;
      }()
    }, {
      key: "removeItem",
      value: function () {
        var _removeItem = (0, _asyncToGenerator2.default)(function* (key) {
          var removeAttr = 'removeItem';
          if (typeof key == 'object' && key.length > 0) {
            removeAttr = 'multiRemove';
          }
          yield _reactNativeSensitiveInfo.default.deleteItem(key, {
            sharedPreferencesName: this.pref,
            keychainService: this.keyChain
          });
        });
        function removeItem(_x7) {
          return _removeItem.apply(this, arguments);
        }
        return removeItem;
      }()
    }, {
      key: "removeItems",
      value: function () {
        var _removeItems = (0, _asyncToGenerator2.default)(function* (keys) {
          for (var key of keys) {
            yield this.removeItem(key);
          }
        });
        function removeItems(_x8) {
          return _removeItems.apply(this, arguments);
        }
        return removeItems;
      }()
    }, {
      key: "clearAllData",
      value: function () {
        var _clearAllData = (0, _asyncToGenerator2.default)(function* () {
          _asyncStorage.default.getAllKeys().then(function (keys) {
            return _asyncStorage.default.multiRemove(keys);
          });
        });
        function clearAllData() {
          return _clearAllData.apply(this, arguments);
        }
        return clearAllData;
      }()
    }, {
      key: "getItemStorage",
      value: function () {
        var _getItemStorage = (0, _asyncToGenerator2.default)(function* (item) {
          try {
            var value = yield _asyncStorage.default.getItem("" + this.prefixStorage + item);
            if (value !== null) {
              try {
                var jsonValue = JSON.parse(value);
                return jsonValue;
              } catch (e) {
                return value;
              }
            }
            return null;
          } catch (e) {
            return null;
          }
        });
        function getItemStorage(_x9) {
          return _getItemStorage.apply(this, arguments);
        }
        return getItemStorage;
      }()
    }, {
      key: "setItemStorage",
      value: function () {
        var _setItemStorage = (0, _asyncToGenerator2.default)(function* (key, value) {
          if (typeof value == 'object') {
            value = JSON.stringify(value);
          }
          yield _asyncStorage.default.setItem("" + this.prefixStorage + key, value);
        });
        function setItemStorage(_x10, _x11) {
          return _setItemStorage.apply(this, arguments);
        }
        return setItemStorage;
      }()
    }, {
      key: "removeItemStorage",
      value: function () {
        var _removeItemStorage = (0, _asyncToGenerator2.default)(function* (key) {
          var _this = this;
          var removeAttr = 'removeItem';
          if (typeof key == 'object' && key.length > 0) {
            removeAttr = 'multiRemove';
            key = key.map(function (k) {
              return "" + _this.prefixStorage + k;
            });
          }
          yield _asyncStorage.default[removeAttr](key);
        });
        function removeItemStorage(_x12) {
          return _removeItemStorage.apply(this, arguments);
        }
        return removeItemStorage;
      }()
    }]);
    return Storage;
  }();
  var StorageService = exports.StorageService = new Storage();
