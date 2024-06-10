  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StringUtils = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _StringUtils = function () {
    function _StringUtils() {
      (0, _classCallCheck2.default)(this, _StringUtils);
    }
    (0, _createClass2.default)(_StringUtils, [{
      key: "capitalize",
      value: function capitalize(str) {
        if (!str) return "";
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    }]);
    return _StringUtils;
  }();
  var StringUtils = exports.StringUtils = new _StringUtils();
