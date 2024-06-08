import 'package:cubit/bloc/cubit/login_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final loginCubit = BlocProvider.of<LoginCubit>(context);
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 30.0),
                Text(
                  'Login',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 20.0),
                TextField(
                  decoration: const InputDecoration(hintText: 'Username'),
                  onChanged: (value) => loginCubit.loginReq.username = value,
                ),
                TextField(
                  decoration: const InputDecoration(hintText: 'Password'),
                  onChanged: (value) => loginCubit.loginReq.password = value,
                ),
                const SizedBox(height: 20.0),
                ElevatedButton(
                  onPressed: () => loginCubit.login(context),
                  child: const Text('Ingresar'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
