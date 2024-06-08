class RegisterEntityRequest {
  final String usuario;
  final String? celular;
  final String correo;
  final String? clave;

  RegisterEntityRequest({
    required this.usuario,
    required this.celular,
    required this.correo,
    required this.clave,
  });
}
