package com.example.demo.usuario.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.example.demo.account.entity.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Getter @Setter @ToString @NoArgsConstructor
public class Usuario implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, length = 50)
  @NotNull(message = "El nombre no puede ser Nulo")
  @Size(min = 2, message = "El nombre debe tener al menos dos caracteres")
	private String nombre;
	
	@Column(nullable = false)
  @NotNull(message = "La edad no puede ser Nulo")
	private Integer edad;
	
	@Column(nullable = false)
  @NotNull(message = "El sueldo no puede ser Nulo")
	private BigDecimal sueldo;
	
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private List<Account> accounts;
	
	public Usuario(String nombre) {
	  this.nombre = nombre;
	}
}
