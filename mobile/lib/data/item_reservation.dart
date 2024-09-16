class ItemReservation {
  String id; // Add the id field
  String image;
  String name;
  String price;
  String dateCheckIn;
  String dateCheckOut;
  int capacity;
  String status;

  ItemReservation({
    required this.id, // Include id in the constructor
    required this.image,
    required this.name,
    required this.price,
    required this.dateCheckIn,
    required this.dateCheckOut,
    required this.capacity,
    required this.status,
  });

  factory ItemReservation.fromJson(Map<String, dynamic> json) {
    return ItemReservation(
      id: json['id'],
      image: json['roomPicture'],
      name: json['name'],
      price: json['price'],
      dateCheckIn: json['dateCheckIn'],
      dateCheckOut: json['dateCheckOut'],
      capacity: json['capacity'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id, // Include id in JSON
      'roomPicture': image,
      'name': name,
      'price': price,
      'dateCheckIn': dateCheckIn,
      'dateCheckOut': dateCheckOut,
      'capacity': capacity,
      'status': status,
    };
  }

  @override
  String toString() {
    return 'ItemReservation(id: $id, image: $image, name: $name,, price: $price, dateCheckIn: $dateCheckIn, dateCheckOut: $dateCheckOut, capacity: $capacity, status: $status)';
  }
}