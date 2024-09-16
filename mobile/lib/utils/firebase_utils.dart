import 'dart:convert';
import 'dart:io';

Future<String?> getDefaultWebClientId() async {
  final file = File('android/app/google-services.json');
  if (!file.existsSync()) {
    print('google-services.json file not found');
    return null;
  }

  final jsonString = await file.readAsString();
  final jsonData = json.decode(jsonString);

  try {
    return jsonData['client'][0]['oauth_client'][0]['client_id'];
  } catch (e) {
    print('Error parsing google-services.json: $e');
    return null;
  }
}