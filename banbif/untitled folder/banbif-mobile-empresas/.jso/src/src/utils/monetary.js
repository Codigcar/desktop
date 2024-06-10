  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Monetary = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var Monetary = exports.Monetary = function () {
    function Monetary() {
      (0, _classCallCheck2.default)(this, Monetary);
    }
    (0, _createClass2.default)(Monetary, null, [{
      key: "format",
      value: function format(value) {
        if (value == null) value = 0;
        return parseFloat(Math.round(value * 100) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
    }, {
      key: "percentage",
      value: function percentage(value) {
        return parseFloat(Math.round(value * 1000000.0) / 1000000.0);
      }
    }]);
    return Monetary;
  }();
