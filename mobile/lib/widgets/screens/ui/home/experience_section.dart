import 'package:flutter/material.dart';

class ExperienceSection extends StatelessWidget {
  const ExperienceSection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const Text(
          'Experience',
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
          softWrap: true,
          overflow: TextOverflow.ellipsis,
        ),
        const Padding(padding: EdgeInsets.only(right: 0, bottom: 10.0)),
        const Row(children: [
          Icon(Icons.circle, size: 5),
          Padding(padding: EdgeInsets.only(right: 10)),
          Expanded(
            child: Text(
              'No hidden fees',
              style: TextStyle(
                fontSize: 12,
              ),
              softWrap: true,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ]),
        const Padding(padding: EdgeInsets.only(right: 0, bottom: 5.0)),
        const Row(children: [
          Icon(Icons.circle, size: 5),
          Padding(padding: EdgeInsets.only(right: 10)),
          Expanded(
            child: Text(
              'Wide range of choices.',
              style: TextStyle(
                fontSize: 12,
              ),
              softWrap: true,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ]),
        Padding(padding: EdgeInsets.only(right: 0, bottom: 5.0)),
        const Row(children: [
          Icon(Icons.circle, size: 5),
          Padding(padding: EdgeInsets.only(right: 10)),
          Expanded(
            child: Text(
              'Experience',
              style: TextStyle(
                fontSize: 12,
              ),
              softWrap: true,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ]),
        const Padding(padding: EdgeInsets.only(right: 0, bottom: 20.0)),
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
          ),
          clipBehavior: Clip.hardEdge,
          child: AspectRatio(
            aspectRatio: 5 / 3,
            child: Image.asset(
              "lib/assets/images/julian.jpg",
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
        ),
      ],
    );
  }
}
