import 'package:jardinez_de_la_paz/screens/eecc/domain/datasources/eecc.datasource.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/contract.entity.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/eecc.entity.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/repositories/eecc.repository.dart';

class EECCRepositoryImpl extends EECCRepository {
  final EECCDatasource _datasource;

  EECCRepositoryImpl(this._datasource);

  @override
  Future<List<ContractEntity>> getContracts() {
    return _datasource.getContracts();
  }

  @override
  Future<List<CronogramaCuotaEntity>> getCronogramaCuotas(String empresa, String contrato) {
    return _datasource.getCronogramaCuotas(empresa, contrato);
  }

  @override
  Future<EECCEntity> getEECC(String empresa, String contrato) {
    return _datasource.getEECC(empresa, contrato);
  }
}
