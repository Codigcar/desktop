import 'package:flutter/material.dart';

List<Map<dynamic, dynamic>> navigationSection = [
  {
    'icon': Icons.lock,
    'text': 'Seguridad y privacidad',
    'navigationPath': '/cuidador',
  },
  {
    'icon': Icons.verified,
    'text': 'Token digital',
    'navigationPath': '/cuidador',
  },
  {
    'icon': Icons.qr_code,
    'text': 'Operar con QR',
    'navigationPath': '/cuidador',
  },
  {
    'icon': Icons.book,
    'text': 'Experiencias',
    'navigationPath': '/cuidador',
  },
];

class SideMenu extends StatelessWidget {
  const SideMenu({super.key});

  @override
  Widget build(BuildContext context) {
    int navDrawerIndex = 0;

    return NavigationDrawer(
      selectedIndex: navDrawerIndex, children: [
      for (var item in navigationSection)
        NavigationDrawerDestination(
          icon: Icon(item['icon']!),
          label: Text(item['text']!),
        ),
      // ...navigationSection.map(
      //   (item) => NavigationDrawerDestination(
      //     icon: Icon(Icons.abc),
      //     label: Text('text'),
      //   ),
      // )
    ]);
  }
}
