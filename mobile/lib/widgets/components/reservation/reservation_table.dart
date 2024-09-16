import 'package:booking_platform_app/data/carousel_reservation.dart';
import 'package:booking_platform_app/services/http.dart';
import 'package:booking_platform_app/widgets/components/reservation/reservation_active.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:loop_page_view/loop_page_view.dart';

import '../../../data/item_reservation.dart';
import 'button_appbar_body.dart';

class ReservationTable extends StatefulWidget {
  const ReservationTable({super.key});

  @override
  _ReservationTableState createState() => _ReservationTableState();
}

class _ReservationTableState extends State<ReservationTable> {
  late Future<List<ItemReservation>> _futureItems;
  Future<List<ItemReservation>> fetchData() async {
    try {
      final response = await DataClient.getReservations();
      if (response.data != null && response.data.isNotEmpty) {
        return (response.data as List)
            .map((item) => ItemReservation.fromJson(item))
            .toList();
      } else {
        return [];
      }
    } catch (e) {
      print('Error: $e');
      return [];
    }
  }
  int _selectedButtonIndex = 0;

  final LoopPageController controller = LoopPageController(
      scrollMode: LoopScrollMode.shortest,
      activationMode: LoopActivationMode.immediate);

  @override
  void initState() {
    super.initState();
    _futureItems = fetchData();
  }

  final CarouselController _carouselController = CarouselController();
  int _currentIndex = 0;

  void _onButtonPressed(int index) {
    setState(() {
      _selectedButtonIndex = index; // Update the selected button index
    });
    _carouselController.animateToPage(index);
  }

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final List<CarouselReservation> listCarouselSlider = [
      CarouselReservation(
          title: 'Active',
          widget: Container(
              width: double.infinity,
              height: double.infinity,
              child: ReservationActive(items: _futureItems))
      ),
      CarouselReservation(
        title: 'Paid',
          widget: Container(
              width: double.infinity,
              height: double.infinity,
              child: ReservationActive(items: _futureItems))
      ),
      CarouselReservation(
        title: 'Canceled',
          widget: Container(
              width: double.infinity,
              height: double.infinity,
              child: ReservationActive(items: _futureItems))
      ),
    ];
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: listCarouselSlider.map((item) {
              var index = listCarouselSlider.indexOf(item);
              return Expanded(
                child: ButtonAppbarBody(
                  title: item.title,
                  buttonIndex: index,
                  selectedButtonIndex: _selectedButtonIndex,
                  onButtonPressed: _onButtonPressed,
                ),
              );
            }).toList(),
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            child: CarouselSlider(
              items: listCarouselSlider.map((item) => item.widget).toList(),
              carouselController: _carouselController,
              options: CarouselOptions(
                height: height,
                viewportFraction: 1.0,
                enlargeCenterPage: false,
                autoPlay: false,
                enableInfiniteScroll: false,
                onPageChanged: (index, reason) {
                  setState(() {
                    _currentIndex = index;
                    _selectedButtonIndex = index;
                  });
                },
              ),
            ),
          ),
        ),
      ],
    );
  }
}
