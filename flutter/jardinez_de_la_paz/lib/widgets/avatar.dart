import 'package:flutter/material.dart';

class CustomAvatar extends StatelessWidget {
  final String title;
  final IconData iconName;
  final void Function()? onTap;

  const CustomAvatar({
    super.key,
    required this.title,
    required this.iconName,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final colorTheme = Theme.of(context).colorScheme;
    final textStylesTheme = Theme.of(context).textTheme;

    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: colorTheme.primary,
              borderRadius: BorderRadius.circular(100.0),
            ),
            child: Padding(
              padding: const EdgeInsets.all(15),
              child: Icon(
                // Icons.person_outlined,
                iconName,
                color: Colors.white,
                size: 60,
              ),
            ),
          ),
          const SizedBox(height: 5),
          Text(
            title,
            style: textStylesTheme.bodyLarge?.copyWith(
              color: colorTheme.primary,
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}
