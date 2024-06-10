  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.navigate = navigate;
  exports.navigationRef = undefined;
  var _native = _$$_REQUIRE(_dependencyMap[0]);
  var navigationRef = exports.navigationRef = (0, _native.createNavigationContainerRef)();
  function navigate(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }
