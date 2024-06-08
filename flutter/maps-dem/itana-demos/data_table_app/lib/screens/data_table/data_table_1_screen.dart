import 'package:data_table_app/screens/data_table/data_table_2_screen.dart';
import 'package:flutter/material.dart';

class DataTable1Screen extends StatefulWidget {
  static const String id = 'data_table_1_screen';

  @override
  _DataTable1ScreenState createState() => _DataTable1ScreenState();
}

class _DataTable1ScreenState extends State<DataTable1Screen> {
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
                dividerThickness: 10,
                dataRowHeight: 50,
                headingRowHeight: 50,
                columnSpacing: 50,
                columns: [
                  DataColumn(
                    label: Text('Nombre Color'),
                    numeric: true,
                  ),
                  DataColumn(
                    label: Text('Color'),
                    numeric: true,
                    tooltip: 'Color',
                  ),
                ],
                rows: [
                  DataRow(
                    cells: [
                      DataCell(Text('Azul')),
                      DataCell(
                        Container(
                          width: 20,
                          height: 20,
                          color: Colors.blue,
                        ),
                      ),
                    ],
                  ),
                  DataRow(
                    cells: [
                      DataCell(Text('Verde')),
                      DataCell(
                        Container(
                          width: 20,
                          height: 20,
                          color: Colors.green,
                        ),
                      ),
                    ],
                    color: MaterialStateProperty.resolveWith<Color>(
                      (Set<MaterialState> states) {
                        return Colors.lightBlue[100];
                      },
                    ),
                  ),
                  DataRow(
                    cells: [
                      DataCell(Text('Rojo')),
                      DataCell(
                        Container(
                          width: 20,
                          height: 20,
                          color: Colors.red,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              GestureDetector(
                onTap: () {
                  Navigator.pushNamed(context, DataTable2Screen.id);
                },
                child: Icon(
                  Icons.navigate_next,
                  size: 50,
                  color: Colors.blue,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
