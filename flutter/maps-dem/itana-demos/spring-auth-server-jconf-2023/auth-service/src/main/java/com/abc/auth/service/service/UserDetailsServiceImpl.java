package com.abc.auth.service.service;

import com.abc.auth.service.entity.Usuario;
import com.abc.auth.service.entity.Usuario.ActivoInactivo;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

  private final static String ROL_PREDETERMINADO  = "USER";

  @Autowired
  UsuarioService usuarioService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Usuario usuario;
    try {
      usuario = usuarioService.getById(username);
    } catch (NoSuchElementException e) {
      throw new UsernameNotFoundException(username);
    }
    return User
        .withUsername(username)
        .roles(ROL_PREDETERMINADO)
        .password(usuario.getContraseniaCifrada())
        .build();
  }
}
