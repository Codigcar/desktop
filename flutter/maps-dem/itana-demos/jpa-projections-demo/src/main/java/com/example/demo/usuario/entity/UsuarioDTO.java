package com.example.demo.usuario.entity;

import java.math.BigDecimal;

public interface UsuarioDTO {
  
  String getNombre();
  
  Integer getEdad();
  
  BigDecimal getSueldo();
  
  Integer getAccountNumber();
  
  String getTipo();
}