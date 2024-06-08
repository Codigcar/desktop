import 'package:flutter/material.dart';
import 'package:splash_screen/bienvenida/bienvenida_screen_second.dart';
import 'package:splash_screen/home/HomeScreen.dart';
import 'bienvenida/components/bienvenida_screen_first.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter demo animation',
      home: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Splash Screen',
        initialRoute: BienvenidaScreenFirst.route,
        routes: {
          BienvenidaScreenFirst.route: (context) => BienvenidaScreenFirst(),
          BienvenidaScreenSecond.route: (context) => BienvenidaScreenSecond(),
          HomeScreen.route: (context) => HomeScreen()
        },
      ),
    );
  }
}
