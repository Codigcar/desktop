import 'package:flutter/material.dart';

class CustomProgressIndicator extends StatelessWidget {
  final double imageSide;
  final double strokeWidth;
  final Color backgroundColor;
  final double opacity;

  const CustomProgressIndicator(
      {Key? key,
      this.imageSide = 20.0,
      this.strokeWidth = 5.0,
      this.backgroundColor = Colors.white,
      this.opacity = 0.5})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: double.infinity,
      width: double.infinity,
      color: Theme.of(context).scaffoldBackgroundColor.withOpacity(opacity),
      child: Center(
        child: Stack(
          alignment: Alignment.center,
          children: [
            CircularProgressIndicator(
              color: Theme.of(context).primaryColor,
              strokeWidth: strokeWidth,
            ),
          ],
        ),
      ),
    );
  }
}
