import 'package:booking_platform_app/app.dart';
import 'package:booking_platform_app/providers/cart_order.dart';
import 'package:booking_platform_app/providers/root.dart';
import 'package:booking_platform_app/providers/search.dart';
import 'package:booking_platform_app/providers/signUpResponse.dart';
import 'package:booking_platform_app/services/navigationService.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:provider/provider.dart';
import 'consts.dart';

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await _setupStripe();
  await Firebase.initializeApp(
      options: const FirebaseOptions(
          apiKey: "AIzaSyAZHrKVxt1n0fcfU7SIeTHP89KBPJoP_as",
          appId: "1:537316930511:android:c585a1952b2c0cd69d58ba",
          messagingSenderId: "537316930511",
          projectId: "notificationmessagetest-a0e5b",
          storageBucket: "notificationmessagetest-a0e5b.appspot.com"));
  const AndroidNotificationChannel channel = AndroidNotificationChannel(
    'high_importance_channel',
    'High Importance Notifications',
    description: 'This channel is used for important notifications.',
    importance: Importance.high,
  );
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);

  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    RemoteNotification? notification = message.notification;
    AndroidNotification? android = message.notification?.android;

    if (notification != null && android != null) {
      flutterLocalNotificationsPlugin.show(
        notification.hashCode,
        notification.title,
        notification.body,
        NotificationDetails(
          android: AndroidNotificationDetails(
            channel.id,
            channel.name,
            channelDescription: channel.description,
            icon: '@mipmap/ic_launcher',
          ),
        ),
      );
    }
  });
  FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
    NavigationService().handleNotificationOpen();
  });
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(create: (context) => RootProvider()),
    ChangeNotifierProvider(
        create: (context) => Search()..initializeSearchParams()),
    ChangeNotifierProvider(create: (_) => CartOrder()),
    ChangeNotifierProvider(create: (_) => SignUpResponseProvider())
  ], child: const Application()));
}

Future<void> _setupStripe() async {
  WidgetsFlutterBinding.ensureInitialized();
  Stripe.publishableKey = stripePublishableKey;
}
