class AmenityCategory {
  final int id;
  final String name;

  AmenityCategory({required this.id, required this.name});

  factory AmenityCategory.fromJson(Map<String, dynamic> json) {
    return AmenityCategory(
      id: json['id'],
      name: json['name'],
    );
  }
}

class Amenity {
  final int id;
  final String? name;
  final AmenityCategory amenityCategory;

  Amenity({required this.id, this.name, required this.amenityCategory});

  factory Amenity.fromJson(Map<String, dynamic> json) {
    return Amenity(
      id: json['id'],
      name: json['name'],
      amenityCategory: AmenityCategory.fromJson(json['amenityCategory']),
    );
  }
}

class Room {
  final String id;
  final String name;
  final double price;
  final String picture;
  final String description;
  final int maxGuest;
  final double area;
  final int floor;
  final List<Amenity> amenities;

  Room({
    required this.id,
    required this.name,
    required this.price,
    required this.picture,
    required this.description,
    required this.maxGuest,
    required this.area,
    required this.floor,
    required this.amenities,
  });

  factory Room.fromJson(Map<String, dynamic> json) {
    var amenitiesList = json['amenities'] as List;
    List<Amenity> amenities = amenitiesList.map((i) => Amenity.fromJson(i)).toList();

    return Room(
      id: json['id'],
      name: json['name'],
      price: json['price'].toDouble(),
      picture: json['picture'],
      description: json['description'],
      maxGuest: json['maxGuest'],
      area: json['area'],
      floor: json['floor'],
      amenities: amenities,
    );
  }
}