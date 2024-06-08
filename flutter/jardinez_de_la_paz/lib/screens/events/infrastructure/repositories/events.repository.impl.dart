import 'package:jardinez_de_la_paz/screens/events/domain/domain.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/entities/event2.entity.dart';

class EventsRepositoryImpl extends EventsRepository {
  final EventsDatasource _datasource;

  EventsRepositoryImpl(this._datasource);

  @override
  Future<EventEntityResponse> getEvents() {
    return _datasource.getEvents();
  }

  @override
  Future<List<Event2Entity>> getEventList() {
    return _datasource.getEventList();
  }

}
