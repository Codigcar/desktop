import 'package:jardinez_de_la_paz/screens/search_person/domain/entities/search_person.entity.dart';

abstract class SearchPersonDatasource {
  Future<List<SearchPersonEntity>> getPerson(
    String nombre,
    String apellidoPaterno,
    String apellidoMaterno,
    String dateOfDeath,
    String campoSanto,
  );
}
