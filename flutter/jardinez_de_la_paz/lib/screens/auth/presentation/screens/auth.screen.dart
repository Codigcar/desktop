import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/config/index.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/auth.provider.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/screens/login.screen.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/screens/recovery_password.screen.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/screens/register.screen.dart';
import 'package:jardinez_de_la_paz/screens/index.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';

class AuthScreen extends ConsumerWidget {
  static const name = 'auth_screen';
  static const route = '/';
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;
    final authOfState = ref.watch(authProvider);

    if (authOfState.isLoading) {
      FocusScope.of(context).unfocus();
      Future.delayed(Duration.zero, () {
        DialogUtils.showDialogLoading(context);
      });
    }

    if (!authOfState.isLoading) {
      if (DialogUtils.isShow()) {
        DialogUtils.dismissDialogLoading();
      }
    }

    return Scaffold(
      body: Container(
        color: Colors.white,
        child: SafeArea(
          top: false,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Stack(
                children: [
                  CustomPaint(
                    painter: ShapesPainter(color: colorTheme.primary),
                    child: SizedBox(
                      height: 230,
                      child: Image.asset(
                        'assets/icon/auth_logo.png',
                        width: double.infinity,
                        fit: BoxFit.contain,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: Text(
                    'Con esta aplicación podrás ubicar de manera rápida y sencilla a un fallecido, ver tu estado de cuenta y hacernos una consulta.\nPuedes acceder iniciando sesión con tu usuario y contraseña o como usuario invitado.',
                    textAlign: TextAlign.center,
                    style: textStylesTheme.bodyMedium,
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  CustomAvatar(
                    title: 'Iniciar sesión',
                    iconName: Icons.lock_outline_rounded,
                    onTap: () => {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return const LoginScreen();
                        },
                      )
                    },
                  ),
                  CustomAvatar(
                    title: 'Usuario invitado',
                    iconName: Icons.person_outline,
                    onTap: () => appRouter.push(GuestUserScreen.route),
                  )
                ],
              ),
              const SizedBox(height: 50),
              SizedBox(
                width: double.infinity,
                child: GestureDetector(
                  onTap: () => {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return const RegisterScreen();
                      },
                    )
                  },
                  child: Text(
                    'Nuevo Usuario',
                    textAlign: TextAlign.center,
                    style: textStylesTheme.bodyLarge
                        ?.copyWith(color: colorTheme.primary),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              SizedBox(
                width: double.infinity,
                child: GestureDetector(
                  onTap: () => appRouter.push(RecoveryPasswordScreen.router),
                  child: Text(
                    '¿Olvidaste tu contraseña?',
                    textAlign: TextAlign.center,
                    style: textStylesTheme.bodyLarge
                        ?.copyWith(color: colorTheme.primary),
                  ),
                ),
              ),
              const SizedBox(height: 10)
            ],
          ),
        ),
      ),
    );
  }
}
