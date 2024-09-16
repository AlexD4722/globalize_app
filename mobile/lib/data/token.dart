class TokensHolder {
  String token;
  String refreshToken;

  TokensHolder({required this.token, required this.refreshToken});
  TokensHolder.fromJson(Map<String, dynamic> json)
      : token = json['token'] ?? '',
        refreshToken = json['refreshToken'] ?? '';

  Map<String, dynamic> toJson() => {
        'token': token,
        'refreshToken': refreshToken,
      };
}

class TokenPayload {
  String? sub;
  String? exp;
  String? iat;
  UserType? type;
}

class UserType {
  String? actor;
  String? role;
}
