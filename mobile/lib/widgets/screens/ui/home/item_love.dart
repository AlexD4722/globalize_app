import 'package:flutter/material.dart';

import '../../../../presentation/common/card_item.dart';

class ItemLove extends StatefulWidget {
  const ItemLove({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<ItemLove> createState() => _ItemLoveState();
}

class _ItemLoveState extends State<ItemLove> {
  late String _title;

  final List<Map<String, dynamic>> cardData = [
    {
      'image': "lib/assets/images/julian.jpg",
      'title': "Room in Paris",
      'address': "Paris, France",
      'money': 100.0,
      'rating': 4.5
    },
    {
      'image': "lib/assets/images/julian.jpg",
      'title': "Room in Paris",
      'address': "Paris, France",
      'money': 100.0,
      'rating': 4.5
    },
    {
      'image': "lib/assets/images/julian.jpg",
      'title': "Room in Paris",
      'address': "Paris, France",
      'money': 100.0,
      'rating': 4.5
    },
    {
      'image': "lib/assets/images/julian.jpg",
      'title': "Room in Paris",
      'address': "Paris, France",
      'money': 100.0,
      'rating': 4.5
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
            padding: const EdgeInsets.only(bottom: 10.0),
            // Add bottom margin
            child: Text(
              _title,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
              softWrap: true,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          SizedBox(
            height: 350,
            width: double.infinity,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: cardData.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(right: 10),
                  // Add spacing between items
                  child: SizedBox(
                    width: 250, // Ensure each card has a fixed width
                    child: CardItem(
                      image: cardData[index]['image'],
                      title: cardData[index]['title'],
                      address: cardData[index]['address'],
                      money: cardData[index]['money'],
                      rating: cardData[index]['rating'],
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
