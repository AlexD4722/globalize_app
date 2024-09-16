import 'package:flutter/cupertino.dart';

class Indicator extends StatefulWidget {
  const Indicator({
    super.key,
  });
  @override
  _IndicatorState createState() => _IndicatorState();
}

class _IndicatorState extends State<Indicator> {
  bool? isActive;

  @override
  void initState() {
    super.initState();
    isActive = false;
    _startAsyncOperation();
  }

  void _startAsyncOperation() {
    Future.delayed(const Duration(milliseconds: 500), () {
      if (mounted) {
        setState(() {
          isActive = true;
        });
      }
    });
  }

  @override
  void dispose() {
    // Dispose of any listeners or asynchronous operations here
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      margin: const EdgeInsets.symmetric(horizontal: 8),
      height: 5,
      width: (isActive ?? false) ? 40 : 0,
      decoration: BoxDecoration(
        color: (isActive ?? false)
            ? const Color(0xFF7C7C7C)
            : const Color(0xFFC4C4C4),
        borderRadius: BorderRadius.circular(4),
      ),
    );
  }
}