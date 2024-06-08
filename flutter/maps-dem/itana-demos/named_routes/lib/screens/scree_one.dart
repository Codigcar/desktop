import 'package:flutter/material.dart';

class ScreenOne extends StatelessWidget {
  static const route = 'screen-one';
  const ScreenOne({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen One'),
      ),
      body: const Center(
        child: Text('Screen One'),
      ),
    );
  }
}
