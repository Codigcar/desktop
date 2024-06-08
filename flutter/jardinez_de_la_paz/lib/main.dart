import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';
import 'package:jardinez_de_la_paz/config/index.dart';

// void main() {
//   runApp(const MyApp());
// }

void main() {
  runApp(const ProviderScope(child: MyApp()));
}
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Jardines de la Paz',
      theme: AppTheme().getTheme(context),
      routerConfig: appRouter,
      builder: EasyLoading.init(),
      debugShowCheckedModeBanner: false
    );
  }
}
