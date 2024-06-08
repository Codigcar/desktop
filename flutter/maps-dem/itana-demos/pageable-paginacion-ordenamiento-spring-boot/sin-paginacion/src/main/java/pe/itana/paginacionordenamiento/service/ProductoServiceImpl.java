package pe.itana.paginacionordenamiento.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.itana.paginacionordenamiento.entity.Producto;
import pe.itana.paginacionordenamiento.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {
  
  @Autowired
  ProductoRepository productoRepository;
  
  @Override
  public List<Producto> getAll() {
    return productoRepository.findAll();
  }
}
