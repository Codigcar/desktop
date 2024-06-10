  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _storage = _$$_REQUIRE(_dependencyMap[6]);
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[7]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var EntidadNombre = function EntidadNombre(_ref) {
    var entidad = _ref.entidad,
      isInList = _ref.isInList;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      flagGrupo = _useState2[0],
      setFlagGrupo = _useState2[1];
    var titleStyles = Object.assign({}, !isInList ? _Styles.default.titleContainerInner : {}, _Styles.default.titleContainer);
    var storeFlagGrupo = function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        var flagGrupo = Boolean(yield _storage.StorageService.getItemStorage('flagGrupo'));
        setFlagGrupo(flagGrupo);
      });
      return function storeFlagGrupo() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      storeFlagGrupo();
    }, []);
    if (!flagGrupo) return null;
    return Boolean(entidad) && (0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: titleStyles,
      children: [(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          justifyContent: "center",
          width: "50%"
        },
        children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: _Styles.default.titleFont,
          children: isInList ? "Entidad" : "ENTIDAD"
        })
      }), (0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          justifyContent: "center",
          width: "50%"
        },
        children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: _Styles.default.accountFont,
          children: entidad
        })
      })]
    });
  };
  var _default = exports.default = EntidadNombre;
