import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

class TermsScreen extends StatefulWidget {
  static const name = 'TermsScreen';
  static const route = '/terms-screen';
  const TermsScreen({super.key});

  @override
  State<TermsScreen> createState() => _TermsScreenState();
}

class _TermsScreenState extends State<TermsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(
        child: SfPdfViewer.network(
          'https://jardines.pe/pages/team/terminos.pdf',
        ),
      ),
    );
  }
}
