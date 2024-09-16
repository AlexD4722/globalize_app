import 'package:flutter/material.dart';

class CardItem extends StatefulWidget {
  const CardItem({
    super.key,
    required this.image,
    required this.title,
    required this.address,
    required this.money,
    required this.rating,
  });

  final String image;
  final String title;
  final String address;
  final double money;
  final double rating;

  @override
  _CardItemState createState() => _CardItemState();
}

class _CardItemState extends State<CardItem> {
  late String _image;
  late String _title;
  late String _address;
  late double _money;
  late double _rating;

  @override
  void initState() {
    super.initState();
    _image = widget.image;
    _title = widget.title;
    _address = widget.address;
    _money = widget.money;
    _rating = widget.rating;
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      ClipRRect(
        borderRadius: BorderRadius.circular(12.0), // Set the desired radius
        child:AspectRatio(
          aspectRatio: 3 / 3, // Set aspect ratio to 3:4
          child: Image.asset(
            _image, // Replace with your image URL
            width: double.infinity,
            fit: BoxFit.cover,
          ),
        ),
      ),
      Padding(
        padding: const EdgeInsets.symmetric(vertical: 5),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              _address,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w400,
                color: Color(0xFF7B7B7B),
              ),
            ),
            Row(
              children: [
                const Icon(Icons.star, color: Colors.black, size: 12),
                const SizedBox(width: 5),
                Text('$_rating'),
              ],
            ),
          ],
        ),
      ),
      Text(
        _title,
        style: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          color: Colors.black,
        ),
      ),
      const SizedBox(height: 5),
      Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        textBaseline: TextBaseline.alphabetic,
        children: [
          const Icon(Icons.attach_money, color: Colors.black, size: 13),
          const SizedBox(width: 2),
          Text('$_money', style: const TextStyle(fontSize: 12)),
          const SizedBox(width: 2),
          const Text(
            'per night',
            style: TextStyle(
              fontSize: 12,
              color: Color(0xFF7B7B7B),
            ),
          ),
        ],
      ),
      const SizedBox(height: 5),
      // Text(category.name)
    ]);
    // return SizedBox(
    //   child: Card(
    //     color: Colors.white,
    //     elevation: 0,
    //     child: Column(
    //       crossAxisAlignment: CrossAxisAlignment.start,
    //       children: [
    //         Container(
    //           decoration: BoxDecoration(
    //             borderRadius: BorderRadius.circular(10),
    //           ),
    //           clipBehavior: Clip.hardEdge,
    //           child: AspectRatio(
    //             aspectRatio: 3 / 3, // Set aspect ratio to 3:4
    //             child: Image.asset(
    //               _image, // Replace with your image URL
    //               width: double.infinity,
    //               fit: BoxFit.cover,
    //             ),
    //           ),
    //         ),
    //         Padding(
    //           padding: const EdgeInsets.symmetric(vertical: 5),
    //           child: Row(
    //             mainAxisAlignment: MainAxisAlignment.spaceBetween,
    //             children: [
    //               Text(
    //                 _address,
    //                 style: const TextStyle(
    //                   fontSize: 12,
    //                   fontWeight: FontWeight.w400,
    //                   color: Color(0xFF7B7B7B),
    //                 ),
    //               ),
    //               Row(
    //                 children: [
    //                   const Icon(Icons.star, color: Colors.black, size: 12),
    //                   const SizedBox(width: 5),
    //                   Text('$_rating'),
    //                 ],
    //               ),
    //             ],
    //           ),
    //         ),
    //         Text(
    //           _title,
    //           style: const TextStyle(
    //             fontSize: 12,
    //             fontWeight: FontWeight.w400,
    //             color: Colors.black,
    //           ),
    //         ),
    //         const SizedBox(height: 5),
    //         Row(
    //           crossAxisAlignment: CrossAxisAlignment.center,
    //           textBaseline: TextBaseline.alphabetic,
    //           children: [
    //             const Icon(Icons.attach_money, color: Colors.black, size: 13),
    //             const SizedBox(width: 2),
    //             Text('$_money', style: const TextStyle(fontSize: 12)),
    //             const SizedBox(width: 2),
    //             const Text(
    //               'per night',
    //               style: TextStyle(
    //                 fontSize: 12,
    //                 color: Color(0xFF7B7B7B),
    //               ),
    //             ),
    //           ],
    //         ),
    //         const SizedBox(height: 5),
    //       ],
    //     ),
    //   ),
    // );
  }
}
