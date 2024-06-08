import 'package:reactive_forms/reactive_forms.dart';

//control.markAsTouched();
class CustomValidators {
  static AsyncValidatorFunction get uniqueEmail =>
      (AbstractControl control) async {
        final emailAlreadyUsed = await Future.delayed(
          const Duration(seconds: 5),
          () => ['johndoe@email.com', 'john@email.com'].contains(control.value),
        );

        return emailAlreadyUsed ? {'uniqueEmail': true} : null;
      };
}
