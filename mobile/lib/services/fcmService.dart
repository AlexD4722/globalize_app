import 'package:shared_preferences/shared_preferences.dart';

class FCMService {
  static const String _tokenKey = 'fcm_token';

  static Future<void> saveFCMToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    final String? oldToken = prefs.getString(_tokenKey);

    if (oldToken != null && oldToken != token) {
      // Xóa token cũ nếu nó khác token mới
      await prefs.remove(_tokenKey);
      print('Old FCM token removed');
    }

    // Lưu token mới
    await prefs.setString(_tokenKey, token);
    print('New FCM token saved: $token');
  }

  static Future<String?> getFCMToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  static Future<void> deleteFCMToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    print('FCM token deleted');
  }
}