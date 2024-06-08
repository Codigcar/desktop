import 'package:flutter/material.dart';

class CustomDropdownFormField extends StatelessWidget {
  final String? label;
  final String? hint;
  final String? errorMessage;
  final void Function(String?)? onChanged;
  final String? Function(String?)? validator;
  final Color? labelColor;
  final Color colorInput;
  final List<String> items;

  const CustomDropdownFormField({
    super.key,
    this.label,
    this.hint,
    this.errorMessage,
    this.onChanged,
    this.validator,
    this.labelColor,
    this.colorInput = Colors.black54,
    this.items = const [
      'item1',
      'item2',
      'item3',
    ],
  });

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;
    String dropdownvalue = items.isEmpty ? 'Cargando...' : items[0];

    final border = OutlineInputBorder(
      borderSide: BorderSide(color: colorTheme.secondary),
      borderRadius: BorderRadius.circular(40),
    );

    return DropdownButtonFormField(
      value: dropdownvalue,
      items: items.map((String items) {
        return DropdownMenuItem(
          value: items,
          child: Text(items),
        );
      }).toList(),
      onChanged: onChanged,
      style: TextStyle(
        fontSize: 15,
        color: colorInput ?? Colors.black54,
      ),
      icon: const Icon(
        Icons.arrow_drop_down_circle,
        color: Colors.white,
      ),
      dropdownColor: Colors.grey.shade800,
      decoration: InputDecoration(
        enabledBorder: border,
        focusedBorder: border,
        floatingLabelStyle: const TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.bold,
          fontSize: 18,
        ),
        errorBorder: border.copyWith(
          borderSide: BorderSide(color: Colors.red.shade800),
        ),
        focusedErrorBorder: border.copyWith(
          borderSide: BorderSide(color: Colors.red.shade800),
        ),
        isDense: true,
        label: label != null ? Text(label!) : null,
        hintText: 'hint',
        labelStyle: const TextStyle(
          color: Colors.white,
        ),
        // errorText: errorMessage,
      ),
    );

    // return DropdownButtonFormField(
    //   onChanged: onChanged,
    //   validator: validator,
    //   decoration: InputDecoration(
    //     enabledBorder: border,
    //     focusedBorder: border.copyWith(
    //       borderSide: BorderSide(color: colorTheme.secondary),
    //     ),
    //     errorBorder: border.copyWith(
    //       borderSide: BorderSide(color: Colors.red.shade800),
    //     ),
    //     focusedErrorBorder: border.copyWith(
    //       borderSide: BorderSide(color: Colors.red.shade800),
    //     ),
    //     isDense: true,
    //     label: label != null ? Text(label!) : null,
    //     hintText: hint,
    //     errorText: errorMessage,
    //   ),
    // );
  }
}
