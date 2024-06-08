package pe.itana.paginacionordenamiento.model;

public interface PageableQuery {
  
  Integer getPagina();
  
  Integer getElementosPorPagina();
  
  String getOrdenadoPor();
  
  String getEnOrden();

}
