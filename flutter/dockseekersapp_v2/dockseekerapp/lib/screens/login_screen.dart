import 'package:dockseekerapp/router/app_router.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 30, left: 10),
              child: Align(
                alignment: Alignment.topLeft,
                child: IconButton(
                  onPressed: () {
                    appRouter.pop();
                  },
                  icon: const Icon(Icons.arrow_back),
                  alignment: Alignment.topLeft,
                ),
              ),
            ),
            const SizedBox(height: 5),
            const Image(
              image: AssetImage('assets/logo.png'),
              height: 100,
              width: 100,
            ),
            const Text('DockSeeker',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
            SizedBox(
              width: 300,
              child: Column(
                children: [
                  TextFormField(
                    decoration: const InputDecoration(
                      //hintText: 'Correo',
                      labelText: 'Correo',
                    ),
                  ),
                  TextFormField(
                    decoration: const InputDecoration(
                      //hintText: 'Contraseña',
                      labelText: 'Contraseña',
                    ),
                    obscureText: true,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                style: TextButton.styleFrom(
                  textStyle: const TextStyle(fontSize: 15),
                ),
                onPressed: () {},
                child: const Text('¿Olvidaste tu contraseña?'),
              ),
            ),
            const SizedBox(height: 230),
            ElevatedButton(
              style: const ButtonStyle(
                backgroundColor: MaterialStatePropertyAll(Colors.red),
              ),
              onPressed: () {},
              child: const Text('Iniciar Sesión',
                  style: TextStyle(color: Colors.white)),
            ),
            //const Spacer(),
            const Text('¿No tienes una cuenta?'),
            //Text('Únete', style: TextStyle(color: Colors.cyan[900])),
            TextButton(
                style: TextButton.styleFrom(
                  textStyle: const TextStyle(fontSize: 15),
                ),
                onPressed: () {},
                child: TextButton(
                  onPressed: () {
                    appRouter.push('/form_signup');
                  },
                  child: const Text('Únete'),
                )),
          ],
        ),
      ),
    );
  }
}
