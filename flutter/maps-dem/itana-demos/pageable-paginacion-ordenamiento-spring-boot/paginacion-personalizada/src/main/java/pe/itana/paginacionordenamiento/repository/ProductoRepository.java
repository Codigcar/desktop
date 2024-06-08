package pe.itana.paginacionordenamiento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.itana.paginacionordenamiento.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
