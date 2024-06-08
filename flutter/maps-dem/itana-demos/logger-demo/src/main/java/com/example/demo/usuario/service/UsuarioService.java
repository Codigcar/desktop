package com.example.demo.usuario.service;

import java.util.List;

import com.example.demo.usuario.entity.Usuario;

public interface UsuarioService {

	Usuario create(Usuario usuario);
	
	Usuario update(Usuario usuario);
	
	List<Usuario> findAll();
	
	Usuario findById(Integer id);
}
