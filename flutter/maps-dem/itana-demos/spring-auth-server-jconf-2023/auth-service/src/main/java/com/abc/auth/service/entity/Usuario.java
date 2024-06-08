package com.abc.auth.service.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario  implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  private String codUsuario;

  @Enumerated(EnumType.STRING)
  private TipoDocumento tipoDocumento;

  private String nroDocumento;

  private String nombres;

  private String apellidoPaterno;

  private String apellidoMaterno;

  private String email;

  private String codPaisNroCelular;

  private String nroCelular;

  private String contraseniaCifrada;

  @Enumerated(EnumType.STRING)
  private ActivoInactivo estado;

  private String registradoPor;

  private Date fechaHoraRegistro;

  @Temporal(TemporalType.TIMESTAMP)
  private Date fechaHoraActivacion;

  private String activadoPor;

  @Temporal(TemporalType.TIMESTAMP)
  private Date fechaHoraInactivacion;

  private String inactivadoPor;

  public enum TipoDocumento {
    DNI, RUC, PTP, CE, PAS
  }

  public enum ActivoInactivo {
    ACTIVO, INACTIVO
  }
}
