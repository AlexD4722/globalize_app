import 'package:flutter/material.dart';

class AppBarSearch extends StatelessWidget {
  const AppBarSearch({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'Globalize',
        style: TextStyle(
          fontSize: 20,
          color: Color(0xFFFFFFFF),
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
