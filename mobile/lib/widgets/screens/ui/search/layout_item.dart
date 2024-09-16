// lib/widgets/screens/ui/search/layout_item.dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../data/item_search.dart';
import '../../../../presentation/common/card_item_search.dart';

class LayoutItem extends StatelessWidget {
  final Future<List<ItemSearch>> items;

  const LayoutItem({super.key, required this.items});


  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: FutureBuilder<List<ItemSearch>>(
        future: items,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No items found'));
          } else {
            return SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                      padding: const EdgeInsets.only(left: 10, bottom: 10),
                      child: Text(
                        'Result: ${snapshot.data!.length} item',
                        style: const TextStyle(fontSize: 12),
                      ),
                  ),
                  ...snapshot.data!
                      .map((item) => CardItemSearch(item: item))
                      .toList(),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}
