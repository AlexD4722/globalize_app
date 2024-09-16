import 'package:booking_platform_app/data/property_detail.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../data/cart.dart';
import '../../../../data/room_card.dart';
import '../../../../providers/cart_order.dart';
import '../../../../services/http.dart';
import '../property_detail/box_quantity.dart';

class BodyContentRoom extends StatefulWidget {
  final Room room;
  final PropertyDetail propertyDetail;

  const BodyContentRoom(
      {super.key, required this.room, required this.propertyDetail});

  @override
  _BodyContentRoomState createState() => _BodyContentRoomState();
}

class _BodyContentRoomState extends State<BodyContentRoom> {
  late bool _isChoose;
  late int _quantity;

  bool _checkIfRoomInCart() {
    final cartOrder = Provider.of<CartOrder>(context, listen: false);
    return cartOrder.cart.any((property) => property.propertyDetail.id == widget.propertyDetail.id && property.carts.any((cart) => cart.room.id == widget.room.id));
  }

  void _initializeCartState() {
    final cartOrder = Provider.of<CartOrder>(context, listen: false);
    print(cartOrder.cart.map((e)  => e.toString()));
    _isChoose = _checkIfRoomInCart();
    if (_isChoose) {
      final property = cartOrder.cart.firstWhere((element) => element.propertyDetail.id == widget.propertyDetail.id);
      final cart = property.carts.firstWhere((element) => element.room.id == widget.room.id);
      _quantity = cart.quantity;
    } else {
      _quantity = 0;
    }
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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
            padding:
                const EdgeInsets.only(left: 20, right: 20, top: 10, bottom: 10),
            child: Text(
              widget.room.name,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            )),
        AspectRatio(
          aspectRatio: 16 / 9,
          child: Image.network(
            '${DataClient.javaClientUrl}/${widget.room.picture}',
            height: 200, // Set the desired height
            fit: BoxFit.cover, // Ensure the image covers the entire area
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(left: 20, right: 20),
          child: Column(
            children: [
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
                            "${widget.room.area} m²",
                            style: const TextStyle(
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          const Icon(
                            Icons.layers,
                            color: Color(0xFFF43F5E),
                            size: 12,
                          ),
                          const SizedBox(
                            width: 5,
                          ),
                          Text(
                            "Floor: ${widget.room.floor}",
                            style: const TextStyle(
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      const Text(
                        "List amenities: ",
                        style: TextStyle(
                          fontSize: 14,
                          color: Color(0xFF000000),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 5),
                        child: widget.room.amenities.isEmpty
                            ? const Text("No data available", style: TextStyle(fontSize: 12))
                            : Wrap(
                          spacing: 10, // Space between the children
                          runSpacing: 10, // Space between the lines
                          children: widget.room.amenities
                              .map((e) => Container(
                            decoration: BoxDecoration(
                              border: Border.all(
                                  color: const Color(0xFF7B7B7B).withOpacity(0.6)),
                              borderRadius: BorderRadius.circular(30),
                            ),
                            padding: const EdgeInsets.only(
                                top: 5, bottom: 5, left: 13, right: 13),
                            child: Text(e.amenityCategory.name ?? "No name",
                                style: const TextStyle(fontSize: 12),
                                textAlign: TextAlign.center),
                          ))
                              .toList(),
                        ),
                      )
                    ],
                  )),
              // this is price of room
              Padding(
                padding: const EdgeInsets.only(top: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Description: ",
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 5, bottom: 5),
                      child: Text(
                        widget.room.description,
                        style: const TextStyle(
                          fontSize: 12,
                        ),
                      ),
                    ),

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
                            "USD ${widget.room.price}",
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
              Container(
                decoration: const BoxDecoration(
                  border: Border(
                    top: BorderSide(color: Color(0xFFE5E5E5)),
                  ),
                ),
                margin: const EdgeInsets.only(top: 10),
                child:  _isChoose
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
              )
            ],
          ),
        ),
      ],
    );
  }
}
