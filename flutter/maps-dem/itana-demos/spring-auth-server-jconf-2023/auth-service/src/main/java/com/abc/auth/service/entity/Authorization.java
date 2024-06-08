package com.abc.auth.service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Authorization {

  @Id
  @Column
  private String id;

  private String registeredClientId;

  private String principalName;

  private String authorizationGrantType;

  private String authorizedScopes;

  private String attributes;

  private String state;

  private String authorizationCodeValue;

  private Instant authorizationCodeIssuedAt;

  private Instant authorizationCodeExpiresAt;

  private String authorizationCodeMetadata;

  private String accessTokenValue;

  private Instant accessTokenIssuedAt;

  private Instant accessTokenExpiresAt;

  private String accessTokenMetadata;

  private String accessTokenType;

  private String accessTokenScopes;

  private String refreshTokenValue;

  private Instant refreshTokenIssuedAt;

  private Instant refreshTokenExpiresAt;

  private String refreshTokenMetadata;

  private String oidcIdTokenValue;

  private Instant oidcIdTokenIssuedAt;

  private Instant oidcIdTokenExpiresAt;

  private String oidcIdTokenMetadata;

  private String oidcIdTokenClaims;

}