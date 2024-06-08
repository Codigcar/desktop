import 'package:flutter/material.dart';

class ExampleScreen extends StatefulWidget {
  static const String id = 'example_screen';
  @override
  _ExampleScreenState createState() => _ExampleScreenState();
}

class _ExampleScreenState extends State<ExampleScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('Row Column'),
      ),
      body: SafeArea(
        child: Container(
          color: Colors.lightBlue,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.end,
            //mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              
              Container(
                width: 250,
                height: 50,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black),
                  color: Colors.blueAccent
                ),
              ),

              Container(
                color: Colors.lightBlueAccent,
                height: 200,
                child: Row(
                  //mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      width: 50,
                      height: 200,
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.black),
                        color: Colors.blueAccent
                      ),
                    ),

                    Container(
                      color: Colors.lightBlueAccent[100],
                      child: Column(
                        //mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        //crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.black),
                              color: Colors.blueAccent
                            ),
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.black),
                              color: Colors.blueAccent
                            ),
                          ),
                        ],
                      ),
                    ),

                    Container(
                      width: 50,
                      height: 200,
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.black),
                        color: Colors.blueAccent
                      ),
                    ),

                    Container(
                      color: Colors.lightBlueAccent[100],
                      child: Column(
                        //mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: <Widget>[
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.black),
                              color: Colors.blueAccent
                            ),
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.black),
                              color: Colors.blueAccent
                            ),
                          ),
                        ],
                      ),
                    ),

                    Container(
                      width: 50,
                      height: 200,
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.black),
                        color: Colors.blueAccent
                      ),
                    ),


                  ],
                ),
              ),

              Container(
                width: 250,
                height: 50,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black),
                  color: Colors.blueAccent
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}