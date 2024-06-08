import 'package:flutter/material.dart';
import 'package:reactive_forms/reactive_forms.dart';

class ReactiveFormScreen extends StatelessWidget {
  static String route = 'reactive-form-screen';

  const ReactiveFormScreen({Key? key}) : super(key: key);

  /*FormGroup buildForm() => FormGroup({
        'email': FormControl(
            value: '', validators: [Validators.required, Validators.email]),
        'password': FormControl(value: '', validators: [Validators.required]),
        'passwordConfirmation':
            FormControl(value: '', validators: [Validators.required]),
      }, validators: [
        Validators.mustMatch('password', 'passwordConfirmation')
      ]);*/

  FormGroup buildForm() => fb.group({
        'email': ['', Validators.required, Validators.email],
        'password': ['', Validators.required],
        'passwordConfirmation': ['', Validators.required],
      }, [
        Validators.mustMatch('password', 'passwordConfirmation')
      ]);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reactive Form Screen')),
      body: ReactiveFormBuilder(
        form: buildForm,
        builder: (context, form, child) {
          final group = form.controls;
          return Column(
            children: [
              ReactiveFormConsumer(
                builder: (context, form, child) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    child: ReactiveTextField(
                      formControlName: 'email',
                      decoration: InputDecoration(
                        hintText: 'Email',
                        suffixIcon: group['email']!.valid
                            ? const Icon(Icons.check)
                            : null,
                      ),
                      //validationMessages: {
                      //  'required': (error) => 'The name must not be empty'
                      //},
                      showErrors: (control) => control.touched,
                    ),
                  );
                },
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: ReactiveTextField(
                  formControlName: 'password',
                  obscureText: true,
                  decoration: const InputDecoration(hintText: 'Password'),
                  showErrors: (control) => control.touched,
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: ReactiveTextField(
                  formControlName: 'passwordConfirmation',
                  obscureText: true,
                  decoration:
                      const InputDecoration(hintText: 'Confirm Password'),
                  showErrors: (control) => control.touched,
                ),
              ),
              ReactiveFormConsumer(
                builder: (context, form, child) {
                  return ElevatedButton(
                    onPressed: form.valid
                        ? () {
                            debugPrint(form.rawValue.toString());
                          }
                        : null,
                    child: const Text('Submit'),
                  );
                },
              ),
            ],
          );
        },
      ),
    );
  }
}
