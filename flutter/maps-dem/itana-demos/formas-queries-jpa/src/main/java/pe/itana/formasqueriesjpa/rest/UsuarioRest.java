package pe.itana.formasqueriesjpa.rest;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.itana.formasqueriesjpa.entity.Usuario;
import pe.itana.formasqueriesjpa.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioRest {
  
  private static final Logger logger = LoggerFactory.getLogger(UsuarioRest.class);

  @Autowired
  UsuarioService usuarioService;
  
  @GetMapping("/nombres")
  public List<Usuario> getAllByNombre(@RequestParam("empieceCon") String texto) {
    return usuarioService.buscarPorNombreQueEmpieceCon(texto);
  }
  
  @GetMapping("/apellidos/{apellido}")
  public List<Usuario> getAllByApellido(@PathVariable String apellido) {
    return usuarioService.buscarPorApellido(apellido);
  }
  
  @GetMapping("/emails/{email}")
  public List<Usuario> getAllByEmail(@PathVariable String email) {
    return usuarioService.buscarPorEmail(email);
  }
  
  @GetMapping
  public List<Usuario> getAllByNombreAndApellido(@RequestParam String nombre, @RequestParam String apellido) {
    return usuarioService.buscarPorNombreYApellido(nombre, apellido);
  }
  
}
