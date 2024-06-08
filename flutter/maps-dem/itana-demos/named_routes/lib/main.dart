import 'package:flutter/material.dart';
import 'package:named_routes/config/custom-route.dart';
import 'package:named_routes/screens/menu.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData.light(),
      //routes: CustomRoute.routes,
      initialRoute: Menu.route,
      onGenerateRoute: (settings) => CustomRoute.onGenerateRoute(settings),
    );
  }
}
