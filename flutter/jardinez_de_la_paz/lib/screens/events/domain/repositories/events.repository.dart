import 'package:jardinez_de_la_paz/screens/events/domain/entities/event.entity.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/entities/event2.entity.dart';

abstract class EventsRepository {
  Future<EventEntityResponse> getEvents();
  Future<List<Event2Entity>> getEventList();
}
