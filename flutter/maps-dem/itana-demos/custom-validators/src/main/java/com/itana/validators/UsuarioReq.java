package com.itana.validators;

import java.io.Serializable;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class UsuarioReq implements Serializable {
  
  private static final long serialVersionUID = 1L;
  
  @NotBlank(message = "El nombre no puede estar vacio")
  private String nombre;
  
  @NotBlank(message = "El email no puede estar vacio")
  @Email(message = "El formato del email es invalido")
  private String email;
  
  @NotBlank(message = "El celular no puede estar vacio")
  @Phone(message = "El valor no tiene formato de celular", length = 9)
  private String celular;
  
}
