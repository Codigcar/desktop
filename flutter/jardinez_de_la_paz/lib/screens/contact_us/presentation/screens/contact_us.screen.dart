import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class ContactUsScreen extends StatelessWidget {
  static const name = 'contact-us-screen';
  static const route = '/contact';
  const ContactUsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
        backgroundColor: colorTheme.primary,
        surfaceTintColor: Colors.red,
      ),
      body: InAppWebView(
        initialUrlRequest:
            URLRequest(url: Uri.parse('https://jardines.pe/pages/app/')),
        initialOptions: InAppWebViewGroupOptions(
          ios: IOSInAppWebViewOptions(disallowOverScroll: true),
        ),
      ),
    );
  }
}
