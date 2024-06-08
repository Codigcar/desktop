import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:formz/formz.dart';
import 'package:jardinez_de_la_paz/config/index.dart';
import 'package:jardinez_de_la_paz/screens/auth/infrastructure/errors/auth_errors.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/entities/search_person.entity.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/repositories/search_person.repository.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/providers/search_person.repository.provider.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/screens/person_detail.screen.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/screens/person_list.screen.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/last_name.dart';

//! 1 - State del provider

class SearchPersonState {
  final bool isPosting;
  final bool isFormPosted;
  final bool isValid;
  final bool isLoading;
  final Name name;
  final LastName lastNamePadre;
  final LastName lastNameMadre;
  final DateDeath dateDeath;
  final String campoSanto;
  final List<SearchPersonEntity> personList;
  final List<SearchPersonEntity> personListInit;
  final String errorMessage;

  SearchPersonState({
    this.isPosting = false,
    this.isFormPosted = false,
    this.isValid = false,
    this.isLoading = false,
    this.name = const Name.pure(),
    this.lastNamePadre = const LastName.pure(),
    this.lastNameMadre = const LastName.pure(),
    this.dateDeath = const DateDeath.pure(),
    this.personList = const [],
    this.personListInit = const [],
    this.campoSanto = "",
    this.errorMessage = "",
  });

  SearchPersonState copyWith({
    bool? isPosting,
    bool? isFormPosted,
    bool? isValid,
    bool? isLoading,
    Name? name,
    LastName? lastNamePadre,
    LastName? lastNameMadre,
    DateDeath? dateDeath,
    List<SearchPersonEntity>? personList,
    List<SearchPersonEntity>? personListInit,
    String? campoSanto,
    String? errorMessage,
  }) =>
      SearchPersonState(
        isPosting: isPosting ?? this.isPosting,
        isFormPosted: isFormPosted ?? this.isFormPosted,
        isValid: isValid ?? this.isValid,
        isLoading: isLoading ?? this.isLoading,
        name: name ?? this.name,
        lastNamePadre: lastNamePadre ?? this.lastNamePadre,
        lastNameMadre: lastNameMadre ?? this.lastNameMadre,
        dateDeath: dateDeath ?? this.dateDeath,
        personList: personList ?? this.personList,
        personListInit: personListInit ?? this.personListInit,
        campoSanto: campoSanto ?? this.campoSanto,
        errorMessage: errorMessage ?? this.errorMessage,
      );
}

//! 2 - Como implementamos un notifier

class SearchPersonNotifier extends StateNotifier<SearchPersonState> {
  final SearchPersonRepository searchPersonRepository;

  SearchPersonNotifier({required this.searchPersonRepository})
      : super(SearchPersonState());

  onNameChange(String value) {
    final newName = Name.dirty(value);
    state = state.copyWith(
      name: newName,
      isValid:
          Formz.validate([newName, state.lastNameMadre, state.lastNamePadre]),
    );
  }

  onLastNamePadreChanged(String value) {
    final newLastName = LastName.dirty(value);
    state = state.copyWith(
      lastNamePadre: newLastName,
      isValid: Formz.validate([newLastName, state.lastNameMadre, state.name]),
    );
  }

  onLastNameMadreChanged(String value) {
    final newLastName = LastName.dirty(value);
    state = state.copyWith(
      lastNameMadre: newLastName,
      isValid: Formz.validate([newLastName, state.lastNamePadre, state.name]),
    );
  }

  onDateDeathChanged(String value) {
    final dateFormat =
        '${DateTime.parse(value).day.toString().padLeft(2, '0')}/${DateTime.parse(value).month.toString().padLeft(2, '0')}/${DateTime.parse(value).year.toString().padLeft(2, '0')}';
    final newFecha = DateDeath.dirty(dateFormat);
    state = state.copyWith(
      dateDeath: newFecha,
      isValid: Formz.validate([newFecha, state.name, state.lastNamePadre]),
    );
  }

  getDateDeath() {
    return state.dateDeath;
  }

  onChangeFilter(String searchTerm) {
    if (searchTerm.isEmpty) {
      final personListInit = state.personListInit;
      state = state.copyWith(personList: personListInit);
      return;
    }
    final personList = state.personList;

    final filteredList = personList
        .where((item) =>
            item.fullName
                ?.toString()
                .toUpperCase()
                .contains(searchTerm.toUpperCase()) ??
            false)
        .toList();

    state = state.copyWith(personList: filteredList);
  }

  onChangeCamposanto(String? value) {
    state = state.copyWith(
      campoSanto: value,
    );
  }

  Future<void> onFormSubmit(BuildContext context) async {
    _touchEveryField();
    if (!state.isValid) return;
    try {
      state = state.copyWith(isLoading: true);
      // await Future.delayed(const Duration(seconds: 5));
      final getPersons = await searchPersonRepository.getPerson(
        state.name.value,
        state.lastNamePadre.value,
        state.lastNameMadre.value,
        state.dateDeath.value,
        state.campoSanto,
      );

      state = state.copyWith(
        personList: getPersons,
        personListInit: getPersons,
        isLoading: false,
      );

      if (getPersons.length == 1) {
        appRouter.push(PersonDetailScreen.route, extra: getPersons[0]);
        return;
      }
      appRouter.push(PersonList.route);
    } on CustomError catch (e) {
      state = state.copyWith(isLoading: false);
      if (!context.mounted) return;
      DialogUtils.errorAlert(context, title: e.message);
    } catch (e) {
      state = state.copyWith(isLoading: false);
      if (!context.mounted) return;
      DialogUtils.errorAlert(context, title: 'Error del servidor.');
    }
  }

  resetData() {
    state = state.copyWith(errorMessage: '', isLoading: false);
  }

  _touchEveryField() {
    final name = Name.dirty(state.name.value);
    final lastNamePadre = LastName.dirty(state.lastNamePadre.value);
    final lastNameMadre = LastName.dirty(state.lastNameMadre.value);
    final dateDeath = DateDeath.dirty(state.dateDeath.value);

    state = state.copyWith(
      isFormPosted: true,
      name: name,
      lastNamePadre: lastNamePadre,
      lastNameMadre: lastNameMadre,
      dateDeath: dateDeath,
      isValid: Formz.validate([name, lastNamePadre, lastNameMadre]),
    );
  }
}

//! 3 - StateNotifierProvider - consume afuera

final searchPersonProvider =
    StateNotifierProvider.autoDispose<SearchPersonNotifier, SearchPersonState>(
        (ref) {
  final searchPersonRepository = ref.watch(searchPersonRepositoryProvider);
  return SearchPersonNotifier(searchPersonRepository: searchPersonRepository);
});
