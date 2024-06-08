
//TODO! PERMITE COMPARTIR LA INSTANCIA DEL EVENTS_REPOSITORY A TODO EL APP

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/domain.dart';
import 'package:jardinez_de_la_paz/screens/events/infrastructure/datasources/events.datasource.impl.dart';
import 'package:jardinez_de_la_paz/screens/events/infrastructure/repositories/events.repository.impl.dart';

final eventsRepositoryProvider = Provider<EventsRepository>((ref) {
  // final eventsRepository = EventsRepositoryImpl(_datasource)
  final eventsRepository = EventsRepositoryImpl(EventsDatasourceImpl());
  return eventsRepository;
});