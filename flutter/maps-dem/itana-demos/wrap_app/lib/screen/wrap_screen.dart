import 'package:flutter/material.dart';

class WrapScreen extends StatefulWidget {
  static const String id = 'wrap_screen';
  @override
  _WrapScreenState createState() => _WrapScreenState();
}

class _WrapScreenState extends State<WrapScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Wrap'),
      ),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.green[100],
                ),
                height: 100,
                width: 200,
                child: Row(
                  children: [
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.green, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.green, size: 50),
                  ],
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.green[100],
                ),
                height: 100,
                width: 200,
                child: Column(
                  children: [
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked,
                        color: Colors.blue, size: 50),
                  ],
                ),
              ),
              Container(
                height: 200,
                width: 200,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.green[100],
                ),
                child: Wrap(
                  direction: Axis.vertical,
                  //alignment: WrapAlignment.spaceEvenly,
                  //spacing: 50,
                  //runAlignment: WrapAlignment.spaceBetween,
                  //runSpacing: 40,
                  //textDirection: TextDirection.rtl,
                  //verticalDirection: VerticalDirection.up,
                  children: [
                    Icon(Icons.radio_button_checked, color: Colors.red, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.blue, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.green, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.green, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.green, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.red, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.green, size: 50),
                    Icon(Icons.radio_button_checked, color: Colors.green, size: 50),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
