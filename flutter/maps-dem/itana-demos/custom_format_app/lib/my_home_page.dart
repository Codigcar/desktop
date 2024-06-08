import 'package:custom_format_app/formatters/credit_card_formatter.dart';
import 'package:custom_format_app/formatters/telephone_number_formatter.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Ingresa tu telefono:',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                decoration: const InputDecoration(hintText: '000-00000'),
                inputFormatters: [
                  TelephoneNumberFormatter(),
                  LengthLimitingTextInputFormatter(8),
                ],
              ),
              const SizedBox(height: 50.0),
              Text(
                'Ingresa tu número de tarjeta:',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                decoration:
                    const InputDecoration(hintText: '0000 0000 0000 0000'),
                inputFormatters: [
                  CreditCardFormatter(),
                  LengthLimitingTextInputFormatter(19),
                ],
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {},
          child: const Icon(Icons.add),
        ), // This trailing comma makes auto-formatting nicer for build methods.
      ),
    );
  }
}
