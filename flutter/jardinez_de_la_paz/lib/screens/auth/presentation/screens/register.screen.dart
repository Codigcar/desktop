import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/register_form.provider.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/custom_input.dart';

class RegisterScreen extends ConsumerWidget {
  static const name = 'login-screen';
  static const route = '/login-screen';
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final registerForm = ref.watch(registerformProvider);
    final colorTheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

     if (registerForm.isLoading) {
      FocusScope.of(context).unfocus();
      Future.delayed(Duration.zero, () {
        DialogUtils.showDialogLoading(context);
      });
    }

    if (!registerForm.isLoading) {
      if (DialogUtils.isShow()) {
        DialogUtils.dismissDialogLoading();
      }
    }

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
              'NUEVO USUARIO',
              style: textTheme.titleMedium?.copyWith(color: colorTheme.primary),
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: 'Ingresar DNI',
              labelColor: colorTheme.primary,
              prefixIcon: Icons.person,
              prefixIconColor: colorTheme.primary,
              onChanged: (value) =>
                  ref.read(registerformProvider.notifier).onDNIChange(value),
              errorMessage: registerForm.dni.errorMessage,
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: 'Celular',
              labelColor: colorTheme.primary,
              prefixIcon: Icons.phone_android_outlined,
              prefixIconColor: colorTheme.primary,
              onChanged: (value) =>
                  ref.read(registerformProvider.notifier).onCelChanged(value),
              errorMessage: registerForm.cel.errorMessage,
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: 'Correo electrónico',
              labelColor: colorTheme.primary,
              prefixIcon: Icons.mail,
              prefixIconColor: colorTheme.primary,
              onChanged: (value) =>
                  ref.read(registerformProvider.notifier).onEmailChanged(value),
              errorMessage: registerForm.email.errorMessage,
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: 'Contraseña',
              labelColor: colorTheme.primary,
              prefixIcon: Icons.password_outlined,
              prefixIconColor: colorTheme.primary,
              obscureText: true,
              onChanged: (value) => ref
                  .read(registerformProvider.notifier)
                  .onPasswordChanged(value),
              errorMessage: registerForm.password.errorMessage,
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: 200,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  ref.read(registerformProvider.notifier).onFormSubmit(context);
                },
                style: ElevatedButton.styleFrom(backgroundColor: colorTheme.primary),
                child: const Text(
                  'SIGUIENTE',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
