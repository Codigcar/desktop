import 'package:flutter/material.dart';
import 'package:named_routes/screens/scree_one.dart';
import 'package:named_routes/screens/scree_three.dart';
import 'package:named_routes/screens/scree_two.dart';
import 'package:named_routes/screens/screen_not_found.dart';

class Menu extends StatelessWidget {
  static const route = 'menu';

  const Menu({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Menu'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, ScreenOne.route,
                    arguments: {"args": "test"});
              },
              child: const Text('Screen One'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ScreenTwo()),
                );
              },
              child: const Text('Screen Two'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, ScreenThree.route);
              },
              child: const Text('Screen Three'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, ScreenNotFound.route);
              },
              child: const Text('Screen Not Found'),
            ),
          ],
        ),
      ),
    );
  }
}
