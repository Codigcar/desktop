import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/contract.entity.dart';

class CronogramaCuotaEntity {
  final String numCuota;
  final String fechaVencimiento;
  final String montoCuota;
  final String mora;
  final String estado;

  CronogramaCuotaEntity({
    required this.numCuota,
    required this.fechaVencimiento,
    required this.montoCuota,
    required this.mora,
    required this.estado,
  });

  factory CronogramaCuotaEntity.fromJson(Map<String, dynamic> json) =>
      CronogramaCuotaEntity(
        numCuota: json["NRO_CUOTA"],
        fechaVencimiento:json["FECHA_VENCIMIENTO"] != null ?
            '${DateTime.parse(json["FECHA_VENCIMIENTO"]).day.toString().padLeft(2, '0')}/${DateTime.parse(json["FECHA_VENCIMIENTO"]).month.toString().padLeft(2, '0')}/${DateTime.parse(json["FECHA_VENCIMIENTO"]).year.toString().padLeft(2, '0')}':'null',
        montoCuota: 'S/${json["MONTO_CUOTA"]}',
        mora: 'S/${json["MORA"]}',
        estado: json["ESTCUOTA"].toString().substring(0, 1),
      );
}

class EECCEntity {
  final ContractEntity contract;
  final List<CronogramaCuotaEntity> cuotaList;

  EECCEntity({
    this.cuotaList = const [],
    ContractEntity? contract,
  }) : contract = contract ?? ContractEntity();
}
