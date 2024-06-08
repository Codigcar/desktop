import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/contract.entity.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/eecc.entity.dart';

abstract class EECCDatasource {
  Future<List<ContractEntity>> getContracts();
  Future<List<CronogramaCuotaEntity>> getCronogramaCuotas(String empresa, String contrato);
  Future<EECCEntity> getEECC(String empresa, String contrato);
}
