import 'package:flutter/services.dart';

class TelephoneNumberFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue, // valor anterior al tipeado
    TextEditingValue newValue, // ultimo valor tipeado
  ) {
    newValue = FilteringTextInputFormatter.digitsOnly
        .formatEditUpdate(oldValue, newValue);

    int offset = 0;
    StringBuffer buffer = StringBuffer();
    for (int i = 0; i <= newValue.text.length; i++) {
      buffer.write(newValue.text.substring(offset, i));
      if (i == newValue.text.length) break;
      if (i == 3) {
        buffer.write('-');
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
