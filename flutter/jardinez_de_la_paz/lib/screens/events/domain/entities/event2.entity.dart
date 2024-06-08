
class Event2Entity {
  final String title;
  final String time;
  final String fullName;
  final String programation;
  final String tipoEspacio;
  final String codigoEspacio;
  final String vendedor;
  final String agencia;
  final String velatorio;
  final String observacion;

  Event2Entity({
    required this.title,
    required this.time,
    required this.fullName,
    required this.programation,
    required this.tipoEspacio,
    required this.codigoEspacio,
    required this.vendedor,
    required this.agencia,
    required this.velatorio,
    required this.observacion,
  });

  factory Event2Entity.fromJson(Map<dynamic, dynamic> json) => Event2Entity(
        title: json["nEmpresa"],
        time: json["cProgramacion"].toString().substring(0, 5),
        programation: DateTime.parse(json["FProgramacion"])
                .day
                .toString()
                .padLeft(2, '0') +
            "/" +
            DateTime.parse(json["FProgramacion"])
                .month
                .toString()
                .padLeft(2, '0') +
            "/" +
            DateTime.parse(json["FProgramacion"])
                .year
                .toString()
                .padLeft(2, '0'),
        fullName: json["dNombre"] +
            " " +
            json["dApellidoP"] +
            " " +
            json["dApellidoM"],
        tipoEspacio: json["dBien"],
        codigoEspacio:json["cEspacio"],
        vendedor:json["dAgente"],
        agencia:json["Agencia"],
        velatorio:json["dVelacion"],
        observacion:json["Observaciones"],

            
      );
}
