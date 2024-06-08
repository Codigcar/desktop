import 'package:flutter/material.dart';
import 'package:navigation_transitions/config/custom-route.dart';
import 'package:navigation_transitions/screens/menu.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData.light(),
      initialRoute: Menu.route,
      onGenerateRoute: (settings) => CustomRoute.onGenerateRoute(settings),
    );
  }
}
