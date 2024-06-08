package pe.itana.gaedemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.itana.gaedemo.model.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {

}
