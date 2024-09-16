import 'package:booking_platform_app/widgets/components/reservation/reservation_table.dart';
import 'package:flutter/material.dart';

class ReservationScreen extends StatelessWidget {
  const ReservationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.topCenter,
      child: const ReservationTable(),
    );
  }
}
