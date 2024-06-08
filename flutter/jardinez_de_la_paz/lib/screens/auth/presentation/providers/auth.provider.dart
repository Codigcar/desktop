import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/config/index.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/entities/register.entity.request.dart';
import 'package:jardinez_de_la_paz/screens/auth/domain/index.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/errors/auth_errors.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/index.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';

enum AuthStatus { checking, authenticated, notAuthenticated }

class AuthState {
  final AuthStatus authStatus;
  final User? user;
  final String errorMessage;
  final String dni;
  final bool isLoading;
  final bool isFormPosted;

  AuthState({
    this.authStatus = AuthStatus.checking,
    this.user,
    this.errorMessage = '',
    this.dni = '',
    this.isLoading = false,
    this.isFormPosted = false,
  });

  AuthState copyWith({
    AuthStatus? authStatus,
    User? user,
    String? errorMessage,
    String? dni,
    bool? isLoading,
    bool? isFormPosted,
  }) =>
      AuthState(
        authStatus: authStatus ?? this.authStatus,
        user: user ?? this.user,
        errorMessage: errorMessage ?? this.errorMessage,
        dni: dni ?? this.dni,
        isLoading: isLoading ?? this.isLoading,
        isFormPosted: isFormPosted ?? this.isFormPosted,
      );
}

// 2
class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository authRepository;

  AuthNotifier({required this.authRepository}) : super(AuthState());

  Future<void> loginUser(
      String dni, String password, BuildContext context) async {
    try {
      state = state.copyWith(isLoading: true);
      final user = await authRepository.login(dni, password);
      _setLoggedUser(user, dni);
      // logout();
      appRouter.push('/home');
    } on CustomError catch (e) {
      logout(e.message);
      state = state.copyWith(isLoading: false);
      if (!context.mounted) return;
      DialogUtils.errorAlert(context, title: e.message);
    } catch (e) {
      if (!context.mounted) return;
      logout('Error no controlado');
      DialogUtils.errorAlert(context, title: 'Error del servidor');
    }
  }

  void checkAuthStatus() async {}

  void _setLoggedUser(User user, String dni) {
    state = state.copyWith(
        user: user,
        authStatus: AuthStatus.authenticated,
        dni: dni,
        isLoading: false);
  }

  void logout([String? errorMessage]) {
    // TODO limpiar token
    state = state.copyWith(
      authStatus: AuthStatus.notAuthenticated,
      user: null,
      errorMessage: errorMessage,
      isLoading: false,
      isFormPosted: true,
    );
  }

  resetInit() {
    state = state.copyWith(
      isFormPosted: false,
      isLoading: false,
      errorMessage: '',
    );
  }

  Future<void> registerUser(
      RegisterEntityRequest registerRequest, BuildContext context) async {
    try {
      final userRegistered = await authRepository.register(registerRequest);
      // appRouter.push('/');
      DialogUtils.successAlert(context, title: userRegistered.data[0].mensaje);
    } on CustomError catch (e) {
      logout(e.message);
      if (!context.mounted) return;
      DialogUtils.errorAlert(context, title: e.message);
    } catch (e) {
      logout('Error no controlado');
      if (!context.mounted) return;
      DialogUtils.errorAlert(context, title: 'Error del servidor');
    }
  }
}

// 3
final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final authRepository = AuthRepositoryImpl();
  return AuthNotifier(authRepository: authRepository);
});
