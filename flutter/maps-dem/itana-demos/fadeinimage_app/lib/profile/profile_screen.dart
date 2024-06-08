import 'package:fadeinimage_app/utils/constants.dart';
import 'package:flutter/material.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(30.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    FadeInImage(
                      image: NetworkImage('https://www.jetbluevtc.com/images/team-member/avatar7.png'),
                      placeholder: AssetImage(kDefaultAvatarPath),
                      height: 150.0,
                      width: 150.0,
                      fadeInDuration: Duration(seconds: 5), //imagen
                      fadeInCurve: Curves.decelerate,
                      fadeOutDuration: Duration(seconds: 1), //placeholder
                      fadeOutCurve: Curves.bounceInOut,
                    ),
                    FadeInImage(
                      image: NetworkImage('https://www.jetbluevtc.com/images/team-member/avatar7.png'),
                      placeholder: AssetImage(kLoad1Path),
                      height: 150.0,
                      width: 150.0,
                      fadeInDuration: Duration(seconds: 1),
                      fadeInCurve: Curves.easeInOutQuint,
                      fadeOutDuration: Duration(seconds: 5),
                      fadeOutCurve: Curves.slowMiddle,
                    ),
                  ],
                ),
                Row(
                  children: <Widget>[
                    FadeInImage(
                      image: NetworkImage('https://www.jetbluevtc.com/images/team-member/avatar7.png'),
                      placeholder: AssetImage(kLoad5Path),
                      height: 150.0,
                      width: 150.0,
                      fadeInDuration: Duration(seconds: 10),
                      fadeInCurve: Curves.fastOutSlowIn,
                      fadeOutDuration: Duration(seconds: 7),
                      fadeOutCurve: Curves.easeInBack,
                    ),
                    FadeInImage(
                      image: NetworkImage('https://www.jetbluevtc.com/images/team-member/avatar7.png'),
                      placeholder: AssetImage(kLoad3Path),
                      height: 150.0,
                      width: 150.0,
                      fadeInDuration: Duration(seconds: 5),
                      fadeOutDuration: Duration(seconds: 10),
                    )
                  ],
                ),
                Row(
                  children: <Widget>[
                    FadeInImage(
                      image: NetworkImage('https://www.jetbluevtc.com/images/team-member/avatar7.png'),
                      placeholder: AssetImage(kLoad4Path),
                      height: 150.0,
                      width: 150.0,
                      fadeInDuration: Duration(seconds: 5),
                      fadeOutDuration: Duration(seconds: 15),
                    ),
                    FadeInImage(
                      image: NetworkImage('https://www.jetbluevtc.com/images/team-member/avatar7.png'),
                      placeholder: AssetImage(kLoad2Path),
                      height: 150.0,
                      width: 150.0,
                      fadeInDuration: Duration(seconds: 2),
                      fadeOutDuration: Duration(seconds: 15),
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}