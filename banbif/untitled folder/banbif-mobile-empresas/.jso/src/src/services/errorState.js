  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ErrorStateService = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var ErrorState = function () {
    function ErrorState() {
      (0, _classCallCheck2.default)(this, ErrorState);
      this.isLogout = false;
    }
    (0, _createClass2.default)(ErrorState, [{
      key: "setIsLogout",
      value: function setIsLogout(bool) {
        this.isLogout = bool;
      }
    }, {
      key: "getIsLogout",
      value: function getIsLogout() {
        return this.isLogout;
      }
    }]);
    return ErrorState;
  }();
  var ErrorStateService = exports.ErrorStateService = new ErrorState();
