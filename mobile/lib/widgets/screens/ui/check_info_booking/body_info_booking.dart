import 'package:booking_platform_app/data/property_detail.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../data/cart.dart';
import '../../../../providers/search.dart';
import '../../../../utils/calculate.dart';
import '../../../../utils/format.dart';
import '../property_detail/carousel_detail_product.dart';

class BodyInfoBooking extends StatelessWidget {
  final PropertyDetail property;
  final List<RoomCart> roomCarts;

  const BodyInfoBooking({
    super.key,
    required this.property,
    required this.roomCarts,
  });

  @override
  Widget build(BuildContext context) {
    final searchParams =
        Provider.of<Search>(context, listen: true).searchParams;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CarouselDetailProduct(images: property.pictures, current: 0),
        Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        property.name,
                        textAlign: TextAlign.left,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 10),
                        padding: const EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: [
                                        const Icon(
                                          Icons.star,
                                          color: Color(0xFFF43F5E),
                                          size: 12,
                                        ),
                                        const SizedBox(
                                          width: 3,
                                        ),
                                        Text(
                                          formatNumber(property.avgRating),
                                          style: const TextStyle(
                                            fontSize: 13,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ]),
                                ),
                                IconButton(
                                    style: ButtonStyle(
                                      overlayColor: WidgetStateProperty.all(
                                          Colors.transparent),
                                      // Xóa hiệu ứng khi nhấn
                                      splashFactory: NoSplash.splashFactory,
                                      // Xóa hiệu ứng splash
                                      backgroundColor: WidgetStateProperty.all(
                                          Colors
                                              .transparent), // Xóa màu nền nếu có
                                    ),
                                    onPressed: () => {},
                                    icon: const Icon(Icons.arrow_forward,
                                        color: Colors.black, size: 15))
                              ],
                            ),
                            const Text("Very Good",
                                style: TextStyle(
                                  fontSize: 13,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                )),
                            const Text("from 9 verified guests reviews.",
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Color(0xFF7B7B7B),
                                )),
                          ],
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 10),
                        padding: const EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text("Location",
                                    style: TextStyle(
                                      fontSize: 13,
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold,
                                    )),
                                IconButton(
                                    style: ButtonStyle(
                                      overlayColor: WidgetStateProperty.all(
                                          Colors.transparent),
                                      // Xóa hiệu ứng khi nhấn
                                      splashFactory: NoSplash.splashFactory,
                                      // Xóa hiệu ứng splash
                                      backgroundColor: WidgetStateProperty.all(
                                          Colors
                                              .transparent), // Xóa màu nền nếu có
                                    ),
                                    onPressed: () => {},
                                    icon: const Icon(Icons.arrow_forward,
                                        color: Colors.black, size: 15))
                              ],
                            ),
                            Text(
                                "${property.province}, ${property.district}, ${property.addressSpecific}",
                                style: const TextStyle(
                                  fontSize: 10,
                                  color: Colors.black,
                                  fontWeight: FontWeight.w400,
                                )),
                          ],
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 20, bottom: 20),
                        width: double.infinity,
                        height: 1,
                        color: Colors.grey.shade300,
                      ),
                      const Text("Reservation details",
                          style: TextStyle(
                            fontSize: 13,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                          )),
                      Container(
                        margin: const EdgeInsets.only(top: 10),
                        padding: const EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            SizedBox(
                              width: double.infinity,
                              child: Wrap(
                                alignment: WrapAlignment.spaceBetween,
                                children: [
                                  const Text("Check-in",
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                      )),
                                  Text(formatDate(searchParams?.from ?? ''),
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: Colors.black,
                                        fontWeight: FontWeight.w400,
                                      )),
                                ],
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            SizedBox(
                              width: double.infinity,
                              child: Wrap(
                                alignment: WrapAlignment.spaceBetween,
                                children: [
                                  const Text("Check-out",
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                      )),
                                  Text(formatDate(searchParams?.to ?? ''),
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: Colors.black,
                                        fontWeight: FontWeight.w400,
                                      )),
                                ],
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text("Guests",
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold,
                                    )),
                                Text(
                                    "${searchParams?.adults ?? 0} adults ${(searchParams?.children == 0) ? "" : ", children"}",
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w400,
                                    )),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const Text("Your selection",
                          style: TextStyle(
                            fontSize: 13,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                          )),
                      Container(
                        margin: const EdgeInsets.only(top: 10),
                        padding: const EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          color: Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            const Text("Rooms selection summary:",
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                )),
                            SizedBox(
                              width: double.infinity,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: roomCarts.map((roomCart) {
                                  return Container(
                                    width: double.infinity,
                                    padding: const EdgeInsets.all(15),
                                    child: Wrap(
                                      alignment: WrapAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          "X ${roomCart.quantity} ${roomCart.room.name}",
                                          style: const TextStyle(
                                            fontSize: 12,
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          "for \$ ${formatNumber(roomCart.room.price)} per night",
                                          style: const TextStyle(
                                            fontSize: 12,
                                            color: Colors.black,
                                            fontWeight: FontWeight.w400,
                                          ),
                                        ),
                                      ],
                                    ),
                                  );
                                }).toList(),
                              ),
                            )
                          ],
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 20, bottom: 20),
                        width: double.infinity,
                        height: 1,
                        color: Colors.grey.shade300,
                      ),
                      SizedBox(
                        width: double.infinity,
                        child: Wrap(
                          alignment: WrapAlignment.spaceBetween,
                          children: [
                            const Text("Total price",
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                )),
                            Text(
                              "\$ ${formatNumber(calculateTotalPrice(roomCarts, parseDate(searchParams!.from), parseDate(searchParams.to)))}",
                              style: const TextStyle(
                                fontSize: 16,
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        )
      ],
    );
  }
}
