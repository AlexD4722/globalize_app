import 'package:booking_platform_app/data/item_reservation.dart';
import 'package:flutter/material.dart';

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

  @override
  Widget build(BuildContext context) {
    final ItemReservation _item = item;

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
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _item.name,
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                              overflow: TextOverflow.ellipsis,
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
                                _item.price,
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
                      )
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