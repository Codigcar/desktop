import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/comun/custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ejemplo-validators';
  ocultarConfirmacionContrasenia: boolean = true;
  ocultarContrasenia: boolean = true;
  registerForm = this.formBuilder.group(
    {
      email: ['', Validators.required],
      contrasenia: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.onlyNumbers,
        ],
      ],
      confirmacionContrasenia: ['', Validators.required],
    },
    {
      validators: CustomValidators.mustBeEqual(
        'contrasenia',
        'confirmacionContrasenia'
      ),
    }
  );

  constructor(private formBuilder: FormBuilder) {}
}
