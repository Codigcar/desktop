import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/events/domain/entities/event2.entity.dart';
import 'package:jardinez_de_la_paz/screens/events/presentation/providers/events.provider.dart';
import 'dart:convert';

class EventDetail extends ConsumerWidget {
  static const name = 'event-detail';
  static const route = '/event-detail/:empresa';

  final String? empresa;

  const EventDetail({super.key, this.empresa});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final getEventsOfState = ref.watch(eventsProvider);

    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: [
          _Banner(empresa: empresa!, programation: getEventsOfState.eventListByTitle[0].programation),
          _List(getEventsOfState.eventListByTitle),
        ],
      ),
    );
  }
}

class _Banner extends StatelessWidget {
  final String empresa;
  final String programation;

  const _Banner({required this.empresa, required this.programation});

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStyleTheme = Theme.of(context).textTheme;

    return Container(
      color: colorTheme.primary,
      width: double.infinity,
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 10),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.event_available_outlined,
                  size: 50,
                  color: Colors.white,
                ),
                SizedBox(width: 20),
                Text(
                  empresa.toUpperCase(),
                  style:
                      textStyleTheme.titleLarge?.copyWith(color: Colors.white),
                ),
              ],
            ),
            SizedBox(height: 10),
            Text(
              programation,
              style: textStyleTheme.titleMedium?.copyWith(color: Colors.white),
            ),
            SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}

class _List extends StatelessWidget {
  final List<Event2Entity> eventListByTitle;

  const _List(this.eventListByTitle);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView.builder(
        itemCount: eventListByTitle.length,
        itemBuilder: (context, index) {
          final item = eventListByTitle[index];
          return _CustomRow(
          fullName: item.fullName, 
          time: item.time,
          tipoEspacio: item.tipoEspacio,
          codigoEspacio: item.codigoEspacio,
          vendedor: item.vendedor,
          agencia: item.agencia,
          velatorio: item.velatorio,
          observacion: item.observacion,
          index: index,
          );
        },
      ),
    );
  }
}

class _CustomRow extends ConsumerWidget {
  final String time;
  final String fullName;
  final String tipoEspacio;
  final String codigoEspacio;
  final String vendedor;
  final String agencia;
  final String velatorio;
  final String observacion;
  final int index;


  const _CustomRow({required this.time, required this.fullName,
  required this.tipoEspacio,
  required this.codigoEspacio,
  required this.vendedor,
  required this.agencia,
  required this.velatorio,
  required this.observacion,
  required this.index,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final colorsTheme = Theme.of(context).colorScheme;
    final getEventsOfState = ref.watch(eventsProvider);
    bool isExpanded = getEventsOfState.selectedRowIndex == index; // Verificar si esta fila está expandida

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 20),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: Colors.grey,
              width: 1,
            ),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              time,
              style: TextStyle(
                color: Colors.red,
                fontWeight: FontWeight.bold,
              ),
            ),
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children:[
              Text(
                fullName,
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
              GestureDetector(
                  onTap: () {
                    // ref.read(eventsProvider.notifier).changeMoreInfo();
                    ref.read(eventsProvider.notifier).toggleRow(index);  // Actualiza el estado para mostrar o esconder la info
                  },
                child: Icon(
                  isExpanded
                      ? Icons.zoom_in_map_outlined
                      : Icons.zoom_out_map_rounded,
                  color: colorsTheme.primary,
                )
              )
            ]),
            SizedBox(height:10),
            isExpanded ?
                Column(
                  children: [
                    _CustomRowSummary(keyValue: "Tipo de espacio: ",fullValue: tipoEspacio),
                    _CustomRowSummary(keyValue: "Código espacio: ",fullValue: codigoEspacio),
                    _CustomRowSummary(keyValue: "Vendedor: ",fullValue: vendedor),
                    _CustomRowSummary(keyValue: "Agencia: ",fullValue: agencia),
                    _CustomRowSummary(keyValue: "Velatorio: ",fullValue: velatorio),
                    _CustomRowSummary(keyValue: "Observación: ",fullValue: observacion)
                  ]
                ) : const SizedBox(),

          ],
        ),
      ),
    );
  }
}

class _CustomRowSummary extends StatelessWidget {
  final String keyValue;
  final String fullValue;

  const _CustomRowSummary({required this.keyValue, required this.fullValue});

  @override
  Widget build(BuildContext context) {
    return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
         Text(
              '$keyValue',
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
    Flexible(
      child:
            Text(
              fullValue,
              style: TextStyle(
                color: Colors.black,
              ),
            ),
    ),
      ]
    );
  }
}