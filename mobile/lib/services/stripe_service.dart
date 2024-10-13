import 'dart:ffi';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:provider/provider.dart';

import '../consts.dart';
import '../providers/cart_order.dart';
import '../providers/root.dart';
import '../router/routers.dart';
import 'fcmService.dart';
import 'http.dart';

class StripeService {
  StripeService._();

  static final StripeService instance = StripeService._();
  Future<void> sendSuccessNotification() async {
    // Lấy FCM token của người dùng hiện tại
    String? fcmToken = await FCMService.getFCMToken();

    if (fcmToken != null) {
      print("FCM token======================: $fcmToken");
      try {
        final dio = Dio();
        final response = await dio.post(
          '${DataClient.javaClientUrl}/api/notifications/send',
          data: {
            "token": "${fcmToken}",
            "title": "Booking successful",
            "body": "You have successfully booked!",
          },
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          ),
        );
        if (response.statusCode != 200) {
          print('Failed to send notification');
        }
      } catch (e) {
        print('Error sending notification: $e');
      }
    } else {
      print('FCM token not available');
    }
  }

  Future<void> makePayment(
      double money, BuildContext context, dynamic data) async {
    try {
      final paymentIntent = await _createPaymentIntent(money, "usd");
      if (paymentIntent == null) return;
      await Stripe.instance.initPaymentSheet(
        paymentSheetParameters: SetupPaymentSheetParameters(
          paymentIntentClientSecret: paymentIntent['client_secret'],
          merchantDisplayName: "Globalize",
        ),
      );
      await _processPayment(context, data, paymentIntent['id']!);
    } catch (e) {
      print(e);
    }
  }

  Future<Map<String, String>?> _createPaymentIntent(
      double amount, String currency) async {
    try {
      final Dio dio = Dio();
      Map<String, dynamic> data = {
        "amount": _calculateAmount(amount),
        "currency": currency,
      };
      var response = await dio.post(
        "https://api.stripe.com/v1/payment_intents",
        data: data,
        options: Options(
          contentType: Headers.formUrlEncodedContentType,
          headers: {
            "Authorization": "Bearer $stripeSecretKey",
            "Content-Type": 'application/x-www-form-urlencoded'
          },
        ),
      );
      if (response.data != null) {
        return {
          "id": response.data["id"],
          "client_secret": response.data["client_secret"],
        };
      }
      return null;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<List<Map<String, dynamic>>> _listChargesForPaymentIntent(
      String paymentIntentId) async {
    try {
      final Dio dio = Dio();

      final response = await dio.get(
        "https://api.stripe.com/v1/charges",
        queryParameters: {"payment_intent": paymentIntentId},
        options: Options(
          headers: {
            "Authorization": "Bearer $stripeSecretKey",
          },
        ),
      );
      // Danh sách để lưu charge thông tin
      List<Map<String, dynamic>> chargesList = [];

      // Kiểm tra nếu có charge
      if (response.data != null && response.data["data"] != null) {
        var charges = response.data["data"];
        if (charges.isNotEmpty) {
          for (var charge in charges) {
            // Lưu charge id và amount vào danh sách
            chargesList
                .add({"charge_id": charge["id"], "amount": charge["amount"]});
          }
        } else {
          print("No charges found.");
        }
      } else {
        print("No charges information available.");
      }

      return chargesList;
    } catch (e) {
      print(e);
      return [];
    }
  }

  Future<void> _processPayment(BuildContext context, dynamic data,
      String paymentIntentClientSecret) async {
    try {
      await Stripe.instance.presentPaymentSheet();
      final response = await DataClient.createReservation(data);
      if (response.statusCode == 201) {
        await sendSuccessNotification();
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              backgroundColor: Colors.white,
              title: const Text('Success'),
              content: const Text('Reservation confirmed'),
              actions: [
                TextButton(
                  onPressed: () {},
                  child: Container(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    width: double.infinity,
                    decoration: const BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(3)),
                      color: Color(0xFFD33756),
                    ),
                    child: GestureDetector(
                        onTap: () {
                          var setIndex = context.read<RootProvider>().setPageIndex;
                          setIndex('Reservation');
                          Provider.of<CartOrder>(context, listen: false)
                              .clearCart();
                          Navigator.pushNamedAndRemoveUntil(
                            context,
                            Routes.home,
                            (route) =>
                                false,
                          );
                        },
                        child: const Text(
                          textAlign: TextAlign.center,
                          'OK',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFFFFFFF),
                          ),
                        )),
                  ),
                ),
              ],
            );
          },
        );
      } else {
        await _refundPayment(paymentIntentClientSecret);
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              backgroundColor: Colors.white,
              title: const Text('Failure'),
              content: const Text(
                  'Failed to confirm reservation. Please try again later.'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Container(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    width: double.infinity,
                    decoration: const BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(3)),
                      color: Color(0xFFD33756),
                    ),
                    child: GestureDetector(
                        onTap: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text(
                          textAlign: TextAlign.center,
                          'OK',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFFFFFFF),
                          ),
                        )),
                  ),
                ),
              ],
            );
          },
        );
      }
    } catch (e) {
      await _refundPayment(paymentIntentClientSecret);
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            backgroundColor: Colors.white,
            title: const Text('Failure'),
            content: const Text(
                'Failed to confirm reservation. Please try again later.'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: Container(
                  padding: const EdgeInsets.only(top: 10, bottom: 10),
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(3)),
                    color: Color(0xFFD33756),
                  ),
                  child: GestureDetector(
                      onTap: () {
                        Navigator.of(context).pop();
                      },
                      child: const Text(
                        textAlign: TextAlign.center,
                        'OK',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFFFFFFFF),
                        ),
                      )),
                ),
              ),
            ],
          );
        },
      );
      print("this is Error: $e");
    }
  }

  Future<void> _refundPayment(String paymentIntentClientSecret) async {
    try {
      final Dio dio = Dio();

      // Lấy thông tin charge
      final chargeList =
          await _listChargesForPaymentIntent(paymentIntentClientSecret);
      if (chargeList.isNotEmpty) {
        final charge = chargeList[0];

        // Gửi yêu cầu hoàn tiền
        final res = await dio.post(
          "https://api.stripe.com/v1/refunds",
          data: {
            "charge": charge["charge_id"],
            "amount": charge["amount"],
            // Hoàn tiền toàn bộ số tiền đã thanh toán
          },
          options: Options(
            headers: {
              "Authorization": "Bearer $stripeSecretKey",
              "Content-Type": 'application/x-www-form-urlencoded'
            },
          ),
        );
        print(res);
      } else {
        print("No charges available for refund.");
      }
    } catch (e) {
      print("Error during refund: ${e.toString()}");
    }
  }

  String _calculateAmount(double amount) {
    final int calculatedAmount = (amount * 100).toInt();
    return calculatedAmount.toString();
  }
}
