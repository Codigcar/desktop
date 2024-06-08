import 'package:reactive_forms/reactive_forms.dart';

class Config {
  static Map<String, String Function(Object)> validationMessages = {
    ValidationMessage.required: (error) => 'El campo es requerido',
    ValidationMessage.email: (error) => 'El campo debe ser de formato de email',
    ValidationMessage.mustMatch: (error) => 'El campo no coincide',
  };
}
