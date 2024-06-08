import 'package:dockseekerapp/router/app_router.dart';
import 'package:flutter/material.dart';

List<Map<dynamic, String>> sectionsList = [
  {
    'imagePath': 'assets/cuidador.png',
    'textButton': 'Cuidador',
    'navigationPath': '/cuidador',
  },
  {
    'imagePath': 'assets/doctor.png',
    'textButton': 'Profesional de la salud',
    'navigationPath': '/cuidador',
  },
  {
    'imagePath': 'assets/paciente.png',
    'textButton': 'Paciente',
    'navigationPath': '/cuidador',
  },
];

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Stack(
            children: [
              Positioned(
                left: 10,
                top: 10,
                child: IconButton(
                  onPressed: () {
                    appRouter.pop();
                  },
                  icon: const Icon(Icons.arrow_back),
                ),
              ),
              Expanded(
                child: Column(
                  children: [
                    for (var section in sectionsList)
                      _SectionRow(
                        imagePath: section['imagePath'],
                        textButton: section['textButton'],
                        navigationPath: section['/cuidador'],
                      )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionRow extends StatelessWidget {
  // ignore: prefer_typing_uninitialized_variables
  final imagePath;
  // ignore: prefer_typing_uninitialized_variables
  final textButton;
  // ignore: prefer_typing_uninitialized_variables
  final navigationPath;

  const _SectionRow({
    required this.imagePath,
    required this.textButton,
    required this.navigationPath,
  });

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final textStyles = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const SizedBox(height: 15),
        SizedBox(
          width: 170,
          height: 170,
          child: CircleAvatar(
            backgroundColor: Colors.grey.shade300,
            child: Image(
              image: AssetImage(imagePath),
              width: 124,
              height: 124,
            ),
          ),
        ),
        // Container(
        // decoration: BoxDecoration(
        //   borderRadius: const BorderRadius.all(
        //     Radius.circular(25.0),
        //   ),
        //   boxShadow: [
        //     BoxShadow(
        //       color: Colors.black.withOpacity(0.2),
        //       spreadRadius: 0.1,
        //       blurRadius: 4,
        //       offset: Offset(0, 3),
        //     )
        //   ],
        // ),
        // child: SizedBox(
        //   width: 260,
        //   child: ElevatedButton(
        //     style: ElevatedButton.styleFrom(
        //       backgroundColor: colors.primary,
        //     ),
        //     onPressed: () {},
        //     child: Text(
        //       textButton,
        //       style: textStyles.titleMedium?.copyWith(color: Colors.white),
        //     ),
        //   ),
        // ),
        // ),
        SizedBox(
          width: 260,
          child: ElevatedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStatePropertyAll(colors.primary),
              shadowColor: const MaterialStatePropertyAll(Colors.black),
            ),
            onPressed: () {
              appRouter.push('/form_signup');
            },
            child: Text(
              textButton,
              style: textStyles.titleMedium?.copyWith(color: Colors.white),
            ),
          ),
        ),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 20),
          child: Divider(
            color: Colors.black,
            thickness: 1,
          ),
        ),
      ],
    );
  }
}
