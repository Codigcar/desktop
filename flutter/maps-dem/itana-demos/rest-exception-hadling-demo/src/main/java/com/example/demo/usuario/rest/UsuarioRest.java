package com.example.demo.usuario.rest;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.usuario.entity.Usuario;
import com.example.demo.usuario.entity.UsuarioDTO;
import com.example.demo.usuario.service.UsuarioService;
import com.example.demo.utils.InvalidDataException;


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
	public Integer create(@Valid @RequestBody Usuario usuario, BindingResult result) {
		logger.debug("Creando usuario con data {}", usuario);
		if (result.hasErrors()) {
		  throw new InvalidDataException(result);
		}
	  usuario = usuarioService.create(usuario);
		return usuario.getId();
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@PathVariable Integer id, @Valid @RequestBody Usuario usuario,
	    BindingResult result) {
		logger.debug("Actualizando usuario con id {} y data {}", id, usuario);
		if (result.hasErrors()) {
		  throw new InvalidDataException(result);
		}
		usuarioService.update(usuario);
	}
	
	@GetMapping("/{id}")
	public Usuario findById(@PathVariable Integer id) {
		logger.debug("Obteniendo inspeccion con id {}", id);
		return usuarioService.findById(id);
	}
	
	@GetMapping(value = "DTO")
	public List<UsuarioDTO> findUsuarioDTO(){
	  logger.debug("Obteniendo usuarios DTO");
	  return usuarioService.findAllUsuarioDTO();
	}
}
