import 'package:authentication/model/usuario.dart';
import 'package:flutter/material.dart';

class ViewUsuarioScreen extends StatelessWidget {
  final Usuario usuario;
  ViewUsuarioScreen({this.usuario});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Ver Usuario'),
      ),
      body: Center(
        child: Column(
          children: [
            SizedBox(
              height: 50,
            ),
            CircleAvatar(
              radius: 70,
              backgroundImage: NetworkImage(usuario.avatarUrl ??
                  'https://www.vhv.rs/dpng/d/138-1383989_default-svg-icon-free-avatar-png-transparent-png.png'),
            ),
            Text(
              usuario.nombres + ' ' + usuario.apellidos,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text(usuario.email,
                style: TextStyle(fontSize: 13, color: Colors.black54))
          ],
        ),
      ),
    );
  }
}
