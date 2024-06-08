import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/auth.provider.dart';
import 'package:jardinez_de_la_paz/widgets/drawer_menu/menu_items.dart';
import 'package:jardinez_de_la_paz/widgets/utils.dart';

class SideMenu extends StatefulWidget {
  final GlobalKey<ScaffoldState> scaffoldKey;
  const SideMenu({super.key, required this.scaffoldKey});

  @override
  State<SideMenu> createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  int navDrawerIndex = 0;

  @override
  Widget build(BuildContext context) {
    return NavigationDrawer(
      elevation: 1,
      selectedIndex: navDrawerIndex,
      onDestinationSelected: (value) {
        setState(() {
          navDrawerIndex = value;
        });

        final menuItem = appMenuItems[value];
        // if (menuItem.link.startsWith('https')) {
        //   // Utils.openBrowserLink(menuItem.link);
        //   Utils.openPDF(menuItem.link);
        //   return;
        // }
        if(menuItem.title == 'Cerrar sesión') {
          context.replace(menuItem.link);
          return;
        }
        context.push(menuItem.link);

        widget.scaffoldKey.currentState?.closeDrawer();
      },
      children: [
        _Header(),
        const SizedBox(height: 10),
        ...appMenuItems.map(
          (item) => NavigationDrawerDestination(
            icon: Icon(item.icon),
            label: Text(item.title),
          ),
        ),
      ],
    );
  }
}

class _Header extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userOfState = ref.watch(authProvider).user;
    final colorsTheme = Theme.of(context).colorScheme;

    return Container(
      color: colorsTheme.primary,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset(
            'assets/icon/fondo_blanco.png',
            width: 50,
            height: 50,
            fit: BoxFit.contain,
          ),
          const SizedBox(height: 10),
          Text(userOfState!.nombre,
              style: const TextStyle(color: Colors.white)),
          Text(userOfState.correo,
              style: TextStyle(color: Colors.grey.shade300)),
        ],
      ),
    );
  }
}
