import 'package:booking_platform_app/booking_page.dart';
import 'package:booking_platform_app/data/token.dart';
import 'package:booking_platform_app/providers/root.dart';
import 'package:booking_platform_app/services/http.dart';
import 'package:booking_platform_app/widgets/screens/homescreen.dart';
import 'package:booking_platform_app/widgets/screens/loginscreen.dart';
import 'package:booking_platform_app/widgets/screens/register_screen.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../router/routers.dart';
import '../../screens/payment_screen.dart';

class RegisterBox extends StatefulWidget {
  const RegisterBox({super.key});

  @override
  _RegisterBoxState createState() => _RegisterBoxState();
}

class _RegisterBoxState extends State<RegisterBox> {
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneNumberController = TextEditingController();
  final _passwordController = TextEditingController();
  final _passwordConfirmController = TextEditingController();

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    _lastNameController.dispose();
    _firstNameController.dispose();
    _emailController.dispose();
    _phoneNumberController.dispose();
    _passwordConfirmController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var setToken = context.read<RootProvider>().setTokensHolder;
    return Column(
      children: [
        const Center(
          child: Text(
            'Globalize',
            style: TextStyle(
              fontSize: 20,
              color: Color(0xFFF43F5E),
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Container(
          margin: const EdgeInsets.only(top: 30),
          padding: const EdgeInsets.only(left: 20, right: 20),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Row(
                  children: [
                    Flexible(
                        child: TextField(
                      cursorColor: const Color(0xFFF43F5E),
                      decoration: InputDecoration(
                        labelText: "Last Name",
                        labelStyle: const TextStyle(color: Colors.black),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey[300]!),
                        ),
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                        ),
                      ),
                      controller: _lastNameController,
                    )),
                    const SizedBox(
                      width: 20,
                    ),
                    Flexible(
                        child: TextField(
                      cursorColor: const Color(0xFFF43F5E),
                      decoration: InputDecoration(
                        labelText: "First Name",
                        labelStyle: const TextStyle(color: Colors.black),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey[300]!),
                        ),
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                        ),
                      ),
                      controller: _firstNameController,
                    )),
                  ],
                ),
                const SizedBox(
                  height: 20,
                ),
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
                const SizedBox(
                  height: 20,
                ),
                TextField(
                  cursorColor: const Color(0xFFF43F5E),
                  decoration: InputDecoration(
                    labelText: "Email",
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
                const SizedBox(
                  height: 20,
                ),
                TextField(
                  cursorColor: const Color(0xFFF43F5E),
                  decoration: InputDecoration(
                    labelText: "Phone Number",
                    labelStyle: const TextStyle(color: Colors.black),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.grey[300]!),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.black),
                    ),
                  ),
                  controller: _phoneNumberController,
                ),
                const SizedBox(
                  height: 20,
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
                const SizedBox(
                  height: 20,
                ),
                TextField(
                  cursorColor: const Color(0xFFF43F5E),
                  decoration: InputDecoration(
                      labelText: "Password Confirm",
                      labelStyle: const TextStyle(color: Colors.black),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey[300]!),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.black),
                      )),
                  controller: _passwordConfirmController,
                  obscureText: true,
                  enableSuggestions: false,
                  autocorrect: false,
                ),
                const SizedBox(
                  height: 20,
                ),
                Container(
                  height: 40,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color(0xFFF43F5E),
                    borderRadius: BorderRadius.circular(3),
                  ),
                  child: TextButton(
                      onPressed: () {},
                      child: const Center(
                        child: Text(
                          'Register',
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
          margin: const EdgeInsets.only(top: 10),
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(
                    MaterialPageRoute(builder: (context) => LoginScreen()),
                  );
                },
                style: TextButton.styleFrom(
                  padding: EdgeInsets.zero,
                  minimumSize: const Size(50, 30),
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  splashFactory: NoSplash.splashFactory,
                  backgroundColor: Colors.transparent,
                ),
                child: const Text(
                  "Back Login",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF7B7B7B),
                    decoration: TextDecoration.underline,
                    decorationColor: Color(0xFF7B7B7B),
                    decorationThickness: 1,
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
