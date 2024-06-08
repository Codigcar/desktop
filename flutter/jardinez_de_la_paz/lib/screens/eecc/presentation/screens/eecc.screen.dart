import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/auth.provider.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/eecc.entity.dart';
import 'package:jardinez_de_la_paz/screens/eecc/presentation/providers/eecc.provider.dart';
import 'package:jardinez_de_la_paz/widgets/header_title.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/custom_dropdown.dart';

List<Map<String, dynamic>> titles = [
  {'label': 'Cuota', 'width': 0.1},
  {'label': 'Fecha de Vencimiento', 'width': 0.3},
  {'label': 'Importe de la cuota', 'width': 0.3},
  {'label': 'I. Morarorio', 'width': 0.3},
  {'label': 'Estado', 'width': 0.3},
];

class EECCScreen extends ConsumerWidget {
  static const name = 'eecc-screen';
  static const route = '/eecc';
  const EECCScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final scaffoldKey = GlobalKey<ScaffoldState>();
    final sizePhone = MediaQuery.of(context).size;
    final textStylesTheme = Theme.of(context).textTheme;
    final eeccOfState = ref.watch(eeccProvider);
    final callBackF = ref.watch(eeccProvider.notifier).loadDataContract;
    final authOfstate = ref.read(authProvider);

    if (eeccOfState.isLoading) {
      Future.delayed(Duration.zero, () {
        DialogUtils.showDialogLoading(context);
      });
    }

    if (!eeccOfState.isLoading && DialogUtils.isShow()) {
      DialogUtils.dismissDialogLoading();
    }

    return Scaffold(
      appBar: AppBar(),
      // drawer: SideMenu(scaffoldKey: scaffoldKey),
      body: Column(
        children: [
          _Banner(
            contractList: eeccOfState.contractsDropDown,
            callBackF: callBackF,
            fullName: authOfstate.user?.nombre ?? 'error',
          ),
          Expanded(
            child: SafeArea(
              bottom: true,
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: DataTable(
                  horizontalMargin: 5,
                  columnSpacing: 5,
                  columns: _getColumns(sizePhone.width, textStylesTheme),
                  rows: _getRows(eeccOfState.estadoDeCuenta.cuotaList,
                      sizePhone.width, textStylesTheme),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Banner extends StatelessWidget {
  final List<String> contractList;
  final Function(String?) callBackF;
  final String fullName;

  const _Banner(
      {required this.contractList,
      required this.callBackF,
      required this.fullName});

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;

    return Container(
        color: colorTheme.primary,
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        child: Column(
          children: [
            const SizedBox(height: 10),
            const HeaderTitle(
              title: 'ESTADO DE CUENTA',
              iconName: Icons.content_paste_search_outlined,
            ),
            const SizedBox(height: 10),
            Text(
              fullName,
              style: textStylesTheme.bodyLarge?.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 10),
            CustomDropdownFormField(
              label: 'Contrato',
              colorInput: Colors.white,
              items: contractList,
              onChanged: (value) {
                // eecc
                callBackF(value);
              },
            ),
            const SizedBox(height: 10),
          ],
        ));
  }
}

List<DataColumn> _getColumns(double tableWidth, TextTheme textStylesTheme) {
  return titles.map((dynamic item) {
    return DataColumn(
      label: Expanded(
        child: Text(
          item['label'],
          softWrap: true,
          textAlign: TextAlign.center,
          style:
              textStylesTheme.bodySmall?.copyWith(fontWeight: FontWeight.bold),
        ),
      ),
    );
  }).toList();
}

List<DataRow> _getRows(List<CronogramaCuotaEntity> cronogramaCuotas,
    double tableWidth, TextTheme textStylesTheme) {
  return cronogramaCuotas.map((item) {
    return DataRow(cells: [
      DataCell(
        Center(
          child: Text(
            item.numCuota,
            style: textStylesTheme.bodySmall
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
      ),
      DataCell(
        Center(
          child: Text(
            item.fechaVencimiento,
            style: textStylesTheme.bodySmall
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
      ),
      DataCell(
        Center(
          child: Text(
            item.montoCuota.toString(),
            style: textStylesTheme.bodySmall
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
      ),
      DataCell(
        Center(
          child: Text(
            item.mora.toString(),
            style: textStylesTheme.bodySmall
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
      ),
      DataCell(
        Center(
          child: Text(
            item.estado,
            style: textStylesTheme.bodySmall
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
        ),
      ),
    ]);
  }).toList();
}
