import 'package:booking_platform_app/presentation/common/card_destination.dart';
import 'package:flutter/material.dart';
import 'package:infinite_carousel/infinite_carousel.dart';

import '../../../../presentation/common/card_item.dart';

class Destination extends StatefulWidget {
  const Destination({super.key});

  @override
  State<Destination> createState() => _DestinationState();
}

class _DestinationState extends State<Destination> {
  final List<Map<String, dynamic>> cardData = [
    {
      'image':
      "https://s3-alpha-sig.figma.com/img/87b8/2fd0/9bd407ad11a96b3296e4e96712aed7cc?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AhmrrTKmHqAj-t5I3v37Cq2Z6o4S1X2A~RaVFIxEHqV8bekJptiRma0S6dTOzQxDdW28zHyXBoCTH9tzWQUPwzjN0JCdFkXDql9cGSOsqclhLjQiYSrC0BCgPXTYEe2KDiusQkLj4rl2fjbZO1EdT18VCBQ-S9iMSEUE2~KTO2lf9ZpNo8OndwrMWFUT4bquNLPT-JznJsCESOqHGBWfIuZHYvAg1BJGx2bEnmGI~SDACSs4NZMUeaY9C03JKCYxvcvwbnQKDmVBv-FxvFn8mJpULi2NmBT~gdYEJ6uCRP7anibJL09ba~7ESoQN~M3hHp2RDuSwVKHYCSzOeybt3w__",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
      "https://s3-alpha-sig.figma.com/img/87b8/2fd0/9bd407ad11a96b3296e4e96712aed7cc?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AhmrrTKmHqAj-t5I3v37Cq2Z6o4S1X2A~RaVFIxEHqV8bekJptiRma0S6dTOzQxDdW28zHyXBoCTH9tzWQUPwzjN0JCdFkXDql9cGSOsqclhLjQiYSrC0BCgPXTYEe2KDiusQkLj4rl2fjbZO1EdT18VCBQ-S9iMSEUE2~KTO2lf9ZpNo8OndwrMWFUT4bquNLPT-JznJsCESOqHGBWfIuZHYvAg1BJGx2bEnmGI~SDACSs4NZMUeaY9C03JKCYxvcvwbnQKDmVBv-FxvFn8mJpULi2NmBT~gdYEJ6uCRP7anibJL09ba~7ESoQN~M3hHp2RDuSwVKHYCSzOeybt3w__",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
      "https://s3-alpha-sig.figma.com/img/87b8/2fd0/9bd407ad11a96b3296e4e96712aed7cc?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AhmrrTKmHqAj-t5I3v37Cq2Z6o4S1X2A~RaVFIxEHqV8bekJptiRma0S6dTOzQxDdW28zHyXBoCTH9tzWQUPwzjN0JCdFkXDql9cGSOsqclhLjQiYSrC0BCgPXTYEe2KDiusQkLj4rl2fjbZO1EdT18VCBQ-S9iMSEUE2~KTO2lf9ZpNo8OndwrMWFUT4bquNLPT-JznJsCESOqHGBWfIuZHYvAg1BJGx2bEnmGI~SDACSs4NZMUeaY9C03JKCYxvcvwbnQKDmVBv-FxvFn8mJpULi2NmBT~gdYEJ6uCRP7anibJL09ba~7ESoQN~M3hHp2RDuSwVKHYCSzOeybt3w__",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
      "https://s3-alpha-sig.figma.com/img/87b8/2fd0/9bd407ad11a96b3296e4e96712aed7cc?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AhmrrTKmHqAj-t5I3v37Cq2Z6o4S1X2A~RaVFIxEHqV8bekJptiRma0S6dTOzQxDdW28zHyXBoCTH9tzWQUPwzjN0JCdFkXDql9cGSOsqclhLjQiYSrC0BCgPXTYEe2KDiusQkLj4rl2fjbZO1EdT18VCBQ-S9iMSEUE2~KTO2lf9ZpNo8OndwrMWFUT4bquNLPT-JznJsCESOqHGBWfIuZHYvAg1BJGx2bEnmGI~SDACSs4NZMUeaY9C03JKCYxvcvwbnQKDmVBv-FxvFn8mJpULi2NmBT~gdYEJ6uCRP7anibJL09ba~7ESoQN~M3hHp2RDuSwVKHYCSzOeybt3w__",
      'title': "Da Nang, Vietnam",
    },
    {
      'image':
      "https://s3-alpha-sig.figma.com/img/87b8/2fd0/9bd407ad11a96b3296e4e96712aed7cc?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AhmrrTKmHqAj-t5I3v37Cq2Z6o4S1X2A~RaVFIxEHqV8bekJptiRma0S6dTOzQxDdW28zHyXBoCTH9tzWQUPwzjN0JCdFkXDql9cGSOsqclhLjQiYSrC0BCgPXTYEe2KDiusQkLj4rl2fjbZO1EdT18VCBQ-S9iMSEUE2~KTO2lf9ZpNo8OndwrMWFUT4bquNLPT-JznJsCESOqHGBWfIuZHYvAg1BJGx2bEnmGI~SDACSs4NZMUeaY9C03JKCYxvcvwbnQKDmVBv-FxvFn8mJpULi2NmBT~gdYEJ6uCRP7anibJL09ba~7ESoQN~M3hHp2RDuSwVKHYCSzOeybt3w__",
      'title': "Da Nang, Vietnam",
    },

    // Add more card data as needed
  ];

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery
        .of(context)
        .size
        .width;
    final itemExtent = screenWidth * 0.899999;
    return SizedBox(
      height: 500, // Ensure a fixed height for the carousel
      child: InfiniteCarousel.builder(
        itemCount: cardData.length,
        itemExtent: itemExtent,
        loop: false,
        itemBuilder: (context, index, realIndex) {
          final data = cardData[index];
          return  CardDestination(image: data['image'], title: data['title']);
        },
      ),
    );
  }
}
