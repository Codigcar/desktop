import 'package:dio/dio.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/datasources/auth.datasource.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/recovery.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/recovery.entity.response.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/user.entity.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.response.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/errors/auth_errors.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/mappers/user_mapper.dart';

class AuthDataSourceImpl extends AuthDataSource {
  final dio = Dio(BaseOptions(baseUrl: 'https://170.0.80.194:8005/api'));

  @override
  Future<User> checkAuthStatus(String token) {
    // TODO: implement checkAuthStatus
    throw UnimplementedError();
  }

  @override
  Future<User> login(String dni, String password) async {
    try {
      final response = await dio.post('/login', data: {
        'usuario': dni,
        'password': password,
      });
      final user = UserMapper.userJsonToEntity(response.data);
      return user;
    } on DioException catch (e) {
      if (e.response?.statusCode == 401)
        throw CustomError(message: 'Usted no es parte de Jardines');
      throw CustomError(message: 'Error encontrado');
    } catch (e) {
      throw CustomError(message: 'Error encontrado');
    }
  }

  @override
  Future<RegisterEntityResponse> register(
    RegisterEntityRequest newUserEntity,
  ) async {
    try {
      final response = await dio.post('/usuario/registrar', data: {
        'usuario': newUserEntity.usuario,
        'calular': newUserEntity.celular,
        'correo': newUserEntity.correo,
        'clave': newUserEntity.clave,
      });
      final dataReponse = RegisterEntityResponse.fromJson(response.data);
      if (dataReponse.data[0].estado == 'Error') {
        throw CustomError(message: dataReponse.data[0].mensaje);
      }

      return dataReponse;
    } on DioException catch (e) {
      if (e.response?.statusCode == 401)
        throw CustomError(message: 'Usted no es parte de Jardines');
      throw CustomError(message: 'Error encontrado1');
    } catch (e) {
      throw CustomError(
          message: (e as dynamic)?.message ?? 'Error encontrado');
    }
  }

  @override
  Future<RecoryPasswordResponse> recoveryPassword(
      RecoveryPasswordRequest recoveryPasswordRequest) async {
    try {
      final response = await dio.post('/usuario/recupera', data: {
        'usuario': recoveryPasswordRequest.dni,
        'correo': recoveryPasswordRequest.email,
        'celular': recoveryPasswordRequest.tel,
      });

      final dataResponse =
          RecoryPasswordResponse.fromJson(response.data['data'][0]);
      if (dataResponse.estado == 'Error') {
        throw CustomError(message: dataResponse.mensaje);
      }
      return dataResponse;
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        throw CustomError(message: 'Usted no es parte de Jardines');
      }
      throw CustomError(message: 'Error encontrado');
    } catch (e) {
      throw CustomError(
          message: (e as dynamic)?.message ?? 'Error encontrado');
    }
  }
}
