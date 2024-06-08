import 'package:flutter/material.dart';

ThemeData darkTheme = ThemeData.from(
  colorScheme: const ColorScheme.dark(
    primary: Colors.blueGrey,
    secondary: Colors.deepOrangeAccent,
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
      color: Colors.blueGrey,
    ),
  ),
).copyWith(
  appBarTheme: const AppBarTheme(
    centerTitle: true,
    backgroundColor: Colors.blueGrey,
  ),
  iconTheme: const IconThemeData(color: Colors.blueGrey, size: 50.0),
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
        BorderSide(color: Colors.blueGrey),
      ),
    ),
  ),
  textButtonTheme: const TextButtonThemeData(
    style: ButtonStyle(
      foregroundColor: MaterialStatePropertyAll(Colors.white),
      overlayColor: MaterialStatePropertyAll(Colors.blueGrey),
    ),
  ),
  inputDecorationTheme: const InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(5.0)),
    ),
  ),
);
