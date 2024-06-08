import 'package:flutter/material.dart';
import 'package:reactive_form/config/validations_messages.dart';
import 'package:reactive_form/screens/reactive_form_screen.dart';
import 'package:reactive_forms/reactive_forms.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ReactiveFormConfig(
      validationMessages: Config.validationMessages,
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: const ReactiveFormScreen(),
      ),
    );
  }
}
