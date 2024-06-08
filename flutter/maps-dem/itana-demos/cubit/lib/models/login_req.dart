class LoginReq {
  String username;
  String password;

  LoginReq({this.username = '', this.password = ''});

  bool get isValid => username.isNotEmpty && password.isNotEmpty;
  bool get isAdmin => username == 'admin' && password == '123456';
}
