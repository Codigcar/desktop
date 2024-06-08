import 'package:authentication/model/usuario.dart';
import 'package:authentication/screens/view_usuario_screen.dart';
import 'package:authentication/services/usuario_service.dart';
import 'package:flutter/material.dart';

class ListScreen extends StatelessWidget {
  UsuarioService usuarioService = UsuarioService();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Usuarios'),
      ),
      body: Center(
        child: FutureBuilder<List<Usuario>>(
          future: usuarioService.get(),
          builder:
              (BuildContext context, AsyncSnapshot<List<Usuario>> snapshot) {
            if (snapshot.hasError) {
              return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Icon(
                      Icons.error_outline,
                      color: Colors.red,
                      size: 60,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 16),
                      child: Text('Error: ${snapshot.error}'),
                    )
                  ]);
            }
            switch (snapshot.connectionState) {
              case ConnectionState.waiting:
                return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      SizedBox(
                        child: CircularProgressIndicator(),
                        width: 60,
                        height: 60,
                      ),
                      const Padding(
                        padding: EdgeInsets.only(top: 16),
                        child: Text('Awaiting result...'),
                      )
                    ]);
              default:
                final usuarios = snapshot.data;
                return ListView.builder(
                  itemCount: usuarios.length,
                  itemBuilder: (BuildContext context, int index) {
                    return ListTile(
                      leading: CircleAvatar(
                        radius: 25,
                        backgroundImage: NetworkImage(usuarios[index]
                                .avatarUrl ??
                            'https://www.vhv.rs/dpng/d/138-1383989_default-svg-icon-free-avatar-png-transparent-png.png'),
                      ),
                      title: Text(usuarios[index].nombres +
                          ' ' +
                          usuarios[index].apellidos),
                      subtitle: Text(usuarios[index].email),
                      onTap: () {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => ViewUsuarioScreen(
                                  usuario: usuarios[index],
                                )));
                      },
                    );
                  },
                );
            }
          },
        ),
      ),
    );
  }
}
