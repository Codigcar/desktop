import 'package:cloud_functions/cloud_functions.dart';
import 'package:flutter/material.dart';

class TestScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Callbacks"),
      ),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              FlatButton(
                color: Colors.blue,
                onPressed: () {
                  prueba2();
                },
                child: Text("Call"),
              )
            ],
          ),
        ),
      ),
    );
  }

  Future<void> prueba1() async {
    final HttpsCallable callable = CloudFunctions.instance.getHttpsCallable(
      functionName: 'prueba1',
    );
    HttpsCallableResult result = await callable.call();
    print(result.data);
  }

  Future<void> prueba2() async {
    final HttpsCallable callable = CloudFunctions.instance.getHttpsCallable(
      functionName: 'prueba2',
    );
    HttpsCallableResult result = await callable.call({'nombre': 'Pedro'});
    print(result.data);
  }
}
