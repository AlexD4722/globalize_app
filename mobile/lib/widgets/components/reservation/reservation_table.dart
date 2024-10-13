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
  late Future<List<ItemReservation>> _futureActiveItems;
  late Future<List<ItemReservation>> _futurePaidItems;
  late Future<List<ItemReservation>> _futureCanceledItems;
  late Future<List<ItemReservation>> _futureCanceledRequestItems;
  Future<List<ItemReservation>> fetchActiveData() async {
    return fetchData("active");
  }
  Future<List<ItemReservation>> fetchPaidData() async {
    return fetchData("completed");
  }
  Future<List<ItemReservation>> fetchCanceledData() async {
    return fetchData("cancelled");
  }
  Future<List<ItemReservation>> fetchCanceledRequestData() async {
    return fetchData("requested");
  }



  Future<List<ItemReservation>> fetchData(String status) async {
    try {
      final response = await DataClient.getReservations(status);
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
    _futureActiveItems = fetchActiveData();
    _futurePaidItems = fetchPaidData();
    _futureCanceledItems = fetchCanceledData();
    _futureCanceledRequestItems = fetchCanceledRequestData();
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
              child: ReservationActive(items: _futureActiveItems))
      ),
      CarouselReservation(
        title: 'Paid',
          widget: Container(
              width: double.infinity,
              height: double.infinity,
              child: ReservationActive(items: _futurePaidItems))
      ),
      CarouselReservation(
        title: 'Canceled',
          widget: Container(
              width: double.infinity,
              height: double.infinity,
              child: ReservationActive(items: _futureCanceledItems))
      ),
      CarouselReservation(
          title: 'Cancel Requested',
          widget: Container(
              width: double.infinity,
              height: double.infinity,
              child: ReservationActive(items: _futureCanceledRequestItems))
      ),
    ];
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
          height: 100, // Define a height for the container
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: listCarouselSlider.length,
            itemBuilder: (context, index) {
              var item = listCarouselSlider[index];
              return Container(
                width: item.title == "Cancel Requested"  ?  null : MediaQuery.of(context).size.width / (listCarouselSlider.length-1) ,
                child: ButtonAppbarBody(
                  title: item.title,
                  buttonIndex: index,
                  selectedButtonIndex: _selectedButtonIndex,
                  onButtonPressed: _onButtonPressed,
                ),
              );
            },
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
