import 'package:dockseekerapp/config/theme.dart';
import 'package:dockseekerapp/router/app_router.dart';
//import 'package:dockseekerapp/screens/index.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      theme: AppTheme().getTheme(),
      routerConfig: appRouter,
    );
  }
}
