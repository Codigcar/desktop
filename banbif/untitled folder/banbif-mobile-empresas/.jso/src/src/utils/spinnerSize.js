  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SpinnerSize = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var SpinnerSize = exports.SpinnerSize = function () {
    function SpinnerSize() {
      (0, _classCallCheck2.default)(this, SpinnerSize);
    }
    (0, _createClass2.default)(SpinnerSize, null, [{
      key: "get",
      value: function get() {
        if (_reactNative.Platform.OS === 'ios') {
          return this.iosSize;
        }
        return this.androidSize;
      }
    }]);
    return SpinnerSize;
  }();
  SpinnerSize.androidSize = 40;
  SpinnerSize.iosSize = 1;
