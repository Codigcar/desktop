import 'package:appbar_app/screen/perfil_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AlzCare',
      initialRoute: PerfilScreen.id,
      routes: {
        PerfilScreen.id: (context) => PerfilScreen(),
      },
    );
  }
}
