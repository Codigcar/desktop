import 'package:appbar_app/components/rounded_text_field.dart';
import 'package:flutter/material.dart';

class PerfilScreen extends StatefulWidget {
  static const String id = 'perfil_screen';
  @override
  _PerfilScreenState createState() => _PerfilScreenState();
}

class _PerfilScreenState extends State<PerfilScreen> {
  bool buscador = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: (buscador) ? Colors.grey[300] : Colors.blue[300],
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white, opacity: 0.5),
        backgroundColor: Colors.green,
        title: Text(
          'Perfil',
          style: TextStyle(
            fontSize: 25,
            fontWeight: FontWeight.normal,
          ),
        ),
        centerTitle: true,
        elevation: 5,
        leading: Icon(Icons.star, color: Colors.yellow),
        toolbarHeight: 70,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(50),
            bottomRight: Radius.circular(50),
          ),
        ),
        actions: [
          GestureDetector(
            onTap: () {
              setState(() {
                buscador = !buscador;
              });
            },
            child: Icon(Icons.search),
          ),
          PopupMenuButton<String>(
            elevation: 1,
            color: Colors.green[100],
            onSelected: selectMenuItem,
            itemBuilder: (context) => [
              menuItem(value: 'Opcion 1', icon: Icons.picture_as_pdf),
              menuItem(value: 'Opcion 2', icon: Icons.save_alt),
              menuItem(value: 'Opcion 3', icon: Icons.list)
            ],
          )
        ],
      ),
      body: Container(
        color: Colors.blue[300],
        child: Column(
          children: [
            (buscador)
                ? Container(
                    height: 60,
                    decoration: BoxDecoration(
                      color: Colors.grey[300],
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(50),
                        bottomRight: Radius.circular(50),
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 50,
                        vertical: 10,
                      ),
                      child: RoundedTextField(
                        borderColor: Colors.grey,
                        text: 'Buscar',
                        borderRadius: 20,
                        inputType: TextInputType.text,
                        obscureText: false,
                      ),
                    ),
                  )
                : Container(
                    child: null,
                  ),
          ],
        ),
      ),
    );
  }

  PopupMenuItem<String> menuItem({String value, IconData icon}) {
    return PopupMenuItem(
      height: 30,
      textStyle: TextStyle(color: Colors.blue),
      value: value,
      child: Container(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: Colors.green),
            Text(value, style: TextStyle(color: Colors.blueGrey, fontSize: 13)),
          ],
        ),
      ),
    );
  }

  void selectMenuItem(String value) {
    switch (value) {
      case 'Opcion 1':
        break;
    }
  }
}
