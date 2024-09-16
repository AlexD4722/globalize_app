class Reservation {
  String id;
  String name;
  String dateCheckIn;
  String dateCheckOut;
  String price;
  int capacity;
  String status;

  Reservation({
    required this.id,
    required this.name,
    required this.dateCheckIn,
    required this.dateCheckOut,
    required this.price,
    required this.capacity,
    required this.status,
  });

  Reservation.fromJson(Map<String, dynamic> json)
      : id = json['id'] ?? '',
        name = json['name'] ?? '',
        dateCheckIn = json['dateCheckIn'] ?? '',
        dateCheckOut = json['dateCheckOut'] ?? '',
        price = json['price'] ?? '',
        capacity = json['capacity'] ?? 0,
        status = json['status'] ?? '';

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['dateCheckIn'] = dateCheckIn;
    data['dateCheckOut'] = dateCheckOut;
    data['price'] = price;
    data['capacity'] = capacity;
    data['status'] = status;
    return data;
  }
}
