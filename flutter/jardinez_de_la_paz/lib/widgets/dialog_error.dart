import 'package:cool_alert/cool_alert.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';

class DialogUtils {
  static void errorAlert(BuildContext context, {String? title}) {
    CoolAlert.show(
      context: context,
      type: CoolAlertType.error,
      title: 'Oops...',
      text: title ?? 'Sorry, something went wrong',
      loopAnimation: false,
      // confirmBtnColor: Colors.red
      // backgroundColor: Color(0x586B62),
      // backgroundColor: Colors.white,
    );
  }

  static void successAlert(BuildContext context, {String? title}) {
    CoolAlert.show(
      context: context,
      type: CoolAlertType.success,
      title: '¡Todo muy bien!',
      text: title ?? 'Transacción completada',
      loopAnimation: false,
    );
  }

  static void showErrorDialog(
    BuildContext context, {
    String? type,
    String? message,
    Function()? onPressed,
  }) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          title: Container(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                type == 'Error'
                    ? Icon(
                        Icons.error_outline_outlined,
                        color: Colors.red,
                      )
                    : Icon(
                        Icons.check_circle_outline_outlined,
                        color: Colors.green.shade400,
                      ),
                const SizedBox(width: 10),
                Text(
                  type == 'Error' ? 'ERROR' : 'OK',
                  style: TextStyle(
                    color: type == 'Error' ? Colors.red : Colors.green.shade400,
                  ),
                  textAlign: TextAlign.center,
                )
              ],
            ),
          ),
          content: Text(message ?? 'prueba'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                onPressed?.call();
                Navigator.pop(context, 'OK');
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  static void showDialogLoading(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;

    EasyLoading.instance
      ..displayDuration = const Duration(milliseconds: 2000)
      ..loadingStyle = EasyLoadingStyle.custom
      ..indicatorSize = 60
      ..textColor = Colors.black
      ..radius = 20
      ..backgroundColor = Colors.transparent
      ..maskColor = Colors.white
      ..indicatorColor = colorTheme.primary
      ..maskType = EasyLoadingMaskType.black
      ..userInteractions = false
      ..dismissOnTap = false
      ..boxShadow = <BoxShadow>[]
      ..indicatorType = EasyLoadingIndicatorType.fadingCircle;
    EasyLoading.show(status: '');
  }

  static void dismissDialogLoading() {
    EasyLoading.dismiss();
  }

  static bool isShow() {
    return EasyLoading.isShow;
  }

  static void showDialogError([String? text]) {
    EasyLoading.showError(text ?? 'Failed with Error', dismissOnTap: true);
  }
}
