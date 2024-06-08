import 'package:dockseekerapp/widgets/image_slider.dart';
import 'package:dockseekerapp/widgets/side_menu.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final textStyles = Theme.of(context).textTheme;

    return Scaffold(
      endDrawer: const SideMenu(),
      bottomNavigationBar: BottomNavigationBar(
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Inicio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.save),
            label: 'Favoritos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Perfil',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Ajustes',
          ),
        ],
      ),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: colors.primary,
        title: const Align(
          alignment: Alignment.center,
          child: Text(
            'Menú',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
      body: Container(
        color: Colors.grey[200],
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(left: 20),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Bievenido Camilo',
                  style: textStyles.titleLarge,
                  textAlign: TextAlign.left,
                ),
              ),
            ),
            const SizedBox(height: 20),
            Text(
              '¡Novedades!',
              style: textStyles.titleLarge,
            ),
            const SizedBox(height: 20),
            const ImageSlider(),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.only(left: 20),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  '¿Qué necesitas?',
                  style: textStyles.titleLarge,
                ),
              ),
            ),
            // Placeholder(),
          ],
        ),
      ),
    );
  }
}
