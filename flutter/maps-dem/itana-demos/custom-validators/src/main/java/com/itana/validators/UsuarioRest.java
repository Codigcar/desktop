package com.itana.validators;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class UsuarioRest {
  private static final Logger logger = LoggerFactory.getLogger(UsuarioRest.class);
  
  @PostMapping
  public ResponseEntity<Object> create(@Valid @RequestBody UsuarioReq usuario, BindingResult result) {
    logger.debug("Creando usuario con {} ", usuario);
    if (result.hasErrors()) {
      List<String> messages = result.getFieldErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
      return new ResponseEntity<>(messages, null, HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>("OK", null, HttpStatus.OK);
  }
  
  
}
