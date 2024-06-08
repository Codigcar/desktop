import 'package:appbar_app/utils/styles.dart';
import 'package:flutter/material.dart';

class RoundedTextField extends StatelessWidget {
  final String text;
  final bool obscureText;
  final TextInputType inputType;
  final Function onChange;
  final String value;
  final Color borderColor;
  final double borderRadius;
  final IconData icon;
  final int maxLength;
  final TextEditingController controller;

  RoundedTextField(
      {this.text,
      this.onChange,
      this.obscureText,
      this.inputType,
      this.value,
      this.borderColor,
      this.borderRadius,
      this.icon,
      this.maxLength,
      this.controller});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.grey[300],
      child: TextField(
        keyboardType: inputType,
        obscureText: obscureText,
        maxLength: maxLength,
        decoration: (icon != null)
            ? kTextFieldDecoration.copyWith(
                prefixIcon: Icon(
                  icon,
                  color: Colors.black,
                ),
                labelText: text,
                hasFloatingPlaceholder: false,
                hintText: text,
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: borderColor, width: 1),
                  borderRadius: BorderRadius.all(Radius.circular(borderRadius)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: borderColor, width: 1),
                  borderRadius: BorderRadius.all(Radius.circular(borderRadius)),
                ))
            : kTextFieldDecoration.copyWith(
                labelText: text,
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: borderColor, width: 1),
                  borderRadius: BorderRadius.all(Radius.circular(borderRadius)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: borderColor, width: 1),
                  borderRadius: BorderRadius.all(Radius.circular(borderRadius)),
                )),
        onChanged: (value) => onChange(value),
        controller: controller,
      ),
    );
  }
}
