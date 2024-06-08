import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/recovery_password.provider.dart';
import 'package:jardinez_de_la_paz/widgets/header_title.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/custom_input.dart';

class RecoveryPasswordScreen extends StatelessWidget {
  static const name = 'RecoveryPasswordScreen';
  static const router = '/recovery-password';
  const RecoveryPasswordScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;

    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(),
        body: SafeArea(
          top: true,
          child: Container(
            color: colorTheme.primary,
            height: MediaQuery.of(context).size.height,
            width: double.infinity,
            child: SingleChildScrollView(
              child: Column(
                children: [
                  const SizedBox(height: 20),
                  const HeaderTitle(
                    title: 'RECUPERAR CLAVE',
                    iconName: Icons.lock_outline,
                  ),
                  _RegisterForm(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _RegisterForm extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sizePhone = MediaQuery.of(context).size;
    final colorTheme = Theme.of(context).colorScheme;
    final recoveryOfState = ref.watch(recoveryPasswordProvider);
    Color colorWhite = Colors.white;

    if (recoveryOfState.isLoading) {
      Future.delayed(Duration.zero, () {
        DialogUtils.showDialogLoading(context);
      });
    }

    if (!recoveryOfState.isLoading && DialogUtils.isShow()) {
      DialogUtils.dismissDialogLoading();
    }

    // ref.listen(recoveryPasswordProvider, (previous, next) async {
    //   if (next.errorMessage.isEmpty || next.isFormPosted == false) return;
    //   DialogUtils.showErrorDialog(
    //     context,
    //     type: next.typeMessage,
    //     message: next.errorMessage,
    //     onPressed: () => {
    //       ref.read(recoveryPasswordProvider.notifier).resetInit(),
    //     },
    //   );
    // });

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          const SizedBox(height: 50),
          CustomTextFormField(
            label: 'Ingresar DNI',
            labelColor: colorWhite,
            borderColor: colorWhite,
            colorInput: colorWhite,
            floatingLabelColor: colorWhite,
            cursorColor: colorWhite,
            onChanged: (value) =>
                ref.read(recoveryPasswordProvider.notifier).onDNIChange(value),
            errorMessage: recoveryOfState.dni.errorMessage,
          ),
          const SizedBox(height: 30),
          CustomTextFormField(
            label: 'Ingresar correo',
            labelColor: colorWhite,
            borderColor: colorWhite,
            colorInput: colorWhite,
            floatingLabelColor: colorWhite,
            cursorColor: colorWhite,
            onChanged: (value) => ref
                .read(recoveryPasswordProvider.notifier)
                .onEmailChanged(value),
            errorMessage: recoveryOfState.email.errorMessage,
          ),
          const SizedBox(height: 30),
          CustomTextFormField(
            label: 'Ingresar celular',
            labelColor: colorWhite,
            borderColor: colorWhite,
            colorInput: colorWhite,
            floatingLabelColor: colorWhite,
            cursorColor: colorWhite,
            onChanged: (value) =>
                ref.read(recoveryPasswordProvider.notifier).onCelChanged(value),
            errorMessage: recoveryOfState.cel.errorMessage,
          ),
          const SizedBox(height: 30),
          SizedBox(
            width: sizePhone.width * 0.6,
            height: 45,
            child: FilledButton(
              onPressed: () {
                ref.read(recoveryPasswordProvider.notifier).onFormSubmit(context);
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
                foregroundColor: MaterialStateProperty.all(colorTheme.primary),
              ),
              child: const Text('CONFIRMAR'),
            ),
          ),
        ],
      ),
    );
  }
}
