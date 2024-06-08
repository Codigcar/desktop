import 'package:authentication/model/usuario.dart';
import 'package:authentication/services/usuario_service.dart';
import 'package:authentication/utils/utils.dart';
import 'package:flutter/material.dart';

class SearchUsuarioScreen extends StatefulWidget {
  @override
  _SearchUsuarioScreenState createState() => _SearchUsuarioScreenState();
}

class _SearchUsuarioScreenState extends State<SearchUsuarioScreen> {
  UsuarioService usuarioService = UsuarioService();
  String nombre = '';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Buscar Usuario'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.all(10.0),
              child: TextField(
                decoration: kTextFieldDecoration.copyWith(labelText: 'Nombre'),
                onChanged: (value) {
                  setState(() => nombre = value);
                },
              ),
            ),
            SizedBox(
              height: 15.0,
            ),
            nombre.length > 0
                ? Expanded(
                    child: StreamBuilder<List<Usuario>>(
                      stream: usuarioService.getByNombres(nombre),
                      builder: (BuildContext context,
                          AsyncSnapshot<List<Usuario>> snapshot) {
                        if (snapshot.hasError)
                          return new Text('Error: ${snapshot.error}');
                        switch (snapshot.connectionState) {
                          case ConnectionState.waiting:
                            return new Text('Cargando...');
                          default:
                            final usuarios = snapshot.data;
                            return ListView.builder(
                              itemCount: usuarios.length,
                              itemBuilder: (BuildContext context, int index) {
                                return ListTile(
                                  leading: CircleAvatar(
                                    radius: 25,
                                    backgroundImage: NetworkImage(usuarios[
                                                index]
                                            .avatarUrl ??
                                        'https://www.vhv.rs/dpng/d/138-1383989_default-svg-icon-free-avatar-png-transparent-png.png'),
                                  ),
                                  title: Text(usuarios[index].nombres +
                                      ' ' +
                                      usuarios[index].apellidos),
                                  subtitle: Text(usuarios[index].email),
                                );
                              },
                            );
                            ;
                        }
                      },
                    ),
                  )
                : Text('Campo Vacio'),
          ],
        ),
      ),
    );
  }
}
