import 'dart:math';
import 'package:flutter/material.dart';
import '../home/HomeScreen.dart';
import '../shared/utils/app_asset.dart';

class BienvenidaScreenSecond extends StatefulWidget {
  static String route = 'bienvenida-screen-second';

  const BienvenidaScreenSecond({super.key});

  @override
  State<BienvenidaScreenSecond> createState() => _BienvenidaScreenSecondState();
}

class _BienvenidaScreenSecondState extends State<BienvenidaScreenSecond>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _logoAnimation;
  late Animation<double> _logoRotationAnimation;
  late Animation<double> _textAnimation;

  @override
  void initState() {
    super.initState();
    initAnimator();
    autoRedirectToHomeScreen();
  }

  void initAnimator() {
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );

    _logoRotationAnimation = CurvedAnimation(
        parent: _animationController,
        curve: const Interval(0, 0.5, curve: Curves.easeOut));

    _logoAnimation = CurvedAnimation(
        parent: _animationController,
        curve: const Interval(0.5, 1, curve: Curves.easeOut));

    _textAnimation = CurvedAnimation(
        parent: _animationController,
        curve: const Interval(0.65, 1, curve: Curves.easeIn));

    //inicia el proceso de animación para los objetos
    _animationController.forward();
  }

  void autoRedirectToHomeScreen() {
    Future.delayed(const Duration(milliseconds: 3000),
        () => Navigator.pushNamed(context, HomeScreen.route));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.green,
      body: Center(
        //Permite construir widgets que necesitan reconstruirse en respuesta a una animación
        // en lugar de reconstruir el árbol completo de widgets
        child: AnimatedBuilder(
          animation: _animationController,
          builder: (context, child) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Stack(
                  alignment: Alignment.centerLeft,
                  children: [
                    Opacity(
                      opacity: _textAnimation.value,
                      child: SlideTransition(
                        position: Tween<Offset>(
                          begin: const Offset(-0.3, 0.0),
                          end: const Offset(0.1, 0.0),
                        ).animate(_textAnimation),
                        child: Text(
                          'Interbank',
                          style: Theme.of(context)
                              .textTheme
                              .headlineLarge
                              ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                        ),
                      ),
                    ),
                    SlideTransition(
                      position: Tween<Offset>(
                        begin: const Offset(1, 0.0),
                        end: const Offset(-0.7, 0.0),
                      ).animate(_logoAnimation),
                      child: Transform(
                        transform: Matrix4.identity()
                          ..rotateY(_logoRotationAnimation.value * pi),
                        alignment: Alignment.center,
                        child: Container(
                          color: Colors.green,
                          child: Image.asset(
                            AppAsset.logoSecondary,
                            width: 50.0,
                            height: 50.0,
                          ),
                        ),
                      ),
                    ),
                  ],
                )
              ],
            );
          },
        ),
      ),
    );
  }
}
