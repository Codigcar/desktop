import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/providers/search_person.provider.dart';
import 'package:jardinez_de_la_paz/widgets/header_title.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/custom_dropdown.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/custom_input.dart';

class GuestUserScreen extends StatelessWidget {
  static const name = 'GuestUserScreen';
  static const route = '/search-person';
  const GuestUserScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;

    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(),
        body: Container(
          color: colorTheme.primary,
          width: double.infinity,
          height: MediaQuery.of(context).size.height,
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 20),
                const HeaderTitle(
                  title: 'UBICACIÓN DE FALLECIDO',
                  iconName: Icons.search_outlined,
                ),
                _RegisterForm(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _RegisterForm extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final searchPersonForm = ref.watch(searchPersonProvider);
    final sizePhone = MediaQuery.of(context).size;
    final colorTheme = Theme.of(context).colorScheme;
    final data = ref.read(searchPersonProvider.notifier).resetData;
    TextEditingController _textController = TextEditingController(
      text: ref.watch(searchPersonProvider.notifier).getDateDeath().value,
    );

    Color labelColor = Colors.white;

    const camposSantos = [
      'La Molina',
      'Lurín',
      'Centro Funerario',
    ];

    if (searchPersonForm.isLoading) {
      Future.delayed(Duration.zero, () {
        DialogUtils.showDialogLoading(context);
      });
    }

    if (!searchPersonForm.isLoading && DialogUtils.isShow()) {
      DialogUtils.dismissDialogLoading();
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          const SizedBox(height: 50),
          CustomDropdownFormField(
            label: 'Camposanto',
            colorInput: Colors.white,
            items: camposSantos,
            onChanged: (value) => ref
                .read(searchPersonProvider.notifier)
                .onChangeCamposanto(value),
          ),
          const SizedBox(height: 30),
          CustomTextFormField(
            label: 'Nombre del fallecido',
            labelColor: labelColor,
            borderColor: labelColor,
            colorInput: labelColor,
            floatingLabelColor: Colors.white,
            cursorColor: Colors.white,
            onChanged: (value) =>
                ref.read(searchPersonProvider.notifier).onNameChange(value),
            errorMessage: searchPersonForm.name.errorMessage,
          ),
          const SizedBox(height: 30),
          CustomTextFormField(
            label: 'Apellido Paterno del fallecido',
            labelColor: labelColor,
            borderColor: labelColor,
            colorInput: labelColor,
            floatingLabelColor: Colors.white,
            cursorColor: Colors.white,
            onChanged: (value) => ref
                .read(searchPersonProvider.notifier)
                .onLastNamePadreChanged(value),
            errorMessage: searchPersonForm.lastNamePadre.errorMessage,
          ),
          const SizedBox(height: 30),
          CustomTextFormField(
            label: 'Apellido Materno del fallecido',
            labelColor: labelColor,
            borderColor: labelColor,
            colorInput: labelColor,
            floatingLabelColor: Colors.white,
            cursorColor: Colors.white,
            onChanged: (value) => ref
                .read(searchPersonProvider.notifier)
                .onLastNameMadreChanged(value),
            errorMessage: searchPersonForm.lastNameMadre.errorMessage,
          ),
          const SizedBox(height: 30),
          CustomTextFormField(
            label: 'Fecha de defunción',
            labelColor: labelColor,
            borderColor: labelColor,
            colorInput: labelColor,
            icon: Icons.arrow_drop_down_circle,
            floatingLabelColor: Colors.white,
            isDatePickerInput: true,
            textController: _textController,
            onChanged: (value) => ref
                .read(searchPersonProvider.notifier)
                .onDateDeathChanged(value),
            // errorMessage: searchPersonForm.dateDeath.errorMessage,
          ),
          const SizedBox(height: 30),
          SizedBox(
            width: sizePhone.width * 0.6,
            height: 45,
            child: FilledButton(
              onPressed: () {
                ref.read(searchPersonProvider.notifier).onFormSubmit(context);
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
                foregroundColor: MaterialStateProperty.all(colorTheme.primary),
              ),
              child: const Text('BUSCAR'),
            ),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }
}
