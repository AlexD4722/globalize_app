import 'package:flutter/material.dart';

class AppBarReservation extends StatelessWidget {
  const AppBarReservation({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.topLeft,
      child: const Text(
        'Trips',
        style: TextStyle(
          fontSize: 14,
          color: Color(0xFFFFFFFF),
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
