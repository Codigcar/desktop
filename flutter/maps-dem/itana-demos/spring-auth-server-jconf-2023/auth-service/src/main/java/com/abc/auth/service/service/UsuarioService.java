package com.abc.auth.service.service;

import com.abc.auth.service.entity.Usuario;
import com.abc.auth.service.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class UsuarioService {
  private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);
  @Autowired
  UsuarioRepository usuarioRepository;


  @Autowired
  PasswordEncoder passwordEncoder;

  public Usuario getById(String codUsuario) {
    return usuarioRepository.findById(codUsuario.toUpperCase())
        .orElseThrow(() -> new RuntimeException("No hay usuario con dicho codigo"));
  }


}
