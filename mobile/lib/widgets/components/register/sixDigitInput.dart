import 'package:flutter/material.dart';

class SixDigitInput extends StatefulWidget {
  final TextEditingController controller;

  const SixDigitInput({super.key, required this.controller});

  @override
  _SixDigitInputState createState() => _SixDigitInputState();
}

class _SixDigitInputState extends State<SixDigitInput> {
  final List<FocusNode> _focusNodes = List.generate(6, (index) => FocusNode());

  @override
  void dispose() {
    for (var focusNode in _focusNodes) {
      focusNode.dispose();
    }
    super.dispose();
  }

  void _nextField(String value, int index) {
    if (value.length == 1 && index < 5) {
      _focusNodes[index + 1].requestFocus();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: List.generate(6, (index) {
        return Container(
          width: 40,
          height: 40,
          child: TextField(
            controller: TextEditingController.fromValue(
              TextEditingValue(
                text: widget.controller.text.length > index
                    ? widget.controller.text[index]
                    : '',
                selection: TextSelection.collapsed(
                  offset: widget.controller.text.length > index ? 1 : 0,
                ),
              ),
            ),
            focusNode: _focusNodes[index],
            keyboardType: TextInputType.number,
            textAlign: TextAlign.center,
            maxLength: 1,
            decoration: InputDecoration(
              counterText: '',
              border: OutlineInputBorder(),
            ),
            onChanged: (value) {
              if (value.isNotEmpty) {
                String newText = widget.controller.text.substring(0, index) + value;
                if (index + 1 < widget.controller.text.length) {
                  newText += widget.controller.text.substring(index + 1);
                }
                widget.controller.text = newText;
              }
              _nextField(value, index);
            },
          ),
        );
      }),
    );
  }
}