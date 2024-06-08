import 'package:flutter/material.dart';
import 'package:row_column_app/screens/RowColumn/example_screen.dart';
import 'package:row_column_app/screens/RowColumn/row_column_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.green,
      ),
      title: 'Refresh Indicator Demo',
      initialRoute: RowColumnScreen.id,
      routes: {
        RowColumnScreen.id: (context) => RowColumnScreen(),
        ExampleScreen.id: (context) => ExampleScreen()
      },
    );
  }
}