import 'package:booking_platform_app/data/property_detail.dart';
import 'package:booking_platform_app/data/room_card.dart';

class RoomCart {
  final Room room;
  final int quantity;
  RoomCart({required this.room, required this.quantity});
  String toString () {
    return "Room: ${room.id}, Quantity: $quantity";
  }
}
class PropertyCart {
  final PropertyDetail  propertyDetail;
  final List<RoomCart> carts;
  PropertyCart({required this.propertyDetail,  required this.carts});
  String toString () {
    return "Property: ${propertyDetail.id}, Carts: $carts";
  }
}