class Pais {
  bool selected;
  String nombre;
  String capital;
  String urlImagenBandera;

  Pais({this.selected, this.nombre, this.capital, this.urlImagenBandera});

  static List<Pais> getPaises() {
    return <Pais>[
      Pais(
        selected: false,
        nombre: 'Peru',
        capital: 'Lima',
        urlImagenBandera:
            'https://i.ytimg.com/vi/CXpVcb8Y11U/maxresdefault.jpg',
      ),
      Pais(
        selected: false,
        nombre: 'Brasil',
        capital: 'Brasilia',
        urlImagenBandera:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScALEzCWZ14nTDWGNU9OW30bRUDkTLLZkJvw&usqp=CAU',
      ),
      Pais(
        selected: false,
        nombre: 'Argentina',
        capital: 'Buenos Aires',
        urlImagenBandera:
            'https://cdn.cienradios.com/wp-content/uploads/sites/3/2020/05/Bandera-argentina-400x233.jpg',
      ),
    ];
  }
}
