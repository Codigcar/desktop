import 'package:flutter/material.dart';

class ScreenThree extends StatelessWidget {
  static const route = 'screen-three';
  const ScreenThree({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen Three'),
      ),
      body: const Center(
        child: Text('Screen Three'),
      ),
    );
  }
}
