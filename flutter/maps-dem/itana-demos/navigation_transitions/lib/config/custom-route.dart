import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:navigation_transitions/screens/scree_one.dart';
import 'package:navigation_transitions/screens/scree_three.dart';
import 'package:navigation_transitions/screens/scree_two.dart';
import 'package:navigation_transitions/screens/screen_not_found.dart';
import 'package:navigation_transitions/screens/menu.dart';
import 'package:navigation_transitions/transitions/rotation_page_route.dart';
import 'package:navigation_transitions/transitions/scale_page_route.dart';

class CustomRoute {
  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case Menu.route:
        return RotationPageRoute(builder: (_) => const Menu());
      case ScreenOne.route:
        return CupertinoPageRoute(builder: (_) => const ScreenOne());
      case ScreenTwo.route:
        return MaterialPageRoute(builder: (_) => const ScreenTwo());
      case ScreenThree.route:
        return ScalePageRoute(builder: (_) => const ScreenThree());
      default:
        return RotationPageRoute(builder: (_) => const ScreenNotFound());
    }
  }
}
