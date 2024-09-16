import 'package:flutter/material.dart';
import '../../../../data/property_detail.dart';
import '../../../../utils/format.dart';

class InformationProperty extends StatelessWidget {
  final PropertyDetail  property;
  const InformationProperty({super.key,  required this.property});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // this is price
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text("Price/room/night starts from",
                              style: TextStyle(
                                  fontSize: 10, color: Color(0xFF7B7B7B)),
                              textAlign: TextAlign.left),
                          Padding(
                            padding:
                            const EdgeInsets.only(top: 5, bottom: 5),
                            child: Row(
                              children: [
                                const Icon(
                                  Icons.attach_money,
                                  color: Colors.black,
                                  size: 18,
                                ),
                                Text(
                                  formatNumber(property.minPrice),
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          )
                        ])),
                TextButton(
                  onPressed: () {},
                  style: ButtonStyle(
                    side: WidgetStateProperty.all<BorderSide>(
                      const BorderSide(color: Color(0xFFF43F5E), width: 1),
                    ),
                    shape: WidgetStateProperty.all<
                        RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    backgroundColor: WidgetStateProperty.all<Color>(
                        Colors.transparent),
                    overlayColor: WidgetStateProperty.all<Color>(
                        const Color(0xFFF43F5E).withOpacity(0.1)),
                    padding: WidgetStateProperty.all<EdgeInsets>(
                        const EdgeInsets.only(
                            left: 15, top: 7, right: 15, bottom: 7)),
                  ),
                  child: const Text(
                    "Reserve",
                    style: TextStyle(
                      fontSize: 12,
                      color: Color(0xFF000000),
                    ),
                  ),
                )
              ],
            ),
            //this is button move screen review
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
                                "${double.parse(property.avgRating.toStringAsFixed(1))}",
                                style: const TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ]),
                      ),
                      IconButton(
                          style: ButtonStyle(
                            overlayColor: WidgetStateProperty.all(Colors.transparent), // Xóa hiệu ứng khi nhấn
                            splashFactory: NoSplash.splashFactory, // Xóa hiệu ứng splash
                            backgroundColor: WidgetStateProperty.all(Colors.transparent), // Xóa màu nền nếu có
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
                            overlayColor: WidgetStateProperty.all(Colors.transparent),
                            splashFactory: NoSplash.splashFactory,
                            backgroundColor: WidgetStateProperty.all(Colors.transparent),
                          ),
                          onPressed: () => {},
                          icon: const Icon(Icons.arrow_forward,
                              color: Colors.black, size: 15))

                    ],
                  ),
                  Text('${property.province}, ${property.district}, ${property.addressSpecific}',
                      style: const TextStyle(
                        fontSize: 10,
                        color: Colors.black,
                        fontWeight: FontWeight.w400,
                      )),
                ],
              ),
            ),
            //this is button move screen location
          ],
        ),
      ),
    );
  }


}