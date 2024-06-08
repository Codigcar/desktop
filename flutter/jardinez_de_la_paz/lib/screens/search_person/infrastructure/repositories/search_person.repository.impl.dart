import 'package:jardinez_de_la_paz/screens/search_person/domain/datasources/search_person.datasource.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/entities/search_person.entity.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/repositories/search_person.repository.dart';

class SearchPersonRepositoryImpl extends SearchPersonRepository {
  final SearchPersonDatasource _datasource;

  SearchPersonRepositoryImpl(this._datasource);

  @override
  Future<List<SearchPersonEntity>> getPerson(
      String nombre,
      String apellidoPaterno,
      String apellidoMaterno,
      String dateOfDeath,
      String campoSanto) {
    return _datasource.getPerson(
        nombre, apellidoPaterno, apellidoMaterno, dateOfDeath, campoSanto);
  }
}
