import 'dart:ui';

import 'package:flutter/material.dart';

class ButtonAppbarBody extends StatelessWidget {
  final String title;
  final int buttonIndex;
  final int selectedButtonIndex;
  final void Function(int) onButtonPressed;

  const ButtonAppbarBody({
    super.key,
    required this.buttonIndex,
    required this.onButtonPressed,
    required this.selectedButtonIndex,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => onButtonPressed(buttonIndex),
      style: TextButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 20),
        backgroundColor: selectedButtonIndex == buttonIndex
            ? const Color(0xFFFADBE0)
            : Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(100),
        ),
      ),
      child: Center(
        child: Text(title,
            style: TextStyle(
                color: selectedButtonIndex == buttonIndex
                    ? const Color(0xFFF43F5E)
                    : Colors.black)),
      ),
    );
  }
}