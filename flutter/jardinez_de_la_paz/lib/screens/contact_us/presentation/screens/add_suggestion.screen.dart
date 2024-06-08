import 'package:flutter/material.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/infrastructure/services/camera_gallery.service.impl.dart';
import 'package:jardinez_de_la_paz/widgets/header_title.dart';

class AddSuggestionScreen extends StatelessWidget {
  static const name = 'add-suggestion-screen';
  static const route = '/add-suggestion-screen';

  const AddSuggestionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textStylesTheme = Theme.of(context).textTheme;
    final colorTheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(),
      body: Container(
        width: double.infinity,
        color: colorTheme.primary,
        child: Column(
          children: [
            const SizedBox(height: 20),
            const HeaderTitle(
              title: 'INGRESAR SUGERENCIA',
              iconName: Icons.mail_outline,
            ),
            IconButton(
              onPressed: () async {
                final photoPath = await CameraGalleryServiceImpl().takePhoto();
                if (photoPath == null) return;
              },
              icon: Icon(Icons.camera),
            ),
            GestureDetector(
              onTap: () {
                // final photoPath = await CameraGalleryServiceImpl().selectPhoto();
              },
              child: Container(
                width: 200,
                height: 200,
                color: Colors.black,
              ),
            )
          ],
        ),
      ),
    );
  }
}
