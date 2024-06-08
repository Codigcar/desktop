package com.example.demo.usuario.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
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
