import 'dart:async';

import 'package:booking_platform_app/widgets/components/login/loginbox.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';

import '../../services/fcmService.dart';
import '../components/app_bar/app_bar_search.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<LoginScreen> {
  @override
  void initState() {
    super.initState();
    _setupFirebaseMessaging();
  }

  Future<void> _setupFirebaseMessaging() async {
    final notificationSettings = await FirebaseMessaging.instance.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: true,
      sound: true,
    );
    print('User granted permission: ${notificationSettings.authorizationStatus}');

    // Kiểm tra APNS token cho iOS
    final apnsToken = await FirebaseMessaging.instance.getAPNSToken();
    if (apnsToken != null) {
      print('APNS Token: $apnsToken');
    }

    // Lấy và lưu FCM token
    FirebaseMessaging.instance.getToken().then((token) {
      if (token != null) {
        print('FCM Token: $token');
        FCMService.saveFCMToken(token);
      }
    }).onError((err) {
      print('Error getting token: $err');
    } as FutureOr<Null> Function(Object error, StackTrace stackTrace));

    // Lắng nghe sự kiện cập nhật token
    FirebaseMessaging.instance.onTokenRefresh.listen((fcmToken) {
      print('FCM Token refreshed: $fcmToken');
      FCMService.saveFCMToken(fcmToken);
    }).onError((err) {
      print('Error getting token: $err');
    });
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Container(
              color: const Color(0xFFF43F5E),
              width: double.infinity,
              child: const Center(child: AppBarSearch())),
          backgroundColor: const Color(0xFFF43F5E),
          shadowColor: const Color(0x1F000000),
          iconTheme: const IconThemeData(color: Color(0xFFF43F5E)),
          actionsIconTheme: const IconThemeData(color: Color(0xFFF43F5E)),
        ),
        body: const SingleChildScrollView(
          child: Center(child: LoginBox()),
        ));
  }
}
