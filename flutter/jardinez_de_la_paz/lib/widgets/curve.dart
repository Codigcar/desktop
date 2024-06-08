
import 'package:flutter/material.dart';


class ShapesPainter extends CustomPainter {
  final Color color;
  final double curveHeight;

  ShapesPainter({super.repaint, required this.color, this.curveHeight = 85});

  @override
  void paint(Canvas canvas, Size size) {
    final p = Path();
    p.lineTo(0, size.height - curveHeight);
    p.relativeQuadraticBezierTo(
        size.width / 2, 2 * curveHeight, size.width, 0);
    p.lineTo(size.width, 0);
    p.close();

    canvas.drawPath(p, Paint()..color = color);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}