import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/config/index.dart';
import 'package:jardinez_de_la_paz/screens/search_person/domain/entities/search_person.entity.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/providers/search_person.provider.dart';
import 'package:jardinez_de_la_paz/screens/search_person/presentation/screens/person_detail.screen.dart';
import 'package:jardinez_de_la_paz/widgets/index.dart';
import 'package:jardinez_de_la_paz/widgets/inputs/custom_input.dart';

class PersonList extends ConsumerWidget {
  static const route = '/person_list';
  static const name = 'person_list';
  const PersonList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final searchPersonOfState = ref.watch(searchPersonProvider);
    final colorsTheme = Theme.of(context).colorScheme;

    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(),
        body: Container(
          color: Colors.white,
          child: Column(
            children: [
              Container(
                color: colorsTheme.primary,
                padding:
                    const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
                child: CustomTextFormField(
                  label: 'Buscar fallecido',
                  labelColor: Colors.white,
                  prefixIcon: Icons.search,
                  prefixIconColor: Colors.white,
                  borderColor: Colors.white,
                  colorInput: Colors.white,
                  floatingLabelColor: Colors.white,
                  onChanged: (value) => ref
                      .read(searchPersonProvider.notifier)
                      .onChangeFilter(value),
                  // errorMessage: loginForm.dni.errorMessage,
                ),
              ),
              const SizedBox(height: 25),
              Expanded(
                child: ListView.builder(
                  itemCount: searchPersonOfState.personList.length,
                  itemBuilder: (BuildContext context, int index) {
                    final person = searchPersonOfState.personList[index];
                    return _Row(person: person);
                  },
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class _Row extends StatelessWidget {
  final SearchPersonEntity person;

  const _Row({required this.person});

  @override
  Widget build(BuildContext context) {
    final textStyleTheme = Theme.of(context).textTheme;

    return GestureDetector(
      onTap: () => appRouter.push(PersonDetailScreen.route, extra: person),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: Text(
                    person.fullName,
                    textAlign: TextAlign.left,
                    style: textStyleTheme.bodyLarge
                        ?.copyWith(fontWeight: FontWeight.bold),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.only(left: 20),
                  child: Icon(Icons.control_point),
                )
              ],
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Nació: ${person.fechaNacimiento}',
                  style: textStyleTheme.bodyMedium,
                ),
                Text(
                  'Falleció: ${person.dateOfDeath}',
                  style: textStyleTheme.bodyMedium,
                ),
              ],
            ),
            const SizedBox(height: 10),
            const Divider()
          ],
        ),
      ),
    );
  }
}
