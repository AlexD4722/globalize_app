import 'package:booking_platform_app/booking_page.dart';
import 'package:booking_platform_app/data/token.dart';
import 'package:booking_platform_app/providers/root.dart';
import 'package:booking_platform_app/services/http.dart';
import 'package:booking_platform_app/widgets/screens/homescreen.dart';
import 'package:booking_platform_app/widgets/screens/register_screen.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:toastification/toastification.dart';

import '../../../router/routers.dart';
import '../../screens/payment_screen.dart';

class LoginBox extends StatefulWidget {
  const LoginBox({super.key});

  @override
  _LoginState createState() => _LoginState();
}

Future<void> saveToken(String token) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('auth_token', token);
}

// Function to retrieve token
Future<String?> getToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('auth_token');
}

class _LoginState extends State<LoginBox> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _checkToken() async {
    String? token = await getToken();
    if (token != null) {
      DataClient.setAuthorization(token);
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const BookingPage()),
          (route) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    var setToken = context.read<RootProvider>().setTokensHolder;
    // _checkToken();
    return Column(
      children: [
        Container(
          margin: const EdgeInsets.only(top: 30),
          padding: const EdgeInsets.only(left: 20, right: 20),
          height: 220,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                TextField(
                  cursorColor: const Color(0xFFF43F5E),
                  decoration: InputDecoration(
                    labelText: "Username",
                    labelStyle: const TextStyle(color: Colors.black),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.grey[300]!),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.black),
                    ),
                  ),
                  controller: _usernameController,
                ),
                TextField(
                  cursorColor: const Color(0xFFF43F5E),
                  decoration: InputDecoration(
                      labelText: "Password",
                      labelStyle: const TextStyle(color: Colors.black),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey[300]!),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.black),
                      )),
                  controller: _passwordController,
                  obscureText: true,
                  enableSuggestions: false,
                  autocorrect: false,
                ),
                SizedBox(
                  width: double.infinity,
                  child: TextButton(
                      onPressed: () {},
                      child: const Align(
                        alignment: Alignment.centerRight,
                        child: Text(
                          'Forgot Password?',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFFF43F5E),
                          ),
                        ),
                      )),
                ),
                Container(
                  height: 40,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color(0xFFF43F5E),
                    borderRadius: BorderRadius.circular(3),
                  ),
                  child: TextButton(
                      onPressed: () async {
                        try {
                          var token = await DataClient.login(
                              _usernameController.text,
                              _passwordController.text);
                          var tokensHolder = TokensHolder.fromJson(token.data);
                          setToken(tokensHolder);
                          DataClient.setAuthorization(tokensHolder.token);
                          await FirebaseMessaging.instance
                              .setAutoInitEnabled(true);
                          await saveToken(tokensHolder.token);
                          toastification.show(
                            context: context,
                            type: ToastificationType.success,
                            title: Text('Login successful'),
                            autoCloseDuration: const Duration(seconds: 3),
                          );
                          Navigator.pushNamed(context, Routes.home);
                        } catch (e) {
                          toastification.show(
                            context: context,
                            type: ToastificationType.error,
                            title: Text('Login failed'),
                            description: Text('Please check your credentials and try again.'),
                            autoCloseDuration: const Duration(seconds: 3),
                          );
                          // ScaffoldMessenger.of(context).showSnackBar(
                          //     SnackBar(content: Text("Login failed: $e")));
                        }
                      },
                      child: const Center(
                        child: Text(
                          'Login',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Colors.white,
                          ),
                        ),
                      )),
                ),
              ],
            ),
          ),
        ),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Don't have an account?",
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: Color(0xFF7B7B7B),
                ),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).push(
                    PageRouteBuilder(
                      settings: const RouteSettings(name: Routes.searchResults),
                      pageBuilder: (context, animation, secondaryAnimation) =>
                          const RegisterScreen(),
                      transitionsBuilder:
                          (context, animation, secondaryAnimation, child) {
                        const begin = Offset(1.0, 0.0);
                        const end = Offset.zero;
                        const curve = Curves.ease;

                        var tween = Tween(begin: begin, end: end)
                            .chain(CurveTween(curve: curve));
                        var offsetAnimation = animation.drive(tween);

                        return SlideTransition(
                          position: offsetAnimation,
                          child: child,
                        );
                      },
                    ),
                  );
                },
                child: const Text(
                  'Sign Up',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFFF43F5E),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
