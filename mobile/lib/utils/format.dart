import 'package:intl/intl.dart';

  String convertDateFormat(String date) {
  final parts = date.split('/');
  return '${parts[0]}${parts[1]}${parts[2]}';
}
String formatDate(String date) {
  final DateFormat inputFormat = DateFormat('dd/MM/yyyy');
  final DateFormat outputFormat = DateFormat('EEE MMM dd yyyy');
  final DateTime parsedDate = inputFormat.parse(date);
  return outputFormat.format(parsedDate);
}
DateTime parseDate(String dateString) {
  final DateFormat formatter = DateFormat('dd/MM/yyyy');
  return formatter.parse(dateString);
}
String formatNumber(double price) {
  if (price == price.roundToDouble()) {
    return price.toStringAsFixed(0);
  } else {
    return price.toStringAsFixed(1);
  }
}