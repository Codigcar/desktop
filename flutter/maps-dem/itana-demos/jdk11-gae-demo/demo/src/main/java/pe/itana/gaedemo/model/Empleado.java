package pe.itana.gaedemo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Empleado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer codEmpleado;
	
	@Column
	private String nombre;
	
	@Column
	private String cargo;
	
	@Column
	private String email;
	
	
	public Empleado() {
		
	}
	
	

	public Empleado(Integer codEmpleado, String nombre, String cargo, String email) {
		super();
		this.codEmpleado = codEmpleado;
		this.nombre = nombre;
		this.cargo = cargo;
		this.email = email;
	}



	public Integer getCodEmpleado() {
		return codEmpleado;
	}

	public void setCodEmpleado(Integer codEmpleado) {
		this.codEmpleado = codEmpleado;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Empleado [codEmpleado=" + codEmpleado + ", nombre=" + nombre + ", cargo=" + cargo + ", email=" + email
				+ "]";
	}

	
	
	

}
