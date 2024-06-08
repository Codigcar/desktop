package com.example.demo.usuario.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.demo.usuario.entity.Usuario;
import com.example.demo.usuario.entity.UsuarioDTO;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

  @Query(value = "SELECT u.nombre AS nombre, u.edad AS edad, u.sueldo AS sueldo ,a.account_number AS accountNumber, a.tipo AS tipo FROM usuario u, account a "
      + "WHERE u.id = a.id_usuario", nativeQuery = true)
  List<UsuarioDTO> findAllUsuarioDTO();
}
