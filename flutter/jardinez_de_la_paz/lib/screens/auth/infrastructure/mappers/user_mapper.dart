import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.response.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/index.dart';

class UserMapper {
  static User userJsonToEntity(Map<String, dynamic> json) => User(
        nombre: json['nombre'],
        correo: json['correo'],
        telefono: json['telefono'],
        token: json['token'],
      );

  static RegisterEntityResponse userNewJsonToEntity(Map<dynamic, dynamic> json) =>
      RegisterEntityResponse(data: json['data']);
}
