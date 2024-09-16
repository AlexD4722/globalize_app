import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../presentation/common/double_range_slider.dart';
import '../../../../providers/search.dart';
import '../../search_results_screen.dart';
import 'box_select.dart';

class FilterPage extends StatefulWidget {
  @override
  _FilterPageState createState() => _FilterPageState();
}

class _FilterPageState extends State<FilterPage> {
  late double _minPrice = 0.0;
  late double _maxPrice = 0.0;
  late String _minRating = '';
  late List<String> _facility = [];
  late List<String> _roomType = [];

  @override
  void initState() {
    super.initState();
    final searchProvider = Provider.of<Search>(context, listen: false);
    _minPrice = searchProvider.getSearchParamsValues()['minPrice'].toDouble();
    _maxPrice = searchProvider.getSearchParamsValues()['maxPrice'].toDouble();
    _minRating = searchProvider.getSearchParamsValues()['minRating'] ?? "";
    _facility = searchProvider.getSearchParamsValues()['facility'] ?? [];
    _roomType = searchProvider.getSearchParamsValues()['roomType'] ?? [];
  }

  @override
  Widget build(BuildContext context) {
    void _handleChangedValueRange(RangeValues values) {
      setState(() {
        _minPrice = values.start;
        _maxPrice = values.end;
      });
    }

    void _submitFilter() {
      var searchProvider = Provider.of<Search>(context, listen: false);
      searchProvider.updateSearchParams(
          minPrice: _minPrice,
          maxPrice: _maxPrice,
          minRating: _minRating ?? null,
          facility: _facility,
          roomType: _roomType);
      Navigator.of(context).pop();
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFF43F5E),
        elevation: 4.0,
        shadowColor: const Color(0x1F000000),
        iconTheme: const IconThemeData(color: Color(0xFFFFFFFF)),
        actionsIconTheme: const IconThemeData(color: Color(0xFFF43F5E)),
        title: const Text('Filter', style: TextStyle(color: Colors.white)),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Center(
                child: DoubleRangeSlider(
                  initialValues: RangeValues(_minPrice, _maxPrice),
                  min: 1,
                  max: 9000,
                  step: 10,
                  onChangedValueRange: _handleChangedValueRange,
                  onSubmitFilter: _submitFilter,
                ),
              ),
              BoxSelect(
                title: 'Room type',
                options: const [
                  {'name': 'Hotels', 'value': 'hotels'},
                  {'name': 'Apartments', 'value': 'apartments'},
                  {'name': 'Resorts', 'value': 'resorts'},
                  {'name': 'Villas', 'value': 'villas'},
                  {'name': 'Bed Breakfasts', 'value': 'bed_breakfasts'},
                ],
                onSelectBox: (selectedOptions) {
                  setState(() {
                    _roomType = selectedOptions;
                  });
                },
                multiSelect: true,
                keyString: 'roomType',
              ),
              BoxSelect(
                title: 'Review score',
                keyString: "minRating",
                options: const [
                  {'name': 'Excellent: 9+', 'value': '9'},
                  {'name': 'Very good: 8+', 'value': '8'},
                  {'name': 'Good: 7+', 'value': '7'},
                  {'name': 'Pleasant: 6+', 'value': '6'},
                  {'name': 'Pleasant: 5+', 'value': '5'},
                ],
                onSelectBox: (selectedOptions) {
                  setState(() {
                    _minRating = selectedOptions[0];
                  });
                },
                multiSelect: false,
              ),
              BoxSelect(
                title: 'Facilities',
                keyString: "facility",
                options: const [
                  {'name': 'Non-smoking room', 'value': 'non_smoking_room'},
                  {'name': 'Pets allowed', 'value': 'pets_allowed'},
                  {'name': 'Parking', 'value': 'parking'},
                  {'name': 'Free WiFi', 'value': 'free_wifi'},
                  {'name': 'Spa and wellness centre', 'value': 'spa_wellness'},
                  {'name': 'Fitness centre', 'value': 'fitness_centre'},
                  {'name': 'Restaurant', 'value': 'restaurant'},
                  {'name': 'Swimming Pool', 'value': 'swimming_pool'},
                ],
                onSelectBox: (selectedOptions) {
                  setState(() {
                    _facility = selectedOptions;
                  });
                },
                multiSelect: true,
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
          onPressed: _submitFilter,
          backgroundColor: const Color(0xFFF43F5E),
          child: const Icon(Icons.search_outlined, color: Color(0xFFFFFFFF))),
    );
  }
}
