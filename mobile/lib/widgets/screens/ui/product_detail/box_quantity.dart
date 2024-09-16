import 'dart:ui';

import 'package:flutter/material.dart';

import '../../../../presentation/common/Indicator.dart';

class BoxQuantity extends StatefulWidget {
  final int quantity;
  final String title;
  final double price;
  final Function handelSubmit;

  const BoxQuantity({
    super.key,
    required this.title,
    required this.price,
    required this.quantity, required this.handelSubmit,
  });

  @override
  _BoxQuantityState createState() => _BoxQuantityState();
}

class _BoxQuantityState extends State<BoxQuantity> {
  late int _quantity;


  @override
  void initState() {
    super.initState();
    _quantity = widget.quantity;
  }

  void _submit() {
    widget.handelSubmit(_quantity);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Padding(
          padding: EdgeInsets.only(top: 10, bottom: 20),
          child: Indicator(),
        ),
        Expanded(
            child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
              Padding(
                padding: const EdgeInsets.only(left: 15, right: 15),
                child: Text(
                  widget.title,
                  style: const TextStyle(
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Expanded(
                  child: Padding(
                padding: const EdgeInsets.only(left: 15, right: 15),
                child: SizedBox(
                    width: double.infinity,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Quantity Rooms',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.black,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            Container(
                              width: 100,
                              height: 40,
                              decoration: BoxDecoration(
                                color: const Color(0xFFFFFFFF),
                                border: Border.all(
                                  color: const Color(0xFFE0E0E0),
                                ),
                                borderRadius: BorderRadius.circular(2.5),
                              ),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  IconButton(
                                      icon: const Icon(Icons.remove),
                                      onPressed: () => {
                                            if (_quantity > 1)
                                              {
                                                setState(() {
                                                  _quantity--;
                                                })
                                              }
                                            else
                                              {
                                                setState(() {
                                                  _quantity = 0;
                                                }),
                                                Navigator.of(context).pop(),
                                                _submit()
                                              },
                                          }),
                                  Text('$_quantity',
                                      style: TextStyle(fontSize: 18)),
                                  IconButton(
                                    icon: const Icon(Icons.add),
                                    onPressed: () => {
                                      setState(() {
                                        _quantity++;
                                      })
                                    },
                                  ),
                                ],
                              ),
                            )
                          ],
                        ),
                      ],
                    )),
              )),
              Container(
                  decoration: const BoxDecoration(
                    border: Border(
                      top: BorderSide(
                        color: Color(0xFFE0E0E0),
                      ),
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Price',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.black,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            Text(
                              '(include taxes & fees)',
                              style: TextStyle(
                                fontSize: 12,
                                color: Color(0xFF7B7B7B),
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          'USD ${widget.price * _quantity}',
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  )),
              Padding(
                padding: const EdgeInsets.only(left: 15, right: 15),
                child: Container(
                  height: 40,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color(0xFFF43F5E),
                    borderRadius: BorderRadius.circular(2.5),
                  ),
                  child: TextButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                        _submit();
                      },
                      child: const Center(
                        child: Text(
                          'Confirm',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Colors.white,
                          ),
                        ),
                      )),
                ),
              )
            ])),
      ],
    );
  }
}
