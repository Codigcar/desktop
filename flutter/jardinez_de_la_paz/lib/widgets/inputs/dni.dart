import 'package:formz/formz.dart';

// Define input validation errors
enum DNIError { empty, format }

// Extend FormzInput and provide the input type and error type.
class DNI extends FormzInput<String, DNIError> {

  // static final RegExp emailRegExp = RegExp(
  //   r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
  // );
   static final RegExp emailRegExp = RegExp(
    r'^\d{8}$',
  );

  // Call super.pure to represent an unmodified form input.
  const DNI.pure() : super.pure('');

  // Call super.dirty to represent a modified form input.
  const DNI.dirty( String value ) : super.dirty(value);



  String? get errorMessage {
    if ( isValid || isPure ) return null;

    if ( displayError == DNIError.empty ) return '* El Campo es requerido';
    if ( displayError == DNIError.format ) return '* Debe tener 8 dígitos';

    return null;
  }

  // Override validator to handle validating a given input value.
  @override
  DNIError? validator(String value) {
    
    if ( value.isEmpty || value.trim().isEmpty ) return DNIError.empty;
    if ( !emailRegExp.hasMatch(value) ) return DNIError.format;

    return null;
  }
}