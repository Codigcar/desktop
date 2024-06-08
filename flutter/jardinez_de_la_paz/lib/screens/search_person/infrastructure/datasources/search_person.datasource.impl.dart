import 'dart:ffi';

import 'package:dio/dio.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/errors/auth_errors.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/datasources/search_person.datasource.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/entities/search_person.entity.dart';

class SearchPersonDatasourceImpl extends SearchPersonDatasource {
  late final Dio dio;

  SearchPersonDatasourceImpl()
      : dio = Dio(BaseOptions(baseUrl: 'https://170.0.80.194:8010/api'));

  @override
  Future<List<SearchPersonEntity>> getPerson(
    String nombre,
    String apellidoPaterno,
    String apellidoMaterno,
    String dateOfDeath,
    String campoSanto,
  ) async {
    try {
      final response = await dio.post('/Fallecido', data: {
        "pNombre": nombre,
        "pApellidoPaterno": apellidoPaterno,
        "pApellidoMaterno": apellidoMaterno,
        "pFechaDefuncion": dateOfDeath,
        "pCampoSanto": campoSanto
      });

      final List<SearchPersonEntity> getPersonFoundedList = [];

      for (final person in response.data['data'] ?? []) {
        getPersonFoundedList.add(SearchPersonEntity.fromJson(person));
      }

      if (getPersonFoundedList.isEmpty) {
        throw CustomError(message: 'Registros no encontrados');
      }

      return getPersonFoundedList;
    } on DioException catch (e) {
      if (e.response?.statusCode == 401)
        throw CustomError(message: 'Usted no es parte de Jardines');
      throw CustomError(message: 'Error encontrado');
    } catch (e) {
      throw CustomError(
        message: (e as dynamic)?.message ?? 'Error encontrado.',
      );
    }
  }
}
