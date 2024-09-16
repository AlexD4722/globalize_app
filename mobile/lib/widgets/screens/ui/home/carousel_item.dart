import 'package:flutter/material.dart';
import 'package:infinite_carousel/infinite_carousel.dart';

import '../../../../presentation/common/card_item.dart';

class CarouselItem extends StatefulWidget {
  const CarouselItem({Key? key}) : super(key: key);

  @override
  State<CarouselItem> createState() => _CarouselItemState();
}

class _CarouselItemState extends State<CarouselItem> {
  final List<Map<String, dynamic>> cardData = [
    {
      'image':
      'https://s3-alpha-sig.figma.com/img/69cd/1158/1c64bfe37f0f80e2249f463ba3988a78?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oLnjWEw9LabafTod0-cTm5f3ej2XQoPx2hVF6AoKLvasPBgnkceF0GKuUoWshYSUv8TihYJDEaTkCBLTYIdDfThfv-gkKCb6yJBRqxVuMGRJbwLdJQGwo48pa-S1J7iJ-ILVFPzz4U3CtTrm66~OKcdbSXGMAbZhZfGeGjWEyzOwgmjH42xioK-h6GrWGwtXj03HcsWZBcXO9ThgQz~bhXNS1Bzm8-sZWFgXVTgLtLqVTja1VUSxjEQaUYwwqAiXBIvsWLCpTaJk0tistizjoxaqbpEXiFKcSmHhYGRW81cbtB8qVybUcFUGIsJaopsnGl1FxWgP7ahwcwUE0kkVQA__',
      'title': 'Title 1',
      'address': 'Address 1',
      'money': 100.0,
      'rating': 4.5,
    },
    {
      'image':
      'https://s3-alpha-sig.figma.com/img/69cd/1158/1c64bfe37f0f80e2249f463ba3988a78?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oLnjWEw9LabafTod0-cTm5f3ej2XQoPx2hVF6AoKLvasPBgnkceF0GKuUoWshYSUv8TihYJDEaTkCBLTYIdDfThfv-gkKCb6yJBRqxVuMGRJbwLdJQGwo48pa-S1J7iJ-ILVFPzz4U3CtTrm66~OKcdbSXGMAbZhZfGeGjWEyzOwgmjH42xioK-h6GrWGwtXj03HcsWZBcXO9ThgQz~bhXNS1Bzm8-sZWFgXVTgLtLqVTja1VUSxjEQaUYwwqAiXBIvsWLCpTaJk0tistizjoxaqbpEXiFKcSmHhYGRW81cbtB8qVybUcFUGIsJaopsnGl1FxWgP7ahwcwUE0kkVQA__',
      'title': 'Title 2',
      'address': 'Address 2',
      'money': 200.0,
      'rating': 4.0,
    },
    // Add more card data as needed
  ];

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery
        .of(context)
        .size
        .width;
    final itemExtent = screenWidth * 0.899999999;
    return SizedBox(
      height: 300, // Ensure a fixed height for the carousel
      child: InfiniteCarousel.builder(
        itemCount: cardData.length,
        itemExtent: itemExtent,
        loop: false,
        itemBuilder: (context, index, realIndex) {
          final data = cardData[index];
          return CardItem(
            image: data['image'],
            title: data['title'],
            address: data['address'],
            money: data['money'],
            rating: data['rating'],
          );
        },
      ),
    );
  }
}
