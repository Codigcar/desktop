import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class TestBasicScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Basico"),
      ),
      body: SafeArea(
        child: Center(
          child: WebView(
            initialUrl: 'https://pub.dev/packages/webview_flutter',
            javascriptMode: JavascriptMode.unrestricted,
          ),
        ),
      ),
    );
  }
}
