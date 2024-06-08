package com.abc.auth.service.repository;

import com.abc.auth.service.entity.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, String> {
  Optional<Client> findByClientId(String clientId);
}
