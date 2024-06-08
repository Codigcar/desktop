class SearchPersonEntity {
  final String fullName;
  final String dateOfBirth;
  final String dateOfDeath;
  final String longitud;
  final String altitud;
  final String camposanto;
  final String plataforma;
  final String espacio;
  final String fechaNacimiento;
  final String horarioVisita;
  final String ejeIzquierdo;
  final String ejeDerecho;
  final String ejeInferior;
  final String ejeSuperior;

  SearchPersonEntity({
    this.fullName = "",
    this.dateOfBirth = "",
    this.dateOfDeath = "",
    this.longitud = "",
    this.altitud = "",
    this.camposanto = "",
    this.plataforma = "",
    this.espacio = "",
    this.fechaNacimiento = "",
    this.horarioVisita = "",
    this.ejeIzquierdo = "",
    this.ejeDerecho= "",
    this.ejeInferior= "",
    this.ejeSuperior= "",
  });

  factory SearchPersonEntity.fromJson(Map<String, dynamic> json) => SearchPersonEntity(
        fullName: '${json["nombre"]} ${json["apellidos"]}',
        dateOfDeath:json["fechaDefuncion"],
            // '${DateTime.parse(json["fechaDefuncion"]).day.toString().padLeft(2, '0')}/${DateTime.parse(json["fechaDefuncion"]).month.toString().padLeft(2, '0')}/${DateTime.parse(json["fechaDefuncion"]).year.toString().padLeft(2, '0')}',
        dateOfBirth: json["fechaDefuncion"],
            // '${DateTime.parse(json["fechaDefuncion"]).day.toString().padLeft(2, '0')}/${DateTime.parse(json["fechaDefuncion"]).month.toString().padLeft(2, '0')}/${DateTime.parse(json["fechaDefuncion"]).year.toString().padLeft(2, '0')}',
            longitud: json["longitud"] ?? "-12.072746",
            altitud: json["altitud"] ?? "-76.928444",
            camposanto: json["camposanto"],
            plataforma: json["plataforma"],
            espacio: json["espacio"],
            fechaNacimiento: json["fechaNacimiento"],
            horarioVisita: json["horarioVisita"],
            ejeIzquierdo: json["ejeIzquierdo"],
            ejeDerecho: json["ejeDerecho"],
            ejeInferior: json["ejeInferior"],
            ejeSuperior: json["ejeSuperior"],
      );
}
