//! 1. state

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/contract.entity.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/entities/eecc.entity.dart';
import 'package:jardinez_de_la_paz/screens/eecc/domain/repositories/eecc.repository.dart';
import 'package:jardinez_de_la_paz/screens/eecc/presentation/providers/eecc.repository.provider.dart';

class EECCState {
  final bool isLoading;
  final List<ContractEntity> contractList;
  final List<String> contractsDropDown;
  final EECCEntity estadoDeCuenta;

  EECCState({
    this.isLoading = false,
    this.contractList = const [],
    this.contractsDropDown = const [],
    EECCEntity? estadoDeCuenta,
  }) : estadoDeCuenta = estadoDeCuenta ?? EECCEntity();

  EECCState copyWith({
    bool? isLoading,
    List<ContractEntity>? contractList,
    List<String>? contractsDropDown,
    EECCEntity? estadoDeCuenta,
  }) =>
      EECCState(
        isLoading: isLoading ?? this.isLoading,
        contractList: contractList ?? this.contractList,
        contractsDropDown: contractsDropDown ?? this.contractsDropDown,
        estadoDeCuenta: estadoDeCuenta ?? this.estadoDeCuenta,
      );
}

//! 2. notifier

class EECCNotifier extends StateNotifier<EECCState> {
  final EECCRepository eeccRepository;

  EECCNotifier({required this.eeccRepository}) : super(EECCState()) {
    loadDataContract(null);
  }

  String getAloneNumContrato(String texto) {
    RegExp regex = RegExp(r'\d+'); // Buscar uno o más dígitos consecutivos
    final match = regex.firstMatch(texto);

    if (match != null) {
      return match.group(0) ?? ""; // Obtener el valor coincidente
    }

    return "";
  }

  Future loadDataContract(String? numContratoSelect) async {
    if (state.isLoading) return;

    state = state.copyWith(isLoading: true);

    var codeEmpresaSelect = null;

    if (state.contractsDropDown.isEmpty) {
      final getContracts = await eeccRepository.getContracts();
      state = state.copyWith(contractList: getContracts);
      for (final item in getContracts) {
        state = state.copyWith(contractsDropDown: [
          ...state.contractsDropDown,
          '${item.nombreEmpresa} - ${item.numContrato}'
        ]);
      }
    } else {
      final codeEmpresaListSelect = state.contractList
          .where((item) =>
              '${item.nombreEmpresa} - ${item.numContrato}' ==
              numContratoSelect)
          .toList();
      codeEmpresaSelect = codeEmpresaListSelect[0].codEmpresa;
    }

    final getCronogramaCuotaList = await eeccRepository.getCronogramaCuotas(
      codeEmpresaSelect ?? state.contractList[0].codEmpresa,
      numContratoSelect != null
          ? getAloneNumContrato(numContratoSelect)
          : getAloneNumContrato(state.contractsDropDown[0]),
    );

    final getInstace = EECCEntity(
        cuotaList: getCronogramaCuotaList, contract: state.contractList[0]);

    state = state.copyWith(
      isLoading: false,
      estadoDeCuenta: getInstace,
    );
  }
}

//! 3.

final eeccProvider = StateNotifierProvider.autoDispose<EECCNotifier, EECCState>(
  (ref) {
    final eeccRepository = ref.watch(eeccRepositoryProvider);
    return EECCNotifier(eeccRepository: eeccRepository);
  },
);
