package com.example.demo.usuario.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.usuario.entity.Usuario;
import com.example.demo.usuario.service.UsuarioService;


@RestController
@RequestMapping("usuarios")
public class UsuarioRest {

	private static final Logger logger = LoggerFactory.getLogger(UsuarioRest.class);
	
	@Autowired
	UsuarioService usuarioService;
	
	@GetMapping
	public List<Usuario> findAll(){
	  logger.debug("Obteniendo todos los usuarios");
		return usuarioService.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Integer create(@RequestBody Usuario usuario) {
		logger.debug("Creando usuario con data {}", usuario);
		try {
	    usuario = usuarioService.create(usuario);
		} catch (IllegalArgumentException e) {
		  logger.warn(e.toString(), e);
		  String message = "Usuario invalido, debe ser mayor de edad";
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
		} catch (DuplicateKeyException e) {
		  logger.error(e.toString(), e);
		  String message = "Usuario con nombre: " + usuario.getNombre() + " ya existe";
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
		}
		return usuario.getId();
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@PathVariable Integer id, @RequestBody Usuario usuario) {
		logger.debug("Actualizando usuario con id {} y data {}", id, usuario);
		usuarioService.update(usuario);
	}
	
	@GetMapping("/{id}")
	public Usuario findById(@PathVariable Integer id) {
		logger.debug("Obteniendo inspeccion con id {}", id);
		return usuarioService.findById(id);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
