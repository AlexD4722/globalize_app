import 'package:booking_platform_app/data/property_detail.dart';
import 'package:booking_platform_app/widgets/screens/ui/check_info_booking/body_info_booking.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../data/cart.dart';
import '../../data/item_search.dart';
import '../../providers/cart_order.dart';
import '../../providers/search.dart';
import '../../router/routers.dart';
import '../../services/http.dart';
import '../../services/stripe_service.dart';
import '../../utils/calculate.dart';
import '../../utils/format.dart';

class OrderDetailScreen extends StatefulWidget {
  final PropertyDetail property;

  const OrderDetailScreen({
    super.key,
    required this.property,
  });

  @override
  _OrderDetailScreenState createState() => _OrderDetailScreenState();
}

class _OrderDetailScreenState extends State<OrderDetailScreen>
    with TickerProviderStateMixin {
  late Future<List<ItemSearch>> _futureItems;
  late PropertyCart? _propertyCart;

  Future<void> confirmReservation(
      List<Map<String, String>> reservations) async {
    try {
      final response = await DataClient.createReservation(reservations);
      if (response.statusCode == 201) {
        if (mounted) {
          // Show success dialog
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                backgroundColor: Colors.white,
                title: const Text('Success'),
                content: const Text('Reservation confirmed'),
                actions: [
                  TextButton(
                    onPressed: () {
                      Provider.of<CartOrder>(context, listen: false).clearCart();
                      Navigator.popUntil(
                          context, ModalRoute.withName(Routes.searchResults));
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
      } else {
        if (mounted) {
          // Show failure dialog
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
      }
    } catch (e) {
      if (mounted) {
        // Show error dialog
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              backgroundColor: Colors.white,
              title: const Text('Error'),
              content: const Text(
                  'The booking process has failed. Please try again later.'),
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
    }
  }

  @override
  void initState() {
    super.initState();
    _futureItems = fetchData(context);
    _futureItems.then((value) {}).catchError((error) {
      print('Error: $error');
    });
  }

  void handleClearParams() {
    Provider.of<Search>(context, listen: false).initializeSearchParams();
  }

  Future<List<ItemSearch>> fetchData(BuildContext context) async {
    try {
      Map<String, dynamic> searchParamsValues =
      Provider.of<Search>(context, listen: false).getSearchParamsValues();
      final response = await DataClient.searchProperties(
        city: searchParamsValues['city'],
        from: convertDateFormat(searchParamsValues['from']),
        to: convertDateFormat(searchParamsValues['to']),
        adults: searchParamsValues['adults'],
        children: searchParamsValues['children'],
        pets: searchParamsValues['pets'],
        minPrice: searchParamsValues['minPrice'].toDouble(),
        maxPrice: searchParamsValues['maxPrice'].toDouble(),
        sort: searchParamsValues['sort'],
        minRating: searchParamsValues['minRating'],
        facility: searchParamsValues['facility'],
        roomType: searchParamsValues['roomType'],
      );
      if (response.data != null && response.data.isNotEmpty) {
        return (response.data as List)
            .map((item) => ItemSearch.fromJson(item))
            .toList();
      } else {
        return [];
      }
    } catch (e) {
      print('Error: $e');
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    final searchParams =
        Provider.of<Search>(context, listen: true).searchParams;
    return Consumer<CartOrder>(
      builder: (context, cartOrder, child) {
        _propertyCart = cartOrder.getCartByPropertyId(widget.property.id);

        return Scaffold(
          appBar: AppBar(
            backgroundColor: const Color(0xFFF43F5E),
            elevation: 4.0,
            shadowColor: const Color(0x1F000000),
            iconTheme: const IconThemeData(color: Colors.white),
            actionsIconTheme: const IconThemeData(color: Color(0xFFF43F5E)),
            title: const Text(
              'Order detail',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          body: SingleChildScrollView(
            child: Container(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  BodyInfoBooking(
                      property: widget.property,
                      roomCarts: _propertyCart!.carts)
                ],
              ),
            ),
          ),
          bottomNavigationBar: Container(
            padding: const EdgeInsets.all(20),
            height: 120,
            color: const Color(0xFFFFFFFF),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'You have successfully paid 10% of the bill.',
                        style: TextStyle(
                          fontSize: 12,
                          color: Color(0xFF7B7B7B),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      Row(
                        children: [
                          const Icon(
                            Icons.attach_money,
                            color: Colors.black,
                            size: 18,
                          ),
                          Text(
                            '${(calculateTotalPrice(
                                _propertyCart!.carts,
                                parseDate(searchParams!.from),
                                parseDate(searchParams.to)) *
                                0.25).toInt()}',
                            style: const TextStyle(
                              fontSize: 16,
                              color: Colors.black,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      )
                    ],
                  ),
                ),
                Container(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    width: double.infinity,
                    decoration: const BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(3)),
                      color: Color(0xFFD33756),
                    ),
                    child: GestureDetector(
                        onTap: () async {
                          final reservations = _propertyCart!.carts.map((cart) {
                            return {
                              'checkInDate':
                              convertDateFormat(searchParams.from),
                              'checkOutDate':
                              convertDateFormat(searchParams.to),
                              'roomId': cart.room.id,
                            };
                          }).toList();
                          StripeService.instance.makePayment(
                              (calculateTotalPrice(
                                  _propertyCart!.carts,
                                  parseDate(searchParams.from),
                                  parseDate(searchParams.to)) *
                                  0.25), context,
                              reservations
                          );
                          // await confirmReservation(reservations);
                        },
                        child: const Text(
                          textAlign: TextAlign.center,
                          'Confirm',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFFFFFFF),
                          ),
                        )))
              ],
            ),
          ),
        );
      },
    );
  }
}
