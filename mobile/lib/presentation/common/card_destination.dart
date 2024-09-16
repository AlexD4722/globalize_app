import 'package:flutter/material.dart';

class CardDestination extends StatefulWidget {
  const CardDestination({
    super.key,
    required this.image,
    required this.title,
  });

  final String image;
  final String title;

  @override
  _CardDestinationState createState() => _CardDestinationState();
}

class _CardDestinationState extends State<CardDestination> {
  late String _image;
  late String _title;

  @override
  void initState() {
    super.initState();
    _image = widget.image;
    _title = widget.title;
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      ClipRRect(
        borderRadius: BorderRadius.circular(12.0), // Set the desired radius
        child: AspectRatio(
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
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const Icon(
              Icons.location_on,
              color: Colors.black,
              size: 12,
            ),
            Expanded(
              child: Text(
                _title,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w400,
                  color: Colors.black,
                ),
              ),
            ),
          ],
        ),
      ),

      // Text(category.name)
    ]);
  }
}
