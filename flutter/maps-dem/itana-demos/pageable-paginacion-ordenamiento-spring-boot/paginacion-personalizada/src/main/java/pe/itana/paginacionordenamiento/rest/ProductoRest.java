package pe.itana.paginacionordenamiento.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.itana.paginacionordenamiento.entity.Producto;
import pe.itana.paginacionordenamiento.model.PageableQuery;
import pe.itana.paginacionordenamiento.service.ProductoService;

@RestController
@RequestMapping("/productos")
public class ProductoRest {
  private static final Logger logger = LoggerFactory.getLogger(ProductoRest.class);
  
  @Autowired
  ProductoService productoService;
  
  @GetMapping
  public Page<Producto> getAll(PageableQuery pageableQuery) {
    return productoService.getAll(pageableQuery);
  }
  
}
