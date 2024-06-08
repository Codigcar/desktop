import 'package:cubit/models/login_req.dart';

class AuthService {
  static final AuthService _instance = AuthService._privateConstructor();

  static AuthService get instance => _instance;

  AuthService._privateConstructor();

  Future<String> login(LoginReq loginReq) async {
    String defaultMessage = 'Credenciales Invalidas';
    await Future.delayed(const Duration(seconds: 2));
    if (loginReq.isAdmin) {
      return '{token}';
    } else {
      throw Exception(defaultMessage);
    }
  }
}
