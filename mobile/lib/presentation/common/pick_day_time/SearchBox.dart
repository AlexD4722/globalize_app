import 'package:booking_platform_app/presentation/common/quantity_form.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../providers/search.dart';
import '../calendar_form.dart';

class SearchBox extends StatefulWidget {
  final void Function(BuildContext)? onNextPage;
  final void Function()? moveSearchScreen;

  const SearchBox({
    super.key,
    this.onNextPage, this.moveSearchScreen,
  });

  @override
  SearchBoxState createState() => SearchBoxState();
}

class SearchBoxState extends State<SearchBox> {
  late String _address;
  late String _startDate;
  late String _endDate;
  late int _guestNumber;
  late int _aldults;
  late int _children;
  late int _pets;

  @override
  void initState() {
    final searchParams =
        Provider.of<Search>(context, listen: false).searchParams!;
    super.initState();
    _address = searchParams.city;
    _startDate = searchParams.from;
    _endDate = searchParams.to;
    _guestNumber = searchParams.adults + searchParams.children;
    _aldults = searchParams.adults;
    _children = searchParams.children;
    _pets = searchParams.pets;
  }

  void _handleQuantityChange(Map<String, int> newQuantity) {
    setState(() {
      _guestNumber = newQuantity["adults"]! + newQuantity["children"]!;
      _aldults = newQuantity["adults"]!;
      _children = newQuantity["children"]!;
      _pets = newQuantity["pets"]!;
    });
  }

  void _handleDayChange(Map<String, String> dateRange) {
    setState(() {
      _startDate = dateRange['startDate'] ?? _startDate;
      _endDate = dateRange['endDate'] ?? _endDate;
    });
  }

  Future<void> _handleSubmit() async {
    var searchProvider = Provider.of<Search>(context, listen: false);
    searchProvider.updateSearchParams(
        city: _address,
        from: _startDate,
        to: _endDate,
        adults: _aldults,
        children: _children,
        pets: _pets);
    widget.onNextPage!(context);
    widget.moveSearchScreen?.call();
  }

  void _showQuantityPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (BuildContext context) {
        return Container(
            width: double.infinity,
            // color: Colors.white,
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(20),
                topRight: Radius.circular(20),
              ),
            ),
            child: SizedBox(
                height: 270,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: QuantityInput(
                      onQuantityChanged: _handleQuantityChange,
                      adults: _aldults,
                      children: _children,
                      pets: _pets),
                )));
      },
    );
  }

  void _handleAddressChange(String newAddress) {
    if (newAddress.isEmpty) {
      setState(() {
        _address = "ha noi";
      });
    } else {
      setState(() {
        _address = newAddress;
      });
    }
  }

  void _showDatePicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (BuildContext context) {
        return Container(
            width: double.infinity,
            // color: Colors.white,
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(20),
                topRight: Radius.circular(20),
              ),
            ),
            child: CalendarForm(
              endDate: _endDate,
              startDate: _startDate,
              onDateChanged: _handleDayChange,
            ));
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(5),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              // Set border radius
              color: const Color(0xFFE8E8E8),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                    onChanged: _handleAddressChange,
                    decoration: InputDecoration(
                      hintText: _address,
                      prefixIcon: const Icon(Icons.bed_outlined,
                          color: Color(0xFF7C7C7C)),
                      fillColor: Colors.white,
                      filled: true,
                      enabledBorder: OutlineInputBorder(
                        // borderSide: const BorderSide(color: Color(0xFFCCCCCC), width: 2.0),
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.circular(5),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        // borderSide: const BorderSide(color: Color(0xFFCCCCCC), width: 2.0),
                        borderRadius: BorderRadius.circular(5),
                      ),
                    )),
                const SizedBox(
                  width: double.infinity,
                  height: 5,
                ),
                GestureDetector(
                  onTap: () => _showDatePicker(context),
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.white,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        const Icon(Icons.calendar_month_sharp,
                            color: Color(0xFF7C7C7C)),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Row(
                            mainAxisAlignment:
                            MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment:
                                CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Day Start',
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.black,
                                    ),
                                  ),
                                  Text(
                                    _startDate.isEmpty
                                        ? "DD/MM/YYYY"
                                        : _startDate,
                                    style: const TextStyle(
                                      fontSize: 14,
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                              // SizedBox(width: 20),
                              Column(
                                crossAxisAlignment:
                                CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    "Day End",
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.black,
                                    ),
                                  ),
                                  Text(
                                    _endDate.isEmpty
                                        ? "DD/MM/YYYY"
                                        : _endDate,
                                    style: const TextStyle(
                                      fontSize: 14,
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  width: double.infinity,
                  height: 5,
                ),
                GestureDetector(
                  onTap: () => _showQuantityPicker(context),
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.white,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        const Icon(Icons.person_outlined,
                            color: Color(0xFF7C7C7C)),
                        const SizedBox(width: 10),
                        Text('Guest Number: $_guestNumber'),
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  width: double.infinity,
                  height: 5,
                ),
                Container(
                  height: 40,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color(0xFFF43F5E),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: TextButton(
                      onPressed: () {
                        _handleSubmit();
                      },
                      child: const Center(
                        child: Text(
                          'Search',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Colors.white,
                          ),
                        ),
                      )),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
