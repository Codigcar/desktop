import 'package:dockseekerapp/router/app_router.dart';
import 'package:flutter/material.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textStyles = Theme.of(context).textTheme;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const Image(image: AssetImage('assets/portada.jpg')),
            const SizedBox(
              width: 50,
              height: 50,
              child: Image(image: AssetImage('assets/logo.png')),
            ),
            Text('Bienvenido a DockSeeker', style: textStyles.headlineSmall),
            const SizedBox(height: 20),
            SizedBox(
              width: 220,
              child: FilledButton(
                style: const ButtonStyle(
                  backgroundColor: MaterialStatePropertyAll(Color(0xFFFD5D5D)),
                ),
                onPressed: () {
                  appRouter.push('/signup');
                },
                child: Text(
                  'Sign Up',
                  style: textStyles.titleMedium?.copyWith(
                      color: Colors.white, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            SizedBox(
              width: 220,
              child: FilledButton(
                onPressed: () {
                  // appRouter.push('/login');
                  appRouter.replace('/home');
                },
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStatePropertyAll(Colors.grey.shade400),
                ),
                child: Text(
                  'Log in',
                  style: textStyles.titleMedium?.copyWith(
                      color: Colors.black, fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
