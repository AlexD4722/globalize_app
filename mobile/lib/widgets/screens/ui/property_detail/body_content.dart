import 'package:flutter/material.dart';
import '../../../../data/property_detail.dart';
import '../../../../data/room_card.dart';
import 'card_room.dart';
import 'carousel_detail_product.dart';
import 'information_property.dart';

class BodyContent extends StatelessWidget {
  final PropertyDetail ? property;
  final bool isLoading;
  final Future<List<Room>> roomsFuture;

  const BodyContent({super.key, required this.property, required this.isLoading, required this.roomsFuture});

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Center(child: CircularProgressIndicator());
    } else if (property == null) {
      return const Center(child: Text('No data available'));
    } else {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
              padding: const EdgeInsets.only(top: 20, left: 20, right: 20, bottom: 20),
              child: Text(
                property!.name,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              )),
          CarouselDetailProduct(images: property!.pictures, current: 0),
          Padding(
              padding: EdgeInsets.all(20), child: InformationProperty(property: property!)),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'What this place offers:',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 10, bottom: 10),
                  child: property!.facilities.isEmpty
                      ? const Text('No facilities available')
                      : Wrap(
                    spacing: 10, // Space between the children
                    runSpacing: 10, // Space between the lines
                    children: property!.facilities.map((e) => Container(
                      decoration: BoxDecoration(
                        border: Border.all(color: const Color(0xFF7B7B7B).withOpacity(0.6)),
                        borderRadius: BorderRadius.circular(30),
                      ),
                      padding: const EdgeInsets.only(top: 5, bottom: 5, left: 13, right: 13),
                      child: Text(e.name, style: const TextStyle(fontSize: 12), textAlign: TextAlign.center),
                    )).toList(),
                  ),
                ),
                Text(
                  'Available Rooms in ${property!.name}',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                FutureBuilder<List<Room>>(
                  future: roomsFuture,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                      return const Center(child: Text('No rooms available'));
                    } else {
                      final rooms = snapshot.data!;
                      return ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: rooms.length,
                        itemBuilder: (context, index) {
                          final room = rooms[index];
                          return CardRoom(room: room, propertyDetail:  property!,);
                        },
                      );
                    }
                  },
                ),
              ],
            ),
          ),
        ],
      );
    }
  }
}
