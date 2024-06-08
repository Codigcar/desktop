import 'package:dio/dio.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/domain.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/entities/event2.entity.dart';

class EventsDatasourceImpl extends EventsDatasource {
  late final Dio dio;
  // final String accessToken;

  EventsDatasourceImpl()
      : dio = Dio(
          BaseOptions(
            baseUrl: 'https://170.0.80.194:8010/api',
            // headers: { 'Authorization':'Bearer $accessToken' }
          ),
        );

  @override
  Future<EventEntityResponse> getEvents() async {
    final response = await dio.get('/evento');
    final dataReponse = EventEntityResponse.fromJson(response.data);

    // final List<Event2Entity> eventList = [];

    // for (final itemEvent in response.data['data'] ?? []) {
    //   eventList.add(Event2Entity.fromJson(itemEvent));
    // }

    return dataReponse;
  }

  @override
  Future<List<Event2Entity>> getEventList() async {
    final response = await dio.get('/evento');

    final List<Event2Entity> eventList = [];
    for (final itemEvent in response.data['data'] ?? []) {
      eventList.add(Event2Entity.fromJson(itemEvent));
    }
    return eventList;
  }
}
