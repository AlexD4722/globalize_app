import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';

import '../../../../presentation/common/pick_day_time/SearchBox.dart';
import '../../../../providers/search.dart';
import '../../search_results_screen.dart';

class PickSearchForm extends StatefulWidget {
  const PickSearchForm({super.key});

  @override
  _PickSearchFormState createState() => _PickSearchFormState();
}

class _PickSearchFormState extends State<PickSearchForm> {
  void _handleNextResult(BuildContext context, Map<String, String> dateRange) {
    Navigator.of(context).push(
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) =>
            SearchResultsScreen(
            ),
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
    final searchParams = Provider.of<Search>(context, listen: false).searchParams;
    return const SearchBox(
    );
  }
}