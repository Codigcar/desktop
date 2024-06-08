import 'package:flutter/material.dart';

class ScreenNotFound extends StatelessWidget {
  static const route = 'screen-not-found';

  const ScreenNotFound({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen Not Found'),
      ),
      body: const Center(
        child: Text('Screen Not Found'),
      ),
    );
  }
}
