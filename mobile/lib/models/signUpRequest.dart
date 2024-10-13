class SignUpRequest {
  String firstName;
  String lastName;
  String email;
  String username;
  String password;
  String idNumber;
  String phoneNumber;

  SignUpRequest({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.username,
    required this.password,
    required this.idNumber,
    required this.phoneNumber,
  });
  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'username': username,
      'password': password,
      'idNumber': idNumber,
      'phoneNumber': phoneNumber,
    };
  }
}