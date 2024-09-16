class ItemSearch {
  String  id; // Add the id field
  String image;
  String title;
  String address;
  double money;
  double rating;

  ItemSearch({
    required this.id, // Include id in the constructor
    required this.image,
    required this.title,
    required this.address,
    required this.money,
    required this.rating,
  });

  factory ItemSearch.fromJson(Map<String, dynamic> json) {
    return ItemSearch(
      id: json['id'], // Ensure id is int
      image: json['featured_picture'],
      title: json['name'],
      address: json['addressSpecific'],
      money: json['minPrice'] is double ? json['minPrice'] : double.parse(json['minPrice'].toString()), // Ensure money is int
      rating: (json['avgRating'] as num).toDouble(), // Ensure rating is double
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id, // Include id in JSON
      'image': image,
      'title': title,
      'address': address,
      'money': money,
      'rating': rating,
    };
  }

  @override
  String toString() {
    return 'ItemSearch(id: $id, image: $image, title: $title, address: $address, money: $money, rating: $rating)';
  }
}