import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../data/search_param.dart';

class Search with ChangeNotifier {
  SearchParams? _searchParams;

  SearchParams? get searchParams => _searchParams;

  Map<String, dynamic> getSearchParamsValues() {
    return {
      'city': _searchParams?.city,
      'from': _searchParams?.from,
      'to': _searchParams?.to,
      'adults': _searchParams?.adults,
      'children': _searchParams?.children,
      'pets': _searchParams?.pets,
      'minPrice': _searchParams?.minPrice,
      'maxPrice': _searchParams?.maxPrice,
      'sort': _searchParams?.sort,
      'minRating': _searchParams?.minRating,
      'facility': _searchParams?.facility,
      'roomType': _searchParams?.roomType,
    };
  }

  void initializeSearchParams() {
    final today = DateFormat('dd/MM/yyyy').format(DateTime.now());
    final tomorrow = DateFormat('dd/MM/yyyy').format(DateTime.now().add(const Duration(days: 1)));
    _searchParams = SearchParams(
        city: 'Hà Nội',
        from: today,
        to: tomorrow,
        adults: 2,
        children: 0,
        pets: 0,
        minPrice: 1,
        maxPrice: 9000,
        sort: 'Our top picks');
    notifyListeners();
  }

  void setSearchParams(SearchParams searchParams) {
    _searchParams = searchParams;
    notifyListeners();
  }

  void clearSearchParams() {
    _searchParams = null;
    notifyListeners();
  }

  void updateSearchParams({
    String? city,
    String? from,
    String? to,
    int? adults,
    int? children,
    int? pets,
    double? minPrice,
    double? maxPrice,
    String? sort,
    String? minRating,
    List<String>? facility,
    List<String>? roomType,
  }) {
    if (_searchParams != null) {
      _searchParams = SearchParams(
        city: city ?? _searchParams!.city,
        from: from ?? _searchParams!.from,
        to: to ?? _searchParams!.to,
        adults: adults ?? _searchParams!.adults,
        children: children ?? _searchParams!.children,
        pets: pets ?? _searchParams!.pets,
        minPrice: minPrice ?? _searchParams!.minPrice,
        maxPrice: maxPrice ?? _searchParams!.maxPrice,
        sort: sort ?? _searchParams!.sort,
        minRating: minRating ?? _searchParams!.minRating,
        facility: facility ?? _searchParams!.facility,
        roomType: roomType ?? _searchParams!.roomType,
      );
      notifyListeners();
    }
  }
}
