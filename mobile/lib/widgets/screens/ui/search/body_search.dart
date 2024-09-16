import 'package:flutter/cupertino.dart';

import '../../../../data/item_search.dart';
import 'layout_item.dart';

class BodySearch extends StatelessWidget {
  final Future<List<ItemSearch>> items;

  const BodySearch({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 130),
      child: LayoutItem(items: items),
    );
  }
}
