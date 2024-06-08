import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:formz/formz.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/errors/auth_errors.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/auth.provider.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/dni.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/telephone.dart';

//! 1 - State del provider

class RegisterFormState {
  final bool isPosting;
  final bool isFormPosted;
  final bool isValid;
  final bool isLoading;
  final DNI dni;
  final Email email;
  final Telephone cel;
  final Password password;

  RegisterFormState({
    this.isPosting = false,
    this.isFormPosted = false,
    this.isValid = false,
    this.isLoading = false,
    this.dni = const DNI.pure(),
    this.password = const Password.pure(),
    this.email = const Email.pure(),
    this.cel = const Telephone.pure(),
  });

  RegisterFormState copyWith({
    bool? isPosting,
    bool? isFormPosted,
    bool? isValid,
    bool? isLoading,
    DNI? dni,
    Telephone? cel,
    Email? email,
    Password? password,
  }) =>
      RegisterFormState(
        isPosting: isPosting ?? this.isPosting,
        isFormPosted: isFormPosted ?? this.isFormPosted,
        isValid: isValid ?? this.isValid,
        dni: dni ?? this.dni,
        password: password ?? this.password,
        email: email ?? this.email,
        cel: cel ?? this.cel,
        isLoading: isLoading ?? this.isLoading,
      );
}

//! 2 - Como implementamos un notifier

class RegisterFormNotifier extends StateNotifier<RegisterFormState> {
  final Function(RegisterEntityRequest, BuildContext) registerUserCallback;

  RegisterFormNotifier({
    required this.registerUserCallback,
  }) : super(RegisterFormState());

  onDNIChange(String value) {
    final newValue = DNI.dirty(value);
    state = state.copyWith(
      dni: newValue,
      isValid:
          Formz.validate([newValue, state.password, state.email, state.cel]),
    );
  }

  onPasswordChanged(String value) {
    final newValue = Password.dirty(value);
    state = state.copyWith(
      password: newValue,
      isValid: Formz.validate([newValue, state.dni, state.email, state.cel]),
    );
  }

  onEmailChanged(String value) {
    final newValue = Email.dirty(value);
    state = state.copyWith(
      email: newValue,
      isValid: Formz.validate([newValue, state.dni, state.password, state.cel]),
    );
  }

  onCelChanged(String value) {
    final newValue = Telephone.dirty(value);
    state = state.copyWith(
      cel: newValue,
      isValid:
          Formz.validate([newValue, state.dni, state.password, state.email]),
    );
  }

  onFormSubmit(BuildContext context) async {
    _touchEveryField();
    if (!state.isValid) return;

    try {
      state = state.copyWith(isLoading: true);
      await registerUserCallback(
        RegisterEntityRequest(
          usuario: state.dni.value,
          celular: state.cel.value,
          correo: state.email.value,
          clave: state.password.value,
        ),
        context,
      );
      state = state.copyWith(isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false);
    }
  }

  _touchEveryField() {
    final email = Email.dirty(state.email.value);
    final password = Password.dirty(state.password.value);
    final dni = DNI.dirty(state.dni.value);
    final cel = Telephone.dirty(state.cel.value);

    state = state.copyWith(
      isFormPosted: true,
      email: email,
      dni: dni,
      cel: cel,
      password: password,
      isValid: Formz.validate([dni, password, email, cel]),
    );
  }
}

//! 3 - StateNotifierProvider - consume afuera

final registerformProvider =
    StateNotifierProvider.autoDispose<RegisterFormNotifier, RegisterFormState>(
        (ref) {
  final registerUserCallback = ref.watch(authProvider.notifier).registerUser;
  return RegisterFormNotifier(registerUserCallback: registerUserCallback);
});
