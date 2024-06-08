abstract class LoginState {
  const LoginState();
}

class LoginInitial extends LoginState {}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {
  final String? token;

  const LoginSuccess({this.token}) : super();
}

class LoginFailure extends LoginState {
  final String message;

  const LoginFailure({required this.message}) : super();
}
