import 'package:authentication/model/usuario.dart';
import 'package:authentication/services/usuario_service.dart';
import 'package:authentication/utils/utils.dart';
import 'package:flutter/material.dart';

class SaveScreen extends StatefulWidget {
  @override
  _SaveScreenState createState() => _SaveScreenState();
}

class _SaveScreenState extends State<SaveScreen> {
  UsuarioService usuarioService = UsuarioService();
  Usuario usuario = Usuario();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Guardar Usuario'),
      ),
      resizeToAvoidBottomInset: true,
      body: Builder(
        builder: (BuildContext context) {
          return Container(
            color: Colors.white,
            child: Center(
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 250,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          TextField(
                            decoration: kTextFieldDecoration.copyWith(
                                labelText: 'Nombre'),
                            onChanged: (value) {
                              setState(() => usuario.nombres = value);
                            },
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          TextField(
                            decoration: kTextFieldDecoration.copyWith(
                                labelText: 'Apellidos'),
                            onChanged: (value) {
                              setState(() => usuario.apellidos = value);
                            },
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          TextField(
                            decoration: kTextFieldDecoration.copyWith(
                                labelText: 'Email'),
                            onChanged: (value) {
                              setState(() => usuario.email = value);
                            },
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    FlatButton(
                      child: Text("Guardar"),
                      onPressed: () async {
                        String message = '';
                        try {
                          await usuarioService.create(usuario);
                          setState(() {
                            usuario = new Usuario();
                          });
                          message = 'Usuario guardado correctamente';
                        } catch (e) {
                          message = 'Ocurrió un error';
                        } finally {
                          Scaffold.of(context).showSnackBar(SnackBar(
                            content: Text(message),
                            duration: Duration(seconds: 2),
                          ));
                        }
                      },
                      color: Colors.blue,
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
