import 'package:go_router/go_router.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/screens/login.screen.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/screens/recovery_password.screen.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/presentation/screens/add_suggestion.screen.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/presentation/screens/contact_us.screen.dart';
import 'package:jardinez_de_la_paz/screens/eecc/presentation/screens/eecc.screen.dart';
import 'package:jardinez_de_la_paz/screens/events/presentation/screens/event_detail.screen.dart';
import 'package:jardinez_de_la_paz/screens/index.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/entities/search_person.entity.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/screens/person_detail.screen.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/screens/person_list.screen.dart';
import 'package:jardinez_de_la_paz/screens/terms/screens/terms.screen.dart';

final appRouter =
    GoRouter(initialLocation: /* GuestUserScreen.route */ '/', routes: [
  GoRoute(
      path: '/',
      name: AuthScreen.name,
      builder: (context, state) => const AuthScreen()),
  GoRoute(
    path: GuestUserScreen.route,
    name: GuestUserScreen.name,
    builder: (context, state) => const GuestUserScreen(),
  ),
  GoRoute(
      path: '/home',
      name: HomeScreen.name,
      builder: (context, state) => const HomeScreen()),
  GoRoute(
    path: EventListScreen.route,
    name: EventListScreen.name,
    builder: (context, state) => EventListScreen(),
  ),
  GoRoute(
    path: EventDetail.route,
    name: EventDetail.name,
    builder: (context, state) =>
        EventDetail(empresa: state.pathParameters['empresa']),
  ),
  GoRoute(
    path: ContactUsScreen.route,
    name: ContactUsScreen.name,
    builder: (context, state) => const ContactUsScreen(),
  ),
  GoRoute(
    path: EECCScreen.route,
    name: EECCScreen.name,
    builder: (context, state) => const EECCScreen(),
  ),
  GoRoute(
    path: LoginScreen.route,
    name: LoginScreen.name,
    pageBuilder: (context, state) => CustomTransitionPage(
      //  fullscreenDialog: true,
      opaque: false,
      transitionsBuilder: (_, __, ___, child) => child,
      child: const LoginScreen(),
    ),
    // builder: (context, state) => const LoginScreen()
  ),
  GoRoute(
    path: RecoveryPasswordScreen.router,
    name: RecoveryPasswordScreen.name,
    builder: (context, state) => const RecoveryPasswordScreen(),
  ),
  GoRoute(
    path: AddSuggestionScreen.route,
    name: AddSuggestionScreen.name,
    builder: (context, state) => const AddSuggestionScreen(),
  ),
  GoRoute(
    path: PersonList.route,
    name: PersonList.name,
    builder: (context, state) => const PersonList(),
  ),
  GoRoute(
    path: PersonDetailScreen.route,
    name: PersonDetailScreen.name,
    builder: (context, state) =>
        PersonDetailScreen(person: state.extra as SearchPersonEntity),
  ),
  GoRoute(
    path: TermsScreen.route,
    name: TermsScreen.name,
    builder: (context, state) => const TermsScreen(),
  ),
]);
