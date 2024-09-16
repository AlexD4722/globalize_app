import 'dart:async';

import 'package:flutter/cupertino.dart';

import '../router/routers.dart';

class NavigationService {
  static final NavigationService _instance = NavigationService._internal();
  factory NavigationService() => _instance;
  NavigationService._internal();
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
  void handleNotificationOpen() {
    navigatorKey.currentState?.pushNamed(Routes.reservation);
  }
  final _navigationStreamController = StreamController<String>.broadcast();
  Stream<String> get navigationStream => _navigationStreamController.stream;

  void navigateTo(String routeName) {
    _navigationStreamController.add(routeName);
  }

  void dispose() {
    _navigationStreamController.close();
  }
}