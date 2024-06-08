import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/repositories/search_person.repository.dart';
import 'package:jardinez_de_la_paz/screens/search_person/infrastructure/datasources/search_person.datasource.impl.dart';
import 'package:jardinez_de_la_paz/screens/search_person/infrastructure/repositories/search_person.repository.impl.dart';

final searchPersonRepositoryProvider = Provider<SearchPersonRepository>((ref) {
  final eeccRepository =
      SearchPersonRepositoryImpl(SearchPersonDatasourceImpl());
  return eeccRepository;
});
