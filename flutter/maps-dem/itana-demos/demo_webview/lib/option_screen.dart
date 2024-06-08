import 'package:demo_webview/test_basic_screen.dart';
import 'package:demo_webview/test_personalized_screen.dart';
import 'package:flutter/material.dart';

class OptionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Web View"),
      ),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              FlatButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (BuildContext context) => TestBasicScreen(),
                    ),
                  );
                },
                child: Text("       Básico       "),
                color: Colors.blue,
              ),
              FlatButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (BuildContext context) =>
                          TestPersonalizedScreen(),
                    ),
                  );
                },
                child: Text("Personalizado"),
                color: Colors.blue,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
