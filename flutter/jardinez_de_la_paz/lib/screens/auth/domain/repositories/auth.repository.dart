import 'package:jardinez_de_la_paz/screens/auth/domain/entities/recovery.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/recovery.entity.response.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/user.entity.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.response.dart';

abstract class AuthRepository {
  Future<User> login(String dni, String password);
  Future<RegisterEntityResponse> register(RegisterEntityRequest newUserEntity);
  Future<RecoryPasswordResponse> recoveryPassword(RecoveryPasswordRequest recoveryPasswordRequest);
  Future<User> checkAuthStatus(String token);
}
