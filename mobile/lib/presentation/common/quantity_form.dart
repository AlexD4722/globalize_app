import 'package:flutter/material.dart';

import 'Indicator.dart';

class QuantityInput extends StatefulWidget {
  final void Function(Map<String, int>) onQuantityChanged;
  final int adults;
  final int children;
  final int pets;

  const QuantityInput({
    super.key,
    required this.onQuantityChanged,
    required this.adults,
    required this.children,
    required this.pets,
  });

  @override
  _QuantityInputState createState() => _QuantityInputState();
}

class _QuantityInputState extends State<QuantityInput> {
  late int _adults;
  late int _children;
  late int _pets;

  @override
  void initState() {
    super.initState();
    _adults = widget.adults;
    _children = widget.children;
    _pets = widget.pets;
  }

  void _submit() {
    setState(() {
      widget.onQuantityChanged({
        'adults': _adults,
        'children': _children,
        'pets': _pets,
      });
    });
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
                children: [
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
                                    const Flexible(
                                        child: Text(
                                          'Adults',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black,
                                          ),
                                        )),
                                    Container(
                                      width: 130,
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
                                                if (_adults > 1)
                                                  {
                                                    setState(() {
                                                      _adults--;
                                                    })
                                                  },
                                              }),
                                          Text('$_adults',
                                              style: TextStyle(fontSize: 18)),
                                          IconButton(
                                            icon: const Icon(Icons.add),
                                            onPressed: () => {
                                              setState(() {
                                                _adults++;
                                              })
                                            },
                                          ),
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Flexible(
                                        child: Text(
                                          'Children',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black,
                                          ),
                                        )),
                                    Container(
                                      width: 130,
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
                                              if (_children > 0)
                                                {
                                                  setState(() {
                                                    _children--;
                                                  })
                                                },
                                            },
                                          ),
                                          Text('$_children',
                                              style: TextStyle(fontSize: 18)),
                                          IconButton(
                                            icon: const Icon(Icons.add),
                                            onPressed: () => {
                                              setState(() {
                                                _children++;
                                              })
                                            },
                                          ),
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Flexible(
                                        child: Text(
                                          'Pets',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black,
                                          ),
                                        )),
                                    Container(
                                      width: 130,
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
                                              if (_pets > 0)
                                                {
                                                  setState(() {
                                                    _pets--;
                                                  })
                                                },
                                            },
                                          ),
                                          Text('$_pets',
                                              style: TextStyle(fontSize: 18)),
                                          IconButton(
                                            icon: const Icon(Icons.add),
                                            onPressed: () => {
                                              setState(() {
                                                _pets++;
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
                              'Apply',
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