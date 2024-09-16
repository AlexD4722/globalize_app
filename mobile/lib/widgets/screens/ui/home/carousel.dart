import 'package:flutter/material.dart';

import '../../../../presentation/common/card_destination.dart';

class Carousel extends StatefulWidget {
  const Carousel({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<Carousel> createState() => _CarouselState();
}

class _CarouselState extends State<Carousel> {
  late String _title;

  final List<Map<String, dynamic>> cardData = [
    {
      'image':
          "lib/assets/images/julian.jpg",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
          "lib/assets/images/julian.jpg",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
          "lib/assets/images/julian.jpg",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
          "lib/assets/images/julian.jpg",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
          "lib/assets/images/julian.jpg",
      'title': "Da Nang, Vietnam",
    },
    // Add more card data as needed
  ];

  @override
  void initState() {
    super.initState();
    _title = widget.title;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(right: 0, bottom: 10.0),
            // Add bottom margin
            child: Text(
              _title,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
              softWrap: true,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          SizedBox(
            height: 300,
            width: double.infinity,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: cardData.length,
              itemBuilder: (context, index) {
                // Check if data is not null
                return Padding(
                  padding: const EdgeInsets.only(right: 10.0),
                  // Add spacing between items
                  child: SizedBox(
                    width: 250, // Ensure each card has a fixed width
                    child: CardDestination(
                      image: cardData[index]['image'],
                      title: cardData[index]['title'],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
