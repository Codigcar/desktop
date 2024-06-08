package pe.itana.paginacionordenamiento.rest;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.itana.paginacionordenamiento.entity.Producto;
import pe.itana.paginacionordenamiento.service.ProductoService;

@RestController
@RequestMapping("/productos")
public class ProductoRest {
  
  private static final Logger logger = LoggerFactory.getLogger(ProductoRest.class);
  
  @Autowired
  ProductoService productoService;
  
  @GetMapping
  public List<Producto> getAll() {
    logger.debug("Obteniendo productos");
    return productoService.getAll();
  }
  
}
