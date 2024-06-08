package com.example.demo.usuario.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.example.demo.usuario.entity.Usuario;
import com.example.demo.usuario.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService{

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Override
	@Transactional
	public Usuario create(Usuario usuario) {
	  if (usuario.getEdad() < 18) {
	    throw new IllegalArgumentException("Edad no permitida, debe ser mayor de edad");
	  }
	  
	  Usuario usuarioExample = new Usuario(usuario.getNombre());
	  if (usuarioRepository.exists(Example.of(usuarioExample))) {
	    throw new DuplicateKeyException("Ya existe usuario con nombre: " + usuario.getNombre());
	  }
		return usuarioRepository.save(usuario);
	}

	@Override
	@Transactional
	public Usuario update(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	@Override
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario findById(Integer id) {
		return usuarioRepository.findById(id).get();
	}

}
