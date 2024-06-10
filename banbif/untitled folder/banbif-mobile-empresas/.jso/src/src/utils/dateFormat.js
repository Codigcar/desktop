  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormat = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var DateFormat = exports.DateFormat = function () {
    function DateFormat() {
      (0, _classCallCheck2.default)(this, DateFormat);
    }
    (0, _createClass2.default)(DateFormat, null, [{
      key: "format",
      value: function format(data) {
        var _format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultFormat;
        return (0, _moment.default)(data).format(_format);
      }
    }, {
      key: "formatMonthName",
      value: function formatMonthName(data) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultFormatMonthName;
        return (0, _moment.default)(data).format(format);
      }
    }, {
      key: "formatMonthNameMovement",
      value: function formatMonthNameMovement(data) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultFormatMonthNameMovement;
        return (0, _moment.default)(data).format(format);
      }
    }]);
    return DateFormat;
  }();
  DateFormat.defaultFormat = 'DD/MM/YYYY';
  DateFormat.defaultFormatMonthName = 'DD-MM-YY';
  DateFormat.defaultFormatMonthNameMovement = 'DD - MM - YY';
