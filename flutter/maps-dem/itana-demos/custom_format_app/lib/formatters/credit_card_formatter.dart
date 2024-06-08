import 'dart:math';
import 'package:flutter/services.dart';

class CreditCardFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    newValue = FilteringTextInputFormatter.digitsOnly
        .formatEditUpdate(oldValue, newValue);

    // newValue.text.length = 4 : 1 iteracion
    // newValue.text.length = 5 : 2 iteraciones

    int offset = 0;
    StringBuffer buffer = StringBuffer();
    for (int i = min(4, newValue.text.length);
        i <= newValue.text.length;
        i += min(4, max(1, newValue.text.length - i))) {
      buffer.write(newValue.text.substring(offset, i));
      if (i < newValue.text.length) {
        buffer.write(' ');
      }
      offset = i;
    }

    int selectionIndex = buffer.length;

    return TextEditingValue(
      text: buffer.toString(),
      selection: TextSelection.collapsed(offset: selectionIndex),
    );
  }
}
