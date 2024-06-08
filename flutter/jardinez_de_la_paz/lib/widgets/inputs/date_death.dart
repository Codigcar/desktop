import 'package:formz/formz.dart';

// Define input validation errors
enum DateDeathError { empty, format }

// Extend FormzInput and provide the input type and error type.
class DateDeath extends FormzInput<String, DateDeathError> {

  // Call super.pure to represent an unmodified form input.
  const DateDeath.pure() : super.pure('');

  // Call super.dirty to represent a modified form input.
  const DateDeath.dirty( String value ) : super.dirty(value);



  String? get errorMessage {
    if ( isValid || isPure ) return null;

    if ( displayError == DateDeathError.empty ) return '* El Campo es requerido';

    return null;
  }

  // Override validator to handle validating a given input value.
  @override
  DateDeathError? validator(String value) {
    
    if ( value.isEmpty || value.trim().isEmpty ) return DateDeathError.empty;

    return null;
  }
}