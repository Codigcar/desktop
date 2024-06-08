import 'package:flutter/material.dart';

class CustomTextFormField extends StatelessWidget {
  final String? label;
  final String? hint;
  final String? errorMessage;
  final Function(String)? onChanged;
  final String? Function(String?)? validator;
  final Color? labelColor;
  final Color? borderColor;
  final bool obscureText;
  final TextInputType? keyboardType;
  final IconData? prefixIcon;
  final Color prefixIconColor;
  final Color colorInput;
  final bool isDatePickerInput;
  final IconData? icon;
  final TextEditingController? textController;
  final Color floatingLabelColor;
  final Color? cursorColor;

  const CustomTextFormField({
    super.key,
    this.label,
    this.hint,
    this.errorMessage,
    this.onChanged,
    this.validator,
    this.labelColor = Colors.black,
    this.borderColor,
    this.obscureText = false,
    this.keyboardType = TextInputType.text,
    this.prefixIcon,
    this.prefixIconColor = Colors.black,
    this.colorInput = Colors.black54,
    this.isDatePickerInput = false,
    this.icon,
    this.textController,
    this.floatingLabelColor = Colors.black,
    this.cursorColor,
  });

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;
    TextEditingController _textController = TextEditingController();

    final border = OutlineInputBorder(
      borderSide: BorderSide(color: borderColor ?? colorTheme.primary),
      borderRadius: BorderRadius.circular(40),
    );

    Future<dynamic> _selectDate() async {
      DateTime? _picked = await showDatePicker(
        context: context,
        initialDate: DateTime.now(),
        firstDate: DateTime(1900),
        lastDate: DateTime(2100),
      );

      if (_picked == null) return null;
      final text = _picked.toString().split(" ")[0];
      return text;
    }

    return TextFormField(
        controller: textController,
        onChanged: onChanged,
        validator: validator,
        obscureText: obscureText,
        keyboardType: keyboardType,
        style: TextStyle(
          fontSize: 15,
          color: colorInput ?? Colors.black54,
        ),
        cursorColor: cursorColor,
        decoration: InputDecoration(
          floatingLabelStyle: TextStyle(
            color: floatingLabelColor,
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
          enabledBorder: border,
          focusedBorder: border,
          errorBorder: border.copyWith(
              borderSide: BorderSide(color: Colors.red.shade800, width: 1)),
          focusedErrorBorder: border.copyWith(
              borderSide: BorderSide(color: Colors.red.shade800, width: 1)),
          isDense: true,
          label: label != null ? Text(label!) : null,
          labelStyle: TextStyle(color: labelColor),
          hintText: hint,
          errorText: errorMessage,
          errorStyle: const TextStyle(fontWeight: FontWeight.w900),
          focusColor: colorTheme.primary,
          prefixIcon: prefixIcon != null ? Icon(prefixIcon, size: 25) : null,
          prefixIconColor: prefixIconColor,
          suffixIcon:
              icon != null ? Icon(icon, color: Colors.white, size: 25) : null,
        ),
        onTap: textController != null
            ? () async {
                final selectDate = await _selectDate();
                if (selectDate == null) return;
                if (onChanged != null) onChanged!(selectDate);
                textController!.text = selectDate;
              }
            : null);
  }
}
