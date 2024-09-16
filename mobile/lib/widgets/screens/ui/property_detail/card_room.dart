import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../data/cart.dart';
import '../../../../data/property_detail.dart';
import '../../../../data/room_card.dart';
import '../../../../providers/cart_order.dart';
import '../../../../providers/search.dart';
import '../../../../services/http.dart';
import '../../../../utils/format.dart';
import '../../room_detail_screen.dart';
import 'box_quantity.dart';

class CardRoom extends StatefulWidget {
  final Room room;
  final PropertyDetail  propertyDetail;
  const CardRoom({
    super.key,
    required this.room, required this.propertyDetail,
  });

  @override
  _CardRoomState createState() => _CardRoomState();
}

class _CardRoomState extends State<CardRoom> {
  late bool _isChoose;
  late int _quantity;

  bool _checkIfRoomInCart() {
    final cartOrder = Provider.of<CartOrder>(context, listen: false);
    return cartOrder.cart.any((property) => property.propertyDetail.id == widget.propertyDetail.id && property.carts.any((cart) => cart.room.id == widget.room.id));
  }

  void _initializeCartState() {
  }
  @override
  void initState() {
    super.initState();
    _initializeCartState();
  }

  void _handleAddToCart() {
    final cartOrder = Provider.of<CartOrder>(context, listen: false);
    cartOrder.addToCart(
        PropertyCart(propertyDetail: widget.propertyDetail, carts: [RoomCart(room: widget.room, quantity: 1)])
    );
    setState(() {
      _initializeCartState();
    });
  }
  void _showQuantityPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (BuildContext context) {
        return Container(
            width: double.infinity,
            // color: Colors.white,
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(20),
                topRight: Radius.circular(20),
              ),
            ),
            child: SizedBox(
                height: 270,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: BoxQuantity(
                    quantity: _quantity,
                    title: widget.room.name,
                    price: widget.room.price,
                   handelSubmit: (value) {
                      final cartOrder = Provider.of<CartOrder>(context, listen: false);
                      if (value == 0) {
                        cartOrder.removeFromCart(widget.propertyDetail.id, RoomCart(room: widget.room, quantity: _quantity));
                      } else {
                        cartOrder.updateCart(widget.propertyDetail.id,RoomCart (room: widget.room, quantity: value));
                      }
                      setState(() {
                        _initializeCartState();
                      });
                    },
                  ),
                )));
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final cartOrder = Provider.of<CartOrder>(context, listen: true);
    _isChoose = _checkIfRoomInCart();
    if (_isChoose) {
      final property = cartOrder.cart.firstWhere((element) => element.propertyDetail.id == widget.propertyDetail.id);
      final cart = property.carts.firstWhere((element) => element.room.id == widget.room.id);
      _quantity = cart.quantity;
    } else {
      _quantity = 0;
    }
    return Container(
      margin: const EdgeInsets.only(
        top: 20,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(3),
        border: Border.all(color: Colors.grey.shade300),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 5,
            blurRadius: 9,
            offset: Offset(0, 2), // changes position of shadow
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            GestureDetector(
                onTap: () {
                  Navigator.of(context).push(
                    PageRouteBuilder(
                      pageBuilder: (context, animation, secondaryAnimation) =>
                          RoomDetailScreen(item: widget.room, property: widget.propertyDetail),
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
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // this is name of room
                    Text(widget.room.name,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        )),
                    // this is image of room
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: AspectRatio(
                          aspectRatio: 16 / 9,
                          child: Image.network(
                            "${DataClient.javaClientUrl}/${widget.room.picture}",
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                    // this is room information
                    Padding(
                        padding: const EdgeInsets.only(top: 10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Room Information:",
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Row(
                              children: [
                                const Icon(
                                  Icons.person,
                                  color: Color(0xFFF43F5E),
                                  size: 12,
                                ),
                                const SizedBox(width: 5),
                                Text(
                                  "${widget.room.maxGuest} guest(s)",
                                  style: const TextStyle(
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                const Icon(
                                  Icons.square_foot,
                                  color: Color(0xFFF43F5E),
                                  size: 12,
                                ),
                                const SizedBox(
                                  width: 5,
                                ),
                                Text(
                                  "${formatNumber(widget.room.area)} m²",
                                  style: const TextStyle(
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                            const Text(
                              "View all amenities...",
                              style: TextStyle(
                                fontSize: 12,
                                color: Color(0xFF7B7B7B),
                              ),
                            ),
                          ],
                        )),
                    // this is price of room
                    Padding(
                      padding: const EdgeInsets.only(top: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            "Price: ",
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.black,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 5),
                            child: Row(
                              children: [
                                const Icon(
                                  Icons.attach_money,
                                  color: Colors.black,
                                  size: 14,
                                ),
                                Text(
                                  formatNumber(widget.room.price),
                                  style: const TextStyle(
                                      fontSize: 12, fontWeight: FontWeight.w600),
                                ),
                                const SizedBox(width: 5),
                                const Text(
                                  "/room/night",
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: Color(0xFF7B7B7B),
                                      fontWeight: FontWeight.w600),
                                )
                              ],
                            ),
                          ),
                          const Text(
                            "(include taxes & fees)",
                            style: TextStyle(
                              fontSize: 12,
                              color: Color(0xFF7B7B7B),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                )
            ),
            // this is button choose room
            _isChoose
                ? Padding(
              padding: const EdgeInsets.only(top: 20),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => _showQuantityPicker(context),
                  style: ButtonStyle(
                    side: WidgetStateProperty.all(
                      const BorderSide(color: Color(0xFFF43F5E)),
                    ),
                    backgroundColor: WidgetStateProperty.all<Color>(
                      const Color(0xFFFFFFFF),
                    ),
                    shape:
                    WidgetStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    padding: WidgetStateProperty.all<EdgeInsets>(
                      const EdgeInsets.only(top: 15, bottom: 15),
                    ),
                  ),
                  child: Text(
                    "$_quantity  rooms selected",
                    style: const TextStyle(
                      fontSize: 14,
                      color: Color(0xFFF43F5E),
                    ),
                  ),
                ),
              ),
            )
                : Padding(
              padding: const EdgeInsets.only(top: 20),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => _handleAddToCart(),
                  style: ButtonStyle(
                    side: WidgetStateProperty.all(
                      const BorderSide(color: Color(0xFFF43F5E)),
                    ),
                    backgroundColor: WidgetStateProperty.all<Color>(
                      const Color(0xFFFFFFFF),
                    ),
                    shape:
                    WidgetStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    padding: WidgetStateProperty.all<EdgeInsets>(
                      const EdgeInsets.only(top: 15, bottom: 15),
                    ),
                  ),
                  child: const Text(
                    "Choose",
                    style: TextStyle(
                      fontSize: 14,
                      color: Color(0xFFF43F5E),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}





