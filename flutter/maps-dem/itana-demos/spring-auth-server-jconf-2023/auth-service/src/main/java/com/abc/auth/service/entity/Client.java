package com.abc.auth.service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Client implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  private String id;

  private String clientId;

  private String nombre;

  private String tipoAutenticacion;  // "client_secret_basic"

  //@Enumerated(value = EnumType.STRING)
  private String tipoAutorizacion;   // authorization_code, client_credentials

  private String credencialSecreta;

  private String credencialSecretaCifrada;

  @Enumerated(value = EnumType.STRING)
  private ActivoInactivo estado;

  private String scopes;

  private String clientSettings;

  private String tokenSettings;

  private Instant fechaHoraRegistro;

  private String registradoPor;

  private Integer horasDuracionToken;

  private String redirectUri;

  @Temporal(TemporalType.TIMESTAMP)
  private Date fechaHoraActivacion;

  private String activadoPor;

  @Temporal(TemporalType.TIMESTAMP)
  private Date fechaHoraInactivacion;

  private String inactivadoPor;

  public enum TipoAutorizacion {
    AUTHORIZATION_CODE, CLIENT_CREDENTIALS
  }

  public enum ActivoInactivo {
    ACTIVO, INACTIVO
  }

}
