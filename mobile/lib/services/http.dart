import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import '../models/signUpRequest.dart';
import '../utils/format.dart';

class DataClient {
  static const javaClientUrl =
      kIsWeb ? 'http://localhost:8080' : 'http://10.0.2.2:8080';
  static Dio dio = Dio(BaseOptions(baseUrl: javaClientUrl));

  static void setAuthorization(String token) {
    dio.options.headers['Authorization'] = 'Bearer $token';
  }

  static Options options = Options(
    headers: {
      'Content-Type': 'application/json',
    },
  );

  static Future<Response> login(String username, String password) {
    const url = '$javaClientUrl/api/auth/login';
    return dio.post(url, data: {
      'username': username,
      'password': password,
      'type': {'actor': 'guest'}
    });
  }

  static Future<Response> getReservations(String status) {
    var url = '$javaClientUrl/api/guests/reservations/$status';
    return dio.get(url);
  }

  static Future<Response> searchProperties({
    required String city,
    required String from,
    required String to,
    required int adults,
    required int children,
    required int pets,
    required double minPrice,
    required double maxPrice,
    required String sort,
    String? minRating,
    List<String>? facility,
    List<String>? roomType,
  }) async {
    final url = '$javaClientUrl/api/property/search';
    final queryParameters = {
      'city': city,
      'from': from,
      'to': to,
      'adults': adults,
      'children': children,
      'pets': pets,
      'minPrice': minPrice.toInt(),
      'maxPrice': maxPrice.toInt(),
      'sort': sort,
      if (minRating != null && minRating != "") 'minRating': minRating,
      if (facility != null) 'facility': facility,
      if (roomType != null) 'roomType': roomType,
    };
    return Dio().get(url, queryParameters: queryParameters, options: options);
  }

  static Future<Response> getPropertyDetail(String id) {
    final url = '$javaClientUrl/api/property/details/$id';
    return dio.get(url);
  }

  static Future<Response> getRoomsByPropertyId(
      String id, String from, String to) {
    final url = '$javaClientUrl/api/property/details/$id/rooms';
    final queryParameters = {
      'from': convertDateFormat(from),
      'to': convertDateFormat(to),
    };
    return dio.get(url, queryParameters: queryParameters);
  }

  static Future<Response> createReservation(List<Map<String, String>> reservations) {
    const url = '$javaClientUrl/api/reservation/multiple';
    return dio.post(url, data: {
      'reservations': reservations,
    });
  }

  static Future<Response> requestCancelReservation(String id) {
    final url = '$javaClientUrl/api/guests/reservations/$id/cancel';
    return dio.put(url);
  }
  static Future<Response> register(SignUpRequest signUpRequest) {
    const url = '$javaClientUrl/api/auth/register/guest';
    return dio.post(url, data: signUpRequest.toJson());
  }
  static Future<Response> authAccount(String actor, String id, String code) {
    final url = '$javaClientUrl/api/auth/verify/$actor/$id/$code';
    return dio.post(url);
  }
  static Future<Response> getProfile(String actor, String id, String code) {
    final url = '$javaClientUrl/api/guests/profile';
    return dio.get(url);
  }
}
