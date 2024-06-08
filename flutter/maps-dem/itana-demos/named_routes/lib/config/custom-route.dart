import 'package:flutter/material.dart';
import 'package:named_routes/screens/scree_one.dart';
import 'package:named_routes/screens/scree_three.dart';
import 'package:named_routes/screens/scree_two.dart';
import 'package:named_routes/screens/screen_not_found.dart';
import 'package:named_routes/screens/menu.dart';

class CustomRoute {
  static Map<String, Widget Function(BuildContext)> routes =
      <String, WidgetBuilder>{
    Menu.route: (context) => const Menu(),
    ScreenOne.route: (context) {
      RouteSettings settings = ModalRoute.of(context)!.settings;
      debugPrint('Routes: ${settings.arguments.toString()}');
      return const ScreenOne();
    },
    ScreenTwo.route: (context) => const ScreenTwo(),
    ScreenThree.route: (context) => const ScreenThree()
  };

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    return PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) {
        switch (settings.name) {
          case Menu.route:
            return const Menu();
          case ScreenOne.route:
            debugPrint('onGenerateRoute: ${settings.arguments.toString()}');
            return const ScreenOne();
          case ScreenTwo.route:
            return const ScreenTwo();
          case ScreenThree.route:
            return const ScreenThree();
          default:
            return const ScreenNotFound();
        }
      },
    );
  }
}
