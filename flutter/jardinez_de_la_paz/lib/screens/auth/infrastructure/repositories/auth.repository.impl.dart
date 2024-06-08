import 'package:jardinez_de_la_paz/screens/auth/domain/datasources/auth.datasource.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/recovery.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/recovery.entity.response.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/user.entity.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.response.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/repositories/auth.repository.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/datasources/auth.datasource.impl.dart';

class AuthRepositoryImpl extends AuthRepository {
  final AuthDataSource _dataSource;

  AuthRepositoryImpl({AuthDataSource? dataSource})
      : _dataSource = dataSource ?? AuthDataSourceImpl();

  @override
  Future<User> checkAuthStatus(String token) {
    return _dataSource.checkAuthStatus(token);
  }

  @override
  Future<User> login(String dni, String password) {
    return _dataSource.login(dni, password);
  }

  @override
  Future<RegisterEntityResponse> register(RegisterEntityRequest newUserEntity) {
    return _dataSource.register(newUserEntity);
  }

  @override
  Future<RecoryPasswordResponse> recoveryPassword(
      RecoveryPasswordRequest recoveryPasswordRequest) {
    return _dataSource.recoveryPassword(recoveryPasswordRequest);
  }
}
