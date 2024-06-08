package pe.itana.paginacionordenamiento.service;

import org.springframework.data.domain.Page;
import pe.itana.paginacionordenamiento.entity.Producto;
import pe.itana.paginacionordenamiento.model.PageableQuery;

public interface ProductoService {
  
  Page<Producto> getAll(PageableQuery pageableQuery);
  
}
