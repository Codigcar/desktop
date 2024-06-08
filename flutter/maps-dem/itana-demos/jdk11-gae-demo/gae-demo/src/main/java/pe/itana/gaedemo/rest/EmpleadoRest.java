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

import pe.itana.gaedemo.models.Empleado;
import pe.itana.gaedemo.service.EmpleadoService;

@RestController
@RequestMapping("empleados")
public class EmpleadoRest {
	
	public static final Logger logger = LoggerFactory.getLogger(EmpleadoRest.class);
	
	@Autowired
	EmpleadoService empleadoService;
	
	@GetMapping
	public ResponseEntity<List<Empleado>> getEmpleados() {
		logger.info("Listando empleados");
		return new ResponseEntity(empleadoService.getEmpleados(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Empleado> createEmpleado(@RequestBody Empleado emp) {
		logger.info("creando empleado {}", emp.toString());
		emp = empleadoService.createEmpleado(emp);
		return new ResponseEntity<Empleado>(emp, HttpStatus.OK);
	}
}
