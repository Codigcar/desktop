import 'package:dockseekerapp/router/app_router.dart';
import 'package:flutter/material.dart';

class CargaArchivoPaciente extends StatelessWidget {
  const CargaArchivoPaciente({super.key});

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
            SizedBox(
              width: 170,
              height: 170,
              child: CircleAvatar(
                backgroundColor: Colors.grey.shade300,
                child: const Image(
                  image: AssetImage('assets/paciente.png'),
                  width: 124,
                  height: 124,
                ),
              ),
            ),
            const Text('Paciente',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
            SizedBox(
              width: 300,
              child: Column(
                children: [
                  TextFormField(
                    decoration: const InputDecoration(
                      //hintText: 'Nombres y Apellidos',
                      labelText: 'Teléfono',
                    ),
                  ),
                  TextFormField(
                    decoration: const InputDecoration(
                      //hintText: 'Correo',
                      labelText: 'Dirección',
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Spacer(),
            ElevatedButton(
              style: const ButtonStyle(
                backgroundColor: MaterialStatePropertyAll(Colors.red),
              ),
              onPressed: () {
                appRouter.push('/carga_archivo_paciente');
              },
              child: const Text('Finalizar',
                  style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}
