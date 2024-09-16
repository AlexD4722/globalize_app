import 'package:booking_platform_app/data/item_reservation.dart';
import 'package:booking_platform_app/widgets/components/reservation/card_reservation.dart';
import 'package:flutter/material.dart';

class ReservationActive extends StatelessWidget {
  final Future<List<ItemReservation>> items;

  const ReservationActive({super.key, required this.items});


  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: FutureBuilder<List<ItemReservation>>(
        future: items,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No items found'));
          } else {
            return SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 10, bottom: 10),
                    child: Text(
                      'Result: ${snapshot.data!.length} item',
                      style: const TextStyle(fontSize: 12),
                    ),
                  ),
                  ...snapshot.data!
                      .map((item) => CardReservation(item: item))
                      .toList(),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}
