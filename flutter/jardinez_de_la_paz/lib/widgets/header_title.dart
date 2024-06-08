import 'package:flutter/material.dart';

class HeaderTitle extends StatelessWidget {
  final String title;
  final IconData iconName;
  const HeaderTitle({super.key, required this.title, required this.iconName});

  @override
  Widget build(BuildContext context) {
    final textStylesTheme = Theme.of(context).textTheme;

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
         Icon(
          iconName,
          color: Colors.white,
          size: 50,
        ),
        Text(
          title,
          style: textStylesTheme.titleLarge?.copyWith(color: Colors.white),
        )
      ],
    );
  }
}
