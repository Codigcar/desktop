// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, lines_longer_than_80_chars
// ignore_for_file: join_return_with_assignment, prefer_final_in_for_each
// ignore_for_file: avoid_redundant_argument_values

class AppLocalizations {
  AppLocalizations();
  
  static AppLocalizations current;
  
  static const AppLocalizationDelegate delegate =
    AppLocalizationDelegate();

  static Future<AppLocalizations> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false) ? locale.languageCode : locale.toString();
    final localeName = Intl.canonicalizedLocale(name); 
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      AppLocalizations.current = AppLocalizations();
      
      return AppLocalizations.current;
    });
  } 

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  /// `User Data`
  String get datosUsuario {
    return Intl.message(
      'User Data',
      name: 'datosUsuario',
      desc: '',
      args: [],
    );
  }

  /// `First Name`
  String get nombre {
    return Intl.message(
      'First Name',
      name: 'nombre',
      desc: '',
      args: [],
    );
  }

  /// `Last Name`
  String get apellido {
    return Intl.message(
      'Last Name',
      name: 'apellido',
      desc: '',
      args: [],
    );
  }

  /// `Date of Birth`
  String get fechaNacimiento {
    return Intl.message(
      'Date of Birth',
      name: 'fechaNacimiento',
      desc: '',
      args: [],
    );
  }

  /// `Register`
  String get registrar {
    return Intl.message(
      'Register',
      name: 'registrar',
      desc: '',
      args: [],
    );
  }

  /// `{usuario} was successfully registered`
  String usuarioRegistrado(Object usuario) {
    return Intl.message(
      '$usuario was successfully registered',
      name: 'usuarioRegistrado',
      desc: '',
      args: [usuario],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<AppLocalizations> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale.fromSubtags(languageCode: 'en'),
      Locale.fromSubtags(languageCode: 'es'),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<AppLocalizations> load(Locale locale) => AppLocalizations.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    if (locale != null) {
      for (var supportedLocale in supportedLocales) {
        if (supportedLocale.languageCode == locale.languageCode) {
          return true;
        }
      }
    }
    return false;
  }
}