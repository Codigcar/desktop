package com.abc.auth.service.repository;

import com.abc.auth.service.entity.Client;
import com.abc.auth.service.entity.Client.TipoAutorizacion;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.security.jackson2.SecurityJackson2Modules;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.jackson2.OAuth2AuthorizationServerJackson2Module;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

@Component
public class JpaRegisteredClientRepository implements RegisteredClientRepository {
  private final ClientRepository clientRepository;
  private final ObjectMapper objectMapper = new ObjectMapper();

  public static final Integer UNA_HORA_EN_MINUTOS = 60 ;


  public JpaRegisteredClientRepository(ClientRepository clientRepository) {
    Assert.notNull(clientRepository, "clientRepository no puede ser nulo");
    this.clientRepository = clientRepository;

    ClassLoader classLoader = JpaRegisteredClientRepository.class.getClassLoader();
    List<com.fasterxml.jackson.databind.Module> securityModules = SecurityJackson2Modules.getModules(classLoader);
    this.objectMapper.registerModules(securityModules);
    this.objectMapper.registerModule(new OAuth2AuthorizationServerJackson2Module());
  }

  @Override
  public void save(RegisteredClient registeredClient) {
    Assert.notNull(registeredClient, "registeredClient no puede ser nulo");
    this.clientRepository.save(toEntity(registeredClient));
  }

  @Override
  public RegisteredClient findById(String id) {
    Assert.hasText(id, "id cannot be empty");
    return this.clientRepository.findById(id).map(this::toObject).orElse(null);
  }

  @Override
  public RegisteredClient findByClientId(String clientId) {
    Assert.hasText(clientId, "clientId no puede estar vacio");
    return this.clientRepository.findByClientId(clientId).map(this::toObject).orElse(null);
  }

  private RegisteredClient toObject(Client cliente) {
    Set<String> clientAuthenticationMethods = StringUtils.commaDelimitedListToSet(
        cliente.getTipoAutenticacion());
    Set<String> authorizationGrantTypes = StringUtils.commaDelimitedListToSet(
            cliente.getTipoAutorizacion());
    Set<String> redirectUris = StringUtils.commaDelimitedListToSet(
        cliente.getRedirectUri());
    Set<String> clientScopes = StringUtils.commaDelimitedListToSet(
        cliente.getScopes());

    RegisteredClient.Builder builder = RegisteredClient.withId(cliente.getId())
        .clientId(cliente.getClientId())
        .clientIdIssuedAt(cliente.getFechaHoraRegistro())
        .clientSecret(cliente.getCredencialSecretaCifrada())
        .clientName(cliente.getNombre())
        .clientAuthenticationMethods(authenticationMethods ->
            clientAuthenticationMethods.forEach(authenticationMethod ->
                authenticationMethods.add(resolveClientAuthenticationMethod(authenticationMethod))))
        .authorizationGrantTypes((grantTypes) ->
            authorizationGrantTypes.forEach(grantType ->
                grantTypes.add(resolveAuthorizationGrantType(grantType))))
        .redirectUris((uris) -> uris.addAll(redirectUris))
        .scopes((scopes) -> scopes.addAll(clientScopes));


    // TODO: Identificar que propiedades del clientSettings se pueden pasar a columna en la BD
    // Map<String, Object> clientSettingsMap = parseMap(cliente.getClientSettings());
    // builder.clientSettings(ClientSettings.withSettings(clientSettingsMap).build());
    builder.clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build());

    // TODO: Duracion del Acces Token debe venir de la base de datos (Nombre del parametro "Horas de duracion del token" 600L)
    // Map<String, Object> tokenSettingsMap = parseMap(cliente.getTokenSettings());
    // builder.tokenSettings(TokenSettings.withSettings(tokenSettingsMap).build());
    builder.tokenSettings(TokenSettings.builder()
            .accessTokenTimeToLive(Duration.ofMinutes(cliente.getHorasDuracionToken() * UNA_HORA_EN_MINUTOS))
        .build());
    return builder.build();
  }

  private Client toEntity(RegisteredClient registeredClient) {
    List<String> clientAuthenticationMethods = new ArrayList<>(registeredClient.getClientAuthenticationMethods().size());
    registeredClient.getClientAuthenticationMethods().forEach(clientAuthenticationMethod ->
        clientAuthenticationMethods.add(clientAuthenticationMethod.getValue()));

    List<String> authorizationGrantTypes = new ArrayList<>(registeredClient.getAuthorizationGrantTypes().size());
    registeredClient.getAuthorizationGrantTypes().forEach(authorizationGrantType ->
        authorizationGrantTypes.add(authorizationGrantType.getValue()));

    Client entity = new Client();
    entity.setId(registeredClient.getId());
    entity.setClientId(registeredClient.getClientId());
    entity.setFechaHoraRegistro(registeredClient.getClientIdIssuedAt());
    entity.setCredencialSecretaCifrada(registeredClient.getClientSecret());
    entity.setNombre(registeredClient.getClientName());
    entity.setTipoAutenticacion(StringUtils.collectionToCommaDelimitedString(clientAuthenticationMethods));
    entity.setTipoAutorizacion(StringUtils.collectionToCommaDelimitedString(authorizationGrantTypes));
    entity.setRedirectUri(StringUtils.collectionToCommaDelimitedString(registeredClient.getRedirectUris()));
    entity.setScopes(StringUtils.collectionToCommaDelimitedString(registeredClient.getScopes()));
    entity.setClientSettings(writeMap(registeredClient.getClientSettings().getSettings()));
    entity.setTokenSettings(writeMap(registeredClient.getTokenSettings().getSettings()));

    return entity;
  }

  private Map<String, Object> parseMap(String data) {
    try {
      return this.objectMapper.readValue(data, new TypeReference<Map<String, Object>>() {
      });
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage(), ex);
    }
  }

  private String writeMap(Map<String, Object> data) {
    try {
      return this.objectMapper.writeValueAsString(data);
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage(), ex);
    }
  }

  private static AuthorizationGrantType resolveAuthorizationGrantType(String authorizationGrantType) {
    if (AuthorizationGrantType.AUTHORIZATION_CODE.getValue().equals(authorizationGrantType)) {
      return AuthorizationGrantType.AUTHORIZATION_CODE;
    } else if (AuthorizationGrantType.CLIENT_CREDENTIALS.getValue().equals(authorizationGrantType)) {
      return AuthorizationGrantType.CLIENT_CREDENTIALS;
    } else if (AuthorizationGrantType.REFRESH_TOKEN.getValue().equals(authorizationGrantType)) {
      return AuthorizationGrantType.REFRESH_TOKEN;
    }
    return new AuthorizationGrantType(authorizationGrantType);              // Custom authorization grant type
  }

  private static ClientAuthenticationMethod resolveClientAuthenticationMethod(String clientAuthenticationMethod) {
    if (ClientAuthenticationMethod.CLIENT_SECRET_BASIC.getValue().equals(clientAuthenticationMethod)) {
      return ClientAuthenticationMethod.CLIENT_SECRET_BASIC;
    } else if (ClientAuthenticationMethod.CLIENT_SECRET_POST.getValue().equals(clientAuthenticationMethod)) {
      return ClientAuthenticationMethod.CLIENT_SECRET_POST;
    } else if (ClientAuthenticationMethod.NONE.getValue().equals(clientAuthenticationMethod)) {
      return ClientAuthenticationMethod.NONE;
    }
    return new ClientAuthenticationMethod(clientAuthenticationMethod);      // Custom client authentication method
  }
}
