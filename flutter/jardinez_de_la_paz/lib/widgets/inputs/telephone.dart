import 'package:formz/formz.dart';

// Define input validation errors
enum TelephoneError { empty, format }

// Extend FormzInput and provide the input type and error type.
class Telephone extends FormzInput<String, TelephoneError> {

  // static final RegExp emailRegExp = RegExp(
  //   r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
  // );
   static final RegExp numberRegExp = RegExp(
    r'^\d{9}$',
  );

  // Call super.pure to represent an unmodified form input.
  const Telephone.pure() : super.pure('');

  // Call super.dirty to represent a modified form input.
  const Telephone.dirty( String value ) : super.dirty(value);



  String? get errorMessage {
    if ( isValid || isPure ) return null;

    if ( displayError == TelephoneError.empty ) return '* El Campo es requerido';
    if ( displayError == TelephoneError.format ) return 'Debe tener 9 dígitos';

    return null;
  }

  // Override validator to handle validating a given input value.
  @override
  TelephoneError? validator(String value) {
    
    if ( value.isEmpty || value.trim().isEmpty ) return TelephoneError.empty;
    if ( !numberRegExp.hasMatch(value) ) return TelephoneError.format;

    return null;
  }
}