import 'package:flutter/material.dart';
import 'package:row_column_app/screens/RowColumn/example_screen.dart';

class RowColumnScreen extends StatefulWidget {
  static const String id = 'row_column_screen';
  @override
  _RowColumnScreenState createState() => _RowColumnScreenState();
}

class _RowColumnScreenState extends State<RowColumnScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('Row Column'),
        actions: [
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, ExampleScreen.id);
            },
            child: Icon(
              Icons.navigate_next,
              size: 50,
              color: Colors.orange,
            ),
          ),
          
        ],
      ),
      body: SafeArea(
        child: Container(
          //width: 200,  // column, 
          height: 200, // row,
          color: Colors.blue,
          child: Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.end,
            //verticalDirection: VerticalDirection.down,
            textDirection: TextDirection.rtl,
            children: <Widget>[
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black),
                  color: Colors.lightBlueAccent
                ),
                child: Icon(
                  Icons.star,
                  size: 50,
                  color: Colors.orange,
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black),
                  color: Colors.blueAccent
                ),
                child: Icon(
                  Icons.star,
                  size: 50,
                  color: Colors.orange,
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black),
                  color: Colors.blueAccent
                ),
                child: Icon(
                  Icons.star,
                  size: 50,
                  color: Colors.orange,
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black),
                  color: Colors.blueGrey
                ),
                child: Icon(
                  Icons.star,
                  size: 50,
                  color: Colors.orange,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}