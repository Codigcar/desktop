package pe.itana.gaedemo.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import pe.itana.gaedemo.EmpleadoService;
import pe.itana.gaedemo.model.Empleado;

@RestController
@RequestMapping("empleados")
public class EmpleadoRest {
	
	private static final Logger logger = LoggerFactory.getLogger(EmpleadoRest.class);
	
	
	@Autowired
	EmpleadoService empleadoService;
	
	
	@GetMapping
	public ResponseEntity<List<Empleado>> getEmpleados() {
		List<Empleado> empleados = empleadoService.getEmpleados();
		return new ResponseEntity<List<Empleado>>(empleados, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Empleado> createEmpleado(@RequestBody Empleado empleado) {
		logger.info("Creando empleado {}", empleado);
		Empleado emp = empleadoService.createEmpleado(empleado);
		return new ResponseEntity<Empleado>(emp, HttpStatus.CREATED);
	}
}
