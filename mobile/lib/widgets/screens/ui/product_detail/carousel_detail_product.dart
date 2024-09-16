import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

import '../../../../services/http.dart';

class CarouselDetailProduct extends StatefulWidget {
  final List<String> images;
  final int current;

  const CarouselDetailProduct(
      {super.key, required this.images, required this.current});

  @override
  _CarouselDetailProductState createState() => _CarouselDetailProductState();
}

class _CarouselDetailProductState extends State<CarouselDetailProduct> {
  late int _current;

  @override
  void initState() {
    super.initState();
    _current = widget.current;
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.5),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3),
              ),
            ],
          ),
          child: CarouselSlider(
            options: CarouselOptions(
              height: 200,
              aspectRatio: 16 / 9,
              viewportFraction: 1,
              initialPage: _current,
              enableInfiniteScroll: false,
              reverse: false,
              autoPlayCurve: Curves.fastOutSlowIn,
              enlargeCenterPage: false,
              scrollDirection: Axis.horizontal,
              onPageChanged: (index, reason) {
                setState(() {
                  _current = index;
                });
              },
            ),
            items: widget.images
                .map((item) => Container(
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: NetworkImage('${DataClient.javaClientUrl}/$item'),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ))
                .toList(),
          ),
        ),
        Positioned(
          bottom: 10,
          right: 10,
          child: Container(
            padding:
                const EdgeInsets.only(top: 5, bottom: 5, left: 10, right: 10),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Stack(
              children: [
                SizedBox(
                  width: 40,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text("${_current + 1}",
                          style: const TextStyle(
                              fontSize: 15, fontWeight: FontWeight.w600)),
                      Text("${widget.images.length}",
                          style: const TextStyle(
                              fontSize: 15, fontWeight: FontWeight.w600))
                    ],
                  ),
                ),
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  child: Align(
                    alignment: Alignment.center,
                    // Căn giữa phần tử trong `Positioned`
                    child: Transform.rotate(
                      angle: 1.91986, // 90 degrees in radians
                      child: const Icon(Icons.horizontal_rule,
                          color: Colors.black),
                    ),
                  ),
                ),
              ],
            ),
          ),
        )
      ],
    );
  }
}
