package pe.itana.formasqueriesjpa.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.itana.formasqueriesjpa.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
  
  // Derivados de métodos
  List<Usuario> findByNombreStartingWith(String texto);
  
  // Usando @NamedQuery
  List<Usuario> findByApellido(String apellido);
  
  // Consulta personalizada con @Query
  @Query("SELECT u FROM Usuario u WHERE u.email = :email")
  List<Usuario> buscarPorEmail(String email);
  
}
