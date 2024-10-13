import 'package:booking_platform_app/widgets/screens/ui/search/appbar_search.dart';
import 'package:booking_platform_app/widgets/screens/ui/search/body_search.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../data/item_search.dart';
import '../../data/search_param.dart';
import '../../presentation/common/pick_day_time/SearchBox.dart';
import '../../providers/search.dart';
import '../../services/http.dart';
import '../../utils/format.dart';

class SearchResultsScreen extends StatefulWidget {
  const SearchResultsScreen({
    super.key,
  });

  @override
  _SearchResultsScreenState createState() => _SearchResultsScreenState();
}

class _SearchResultsScreenState extends State<SearchResultsScreen>
    with TickerProviderStateMixin {
  late Future<List<ItemSearch>> _futureItems;
  late SearchParams _searchParams;

  @override
  void initState() {
    super.initState();
    _searchParams = Provider.of<Search>(context, listen: false).searchParams!;
    _futureItems = fetchData(context);
    _futureItems.then((value) {
    }).catchError((error) {
      print('Error: $error');
    });
  }
  void handleClearParams() {
    Provider.of<Search>(context, listen: false).initializeSearchParams();
  }
  Future<List<ItemSearch>> fetchData(BuildContext context ) async {
    try {
      Map<String, dynamic> searchParamsValues =
          Provider.of<Search>(context, listen: false).getSearchParamsValues();
      final response = await DataClient.searchProperties(
        city: searchParamsValues['city'],
        from: convertDateFormat(searchParamsValues['from']),
        to: convertDateFormat(searchParamsValues['to']),
        adults: searchParamsValues['adults'],
        children: searchParamsValues['children'],
        pets: searchParamsValues['pets'],
        minPrice: searchParamsValues['minPrice'].toDouble(),
        maxPrice: searchParamsValues['maxPrice'].toDouble(),
        sort: searchParamsValues['sort'],
        minRating: searchParamsValues['minRating'],
        facility: searchParamsValues['facility'],
        roomType: searchParamsValues['roomType'],
      );
      print("response==========   $response.data ");
      if (response.data != null && response.data.isNotEmpty) {
        return (response.data as List)
            .map((item) => ItemSearch.fromJson(item))
            .toList();
      } else {
        return [];
      }
    } catch (e) {
      print('Error: $e');
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<Search>(
      builder: (context, search, child) {
        _searchParams = search.searchParams!;
        _futureItems = fetchData(context);

        return Scaffold(
          body: Stack(
            children: [
              BodySearch(items: _futureItems),
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: AppBar(
                  backgroundColor: const Color(0xFFF43F5E),
                  elevation: 4.0,
                  shadowColor: const Color(0x1F000000),
                  iconTheme: const IconThemeData(color: Color(0xFFF43F5E)),
                  actionsIconTheme: const IconThemeData(color: Color(0xFFF43F5E)),
                  automaticallyImplyLeading: false,
                ),
              ),
              Positioned(
                top: 30,
                left: 0,
                right: 0,
                child: AppBarSearch(
                  address: _searchParams.city,
                  startDate: _searchParams.from,
                  endDate: _searchParams.to,
                  quantity: _searchParams.children +
                      _searchParams.adults,
                  handleClearParams:  handleClearParams,
                )
              ),
            ],
          ),
        );
      },
    );
  }
}
