import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../data/item_search.dart';
import '../../services/http.dart';
import '../../widgets/screens/property_detail_screen.dart';
import '../../widgets/screens/search_results_screen.dart';

class CardItemSearch extends StatefulWidget {
  const CardItemSearch({
    super.key,
    required this.item,
  });

  final ItemSearch item;

  @override
  _CardItemSearchState createState() => _CardItemSearchState();
}

class _CardItemSearchState extends State<CardItemSearch> {
  double roundToOneDecimal(double rating) {
    return double.parse(rating.toStringAsFixed(1));
  }
  String getRatingLabel(double rating) {
    if (rating > 9) {
      return 'Excellent: 9+';
    } else if (rating > 8) {
      return 'Very good: 8+';
    } else if (rating > 7) {
      return 'Good: 7+';
    } else if (rating > 6) {
      return 'Pleasant: 6+';
    } else {
      return 'Pleasant: 6-';
    }
  }

  late ItemSearch _item;

  @override
  void initState() {
    super.initState();
    _item = widget.item;
  }

  @override
  Widget build(BuildContext context) {

    return GestureDetector(
        onTap: () {
          Navigator.of(context).push(
            PageRouteBuilder(
              pageBuilder: (context, animation, secondaryAnimation) =>
              PropertyDetailScreen(id: _item.id),
              transitionsBuilder: (context, animation, secondaryAnimation, child) {
                const begin = Offset(1.0, 0.0);
                const end = Offset.zero;
                const curve = Curves.ease;

                var tween =
                Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
                var offsetAnimation = animation.drive(tween);

                return SlideTransition(
                  position: offsetAnimation,
                  child: child,
                );
              },
            ),
          );
          // Navigator.push(
          //   context,
          //   MaterialPageRoute(
          //     builder: (context) => ProductDetailScreen(),
          //   ),
          // );
        },
        child: SizedBox(
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
                    // Ensure the container has a height
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
                                    _item.title,
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
                                        Icons.location_on,
                                        size: 10,
                                        color: Color(0xFFF43F5E),
                                      ),
                                      const SizedBox(width: 5),
                                      Expanded(
                                          child: Text(
                                            _item.address,
                                            style: const TextStyle(
                                              fontSize: 10,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w300,
                                            ),
                                            overflow: TextOverflow.ellipsis,
                                          )),
                                    ],
                                  ),
                                  const SizedBox(height: 5),
                                  Wrap(
                                    spacing: 20, // Add spacing between the children
                                    runSpacing: 4.0, // Add spacing between the lines
                                    children: [
                                      Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          const Icon(
                                            Icons.star,
                                            size: 10,
                                            color: Color(0xFFF43F5E),
                                          ),
                                          const SizedBox(width: 5),
                                          Row(
                                            crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                            children: [
                                              Text(
                                                '${roundToOneDecimal(_item.rating)}',
                                                style: const TextStyle(
                                                  fontSize: 10,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                              const SizedBox(width: 3),
                                              Container(
                                                width: 1,
                                                height: 10,
                                                color: Colors.black,
                                              ),
                                              const SizedBox(width: 3),
                                              Text(
                                                getRatingLabel(_item.rating as double),
                                                style: const TextStyle(
                                                  fontSize: 10,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                      const Text(
                                        "Reviews",
                                        style: TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.w400,
                                          color: Colors.grey,
                                        ),
                                      ),
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
                                      '${_item.money}',
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
                        )),
                  ),
                ],
              ),
            ),
          ),
        )
      );
  }
}
