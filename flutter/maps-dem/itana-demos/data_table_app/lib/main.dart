import 'package:data_table_app/screens/data_table/data_table_1_screen.dart';
import 'package:data_table_app/screens/data_table/data_table_2_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Data Table',
      initialRoute: DataTable1Screen.id,
      routes: {
        DataTable1Screen.id: (context) => DataTable1Screen(),
        DataTable2Screen.id: (context) => DataTable2Screen()
      }
    );
  }
}