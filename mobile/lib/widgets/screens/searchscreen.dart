import 'package:booking_platform_app/widgets/screens/ui/home/experience_section.dart';
import 'package:booking_platform_app/widgets/screens/ui/home/carousel.dart';
import 'package:booking_platform_app/widgets/screens/ui/home/form_search.dart';
import 'package:booking_platform_app/widgets/screens/ui/home/item_love.dart';
import 'package:flutter/material.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  _SearchScreenState createState() => _SearchScreenState();
}
class _SearchScreenState extends State<SearchScreen> {
  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
        child: Column(
          children: [
            FormSearch(),
            Carousel(title: "Featured destinations"),
            ItemLove(title: 'Home people love'),
            ExperienceSection()
          ],
        ),
      );
  }
}
