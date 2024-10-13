import 'package:booking_platform_app/booking_page.dart';
import 'package:booking_platform_app/router/routers.dart';
import 'package:booking_platform_app/services/navigationService.dart';
import 'package:booking_platform_app/utils/custom_navigator_observer.dart';
import 'package:booking_platform_app/widgets/screens/homescreen.dart';
import 'package:booking_platform_app/widgets/screens/reservationscreen.dart';
import 'package:booking_platform_app/widgets/screens/search_results_screen.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:booking_platform_app/widgets/screens/loginscreen.dart';
import 'package:toastification/toastification.dart';

class Application extends StatelessWidget {
  const Application({super.key});

  @override
  Widget build(BuildContext context) {
    final CustomNavigatorObserver _navigatorObserver =
    CustomNavigatorObserver();
    return ToastificationWrapper(
        child: MaterialApp(
          title: 'Booking App',
          theme: ThemeData(
            fontFamily: 'Aeonik',
            textTheme: const TextTheme(
              bodyLarge: TextStyle(fontFamily: 'Aeonik'),
              bodyMedium: TextStyle(fontFamily: 'Aeonik'),
              bodySmall: TextStyle(fontFamily: 'Aeonik'),
              headlineLarge: TextStyle(fontFamily: 'Aeonik'),
              headlineMedium: TextStyle(fontFamily: 'Aeonik'),
              headlineSmall: TextStyle(fontFamily: 'Aeonik'),
              titleLarge: TextStyle(fontFamily: 'Aeonik'),
              titleMedium: TextStyle(fontFamily: 'Aeonik'),
              titleSmall: TextStyle(fontFamily: 'Aeonik'),
              labelLarge: TextStyle(fontFamily: 'Aeonik'),
              labelMedium: TextStyle(fontFamily: 'Aeonik'),
              labelSmall: TextStyle(fontFamily: 'Aeonik'),
            ),
            useMaterial3: true,
            scaffoldBackgroundColor: Colors.white,
          ),
          debugShowCheckedModeBanner: false,
          home: const LoginScreen(),
          navigatorObservers: [_navigatorObserver],
          routes: {
            Routes.searchResults: (context) => const SearchResultsScreen(),
            Routes.home: (context) => const BookingPage(),
            Routes.reservation: (context) => const ReservationScreen(),
            // other routes
          },
        )
    );
  }
}
