import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:formz/formz.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/errors/auth_errors.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/auth.provider.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/dni.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/index.dart';

//! 1 - State del provider

class LoginFormState {
  final bool isPosting;
  final bool isFormPosted;
  final bool isValid;
  final DNI dni;
  final Password password;

  LoginFormState({
    this.isPosting = false,
    this.isFormPosted = false,
    this.isValid = false,
    this.dni = const DNI.pure(),
    this.password = const Password.pure(),
  });

  @override
  String toString() {
    return '''
  LoginFormState:
    isPosting: $isPosting
    isFormPosted: $isFormPosted
    isValid: $isValid
    DNI: $dni
    password: $password
''';
  }

  LoginFormState copyWith({
    bool? isPosting,
    bool? isFormPosted,
    bool? isValid,
    DNI? dni,
    Password? password,
  }) =>
      LoginFormState(
        isPosting: isPosting ?? this.isPosting,
        isFormPosted: isFormPosted ?? this.isFormPosted,
        isValid: isValid ?? this.isValid,
        dni: dni ?? this.dni,
        password: password ?? this.password,
      );
}

//! 2 - Como implementamos un notifier
class LoginFormNotifier extends StateNotifier<LoginFormState> {
  final Function(String, String, BuildContext) loginUserCallback;

  LoginFormNotifier({
    required this.loginUserCallback,
  }) : super(LoginFormState());

  onDNIChange(String value) {
    final newDNI = DNI.dirty(value);
    state = state.copyWith(
      dni: newDNI,
      isValid: Formz.validate([newDNI, state.password]),
    );
  }

  onPasswordChanged(String value) {
    final newPassword = Password.dirty(value);
    state = state.copyWith(
      password: newPassword,
      isValid: Formz.validate([newPassword, state.dni]),
    );
  }

  onFormSubmit(BuildContext context) async {
    _touchEveryField();
    if (!state.isValid) return;

    await loginUserCallback(state.dni.value, state.password.value, context);
    state = state.copyWith(
      dni: const DNI.pure(),
      password: const Password.pure(),
    );
  }

  _touchEveryField() {
    final dni = DNI.dirty(state.dni.value);
    final password = Password.dirty(state.password.value);

    state = state.copyWith(
      isFormPosted: true,
      dni: dni,
      password: password,
      isValid: Formz.validate([dni, password]),
    );
  }
}

//! 3 - StateNotifierProvider - consume afuera

final loginformProvider =
    StateNotifierProvider.autoDispose<LoginFormNotifier, LoginFormState>((ref) {
  final loginUserCallback = ref.watch(authProvider.notifier).loginUser;
  return LoginFormNotifier(loginUserCallback: loginUserCallback);
});
