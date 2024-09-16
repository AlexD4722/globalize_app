import 'package:booking_platform_app/widgets/screens/ui/search/select_filter.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../presentation/common/indicator.dart';
import '../../../../presentation/common/pick_day_time/SearchBox.dart';
import '../../../../providers/search.dart';
import '../../../../router/routers.dart';
import 'filter_page.dart';

class AppBarSearch extends StatelessWidget {
  final String address;
  final String startDate;
  final String endDate;
  final int quantity;
  final Function? handleClearParams;
  final bool? isSearch;

  const AppBarSearch({
    super.key,
    required this.address,
    required this.startDate,
    required this.endDate,
    required this.quantity,
    this.handleClearParams,
    this.isSearch,
  });

  @override
  Widget build(BuildContext context) {
    void handleNextResult(BuildContext context, Map<String, String> dateRange) {
      Navigator.of(context).push(
        PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => FilterPage(),
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

    void showModalTopSheet() {
      final searchParams =
          Provider.of<Search>(context, listen: false).searchParams;
      if (searchParams != null) {
        showModalBottomSheet(
          context: context,
          isScrollControlled: true,
          builder: (BuildContext context) {
            return Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: const Color(0xFFFFFFFF),
              ),
              width: double.infinity,
              child: Padding(
                padding: const EdgeInsets.only(
                  top: 10,
                  left: 20,
                  right: 20,
                  bottom: 20,
                ),
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      const Padding(
                        padding: EdgeInsets.only(bottom: 20),
                        child: Indicator(),
                      ),
                      SearchBox(
                        onNextPage: (BuildContext context) {
                          Navigator.of(context).pop();
                        },
                        moveSearchScreen: () {
                          Navigator.popUntil(context,
                              ModalRoute.withName(Routes.searchResults));
                        },
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Please select a city and date'),
          ),
        );
      }
    }

    void showQuantityPicker(BuildContext context) {
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
              child: const SizedBox(height: 250, child: SelectFilter()));
        },
      );
    }

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 20, right: 20),
          child: GestureDetector(
            onTap: () {
              showModalTopSheet();
            },
            child: Container(
                padding:
                    const EdgeInsets.only(top: 5, bottom: 5, left: 5, right: 5),
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFFE8E8E8), width: 3),
                  borderRadius: BorderRadius.circular(5),
                  color: Colors.white,
                ),
                child:Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.black),
                      onPressed: () {
                        Navigator.of(context).pop();
                        handleClearParams?.call();
                      },
                    ),
                    Flexible(
                      child: Text(
                        address,
                        style: const TextStyle(
                          fontSize: 16,
                          color: Color(0xFF5D5D5D),
                          fontWeight: FontWeight.w500,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 4),  // Replace Padding with SizedBox for better control
                    Container(width: 2, height: 20, color: Colors.black),
                    const SizedBox(width: 4),  // Replace Padding with SizedBox for better control
                    Flexible(
                      child: Text(
                        startDate,
                        style: const TextStyle(
                          fontSize: 16,
                          color: Color(0xFF5D5D5D),
                          fontWeight: FontWeight.w500,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 10),
                    const Text(
                      'to',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Flexible(
                      child: Text(
                        endDate,
                        style: const TextStyle(
                          fontSize: 16,
                          color: Color(0xFF5D5D5D),
                          fontWeight: FontWeight.w500,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                )


            ),
          ),
        ),
        if (isSearch == true || isSearch == null)
          Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    spreadRadius: 0,
                    blurRadius: 0,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: SizedBox(
                  height: 45,
                  width: double.infinity,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 20, right: 20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(5),
                          child: GestureDetector(
                            onTap: () {
                              showQuantityPicker(context);
                            },
                            child: const Row(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Row(
                                  children: [
                                    Icon(Icons.arrow_upward_outlined,
                                        size: 14, color: Colors.black),
                                    Icon(Icons.arrow_downward_outlined,
                                        size: 14, color: Colors.black),
                                  ],
                                ),
                                SizedBox(width: 5),
                                Text("Sort",
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 14,
                                        decorationColor: Colors.white)),
                              ],
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(5),
                          child: GestureDetector(
                            onTap: () {
                              handleNextResult(context, {
                                "startDate": startDate,
                                "endDate": endDate,
                                "quantity": quantity.toString()
                              });
                            },
                            child: const Row(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Icon(Icons.filter_list_alt,
                                    size: 14, color: Colors.black),
                                SizedBox(width: 5),
                                Text("Filter",
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 14,
                                        decorationColor: Colors.white)),
                              ],
                            ),
                          ),
                        )
                      ],
                    ),
                  )))
      ],
    );
  }
}
