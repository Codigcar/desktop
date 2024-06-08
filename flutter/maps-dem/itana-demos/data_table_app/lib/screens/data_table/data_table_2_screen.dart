import 'package:data_table_app/models/pais.dart';
import 'package:flutter/material.dart';

class DataTable2Screen extends StatefulWidget {
  static const String id = 'data_table_2_screen';

  @override
  _DataTable2ScreenState createState() => _DataTable2ScreenState();
}

class _DataTable2ScreenState extends State<DataTable2Screen> {
  List<Pais> paises;
  bool sortAscending;

  @override
  void initState() {
    super.initState();
    sortAscending = false;
    paises = Pais.getPaises();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text('Data Table', style: TextStyle(fontSize: 40)),
              DataTable(
                dividerThickness: 2,
                dataRowHeight: 50,
                headingRowHeight: 50,
                sortColumnIndex: 0,
                sortAscending: sortAscending,
                columns: [
                  DataColumn(
                      label: Text('Pais'),
                      numeric: false,
                      onSort: (columnIndex, ascending) {
                        setState(() {
                          sortAscending = !sortAscending;
                        });
                        ordenarColumna(columnIndex, ascending);
                      }),
                  DataColumn(
                    label: Text('Capital'),
                    numeric: false,
                    tooltip: 'Capital',
                  ),
                  DataColumn(label: Text('Bandera'), numeric: false),
                ],
                rows: paises
                    .map(
                      (pais) => DataRow(
                        selected: pais.selected,
                        onSelectChanged: (s) {
                          setState(() {
                            pais.selected = s;
                          });
                        },
                        cells: [
                          DataCell(
                            Text(
                              pais.nombre,
                            ),
                          ),
                          DataCell(
                            Text(
                              pais.capital,
                            ),
                          ),
                          DataCell(
                            Container(
                              height: 40,
                              width: 40,
                              child: Image.network(
                                pais.urlImagenBandera,
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                    .toList(),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  RichText(
                    text: TextSpan(
                      children: paises
                          .map(
                            (pais) => (pais.selected)
                                ? TextSpan(
                                    text: pais.nombre + '    ',
                                    style: TextStyle(
                                        color: Colors.black, fontSize: 20),
                                  )
                                : TextSpan(
                                    text: '',
                                  ),
                          )
                          .toList(),
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  ordenarColumna(int columnIndex, bool ordenar) {
    if (columnIndex == 0) {
      if (ordenar) {
        paises.sort((a, b) => a.nombre.compareTo(b.nombre));
      } else {
        paises.sort((a, b) => b.nombre.compareTo(a.nombre));
      }
    }
  }
}
