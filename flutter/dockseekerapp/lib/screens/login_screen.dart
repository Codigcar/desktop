import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.red,
        child: Column(
          children: [
            Image(
              image: AssetImage('assets/logo.png'),
              height: 100,
              width: 100,
            ),
            Text('DockSeeker'),
            TextFormField(),
            TextFormField(),
            Container(
              width: double.infinity,
              child: Text(
                '¿Olvidaste tu contraseña?',
                textAlign: TextAlign.right,
              ),
            ),
            Spacer(),
            ElevatedButton(
              style: ButtonStyle(
                backgroundColor: MaterialStatePropertyAll(Colors.red),
              ),
              onPressed: () {},
              child: Text('Log in'),
            ),
            Text('No tienes una cuenta?'),
            Text('Join')
          ],
        ),
      ),
    );
  }
}
