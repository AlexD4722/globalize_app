import 'package:board_datetime_picker/board_datetime_picker.dart';
import 'package:flutter/material.dart';

class PickerMultiSelectionItemWidget extends StatelessWidget {
  PickerMultiSelectionItemWidget({
    super.key,
    required this.pickerType,
  });

  final DateTimePickerType pickerType;

  final ValueNotifier<DateTime> start = ValueNotifier(DateTime.now());
  final ValueNotifier<DateTime> end = ValueNotifier(
    DateTime.now().add(const Duration(days: 1)),
  );

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () async {
          final result = await showBoardDateTimeMultiPicker(
            context: context,
            pickerType: pickerType,
            options: const BoardDateTimeOptions(
              languages: BoardPickerLanguages.en(),
              startDayOfWeek: DateTime.sunday,
              pickerFormat: PickerFormat.dmy,
            ),

            // minimumDate: DateTime.now(),
          );
          if (result != null) {
            start.value = result.start;
            end.value = result.end;
          }
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
          child: Row(
            children: [
              Material(
                color: pickerType.color,
                borderRadius: BorderRadius.circular(8),
                child: SizedBox(
                  height: 32,
                  width: 32,
                  child: Center(
                    child: Icon(
                      pickerType.icon,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  pickerType.title,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  ValueListenableBuilder(
                    valueListenable: start,
                    builder: (context, data, _) {
                      return Text(
                        BoardDateFormat(pickerType.format).format(data),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                      );
                    },
                  ),
                  const SizedBox(height: 4),
                  ValueListenableBuilder(
                    valueListenable: end,
                    builder: (context, data, _) {
                      return Text(
                        '~ ${BoardDateFormat(pickerType.format).format(data)}',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

extension DateTimePickerTypeExtension on DateTimePickerType {
  String get title {
    switch (this) {
      case DateTimePickerType.date:
        return 'Date';
      case DateTimePickerType.datetime:
        return 'DateTime';
      case DateTimePickerType.time:
        return 'Time';
    }
  }

  IconData get icon {
    switch (this) {
      case DateTimePickerType.date:
        return Icons.date_range_rounded;
      case DateTimePickerType.datetime:
        return Icons.date_range_rounded;
      case DateTimePickerType.time:
        return Icons.schedule_rounded;
    }
  }

  Color get color {
    switch (this) {
      case DateTimePickerType.date:
        return Colors.blue;
      case DateTimePickerType.datetime:
        return Colors.orange;
      case DateTimePickerType.time:
        return Colors.pink;
    }
  }

  String get format {
    switch (this) {
      case DateTimePickerType.date:
        return 'yyyy/MM/dd';
      case DateTimePickerType.datetime:
        return 'yyyy/MM/dd HH:mm';
      case DateTimePickerType.time:
        return 'HH:mm';
    }
  }

  String formatter({bool withSecond = false}) {
    switch (this) {
      case DateTimePickerType.date:
        return 'yyyy/MM/dd';
      case DateTimePickerType.datetime:
        return 'yyyy/MM/dd HH:mm';
      case DateTimePickerType.time:
        return withSecond ? 'HH:mm:ss' : 'HH:mm';
    }
  }
}
