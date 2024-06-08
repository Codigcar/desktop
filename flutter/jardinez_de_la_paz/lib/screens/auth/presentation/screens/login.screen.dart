import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/config/index.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/login_form.provider.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/screens/recovery_password.screen.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/custom_input.dart';

class LoginScreen extends ConsumerWidget {
  static const name = 'login-screen';
  static const route = '/login-screen';
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loginForm = ref.watch(loginformProvider);
    final colorTheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    return Dialog(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white, // Color del contenido del diálogo
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'INICIAR SESIÓN',
              style: textTheme.titleMedium?.copyWith(color: colorTheme.primary),
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: 'Ingresar DNI',
              labelColor: colorTheme.primary,
              prefixIcon: Icons.person,
              prefixIconColor: colorTheme.primary,
              onChanged: (value) =>
                  ref.read(loginformProvider.notifier).onDNIChange(value),
              errorMessage: loginForm.dni.errorMessage,
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: 'Contraseña',
              labelColor: colorTheme.primary,
              prefixIcon: Icons.lock,
              prefixIconColor: colorTheme.primary,
              obscureText: true,
              onChanged: (value) =>
                  ref.read(loginformProvider.notifier).onPasswordChanged(value),
              errorMessage: loginForm.password.errorMessage,
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: 200,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  ref.read(loginformProvider.notifier).onFormSubmit(context);
                },
                style: ElevatedButton.styleFrom(backgroundColor: colorTheme.primary),
                child: const Text(
                  'INICIAR',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
            const SizedBox(height: 16),
            GestureDetector(
              onTap: () => appRouter.push(RecoveryPasswordScreen.router),
              child: Text(
                '¿Olvidaste tu contraseña?',
                style: textTheme.bodyMedium?.copyWith(color: colorTheme.primary),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
