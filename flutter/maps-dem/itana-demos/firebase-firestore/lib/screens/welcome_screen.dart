import 'package:authentication/model/usuario.dart';
import 'package:authentication/screens/list_screen.dart';
import 'package:authentication/screens/save_screen.dart';
import 'package:authentication/screens/search_usuario_screen.dart';
import 'package:authentication/services/usuario_service.dart';
import 'package:flutter/material.dart';

class WelcomeScreen extends StatefulWidget {
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  UsuarioService usuarioService = UsuarioService();
  Usuario usuario;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Firebase Firestore'),
      ),
      resizeToAvoidBottomInset: true,
      body: Container(
        color: Colors.white,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              FlatButton(
                child: Text("Listar"),
                onPressed: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => ListScreen()));
                },
                color: Colors.blue,
              ),
              FlatButton(
                child: Text("Guardar"),
                onPressed: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => SaveScreen()));
                },
                color: Colors.blue,
              ),
              FlatButton(
                child: Text("Buscar"),
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => SearchUsuarioScreen()));
                },
                color: Colors.blue,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
