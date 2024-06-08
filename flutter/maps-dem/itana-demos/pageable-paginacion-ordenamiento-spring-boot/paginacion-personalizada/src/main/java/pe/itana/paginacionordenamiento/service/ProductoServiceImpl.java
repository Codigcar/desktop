package pe.itana.paginacionordenamiento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pe.itana.paginacionordenamiento.entity.Producto;
import pe.itana.paginacionordenamiento.model.PageableQuery;
import pe.itana.paginacionordenamiento.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {
  
  @Autowired
  ProductoRepository productoRepository;
  
  @Override
  public Page<Producto> getAll(PageableQuery pageableQuery) {
    Sort sort = Sort.by(Sort.Direction.fromString(pageableQuery.getEnOrden()),
        pageableQuery.getOrdenadoPor());
    Pageable pageable = PageRequest.of(pageableQuery.getPagina(),
        pageableQuery.getElementosPorPagina(), sort);
    return productoRepository.findAll(pageable);
  }
  
}
