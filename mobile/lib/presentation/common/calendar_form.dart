import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';
import 'package:intl/intl.dart';

import 'Indicator.dart';

class CalendarForm extends StatefulWidget {
  final String startDate;
  final String endDate;
  final ValueChanged<Map<String, String>> onDateChanged;

  const CalendarForm(
      {super.key,
        required this.endDate,
        required this.startDate,
        required this.onDateChanged});

  @override
  _CalendarFormState createState() => _CalendarFormState();
}

class _CalendarFormState extends State<CalendarForm> {
  late DateTime _startDate;
  late DateTime _endDate;
  DateTime? _startDateOnChange;
  DateTime? _endDateOnChange;
  String _range = '';

  @override
  void initState() {
    super.initState();
    _startDate = DateFormat('dd/MM/yyyy').parse(widget.startDate);
    _endDate = DateFormat('dd/MM/yyyy').parse(widget.endDate);
  }

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    setState(() {
      if (args.value is PickerDateRange) {
        DateTime startDate = args.value.startDate;
        DateTime endDate = args.value.endDate ?? startDate.add(Duration(days: 1));

        // Ensure the end date is at least one day after the start date
        if (endDate.isBefore(startDate.add(Duration(days: 1)))) {
          endDate = startDate.add(Duration(days: 1));
        }

        _range = '${DateFormat('dd/MM/yyyy').format(startDate)} -'
            ' ${DateFormat('dd/MM/yyyy').format(endDate)}';
        _startDateOnChange = startDate;
        _endDateOnChange = endDate;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onVerticalDragEnd: (details) {
          if (details.primaryVelocity! > 0) {
            Navigator.of(context).pop();
          }
        },
        child: SizedBox(
          height: 450,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Center(
                child: Padding(
                  padding: EdgeInsets.only(top: 10, bottom: 20),
                  child: Indicator(),
                ),
              ),
              const SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: Padding(
                    padding: EdgeInsets.only(top: 20, left: 20),
                    child: Text("Select",
                        style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Colors.black)),
                  )),
              SfDateRangePicker(
                selectionColor: const Color(0xFFF43F5E),
                startRangeSelectionColor: const Color(0xFFF43F5E),
                endRangeSelectionColor: const Color(0xFFF43F5E),
                todayHighlightColor: const Color(0xFFF43F5E),
                rangeSelectionColor: const Color(0xFFF43F5E).withOpacity(0.3),
                backgroundColor: Colors.white,
                headerStyle: const DateRangePickerHeaderStyle(
                  backgroundColor: Colors.white,
                  textAlign: TextAlign.center,
                  textStyle: TextStyle(
                    color: Color(0xFFF43F5E),
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                onSelectionChanged: _onSelectionChanged,
                selectionMode: DateRangePickerSelectionMode.range,
                initialSelectedRange: PickerDateRange(
                  _startDate,
                  _endDate,
                ),
                minDate: DateTime.now(), // Disable past dates
              ),
              Padding(
                padding: const EdgeInsets.only(left: 15, right: 15, bottom: 20),
                child: Container(
                  height: 40,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color(0xFFF43F5E),
                    borderRadius: BorderRadius.circular(2.5),
                  ),
                  child: TextButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                        setState(() {
                          _startDate = _startDateOnChange ?? _startDate;
                          _endDate = _endDateOnChange ?? _endDate;
                          widget.onDateChanged({
                            "startDate": DateFormat('dd/MM/yyyy').format(_startDate),
                            "endDate": DateFormat('dd/MM/yyyy').format(_endDate)
                          });
                        });
                      },
                      child: const Center(
                        child: Text(
                          'Select Date',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Colors.white,
                          ),
                        ),
                      )),
                ),
              )
            ],
          ),
        ));
  }
}