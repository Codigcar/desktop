import 'package:flutter/material.dart';

class RotationPageRoute extends PageRouteBuilder {
  final Widget Function(BuildContext) builder;

  RotationPageRoute({required this.builder})
      : super(
          barrierColor: Colors.blueAccent,
          pageBuilder: (context, animation, secondaryAnimation) =>
              builder(context),
          transitionsBuilder: (
            BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
            Widget child,
          ) =>
              RotationTransition(turns: animation, child: child),
        );
}
