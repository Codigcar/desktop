import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/auth/presentation/providers/auth.provider.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/repositories/eecc.repository.dart';
import 'package:jardinez_de_la_paz/screens/eecc/infrastructure/datasources/eecc.datasource.impl.dart';
import 'package:jardinez_de_la_paz/screens/eecc/infrastructure/repositories/eecc.repository.impl.dart';

final eeccRepositoryProvider = Provider<EECCRepository>((ref) {
  final dni = ref.watch(authProvider).dni;
  final getDNI = dni.isEmpty ? '06197774' : dni;

  final eeccRepository = EECCRepositoryImpl(EECCDatasourceImpl(dni: getDNI));
  return eeccRepository;
});
