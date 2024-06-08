package com.abc.auth.service.repository;

import com.abc.auth.service.entity.Authorization;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorizationRepository extends JpaRepository<Authorization, String> {

  Optional<Authorization> findByState(String state);

  Optional<Authorization> findByAuthorizationCodeValue(String authorizationCode);

  Optional<Authorization> findByAccessTokenValue(String accessToken);

  Optional<Authorization> findByRefreshTokenValue(String refreshToken);

  @Query("SELECT a FROM Authorization a WHERE a.state = :token"
      + " or a.authorizationCodeValue = :token"
      + " or a.accessTokenValue = :token"
      + " or a.refreshTokenValue = :token"
  )
  Optional<Authorization> findByStateOrAuthorizationCodeValueOrAccessTokenValueOrRefreshTokenValue(
      @Param("token") String token);
}