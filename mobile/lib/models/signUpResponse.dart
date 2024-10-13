class SignUpResponse {
  String id;
  String firstName;
  String lastName;
  String email;
  String username;
  String phoneNumber;
  String idNumber;
  bool isVerified;

  SignUpResponse({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.username,
    required this.phoneNumber,
    required this.idNumber,
    required this.isVerified,
  });

  factory SignUpResponse.fromJson(Map<String, dynamic> json) {
    return SignUpResponse(
      id: json['id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      email: json['email'],
      username: json['username'],
      phoneNumber: json['phoneNumber'],
      idNumber: json['idNumber'],
      isVerified: json['isVerified'],
    );
  }
}