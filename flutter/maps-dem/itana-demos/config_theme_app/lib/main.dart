import 'package:config_theme_app/config/themes/dark_theme.dart';
import 'package:config_theme_app/config/themes/light_theme.dart';
import 'package:config_theme_app/my_home_page.dart';
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: ThemeMode.system,
      home: const MyHomePage(title: 'Personalización de Temas'),
    );
  }
}
