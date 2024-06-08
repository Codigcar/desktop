import 'package:flutter/material.dart';

ThemeData lightTheme = ThemeData.from(
  colorScheme: const ColorScheme.light(
    primary: Colors.blue,
    secondary: Colors.orange,
  ),
  textTheme: const TextTheme(
    titleLarge: TextStyle(
      fontSize: 30,
      fontWeight: FontWeight.bold,
    ),
    titleMedium: TextStyle(
      fontSize: 25,
      fontWeight: FontWeight.bold,
    ),
    titleSmall: TextStyle(
      fontSize: 20,
      decoration: TextDecoration.underline,
      fontWeight: FontWeight.bold,
      color: Colors.blue,
    ),
  ),
).copyWith(
  appBarTheme: const AppBarTheme(centerTitle: true),
  iconTheme: const IconThemeData(color: Colors.blue, size: 50.0),
  elevatedButtonTheme: const ElevatedButtonThemeData(
    style: ButtonStyle(
      padding: MaterialStatePropertyAll(
        EdgeInsets.all(5.0),
      ),
    ),
  ),
  outlinedButtonTheme: const OutlinedButtonThemeData(
    style: ButtonStyle(
      side: MaterialStatePropertyAll(
        BorderSide(color: Colors.blue),
      ),
    ),
  ),
  textButtonTheme: const TextButtonThemeData(
    style: ButtonStyle(
      foregroundColor: MaterialStatePropertyAll(Colors.black),
      overlayColor: MaterialStatePropertyAll(Colors.blue),
    ),
  ),
  inputDecorationTheme: const InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(5.0)),
    ),
  ),
);
