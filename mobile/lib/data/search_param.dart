class SearchParams {
  final String city;
  final String from;
  final String to;
  final int adults;
  final int children;
  final int pets;
  final double minPrice;
  final double maxPrice;
  final String sort;
  final String? minRating;
  final List<String>? facility;
  final List<String>? roomType;

  SearchParams({
    required this.city,
    required this.from,
    required this.to,
    required this.adults,
    required this.children,
    required this.pets,
    required this.minPrice,
    required this.maxPrice,
    required this.sort,
    this.minRating,
    this.facility,
    this.roomType
  });

  Map<String, dynamic> toMap() {
    return {
      'city': city,
      'from': from,
      'to': to,
      'adults': adults,
      'children': children,
      'pets': pets,
      'minPrice': minPrice,
      'maxPrice': maxPrice,
      'sort': sort,
      'minRating': minRating,
      'facility': facility,
      'roomType': roomType,
    };
  }

  SearchParams copyWith({
    String? city,
    String? from,
    String? to,
    int? adults,
    int? children,
    int? pets,
    double? minPrice,
    double? maxPrice,
    String? sort,
    String? minRating,
    List<String>? facility,
  }) {
    return SearchParams(
      city: city ?? this.city,
      from: from ?? this.from,
      to: to ?? this.to,
      adults: adults ?? this.adults,
      children: children ?? this.children,
      pets: pets ?? this.pets,
      minPrice: minPrice ?? this.minPrice,
      maxPrice: maxPrice ?? this.maxPrice,
      sort: sort ?? this.sort,
      minRating: minRating ?? this.minRating,
      facility: facility ?? this.facility,
    );
  }
}
