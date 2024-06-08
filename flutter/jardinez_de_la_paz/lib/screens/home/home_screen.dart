import 'package:flutter/material.dart';
import 'package:jardinez_de_la_paz/config/index.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/presentation/screens/contact_us.screen.dart';
import 'package:jardinez_de_la_paz/screens/eecc/presentation/screens/eecc.screen.dart';
import 'package:jardinez_de_la_paz/screens/index.dart';
import 'package:jardinez_de_la_paz/screens/terms/screens/terms.screen.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/utils.dart';

class HomeScreen extends StatelessWidget {
  static const name = 'home_screen';
  static const route = '/home';
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final scaffoldKey = GlobalKey<ScaffoldState>();
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;

    return Scaffold(
      drawer: SideMenu(scaffoldKey: scaffoldKey),
      appBar: AppBar(
        title: Image.asset(
          'assets/icon/logo_jardines_header.png',
          width: 35,
          height: 35,
        ),
      ),
      body: Container(
        color: Colors.white,
        child: SafeArea(
          top: false,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              CustomPaint(
                painter: ShapesPainter(color: colorTheme.primary),
                child: SizedBox(
                  height: 220,
                  child: Image.asset(
                    'assets/icon/auth_logo.png',
                    width: double.infinity,
                    // width: 300,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(height: 10),
              Expanded(
                child: Table(
                  children: [
                    TableRow(
                      children: [
                        TableCell(
                          child: Center(
                            child: CustomAvatar(
                              title: 'Buscar fallecido',
                              iconName: Icons.search,
                              onTap: () =>
                                  {appRouter.push(GuestUserScreen.route)},
                            ),
                          ),
                        ),
                        TableCell(
                          child: Center(
                            child: CustomAvatar(
                              title: 'Estado de cuenta',
                              iconName: Icons.content_paste_search_outlined,
                              onTap: () => {appRouter.push(EECCScreen.route)},
                            ),
                          ),
                        ),
                      ],
                    ),
                    // const SizedBox(height: 16),
                    TableRow(
                      children: [
                        TableCell(
                          child: Center(
                            child: CustomAvatar(
                              title: 'Contáctenos',
                              iconName: Icons.email_outlined,
                              onTap: () =>
                                  {appRouter.push(ContactUsScreen.route)},
                            ),
                          ),
                        ),
                        TableCell(
                          child: Center(
                              child: CustomAvatar(
                            title: 'Eventos del día',
                            iconName: Icons.edit_calendar_outlined,
                            onTap: () =>
                                {appRouter.push(EventListScreen.route)},
                          )),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(
                width: double.infinity,
                child: GestureDetector(
                  /* onTap: () => Utils.openBrowserLink(
                    'https://www.jardinesdelapaz.com/quienes-somos',
                  ), */
                  onTap: () => appRouter.push(TermsScreen.route),
                  child: Text(
                    'Términos y condiciones',
                    textAlign: TextAlign.center,
                    style: textStylesTheme.bodyLarge
                        ?.copyWith(color: colorTheme.primary),
                  ),
                ),
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }
}
