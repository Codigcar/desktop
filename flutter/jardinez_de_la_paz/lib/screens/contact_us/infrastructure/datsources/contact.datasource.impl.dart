import 'package:dio/dio.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/domain/datasources/contact.datasource.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/domain/entities/contact_post.entity.dart';

class ContactDatasourceImpl extends ContactDatasource {
  late final Dio dio;

  ContactDatasourceImpl()
      : dio = Dio(
          BaseOptions(baseUrl: 'https://170.0.80.194:8010/api'),
        );

  @override
  Future<void> saveSuggestion(String message, List<ImageEntity> images) {
    // TODO: implement saveSuggestion
    throw UnimplementedError();
  }
}
