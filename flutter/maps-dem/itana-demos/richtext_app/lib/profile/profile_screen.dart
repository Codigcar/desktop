import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Color colorLink = Colors.black;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(30.0),
            child: Column(
              children: <Widget>[
                
                RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                    style: TextStyle(color: Colors.black, fontSize: 15,),
                    children: <TextSpan>[
                      TextSpan(text: 'RichText', style: TextStyle(color: Colors.blue, fontSize: 30,)),
                    ]
                  ),
                ),

                RichText(
                  textAlign: TextAlign.start,
                  text: TextSpan(
                    style: TextStyle(color: Colors.black, fontSize: 15),
                    children: <TextSpan> [
                      TextSpan(text: '\n'),
                      TextSpan(text: 'El widget RichText muestra texto que usa varios estilos diferentes. ' +
                                     'El texto que se muestra se describe mediante un árbol de objetos TextSpan , cada uno de los cuales tiene un estilo asociado que se utiliza para ese subárbol.' + '\n\n',
                                     style: TextStyle(color: Colors.green, fontSize: 20)),
                      TextSpan(text: 'El texto puede dividirse en varias líneas o puede mostrarse todo en la misma línea según las restricciones de diseño.\n\n'),
                      TextSpan(
                        style: TextStyle(color: Colors.orange, fontSize: 15),
                        children: <TextSpan> [
                          TextSpan(text: 'Link '),
                          TextSpan(text: 'de la pagina de Flutter: \n\n')
                        ]
                      ),
                      
                      TextSpan(
                        text: 'https://api.flutter.dev/flutter/widgets/RichText-class.html' + '\n\n',
                        style: TextStyle(color: colorLink, fontSize: 15),
                        recognizer: TapGestureRecognizer()..onTap = () {
                          ( colorLink != Colors.blue ) ? colorLink = Colors.blue : colorLink = Colors.black ;
                          setState(() {
                            colorLink = colorLink;
                          });
                        },
                      ),

                    ]
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}