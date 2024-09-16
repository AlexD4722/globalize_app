import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../providers/search.dart';

class BoxSelect extends StatefulWidget {
  final List<Map<String, String>> options;
  final bool multiSelect;
  final String title;
  final String keyString;
  final void Function(List<String>) onSelectBox;

  const BoxSelect({
    super.key,
    required this.options,
    required this.multiSelect,
    required this.title,
    required this.onSelectBox,
    required this.keyString,
  });

  @override
  _BoxSelectState createState() => _BoxSelectState();
}

class _BoxSelectState extends State<BoxSelect> {
  late List<String> _selectedOptions = [];

  @override
  void initState() {
    super.initState();
    final searchProvider =
        Provider.of<Search>(context, listen: false).getSearchParamsValues();
    if (widget.multiSelect) {
      if (searchProvider[widget.keyString] != null) {
        setState(() {
          _selectedOptions =
              List<String>.from(searchProvider[widget.keyString]);
        });
      }
    } else {
      if (searchProvider[widget.keyString] != null) {
        setState(() {
          _selectedOptions = [searchProvider[widget.keyString]];
        });
      }
    }
    // widget.onSelectBox(_selectedOptions);
  }

  void _clearSelection() {
    setState(() {
      _selectedOptions = [];
    });
    var searchProvider = Provider.of<Search>(context, listen: false);
    switch (widget.keyString) {
      case 'facility':
        searchProvider.updateSearchParams(facility: null);
        break;
      case 'roomType':
        searchProvider.updateSearchParams(roomType: null);
        break;
      case 'minRating':
        searchProvider.updateSearchParams(minRating: null);
        break;
    }
    widget.onSelectBox(_selectedOptions);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.title,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
                softWrap: true,
                overflow: TextOverflow.ellipsis,
              ),
              TextButton(
                onPressed: _clearSelection,
                child: const Text('Clear',
                    style: TextStyle(color: Color(0xFFF43F5E))),
              ),
            ],
          ),
        ),
        ...widget.options.map((option) {
          return CheckboxListTile(
            title: Text(option['name']!),
            value: _selectedOptions.contains(option['value']),
            onChanged: (bool? value) {
              setState(() {
                if (value == true) {
                  if (widget.multiSelect) {
                    _selectedOptions.add(option['value']!);
                  } else {
                    _selectedOptions = [option['value']!];
                  }
                } else {
                  _selectedOptions.remove(option['value']);
                }
                widget.onSelectBox(_selectedOptions);
              });
            },
            controlAffinity: ListTileControlAffinity.leading,
            activeColor: const Color(0xFFF43F5E), // Set the check color to red
          );
        }).toList(),
      ],
    );
  }
}
