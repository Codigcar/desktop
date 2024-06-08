package pe.itana.formasqueriesjpa.service;

import java.util.List;
import pe.itana.formasqueriesjpa.entity.Usuario;

public interface UsuarioService {
  
  List<Usuario> buscarPorNombreQueEmpieceCon(String texto);
  
  List<Usuario> buscarPorApellido(String apellido);
  
  List<Usuario> buscarPorEmail(String email);
  
  List<Usuario> buscarPorNombreYApellido(String nombre, String apellido);
  
}
