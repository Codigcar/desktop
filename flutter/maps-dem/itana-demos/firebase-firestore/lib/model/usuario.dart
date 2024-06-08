class Usuario {
  String idUsuario;
  String nombres;
  String apellidos;
  String email;
  String avatarUrl;

  static const String collectionId = 'usuarios';
  Usuario(
      {this.idUsuario,
      this.nombres,
      this.apellidos,
      this.email,
      this.avatarUrl});

  Usuario.fromSnapshot(String idUsuario, Map<String, dynamic> usuario)
      : idUsuario = idUsuario,
        nombres = usuario['nombres'],
        apellidos = usuario['apellidos'],
        email = usuario['email'],
        avatarUrl = usuario['avatarUrl'];

  Map<String, dynamic> toMap() => {
        'nombres': nombres,
        'apellidos': apellidos,
        'email': email,
        'avatarUrl': avatarUrl,
      };

  @override
  String toString() {
    return 'Usuario{idUsuario: $idUsuario, nombres: $nombres, apellidos: $apellidos, email: $email,avatarUrl:$avatarUrl}';
  }
}
