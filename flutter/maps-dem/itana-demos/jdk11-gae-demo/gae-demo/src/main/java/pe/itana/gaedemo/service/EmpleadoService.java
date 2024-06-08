package pe.itana.gaedemo.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.itana.gaedemo.models.Empleado;
import pe.itana.gaedemo.repository.EmpleadoRepository;

@Service
public class EmpleadoService {
	
	List<Empleado> empleados = new ArrayList<>(
			List.of(
					new Empleado(101, "Juan Perez", "Desarrollador", "jperez@abc.com"),
					new Empleado(102, "Maria Lopez", "Tester", "mlopez@abc.com")
					)
			);
	int maxCodEmpleado = 103;
	
	@Autowired
	EmpleadoRepository empleadoRepository;
	
	public List<Empleado> getEmpleados() {
		return empleadoRepository.findAll();
	}
	
	@Transactional
	public Empleado createEmpleado(Empleado emp) {
		// emp.setCodEmpleado(maxCodEmpleado++);
		// empleados.add(emp);
		emp = empleadoRepository.save(emp);
		
		return emp;
	}
}
