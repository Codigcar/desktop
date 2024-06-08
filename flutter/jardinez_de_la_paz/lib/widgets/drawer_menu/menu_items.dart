import 'package:flutter/material.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/presentation/screens/contact_us.screen.dart';
import 'package:jardinez_de_la_paz/screens/eecc/presentation/screens/eecc.screen.dart';
import 'package:jardinez_de_la_paz/screens/index.dart';
import 'package:jardinez_de_la_paz/screens/terms/screens/terms.screen.dart';


class MenuItem {
  final String title;
  final String subTitle;
  final String link;
  final IconData icon;

  const MenuItem({
    required this.title,
    required this.subTitle,
    required this.link,
    required this.icon
  });
}


const appMenuItems = <MenuItem>[

  MenuItem(
    title: 'Principal', 
    subTitle: '',
    link: HomeScreen.route, 
    icon: Icons.home_outlined
  ),

  MenuItem(
    title: 'Buscar fallecido', 
    subTitle: '', 
    link: GuestUserScreen.route, 
    icon: Icons.search
  ),

  MenuItem(
    title: 'Estado de cuenta', 
    subTitle: '', 
    link: EECCScreen.route, 
    icon: Icons.content_paste_search_outlined
  ),

  MenuItem(
    title: 'Contáctenos', 
    subTitle: '', 
    link: ContactUsScreen.route, 
    icon: Icons.mail_outlined
  ),

  MenuItem(
    title: 'Eventos del día', 
    subTitle: '', 
    link: EventListScreen.route, 
    icon: Icons.event_available_outlined
  ),

  MenuItem(
    title: 'Términos y condiciones', 
    subTitle: '', 
    // link: 'https://www.jardinesdelapaz.com/quienes-somos', 
    // link: 'https://jardines.pe/pages/team/terminos.pdf', 
    link: TermsScreen.route, 
    icon: Icons.file_copy_outlined
  ),

  MenuItem(
    title: 'Cerrar sesión', 
    subTitle: '', 
    link: AuthScreen.route, 
    icon: Icons.logout
  ),
];



