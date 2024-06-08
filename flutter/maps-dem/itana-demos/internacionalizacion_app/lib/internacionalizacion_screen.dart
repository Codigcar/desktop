import 'package:flutter/material.dart';
import 'package:internacionalizacion_app/generated/l10n.dart';

class InternacionalizacionScreen extends StatefulWidget {
  @override
  _InternacionalizacionScreenState createState() =>
      _InternacionalizacionScreenState();
}

class _InternacionalizacionScreenState
    extends State<InternacionalizacionScreen> {
  TextEditingController controllerFechaNacimiento;
  final GlobalKey<ScaffoldMessengerState> _scaffoldMessengerKey =
      GlobalKey<ScaffoldMessengerState>();

  @override
  void initState() {
    super.initState();
    controllerFechaNacimiento = TextEditingController(text: '');
  }

  @override
  Widget build(BuildContext context) {
    return ScaffoldMessenger(
      key: _scaffoldMessengerKey,
      child: Scaffold(
        backgroundColor: Colors.lightBlue[50],
        body: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              child: Container(
                margin: const EdgeInsets.all(30),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(
                    Radius.circular(20),
                  ),
                  color: Colors.white,
                  border: Border.all(
                    color: Colors.blue,
                    width: 1.0,
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(30),
                  child: Column(
                    children: [
                      Icon(
                        Icons.person,
                        size: 70,
                        color: Colors.lightBlue,
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      Text(
                        AppLocalizations.of(context).datosUsuario,
                        style: TextStyle(
                          fontSize: 30,
                          color: Colors.grey,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(
                          vertical: 40,
                        ),
                        child: Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                vertical: 10,
                              ),
                              child: TextField(
                                textAlign: TextAlign.center,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.all(
                                      Radius.circular(20.0),
                                    ),
                                  ),
                                  labelText:
                                      AppLocalizations.of(context).nombre,
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                vertical: 10,
                              ),
                              child: TextField(
                                textAlign: TextAlign.center,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.all(
                                      Radius.circular(20.0),
                                    ),
                                  ),
                                  labelText:
                                      AppLocalizations.of(context).apellido,
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                vertical: 10,
                              ),
                              child: TextField(
                                readOnly: true,
                                textAlign: TextAlign.center,
                                keyboardType: TextInputType.datetime,
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.all(
                                      Radius.circular(20.0),
                                    ),
                                  ),
                                  labelText: AppLocalizations.of(context)
                                      .fechaNacimiento,
                                ),
                                controller: controllerFechaNacimiento,
                                onTap: () {
                                  _selectDate(context);
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      Material(
                        color: Colors.blue,
                        elevation: 5,
                        borderRadius: BorderRadius.circular(50),
                        child: SizedBox(
                          height: 40,
                          child: MaterialButton(
                            onPressed: () {
                              _scaffoldMessengerKey.currentState
                                  .showSnackBar(SnackBar(
                                backgroundColor: Colors.grey,
                                content: Text(
                                  AppLocalizations.of(context)
                                      .usuarioRegistrado('Miguel'),
                                ),
                                duration: Duration(seconds: 3),
                              ));
                            },
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Text(
                                  AppLocalizations.of(context).registrar,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 18,
                                    fontWeight: FontWeight.normal,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  _selectDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2300),
      helpText: AppLocalizations.of(context).fechaNacimiento,
      builder: (BuildContext context, Widget child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: ColorScheme.light(
              primary: Colors.lightBlue,
            ),
          ),
          child: child,
        );
      },
    );
    if (picked != null)
      setState(() {
        controllerFechaNacimiento.text =
            '${picked.day}/${picked.month}/${picked.year}';
      });
  }
}
