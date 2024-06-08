import 'package:cubit/bloc/cubit/login_cubit.dart';
import 'package:cubit/bloc/states/login_state.dart';
import 'package:cubit/screens/home.dart';
import 'package:cubit/screens/login/login_screen.dart';
import 'package:cubit/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginCubitScreen extends StatelessWidget {
  const LoginCubitScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => LoginCubit(),
      child: BlocConsumer<LoginCubit, LoginState>(
        listener: (context, state) {
          if (state is LoginSuccess) {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const HomeScreen()),
            );
          } else if (state is LoginFailure) {
            Utils.showSnackBar(context, state.message);
          }
        },
        builder: (context, state) {
          return Stack(
            children: [
              const LoginScreen(),
              if (state is LoginLoading)
                const Positioned(
                  child: CustomProgressIndicator(),
                ),
            ],
          );
        },
      ),
    );
  }
}

class CustomProgressIndicator extends StatelessWidget {
  const CustomProgressIndicator({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black.withOpacity(0.5),
      child: const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
