import 'package:booking_platform_app/data/property_detail.dart';
import 'package:booking_platform_app/utils/format.dart';
import 'package:booking_platform_app/widgets/screens/check_info_booking_screen.dart';
import 'package:booking_platform_app/widgets/screens/ui/property_detail/body_content.dart';
import 'package:booking_platform_app/widgets/screens/ui/search/appbar_search.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/room_card.dart';
import '../../data/search_param.dart';
import '../../providers/cart_order.dart';
import '../../providers/search.dart';
import '../../services/http.dart';

class PropertyDetailScreen extends StatefulWidget {
  final String id;

  const PropertyDetailScreen({super.key, required this.id});

  @override
  _PropertyDetailScreenState createState() => _PropertyDetailScreenState();
}

class _PropertyDetailScreenState extends State<PropertyDetailScreen>
    with TickerProviderStateMixin {
  late Future<PropertyDetail?> _futureProperty;
  late Future<List<Room>> _futureRooms;
  late SearchParams _searchParams;

  @override
  void initState() {
    super.initState();
    _searchParams = Provider.of<Search>(context, listen: false).searchParams!;
    _futureProperty = fetchDataPropertyDetails(widget.id);
    _futureRooms = fetchDataRooms(widget.id);
  }

  Future<PropertyDetail?> fetchDataPropertyDetails(String id) async {
    try {
      final response = await DataClient.getPropertyDetail(id);
      if (response.statusCode == 200) {
        return PropertyDetail.fromJson(response.data);
      } else {
        print('Failed to load property details');
        return null;
      }
    } catch (e) {
      print('Error: $e');
      return null;
    }
  }

  Future<List<Room>> fetchDataRooms(String id) async {
    try {
      final response = await DataClient.getRoomsByPropertyId(id, _searchParams.from, _searchParams.to);
      if (response.statusCode == 200) {
        return (response.data as List)
            .map((item) => Room.fromJson(item))
            .toList();
      } else {
        print('Failed to load room details');
        return [];
      }
    } catch (e) {
      print('Error: $e');
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    final cartOrder = Provider.of<CartOrder>(context, listen: true);
    final index =
    cartOrder.cart.indexWhere((element) => element.propertyDetail.id == widget.id);
    return Consumer<Search>(
      builder: (context, search, child) {
        _searchParams = search.searchParams!;
        return Scaffold(
          body: FutureBuilder<PropertyDetail?>(
            future: _futureProperty,
            builder: (context, snapshot) {
              return Stack(
                children: [
                  Positioned(
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    child: SingleChildScrollView(
                      child: Container(
                        margin: const EdgeInsets.only(top: 80),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            BodyContent(
                              property: snapshot.data,
                              isLoading: snapshot.connectionState ==
                                  ConnectionState.waiting,
                              roomsFuture: _futureRooms,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 0,
                    left: 0,
                    right: 0,
                    child: AppBar(
                      backgroundColor: const Color(0xFFF43F5E),
                      elevation: 4.0,
                      shadowColor: const Color(0x1F000000),
                      iconTheme: const IconThemeData(color: Color(0xFFF43F5E)),
                      actionsIconTheme:
                      const IconThemeData(color: Color(0xFFF43F5E)),
                      automaticallyImplyLeading: false,
                    ),
                  ),
                  Positioned(
                    top: 30,
                    left: 0,
                    right: 0,
                    child: AppBarSearch(
                      isSearch: false,
                      address: _searchParams.city,
                      startDate: _searchParams.from,
                      endDate: _searchParams.to,
                      quantity: _searchParams.children + _searchParams.adults,
                    ),
                  ),
                ],
              );
            },
          ),
          bottomNavigationBar:
          (index != -1 && cartOrder.cart[index].carts.isNotEmpty) ?
          Container(
            padding: const EdgeInsets.all(20),
            height: 120,
            color: const Color(0xFFFFFFFF),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: double.infinity,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(
                            Icons.attach_money,
                            color: Colors.black,
                            size: 13,
                          ),
                          Text(
                            '${formatNumber((cartOrder.cart[index].carts.fold(0.00, (total, element) => total + element.room.price * element.quantity)))} ' +
                                '| ${cartOrder.cart[index].carts.fold(0, (total, element) => total +  element.quantity)}  rooms',
                            textAlign: TextAlign.left,
                            style: const TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF000000),
                            ),
                          ),
                        ],
                      ),
                      const Text(
                        'Price includes taxes & fees',
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 10,
                          color: Color(0xFF7B7B7B),
                        ),
                      ),
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
                        onTap: () {
                          Navigator.of(context).push(
                            PageRouteBuilder(
                              pageBuilder: (context, animation, secondaryAnimation) =>
                                  CheckInfoBookingScreen(property: cartOrder.cart[index].propertyDetail,),
                              transitionsBuilder: (context, animation, secondaryAnimation, child) {
                                const begin = Offset(1.0, 0.0);
                                const end = Offset.zero;
                                const curve = Curves.ease;

                                var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
                                var offsetAnimation = animation.drive(tween);

                                return SlideTransition(
                                  position: offsetAnimation,
                                  child: child,
                                );
                              },
                            ),
                          );
                        },
                        child: const Text(
                          textAlign: TextAlign.center,
                          'Booking Now',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFFFFFFF),
                          ),
                        )
                    )
                )
              ],
            ),
          ) : null,
        );
      },
    );
  }
}