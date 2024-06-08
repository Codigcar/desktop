package pe.itana.paginacionordenamiento.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pe.itana.paginacionordenamiento.entity.Producto;

public interface ProductoService {
  
  Page<Producto> getAll(Pageable pageable);
  
}
