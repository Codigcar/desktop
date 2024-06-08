import 'package:dockseekerapp/screens/carga_archivo_paciente.dart';
import 'package:dockseekerapp/screens/form_signup_screen.dart';
import 'package:dockseekerapp/screens/home.dart';
import 'package:dockseekerapp/screens/index.dart';
import 'package:dockseekerapp/screens/login_screen.dart';
import 'package:go_router/go_router.dart';

final appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      name: 'onboarding',
      builder: (context, state) => const OnboardingScreen(),
    ),
    GoRoute(
      path: '/signup',
      name: 'register',
      builder: (context, state) => const RegisterScreen(),
    ),
    GoRoute(
      path: '/login',
      name: 'login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/form_signup',
      name: 'form_signup',
      builder: (context, state) => const FormSignUpScreen(),
    ),
    GoRoute(
      path: '/carga_archivo_paciente',
      name: 'carga_archivo_paciente',
      builder: (context, state) => const CargaArchivoPaciente(),
    ),
    GoRoute(
      path: '/home',
      name: 'home',
      builder: (context, state) => const HomeScreen(),
    ),

  ],
);
