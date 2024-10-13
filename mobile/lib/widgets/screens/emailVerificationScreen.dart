import 'package:booking_platform_app/providers/signUpResponse.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/token.dart';
import '../../providers/root.dart';
import '../../router/routers.dart';
import '../components/login/loginbox.dart';
import '../components/register/sixDigitInput.dart';
import 'loginscreen.dart';
import '../../services/http.dart';

class EmailVerificationScreen extends StatelessWidget {
  final String password;

  const EmailVerificationScreen({super.key, required this.password});

  @override
  Widget build(BuildContext context) {
    var setSignUpResponse =
        context.read<SignUpResponseProvider>().signUpResponse;
    print(" setSignUpResponse ${setSignUpResponse?.id}");
    final TextEditingController _codeController = TextEditingController();
    var setToken = context.read<RootProvider>().setTokensHolder;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Email Verification', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600, color: Colors.white),),
        backgroundColor: const Color(0xFFF43F5E),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Enter 6-Digit Code',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 20),
            SixDigitInput(controller: _codeController),
            const SizedBox(height: 20),
            InkWell(
              onTap: () async {
                String code = _codeController.text;
                if (setSignUpResponse != null) {
                  try {
                    final response = await DataClient.authAccount(
                      'guest',
                      setSignUpResponse.id,
                      code,
                    );
                    if (response.statusCode == 200) {
                      try {
                        var token = await DataClient.login(
                            setSignUpResponse.username, password);
                        var tokensHolder = TokensHolder.fromJson(token.data);
                        setToken(tokensHolder);
                        DataClient.setAuthorization(tokensHolder.token);
                        await FirebaseMessaging.instance
                            .setAutoInitEnabled(true);
                        await saveToken(tokensHolder.token);
                        Navigator.pushNamed(context, Routes.home);
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text("Login failed")));
                      }
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text("Verification failed")));
                    }
                  } catch (e) {
                    ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Verification failed")));
                  }
                }
              },
              child: Container(
                padding: const EdgeInsets.only(left: 50, right: 50, top: 10, bottom: 10),
                decoration: BoxDecoration(
                  color: const Color(0xFFF43F5E),
                  borderRadius: BorderRadius.circular(5),
                ),
                child: const Text(
                  'Verify',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            InkWell(
              onTap: () {
                Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (context) => const LoginScreen()),
                  (route) => false,
                );
              },
              child: const Text('Back to Login',
                style: TextStyle(
                  fontSize: 16,
                  decoration: TextDecoration.underline,
                ),),
            ),
          ],
        ),
      ),
    );
  }
}
