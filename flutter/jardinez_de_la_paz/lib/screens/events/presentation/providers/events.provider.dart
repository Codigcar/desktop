import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/domain.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/entities/event2.entity.dart';
import 'package:jardinez_de_la_paz/screens/events/presentation/providers/events.repository.provider.dart';


//! 1. state
class EventsState {
  final bool isLoading;
  final EventEntityResponse eventEntityResponse;
  final List<Event2Entity> eventList;
  final List<MapEntry<String, int>> eventsListFiltered;
  final List<Event2Entity> eventListByTitle;
  final int selectedRowIndex;

  EventsState({
    this.isLoading = false,
    EventEntityResponse? eventEntityResponse,
    this.eventList = const [],
    this.eventsListFiltered = const [],
    this.eventListByTitle = const [],
    this.selectedRowIndex = 0,
  }) : eventEntityResponse =
            eventEntityResponse ?? EventEntityResponse(data: []);

  EventsState copyWith({
    bool? isLoading,
    EventEntityResponse? eventEntityResponse,
    List<Event2Entity>? eventList,
    List<MapEntry<String, int>>? eventsListFiltered,
    List<Event2Entity>? eventListByTitle,
    int? selectedRowIndex,
  }) =>
      EventsState(
        isLoading: isLoading ?? this.isLoading,
        eventEntityResponse: eventEntityResponse ?? this.eventEntityResponse,
        eventList: eventList ?? this.eventList,
        eventsListFiltered: eventsListFiltered ?? this.eventsListFiltered,
        eventListByTitle: eventListByTitle ?? this.eventListByTitle,
        selectedRowIndex: selectedRowIndex ?? this.selectedRowIndex,
      );
}

//! 2.

class EventsNotifier extends StateNotifier<EventsState> {
  final EventsRepository eventsRepository;

  EventsNotifier({required this.eventsRepository}) : super(EventsState()) {
    loadDataEvents();
  }

  void toggleRow(int index) {
    state = state.selectedRowIndex == index ? state.copyWith(selectedRowIndex: 10000) : state.copyWith(selectedRowIndex: index);
  }

  Future loadDataEvents() async {
    if (state.isLoading) return;

    state = state.copyWith(isLoading: true);

    final getEvents = await eventsRepository.getEventList();

    print('getEventos: $getEvents');
    Map<String, int> conteoPorCategoria = {};
    getEvents.forEach((dato) {
      final categoria = dato.title;
      conteoPorCategoria[categoria] = (conteoPorCategoria[categoria] ?? 0) + 1;
    });

    List<MapEntry<String, int>> listaDeEntradas =
        conteoPorCategoria.entries.toList();

    state = state.copyWith(
      isLoading: false,
      eventList: getEvents,
      eventsListFiltered: listaDeEntradas,
    );
  }

  void filterByTitle(String title) {
    final dataFiltered =
        state.eventList.where((element) => element.title == title).toList();

    state = state.copyWith(eventListByTitle: dataFiltered);
  }
}

//! 3.

final eventsProvider = StateNotifierProvider<EventsNotifier, EventsState>(
  (ref) {
    final eventsRepository = ref.watch(eventsRepositoryProvider);
    return EventsNotifier(eventsRepository: eventsRepository);
  },
);
