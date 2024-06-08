package pe.itana.gaedemo.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("hola")
public class HolaRest {
	
	
	@GetMapping("/mensaje")
	public ResponseEntity<String> getMensaje() {
		return new ResponseEntity<String>("Hola Peru!", HttpStatus.OK);
	}
	
}
