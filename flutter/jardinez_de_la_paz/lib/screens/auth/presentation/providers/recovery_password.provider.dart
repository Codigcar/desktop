import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:formz/formz.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/recovery.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/index.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/errors/auth_errors.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/index.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/dni.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/telephone.dart';

//! 1 - State del provider

class RecoveryPasswordFormState {
  final bool isPosting;
  final bool isFormPosted;
  final bool isValid;
  final DNI dni;
  final Email email;
  final Telephone cel;
  final String errorMessage;
  final String typeMessage;
  final bool isLoading;

  RecoveryPasswordFormState({
    this.isPosting = false,
    this.isFormPosted = false,
    this.isValid = false,
    this.dni = const DNI.pure(),
    this.email = const Email.pure(),
    this.cel = const Telephone.pure(),
    this.errorMessage = '',
    this.isLoading = false,
    this.typeMessage = 'OK',
  });

  RecoveryPasswordFormState copyWith({
    bool? isPosting,
    bool? isFormPosted,
    bool? isValid,
    DNI? dni,
    Telephone? cel,
    Email? email,
    Password? password,
    String? errorMessage,
    bool? isLoading,
    String? typeMessage,
  }) =>
      RecoveryPasswordFormState(
        isPosting: isPosting ?? this.isPosting,
        isFormPosted: isFormPosted ?? this.isFormPosted,
        isValid: isValid ?? this.isValid,
        dni: dni ?? this.dni,
        email: email ?? this.email,
        cel: cel ?? this.cel,
        errorMessage: errorMessage ?? this.errorMessage,
        isLoading: isLoading ?? this.isLoading,
        typeMessage: typeMessage ?? this.typeMessage,
      );
}

//! 2 - Como implementamos un notifier

class RecoveryPasswordFormNotifier
    extends StateNotifier<RecoveryPasswordFormState> {
  final AuthRepository authRepository;

  RecoveryPasswordFormNotifier({required this.authRepository})
      : super(RecoveryPasswordFormState());

  onDNIChange(String value) {
    final newValue = DNI.dirty(value);
    state = state.copyWith(
      dni: newValue,
      isValid: Formz.validate([newValue, state.email, state.cel]),
    );
  }

  onEmailChanged(String value) {
    final newValue = Email.dirty(value);
    state = state.copyWith(
      email: newValue,
      isValid: Formz.validate([newValue, state.dni, state.cel]),
    );
  }

  onCelChanged(String value) {
    final newValue = Telephone.dirty(value);
    state = state.copyWith(
      cel: newValue,
      isValid: Formz.validate([newValue, state.dni, state.email]),
    );
  }

  void updateModalMessage(String typeMessage, String errorMessage) {
    state = state.copyWith(
      typeMessage: typeMessage,
      errorMessage: errorMessage,
      isLoading: false,
      isFormPosted: true,
    );
  }

  resetInit() {
    state = state.copyWith(
      typeMessage: 'OK',
      isFormPosted: false,
      isLoading: false,
      errorMessage: '',
    );
  }

  onFormSubmit(BuildContext context) async {
    _touchEveryField();
    if (state.isLoading) return;
    if (!state.isValid) return;

    try {
      state = state.copyWith(isLoading: true);

      final response =
          await authRepository.recoveryPassword(RecoveryPasswordRequest(
        dni: state.dni.value,
        email: state.email.value,
        tel: state.cel.value,
      ));
      // updateModalMessage(response.estado, response.mensaje);
       state = state.copyWith(isLoading: false);
      if (!context.mounted) return;
      DialogUtils.successAlert(context, title: response.mensaje);
    } on CustomError catch (e) {
      // updateModalMessage('Error', e.message);
      state = state.copyWith(isLoading: false);
      if (!context.mounted) return;
      DialogUtils.errorAlert(context, title: e.message);
    } catch (e) {
      state = state.copyWith(isLoading: false);
      if (!context.mounted) return;
      DialogUtils.errorAlert(context, title: 'Error del servidor');
      // updateModalMessage('Error', 'Error no controlado');
    }
  }

  _touchEveryField() {
    final email = Email.dirty(state.email.value);
    final dni = DNI.dirty(state.dni.value);
    final cel = Telephone.dirty(state.cel.value);
    state = state.copyWith(
      email: email,
      dni: dni,
      cel: cel,
      isValid: Formz.validate([dni, email, cel]),
    );
  }
}

//! 3 - StateNotifierProvider - consume afuera

final recoveryPasswordProvider = StateNotifierProvider.autoDispose<
    RecoveryPasswordFormNotifier, RecoveryPasswordFormState>((ref) {
  final authRepository = AuthRepositoryImpl();
  return RecoveryPasswordFormNotifier(authRepository: authRepository);
});
