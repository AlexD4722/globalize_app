import 'package:booking_platform_app/data/search_param.dart';
import 'package:booking_platform_app/data/token.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
class RootProvider with ChangeNotifier {
  TokensHolder? _tokensHolder;

  TokensHolder? get tokensHolder => _tokensHolder;
  String? userId = '';
  String pageIndex = 'Search';

  void setPageIndex(String index) {
    pageIndex = index;
    notifyListeners();
  }

  int getPageIndex() {
    switch (pageIndex) {
      case 'Search':
        return 0;
      case 'Reservation':
        return 1;
      case 'Profile':
        return 2;
      case 'Test':
        return 3;
      case 'Secret':
        return 1;
      default:
        return 0;
    }
  }

  void setTokensHolder(TokensHolder tokensHolder) {
    _tokensHolder = tokensHolder;
    final jwt = JWT.decode(tokensHolder.token);
    userId = jwt.payload['sub'];
    notifyListeners();
  }

  void clearTokensHolder() {
    _tokensHolder = null;
    notifyListeners();
  }


  bool get isAuthenticated => _tokensHolder != null;
}
