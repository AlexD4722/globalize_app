import 'package:flutter/material.dart';

class DoubleRangeSlider extends StatefulWidget {
  final int min;
  final int max;
  final int step;
  final RangeValues initialValues;
  final void Function(RangeValues) onChangedValueRange;
  final void Function() onSubmitFilter;

  const DoubleRangeSlider({
    super.key,
    required this.min,
    required this.max,
    required this.step,
    required this.initialValues,
    required this.onChangedValueRange,
    required this.onSubmitFilter,
  });

  @override
  _DoubleRangeSliderState createState() => _DoubleRangeSliderState();
}

class _DoubleRangeSliderState extends State<DoubleRangeSlider> {
  late RangeValues _currentRangeValues;

  @override
  void initState() {
    super.initState();
    _currentRangeValues = widget.initialValues;
  }

  void _handleChanged(RangeValues values) {
    if ((values.end - values.start) >= widget.step) {
      setState(() {
        _currentRangeValues = RangeValues(
          (values.start).round().toDouble(),
          (values.end).round().toDouble(),
        );
        widget.onChangedValueRange(_currentRangeValues);
      });
    }
  }

  void _submitFilter() {
    widget.onSubmitFilter();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 10, right: 10, top: 5, bottom: 5),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Budget (per night)",
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),
              TextButton(
                onPressed: _submitFilter,
                style: TextButton.styleFrom(
                  foregroundColor: Colors.white,
                  backgroundColor: const Color(0xFFF43F5E),
                  padding: const EdgeInsets.symmetric(
                      vertical: 3.0, horizontal: 12.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
                child: const Text('Filters', style: TextStyle(fontSize: 12)),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(left: 10, right: 10, top: 5, bottom: 5),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                width: 100,
                height: 35,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(3),
                ),
                child: Text(_currentRangeValues.start.round().toString()),
              ),
              Container(
                width: 100,
                height: 35,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(3),
                ),
                child: Text(_currentRangeValues.end.round().toString()),
              )
            ],
          ),
        ),
        RangeSlider(
          activeColor: const Color(0xFFF43F5E),
          values: _currentRangeValues,
          min: widget.min.toDouble(),
          max: widget.max.toDouble(),
          labels: RangeLabels(
            _currentRangeValues.start.round().toString(),
            _currentRangeValues.end.round().toString(),
          ),
          onChanged: _handleChanged,
        ),
      ],
    );
  }
}
