import 'package:booking_platform_app/widgets/components/login/loginbox.dart';
import 'package:booking_platform_app/widgets/components/register/register_box.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../components/app_bar/app_bar_search.dart';
import 'loginscreen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<RegisterScreen> {
  String? _token;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
            child: Column(
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 30),
                  padding: const EdgeInsets.only(left: 20, right: 20),
                  child:  Align(
                    alignment: Alignment.topRight,
                    child:  IconButton(
                      icon: const Icon(Icons.close, color: Colors.black),
                      onPressed: () {
                        Navigator.of(context).pop(
                          MaterialPageRoute(builder: (context) => const LoginScreen()),
                        );
                      },
                    ),
                  ),
                ),
                const Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Center(
                      child: Padding(
                        padding: EdgeInsets.all(16.0),
                        child: RegisterBox(),
                      ),
                    ),
                  ],
                )
              ],
            )));
  }
}
