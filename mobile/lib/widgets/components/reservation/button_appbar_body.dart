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
    return SizedBox(
      height: 50, // Set the height
      width: 50, // Set the width
      child: ElevatedButton(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all<Color>(
              selectedButtonIndex == buttonIndex
                  ? const Color(0xFFFADBE0)
                  : Colors.white),
          shadowColor: WidgetStateProperty.all<Color>(Colors.white),
          overlayColor: WidgetStateProperty.all<Color>(Colors.transparent),
          shape: WidgetStateProperty.all<OutlinedBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(100),
              side: const BorderSide(color: Colors.white, width: 1.0),
            ),
          ),
        ),
        onPressed: () => onButtonPressed(buttonIndex),
        child: Text(title,
            style: TextStyle(
                color: selectedButtonIndex == buttonIndex
                    ? const Color(0xFFF43F5E)
                    : Colors.black)),
      ),
    );
  }
}