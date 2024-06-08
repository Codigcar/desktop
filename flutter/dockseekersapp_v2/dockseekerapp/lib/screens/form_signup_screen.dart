import 'package:dockseekerapp/router/app_router.dart';
import 'package:flutter/material.dart';

class FormSignUpScreen extends StatelessWidget {
  const FormSignUpScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.white,
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
                      //hintText: 'Nombres y Apellidos',
                      labelText: 'Nombres y Apellidos',
                    ),
                  ),
                  TextFormField(
                    decoration: const InputDecoration(
                      //hintText: 'Correo',
                      labelText: 'Correo electrónico',
                    ),
                  ),
                  TextFormField(
                    decoration: const InputDecoration(
                      //hintText: 'Contraseña',
                      labelText: 'Contraseña',
                    ),
                    obscureText: true,
                  ),
                  TextFormField(
                    decoration: const InputDecoration(
                      //hintText: 'Confirmar contraseña',
                      labelText: 'Confirmar contraseña',
                    ),
                    obscureText: true,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 160),

            //const Spacer(),
            ElevatedButton(
              style: const ButtonStyle(
                backgroundColor: MaterialStatePropertyAll(Colors.red),
              ),
              onPressed: () {
                appRouter.push('/carga_archivo_paciente');
              },
              child: const Text('Únete', style: TextStyle(color: Colors.white)),
            ),
            const Text('¿Tienes una cuenta?'),
            //Text('Únete', style: TextStyle(color: Colors.cyan[900])),
            TextButton(
              style: TextButton.styleFrom(
                textStyle: const TextStyle(fontSize: 15),
              ),
              onPressed: () {},
              child: TextButton(
                style: TextButton.styleFrom(
                  textStyle: const TextStyle(fontSize: 15),
                ),
                onPressed: () {
                  appRouter.push('/login');
                },
                child: const Text('Iniciar Sesión'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
