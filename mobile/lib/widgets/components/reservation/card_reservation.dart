import 'package:flutter/material.dart';

import '../../../booking_page.dart';
import '../../../data/item_reservation.dart';
import '../../../services/http.dart';

class CardReservation extends StatelessWidget {
  final ItemReservation item;

  const CardReservation({
    super.key,
    required this.item,
  });

  double roundToOneDecimal(double rating) {
    return double.parse(rating.toStringAsFixed(1));
  }

  Future<void> _showConfirmationDialog(BuildContext context) async {
    final bool? confirmed = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          title: const Text(
            'Confirm',
            style: TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontSize: 18,
            ),
          ),
          content: const Text(
            'Are you sure you want to cancel this reservation?',
            style: TextStyle(
              color: Colors.black54,
              fontSize: 14,
            ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(false);
              },
              child: const Text(
                'No',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(true);
              },
              child: const Text(
                'Yes',
                style: TextStyle(
                  color: Color(0xFFF43F5E),
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        );
      },
    );

    if (confirmed == true) {
      await _cancelReservation(context);
    }
  }

  Future<void> _showMessageDialog(BuildContext context, String title, String content) async {
    await showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          title: Text(
            title,
            style: const TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontSize: 18,
            ),
          ),
          content: Text(
            content,
            style: TextStyle(
              color: Colors.black54,
              fontSize: 14,
            ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const BookingPage()),
                );
              },
              child: const Text(
                'OK',
                style: TextStyle(
                  color: Colors.green,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Future<void> _cancelReservation(BuildContext context) async {
    try {
      final response = await DataClient.requestCancelReservation(item.id);
      if (response.statusCode == 204) {
        // Handle successful cancellation
        await _showMessageDialog(context, "Success", "Reservation has been cancelled");
      } else {
        // Handle failed cancellation
        await _showMessageDialog(context, "Error", "Failed to cancel reservation");
      }
    } catch (e) {
      print('Error: $e');
    }
  }
  int calculateTotalDays(String dateCheckIn, String dateCheckOut) {
    final checkInDate = DateTime.parse(dateCheckIn);
    final checkOutDate = DateTime.parse(dateCheckOut);
    return checkOutDate.difference(checkInDate).inDays;
  }
  double calculateTotalPrice(double pricePerNight, int totalDays) {
    return pricePerNight * totalDays;
  }
  @override
  Widget build(BuildContext context) {
    final ItemReservation _item = item;
    final int totalDays = calculateTotalDays(_item.dateCheckIn, _item.dateCheckOut);
    final double totalPrice = calculateTotalPrice(double.parse(_item.price), totalDays);
    return SizedBox(
      width: double.infinity,
      height: 150,
      child: Card(
        color: Colors.white,
        elevation: 0,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 80,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(5),
                ),
                clipBehavior: Clip.hardEdge,
                child: AspectRatio(
                  aspectRatio: 3 / 7,
                  child: Image.network(
                    '${DataClient.javaClientUrl}/${_item.image}',
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return const Icon(Icons.error);
                    },
                  ),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Flexible(
                                  child: Text(
                                    _item.name,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                                const SizedBox(
                                  width: 20,
                                ),
                              ],
                            ),
                            const SizedBox(height: 5),
                            Row(
                              children: [
                                const Icon(
                                  Icons.person,
                                  size: 10,
                                  color: Color(0xFFF43F5E),
                                ),
                                const SizedBox(width: 5),
                                Expanded(
                                  child: Text(
                                    'Capacity: ${_item.capacity}',
                                    style: const TextStyle(
                                      fontSize: 10,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w300,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 5),
                            Wrap(
                              spacing: 20,
                              runSpacing: 4.0,
                              children: [
                                Row(
                                  children: [
                                    const Icon(
                                      Icons.calendar_month_outlined,
                                      size: 10,
                                      color: Color(0xFFF43F5E),
                                    ),
                                    const SizedBox(width: 5),
                                    Flexible(
                                      child: Text(
                                        '${_item.dateCheckIn} - ${_item.dateCheckOut}',
                                        style: const TextStyle(
                                          fontSize: 10,
                                          color: Colors.black,
                                          fontWeight: FontWeight.w300,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                )
                              ],
                            )
                          ],
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              const Icon(
                                Icons.attach_money,
                                size: 12,
                                color: Color(0xFFF43F5E),
                              ),
                              const SizedBox(width: 5),
                              Text(
                                totalPrice.toStringAsFixed(2),
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                              const SizedBox(width: 3),
                              const Text(
                                'per night',
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w400,
                                  color: Colors.grey,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),

                      if (_item.status == 'ACTIVE')
                        InkWell(
                          onTap: () => _showConfirmationDialog(context),
                          child: Container(
                            margin: const EdgeInsets.only(top: 10),
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(5),
                              color: const Color(0xFFFFC75D),
                            ),
                            child: const Text(
                              "Cancellation request",
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
