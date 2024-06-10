  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNativeDeviceInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _jailMonkey = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var DeviceInf = function () {
    function DeviceInf() {
      (0, _classCallCheck2.default)(this, DeviceInf);
    }
    (0, _createClass2.default)(DeviceInf, null, [{
      key: "isRoot",
      value: function () {
        var _isRoot = (0, _asyncToGenerator2.default)(function* () {
          var isRoot = _jailMonkey.default.isJailBroken() || _jailMonkey.default.isDebuggedMode();
          var isEmulator = yield _reactNativeDeviceInfo.default.isEmulator();
          if (isRoot || isEmulator) return true;
          return false;
        });
        function isRoot() {
          return _isRoot.apply(this, arguments);
        }
        return isRoot;
      }()
    }]);
    return DeviceInf;
  }();
  var _default = exports.default = DeviceInf;
