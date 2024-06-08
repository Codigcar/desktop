import 'package:flutter/material.dart';
import 'package:splash_screen/bienvenida/bienvenida_screen_second.dart';
import '../../shared/utils/app_asset.dart';

class BienvenidaScreenFirst extends StatefulWidget {
  static String route = 'bienvenida-screen-first';

  const BienvenidaScreenFirst({Key? key}) : super(key: key);

  @override
  State<BienvenidaScreenFirst> createState() => _BienvenidaScreenFirstState();
}

class _BienvenidaScreenFirstState extends State<BienvenidaScreenFirst> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2),
        () => Navigator.pushNamed(context, BienvenidaScreenSecond.route));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(35.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(40.0),
              ),
              child: Container(
                padding: const EdgeInsets.all(25.0),
                decoration: BoxDecoration(
                  color: Colors.green,
                  borderRadius: BorderRadius.circular(30.0),
                ),
                child: Image.asset(
                  AppAsset.logoSecondary,
                  width: 110.0,
                  height: 110.0,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
