package pe.itana.paginacionordenamiento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pe.itana.paginacionordenamiento.entity.Producto;
import pe.itana.paginacionordenamiento.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {
  
  @Autowired
  ProductoRepository productoRepository;
  
  @Override
  public Page<Producto> getAll(Pageable pageable) {
    return productoRepository.findAll(pageable);
  }
}
