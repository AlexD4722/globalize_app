class PropertyDetail {
  final String id;
  final String? propertyType;
  final String name;
  final String description;
  final String addressSpecific;
  final String province;
  final String district;
  final String ward;
  final String featuredPicture;
  final List<String> pictures;
  final PropertyCommonRules propertyCommonRules;
  final List<Facility> facilities;
  final int numberOfReviews;
  final double avgRating;
  final double minPrice;
  final List<Review> reviews;

  PropertyDetail({
    required this.id,
    this.propertyType,
    required this.name,
    required this.description,
    required this.addressSpecific,
    required this.province,
    required this.district,
    required this.ward,
    required this.featuredPicture,
    required this.pictures,
    required this.propertyCommonRules,
    required this.facilities,
    required this.numberOfReviews,
    required this.avgRating,
    required this.minPrice,
    required this.reviews,
  });

  factory PropertyDetail.fromJson(Map<String, dynamic> json) {
    return PropertyDetail(
      id: json['id'],
      propertyType: json['property_type'],
      name: json['name'],
      description: json['description'],
      addressSpecific: json['addressSpecific'],
      province: json['province'],
      district: json['district'],
      ward: json['ward'],
      featuredPicture: json['featured_picture'],
      pictures: List<String>.from(json['pictures']),
      propertyCommonRules: PropertyCommonRules.fromJson(json['propertyCommonRules']),
      facilities: (json['facilities'] as List).map((i) => Facility.fromJson(i)).toList(),
      numberOfReviews: json['numberOfReviews'],
      avgRating: json['avgRating'],
      minPrice: json['minPrice'],
      reviews: (json['reviews'] as List).map((i) => Review.fromJson(i)).toList(),
    );
  }
}

class PropertyCommonRules {
  final String id;
  final String checkInTime;
  final String checkOutTime;
  final String quietTimeFrom;
  final String quietTimeTo;
  final int minimumAllowedAge;
  final bool petAllowed;
  final bool smokingAllowed;
  final bool partyAllowed;

  PropertyCommonRules({
    required this.id,
    required this.checkInTime,
    required this.checkOutTime,
    required this.quietTimeFrom,
    required this.quietTimeTo,
    required this.minimumAllowedAge,
    required this.petAllowed,
    required this.smokingAllowed,
    required this.partyAllowed,
  });

  factory PropertyCommonRules.fromJson(Map<String, dynamic> json) {
    return PropertyCommonRules(
      id: json['id'],
      checkInTime: json['checkInTime'],
      checkOutTime: json['checkOutTime'],
      quietTimeFrom: json['quietTimeFrom'],
      quietTimeTo: json['quietTimeTo'],
      minimumAllowedAge: json['minimumAllowedAge'],
      petAllowed: json['petAllowed'],
      smokingAllowed: json['smokingAllowed'],
      partyAllowed: json['partyAllowed'],
    );
  }
}

class Facility {
  final int id;
  final String name;
  final String description;
  final double fee;

  Facility({
    required this.id,
    required this.name,
    required this.description,
    required this.fee,
  });

  factory Facility.fromJson(Map<String, dynamic> json) {
    return Facility(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      fee: json['fee'],
    );
  }
}

class Review {
  final int id;
  final int rating;
  final String content;

  Review({
    required this.id,
    required this.rating,
    required this.content,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      id: json['id'],
      rating: json['rating'],
      content: json['content'],
    );
  }
}