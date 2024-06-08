# internacionalizacion_app

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)

For help getting started with Flutter, view our
[online documentation](https://flutter.dev/docs), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## Agregar iternacionalizacion
* Referencia: https://flutter.dev/docs/development/accessibility-and-localization/internationalization
* Referencia: https://www.youtube.com/watch?v=icTT6xUYHow&t=1273s
* Se agrego el siguiente paquete en el archivo pubspec.yaml
```
flutter_localizations:
    sdk: flutter
```
* Ejecutar mediante el plugin de Flutter intl:  Flutter Intl: Initialize - Visual Studio Code
* Se agregara la siguiente dependencia en el pubspec.yaml
* De forma opcional moficiar el class_name y main_local
```
flutter_intl:
  enabled: true
  class_name: AppLocalizations
  main_local: en
```
* Agregar al material app del archivo main.dart:
```
Por defecto se crea la clase "S" que puede ser renombrado, en este caso por "AppLocalizations"
localizationsDelegates: [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
    ],
supportedLocales: AppLocalizations.delegate.supportedLocales,
```
* Configuracion adicional para iOS(No fue necesario realizar!)
```
1.Abra el ios/Runner.xcworkspace archivo Xcode de su proyecto .
2.En el Navegador de proyectos , abra el Info.plist archivo en la carpeta Runnerdel proyecto Runner.
3.Seleccione el elemento Lista de propiedades de información . Luego, seleccione Agregar elemento en el menú Editor y 
seleccione Localizaciones en el menú emergente.
4.Seleccione y expanda el elemento recién creado Localizations. Para cada configuración regional 
que admita su aplicación, agregue un nuevo elemento y seleccione la configuración regional que desea agregar
en el menú emergente en el campo Valor . Esta lista debe ser coherente con los idiomas enumerados 
en el parámetro supportedLocales .
5.Una vez que se hayan agregado todas las configuraciones regionales admitidas, guarde el archivo.
```
