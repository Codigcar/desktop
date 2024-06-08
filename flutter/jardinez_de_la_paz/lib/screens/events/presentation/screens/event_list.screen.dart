import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/config/index.dart';
import 'package:jardinez_de_la_paz/screens/events/presentation/providers/events.provider.dart';
import 'package:jardinez_de_la_paz/screens/events/presentation/screens/event_detail.screen.dart';
import 'package:jardinez_de_la_paz/widgets/header_title.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:intl/intl.dart';

class EventListScreen extends ConsumerWidget {
  static const name = 'event-list';
  static const route = '/events';

  const EventListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final scaffoldKey = GlobalKey<ScaffoldState>();
    final getEventsOfState = ref.watch(eventsProvider);

    if (getEventsOfState.isLoading) {
      Future.delayed(Duration.zero, () {
        DialogUtils.showDialogLoading(context);
      });
    }

    if (!getEventsOfState.isLoading && DialogUtils.isShow()) {
      DialogUtils.dismissDialogLoading();
    }

    return Scaffold(
      appBar: AppBar(),
      // drawer: SideMenu(scaffoldKey: scaffoldKey),
      body: Column(
        children: [
          _Banner(),
          _List(getEventsOfState: getEventsOfState),
        ],
      ),
    );
  }
}

class _Banner extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;

    return Container(
      color: colorTheme.primary,
      width: double.infinity,
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 10),
        child: Column(
          children: [
            const HeaderTitle(
              title: 'EVENTOS DEL DÍA',
              iconName: Icons.event_available_outlined,
            ),
            const SizedBox(height: 10),
            Text(
              DateFormat('dd/MM/yy').format(DateTime.now()),
              style: textStylesTheme.titleMedium?.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 10),
            Text(
              'Seleccione camposanto',
              style: textStylesTheme.titleMedium?.copyWith(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}

class _List extends StatelessWidget {
  final EventsState getEventsOfState;

  const _List({required this.getEventsOfState});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView.builder(
        itemCount: getEventsOfState.eventsListFiltered.length,
        itemBuilder: (context, index) {
          final itemFiltered = getEventsOfState.eventsListFiltered[index];

          return _CustomRow(
            title: itemFiltered.key,
            count: itemFiltered.value,
          );
        },
      ),
    );
  }
}

class _CustomRow extends ConsumerWidget {
  final String title;
  final int count;

  const _CustomRow({required this.title, required this.count});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () {
        ref.read(eventsProvider.notifier).filterByTitle(title);
        appRouter
            .pushNamed(EventDetail.name, pathParameters: {'empresa': title});
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 20),
          decoration: const BoxDecoration(
            border: Border(
              bottom: BorderSide(
                color: Colors.grey,
                width: 1,
              ),
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
              Row(
                children: [
                  Text(
                    count.toString(),
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(width: 20),
                  const Icon(Icons.arrow_forward_ios),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
