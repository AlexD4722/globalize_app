import 'package:board_datetime_picker/board_datetime_picker.dart';
import 'package:booking_platform_app/widgets/screens/ui/home/experience_section.dart';
import 'package:booking_platform_app/widgets/screens/ui/home/carousel.dart';
import 'package:booking_platform_app/widgets/screens/ui/home/form_search.dart';
import 'package:booking_platform_app/widgets/screens/ui/home/item_love.dart';
import 'package:flutter/material.dart';


class Homescreen extends StatefulWidget {
  const Homescreen({Key? key}) : super(key: key);

  @override
  _HomescreenState createState() => _HomescreenState();
}

class _HomescreenState extends State<Homescreen> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            FormSearch(),
            Carousel(title: "Featured destinations"),
            ItemLove(title: 'Home people love'),
            ExperienceSection()
          ],
        ),
      ),
    );
  }
}
