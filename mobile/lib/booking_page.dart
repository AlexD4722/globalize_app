import 'dart:collection';

import 'package:booking_platform_app/providers/root.dart';
import 'package:booking_platform_app/widgets/components/app_bar/app_bar_profile.dart';
import 'package:booking_platform_app/widgets/components/app_bar/app_bar_reservation.dart';
import 'package:booking_platform_app/widgets/components/app_bar/app_bar_search.dart';
import 'package:booking_platform_app/widgets/screens/searchscreen.dart';
import 'package:booking_platform_app/widgets/screens/profilescreen.dart';
import 'package:booking_platform_app/widgets/screens/reservationscreen.dart';
import 'package:booking_platform_app/widgets/screens/secretscreen.dart';
import 'package:booking_platform_app/widgets/screens/testscreen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class BookingPage extends StatefulWidget {
  const BookingPage({super.key});

  @override
  _BookingPageState createState() => _BookingPageState();
}

class _BookingPageState extends State<BookingPage> {
  final HashMap<String, Widget> screens =
      HashMap<String, Widget>.fromIterables(
          ['Search', 'Reservation', 'Profile', 'Test', 'Secret'],
          [const SearchScreen(), const ReservationScreen(), const ProfileScreen(), const TestScreen(), const SecretScreen()]);

  final HashMap<String, Widget> appBars =
      HashMap<String, Widget>.fromIterables(
          ['Search', 'Reservation', 'Profile', 'Test', 'Secret'],
          [const AppBarSearch(), const AppBarReservation(), const AppBarProfile(), const Text('Test'), const Text('Secret')]);
  final List<String> screenNames = ['Search', 'Reservation', 'Profile', 'Test', 'Secret'];

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final padding = screenWidth * 0.05;
    var selectedIndex = context.select((RootProvider provider) => provider.pageIndex);
    var setIndex = context.read<RootProvider>().setPageIndex;
    var getPageIndex = context.read<RootProvider>().getPageIndex;
    return Scaffold(
      appBar: AppBar(
        title: Center(
            child: appBars[selectedIndex]
        ),
        backgroundColor: const Color(0xFFF43F5E),
        shadowColor: const Color(0x1F000000),
        actionsIconTheme: const IconThemeData(color: Color(0xFFFFFFFF)),
        automaticallyImplyLeading: false,
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: padding),
        child: screens[selectedIndex],
      ),
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: const Color(0xFFF43F5E),
        unselectedItemColor: Colors.grey,
        backgroundColor: const Color(0xFFFFFFFF), // Set background color here
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.list),
            label: 'Reservation',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        currentIndex: getPageIndex(),
        onTap: (index) {
          setIndex(screenNames[index]);
        },
      ),
    );
  }
}