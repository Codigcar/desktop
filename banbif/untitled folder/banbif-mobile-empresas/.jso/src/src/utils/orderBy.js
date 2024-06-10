  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OrderBy = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var OrderBy = exports.OrderBy = function () {
    function OrderBy() {
      (0, _classCallCheck2.default)(this, OrderBy);
    }
    (0, _createClass2.default)(OrderBy, null, [{
      key: "order",
      value: function order(attr) {
        return function (a, b) {
          if (a[attr] < b[attr]) return -1;
          if (a[attr] > b[attr]) return 1;
          return 0;
        };
      }
    }]);
    return OrderBy;
  }();
