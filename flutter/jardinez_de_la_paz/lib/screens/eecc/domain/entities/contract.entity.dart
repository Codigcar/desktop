class ContractEntity {
  final String numContrato;
  final String codEmpresa;
  final String nombreEmpresa;

  ContractEntity({this.numContrato = "", this.codEmpresa = "", this.nombreEmpresa = ""});

  factory ContractEntity.fromJson(Map<String, dynamic> json) => ContractEntity(
        numContrato: json["NumeroContrato"],
        codEmpresa: json["CodEmpresa"],
        nombreEmpresa: json["NombreEmpresa"]
      );
}
