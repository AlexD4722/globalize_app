import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../presentation/common/pick_day_time/SearchBox.dart';
import '../../../../router/routers.dart';
import '../../search_results_screen.dart';

class FormSearch extends StatelessWidget {
  const FormSearch({super.key});

  void _handleNextResult(BuildContext context) {
    Navigator.of(context).push(
      PageRouteBuilder(
        settings: const RouteSettings(name: Routes.searchResults),
        pageBuilder: (context, animation, secondaryAnimation) =>
            const SearchResultsScreen(),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          const begin = Offset(1.0, 0.0);
          const end = Offset.zero;
          const curve = Curves.ease;

          var tween =
              Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
          var offsetAnimation = animation.drive(tween);

          return SlideTransition(
            position: offsetAnimation,
            child: child,
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 20, bottom: 20),
      child:  SearchBox(
        onNextPage: _handleNextResult,
      )
    );
  }
}
