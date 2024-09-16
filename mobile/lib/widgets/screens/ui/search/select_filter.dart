import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SelectFilter extends StatefulWidget {
  const SelectFilter({
    super.key,
  });

  @override
  _SelectFilterState createState() => _SelectFilterState();
}

class _SelectFilterState extends State<SelectFilter> {
  String? _selectedOption;
  final List<String> _options = [
    'Our top picks',
    'Price (low to high)',
    'Price (high to low)',
    'Top reviewed'
  ];

  @override
  void initState() {
    super.initState();
  }

  void _submit() {
    setState(() {});
  }

  void _selectOption(String option) {
    setState(() {
      _selectedOption = option;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      SizedBox(
        height: 20,
        width: double.infinity,
        // color: Colors.amber,
        child: Center(
          child: Container(
            width: 40,
            height: 5,
            decoration: BoxDecoration(
              color: Colors.grey,
              borderRadius: BorderRadius.circular(2.5),
            ),
          ),
        ),
      ),
      Expanded(
        child: Container(
          width: double.infinity,
          color: Colors.white,
          child: Padding(
            padding: EdgeInsets.only(left: 15, right: 15),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const Text(
                  'Sort By: ',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: _options.length,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          _selectOption(_options[index]);
                          Navigator.of(context).pop();
                        },
                        child: InkWell(
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  _options[index],
                                  style: const TextStyle(
                                    fontSize: 15,
                                    color: Colors.black,
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Icon(
                                  _selectedOption == _options[index]
                                      ? Icons.radio_button_checked
                                      : Icons.radio_button_unchecked,
                                  color: _selectedOption == _options[index]
                                      ? Colors.blue
                                      : Colors.black,
                                  size: 16,
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    ]);
  }
}
