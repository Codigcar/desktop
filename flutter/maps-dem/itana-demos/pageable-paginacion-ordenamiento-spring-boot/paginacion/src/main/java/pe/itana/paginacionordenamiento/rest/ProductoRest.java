package pe.itana.paginacionordenamiento.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.itana.paginacionordenamiento.entity.Producto;
import pe.itana.paginacionordenamiento.service.ProductoService;

@RestController
@RequestMapping("/productos")
public class ProductoRest {
  
  @Autowired
  ProductoService productoService;
  
  @GetMapping
  public Page<Producto> getAll(Pageable pageable) {
    return productoService.getAll(pageable);
  }
  
}
