  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UpperCase = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var UpperCase = exports.UpperCase = function () {
    function UpperCase() {
      (0, _classCallCheck2.default)(this, UpperCase);
    }
    (0, _createClass2.default)(UpperCase, null, [{
      key: "upperCase",
      value: function upperCase(texto) {
        if (!isNaN(+texto)) {
          return texto;
        } else {
          return texto.trim().toUpperCase();
        }
      }
    }]);
    return UpperCase;
  }();
