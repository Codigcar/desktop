  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _Styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _AccordianComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5]);
  var menu = [{
    title: '1.- ¿Qué usuarios pueden utilizar la App Empresas?',
    data: '- Los usuarios Administrador, Operador, Supervisor y Ambos.'
  }, {
    title: '2.- ¿Cómo solicito el token digital?',
    data: '- El usuario Administrador de tu empresa debe hacer clic al acceso rápido Asignar token digital.\r\n\r\n- Seleccionar tu usuario, hacer clic en modificar, marcar la opción Utilizar como factor de seguridad Token digital y hacer clic en procesar.'
  }, {
    title: '3.- ¿Cómo apruebo/rechazo mis operaciones en la web con el token digital?',
    data: '- Debes ingresar con un usuario Supervisor o Ambos y hacer clic en la opción Aprobaciones pendientes.\r\n\r\n- Seleccionar las operaciones y hacer clic en aprobar/rechazar.\r\n\r\n- Ingresar los números del token digital que se visualizan en la pantalla de ingreso de tu App Empresas y hacer clic en procesar.\r\n\r\n- Recuerda que el usuario debe contar con el token digital activo.'
  }, {
    title: '4.- ¿Qué hago si me roban/pierdo el celular donde tengo el App Empresas y token digital activo?',
    data: '- Debes comunicarte inmediatamente con el usuario Administrador de tu empresa para que bloquee tu usuario, de esta manera ya no se podrá ingresar a tu sesión de usuario.\r\n\r\n- Luego, deberás solicitar la anulación de tu token digital completando el formulario de modificación.\r\n\r\n- Una vez procesada la solicitud, podrás afiliarte al token digital con tu nuevo celular.'
  }, {
    title: '5.- ¿Cómo eliminar mi usuario de la Banca por Internet/App?',
    data: '- Debes comunicarte con el usuario Administrador de tu empresa para que elimine tu usuario.\r\n\r\n- Una vez eliminado ya no podrás acceder a la información de los productos de tu empresa.'
  }];
  var FrequentQuestions = function FrequentQuestions() {
    var renderAccordians = function renderAccordians() {
      var items = [];
      for (var item of menu) {
        items.push((0, _jsxRuntime.jsx)(_AccordianComponent.default, {
          title: item.title,
          data: item.data
        }, item.title));
      }
      return items;
    };
    return (0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _Styles.default.viewContainer,
      children: renderAccordians()
    });
  };
  var _default = exports.default = FrequentQuestions;
