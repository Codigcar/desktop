import 'package:flutter/material.dart';

class AppTheme {
  ThemeData getTheme(BuildContext context) => ThemeData(
        useMaterial3: true,
        // colorSchemeSeed: Color.fromRGBO(24, 104, 52, 0.5));
        colorScheme: Theme.of(context).colorScheme.copyWith(
              // primary: Color.fromRGBO(44, 137, 88 , 0.9),
              primary: const Color.fromRGBO(50, 114, 64, 1),
              secondary: Colors.white,
              // brightness: Colors.white,
              // primary: Colors.white,
              // secondary: Colors.white,
              // onPrimary: Colors.white,
              // primaryContainer: Colors.white,
              // onPrimaryContainer: Colors.white,
              // onSecondary: Colors.white,
              secondaryContainer: const Color.fromRGBO(50, 114, 64, 1) ,
              // onSecondaryContainer: Colors.white,
              // tertiary: Colors.white,
              // onTertiary: Colors.white,
              // tertiaryContainer: Colors.white,
              // onTertiaryContainer: Colors.white,
             /*  error: Colors.white,
              onError: Colors.white,
              errorContainer: Colors.white,
              onErrorContainer: Colors.white, */
              background: Colors.white,
              /* onBackground: Colors.white,
              surface: Colors.white,
              onSurface: Colors.white, */
              /* surfaceVariant: Colors.white,
              onSurfaceVariant: Colors.white,
              outline: Colors.white,
              outlineVariant: Colors.white,
              shadow: Colors.white,
              scrim: Colors.white,
              inverseSurface: Colors.white, */
              /* onInverseSurface: Colors.white,
              inversePrimary: Colors.white, */
              surfaceTint: Colors.white,
            ),
        // colorScheme: ColorScheme.fromSeed(
        //   // seedColor: Color.fromRGBO(61, 148, 102, 0.461),
        //   seedColor: Color(0x7572E9B2),
        // ).copyWith(secondary: Colors.white),
      );
  // colorScheme: ColorScheme.fromSwatch().copyWith(
  //     primary: Color.fromRGBO(24, 104, 52, 1), secondary: Colors.white),
  // );
}
