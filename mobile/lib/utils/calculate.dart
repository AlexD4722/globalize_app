import '../data/cart.dart';

double calculateTotalPrice(
    List<RoomCart> roomCarts, DateTime checkInDate, DateTime checkOutDate) {
  int numberOfNights = checkOutDate.difference(checkInDate).inDays;
  return roomCarts.fold(
      0.00,
          (total, element) =>
      total + element.room.price * element.quantity * numberOfNights);
}