import 'package:bloc/bloc.dart';
import 'package:cubit/bloc/states/login_state.dart';
import 'package:cubit/models/login_req.dart';
import 'package:cubit/services/auth_service.dart';
import 'package:flutter/cupertino.dart';

class LoginCubit extends Cubit<LoginState> {
  final AuthService _authService = AuthService.instance;
  final LoginReq loginReq = LoginReq();

  LoginCubit() : super(LoginInitial());

  Future<void> login(context) async {
    try {
      FocusScope.of(context).unfocus();
      emit(LoginLoading());
      String token = await _authService.login(loginReq);
      emit(LoginSuccess(token: token));
    } on Exception catch (e) {
      emit(LoginFailure(message: '$e'));
    }
  }
}
