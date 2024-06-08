import 'package:dio/dio.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/datasources/eecc.datasource.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/contract.entity.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/eecc.entity.dart';

class EECCDatasourceImpl extends EECCDatasource {
  late final Dio dio;
  final String dni;

  EECCDatasourceImpl({required this.dni})
      : dio = Dio(BaseOptions(baseUrl: 'https://170.0.80.194:8010/api'));

  @override
  Future<List<ContractEntity>> getContracts() async {
    final response = await dio.get('/contrato/$dni');

    final List<ContractEntity> contractList = [];
    for (final item in response.data['data'] ?? []) {
      contractList.add(ContractEntity.fromJson(item));
    }
    return contractList;
  }
  
  @override
  Future<List<CronogramaCuotaEntity>> getCronogramaCuotas(String empresa, String contrato) async {
    final response = await dio.post('/EstadoCuenta', data: {
      "pEmpresa":empresa,
      "pContrato":contrato,
    });
    final List<CronogramaCuotaEntity> cronogramaList = [];
    for (final item in response.data['data'][0]['cronogramaCuota']) {
      cronogramaList.add(CronogramaCuotaEntity.fromJson(item));
    }
    return cronogramaList;
  }
  
  @override
  Future<EECCEntity> getEECC(String empresa, String contrato) async {

    final getContracts = await this.getContracts();
    final getCronogramaList = await this.getCronogramaCuotas(empresa, contrato);

    final getInstace = EECCEntity(cuotaList: getCronogramaList, contract: getContracts[0] );
    return getInstace;
  }
}
