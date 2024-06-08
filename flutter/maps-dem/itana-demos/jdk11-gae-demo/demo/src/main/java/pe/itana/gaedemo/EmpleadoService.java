package pe.itana.gaedemo;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.itana.gaedemo.model.Empleado;
import pe.itana.gaedemo.repository.EmpleadoRepository;

@Service
public class EmpleadoService {
	
	@Autowired
	EmpleadoRepository empleadoRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(EmpleadoService.class);
	
	private List<Empleado> empleados = new ArrayList<>(
		List.of(
			new Empleado(101, "Erick Salazar", "Jefe de Aplicaciones", "esalazar@abc.com"),
			new Empleado(102, "Jose Perez", "Jefe de Aplicaciones", "esalazar@abc.com"),
			new Empleado(103, "Maria Lopez", "Jefe de Aplicaciones", "esalazar@abc.com"),
			new Empleado(104, "Pedro Cortez", "Jefe de Aplicaciones", "esalazar@abc.com")
			)
		);
	
	private int maxCodEmpleado = 104;
	
	
	
		
	public List<Empleado> getEmpleados() {
		// return empleados;
		
		return empleadoRepository.findAll();
	}

	public Empleado createEmpleado(Empleado empleado) {
		logger.info("Creando Empleado en el servicio {}", empleado);
		
		//empleado.setCodEmpleado(maxCodEmpleado++);
		//empleados.add(empleado);
		empleado = empleadoRepository.save(empleado);
		
		return empleado;
	}
	
}
