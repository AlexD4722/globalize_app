import 'package:flutter/material.dart';
import 'package:booking_platform_app/models/signUpResponse.dart';

class SignUpResponseProvider with ChangeNotifier {
  SignUpResponse? _signUpResponse;

  SignUpResponse? get signUpResponse => _signUpResponse;

  void setSignUpResponse(SignUpResponse response) {
    _signUpResponse = response;
    notifyListeners();
  }
}