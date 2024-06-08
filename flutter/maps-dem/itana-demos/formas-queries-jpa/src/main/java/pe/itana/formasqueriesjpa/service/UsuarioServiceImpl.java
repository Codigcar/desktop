package pe.itana.formasqueriesjpa.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.itana.formasqueriesjpa.entity.Usuario;
import pe.itana.formasqueriesjpa.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {
  
  @Autowired
  UsuarioRepository usuarioRepository;
  
  @Autowired
  private EntityManager entityManager;
  
  @Override
  public List<Usuario> buscarPorNombreQueEmpieceCon(String texto) {
    return usuarioRepository.findByNombreStartingWith(texto);
  }
  
  @Override
  public List<Usuario> buscarPorApellido(String apellido) {
    return usuarioRepository.findByApellido(apellido);
  }
  
  @Override
  public List<Usuario> buscarPorEmail(String email) {
    return usuarioRepository.buscarPorEmail(email);
  }
  
  @Override
  public List<Usuario> buscarPorNombreYApellido(String nombre, String apellido) {
    String jpql = "SELECT u FROM Usuario u WHERE u.nombre = :nombre AND u.apellido = :apellido";
    TypedQuery<Usuario> query = entityManager.createQuery(jpql, Usuario.class);
    query.setParameter("nombre", nombre);
    query.setParameter("apellido", apellido);
    return query.getResultList();
  }
  
}
