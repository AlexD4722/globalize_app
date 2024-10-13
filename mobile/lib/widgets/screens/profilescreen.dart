import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../providers/root.dart';
import '../../services/http.dart';
import 'loginscreen.dart';

Future<void> removeToken() async {
  print("remove");
  final prefs = await SharedPreferences.getInstance();
  await prefs.remove('auth_token');
}

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic>? profileData;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _getProfile();
  }

  Future<void> _getProfile() async {
    try {
      final response = await DataClient.getProfile('guest', 'userId', 'code');
      if (response.statusCode == 200) {
        setState(() {
          profileData = response.data;
          isLoading = false;
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to retrieve profile: ${response.data}')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to retrieve profile: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundImage: Image.asset('lib/assets/images/avatarDemo.png', width: 80, height: 80).image,
            backgroundColor: Colors.white,
          ),
          const SizedBox(height: 16),
          Text(
            "${profileData?['firstName'] ?? ""} ${profileData?['lastName'] ?? ""}",
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            profileData?['email'] ?? 'john.doe@example.com',
            style: const TextStyle(fontSize: 16, color: Colors.grey),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: ListView(
              children: [
                const ListTile(
                  leading: Icon(Icons.settings),
                  title: Text('Settings'),
                ),
                const ListTile(
                  leading: Icon(Icons.history),
                  title: Text('Order History'),
                ),
                const ListTile(
                  leading: Icon(Icons.help),
                  title: Text('Help & Support'),
                ),
                ListTile(
                  leading: const Icon(Icons.logout),
                  title: const Text('Logout'),
                  onTap: () async {
                    await removeToken();
                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(builder: (context) => const LoginScreen()),
                          (route) => false,
                    );
                    Provider.of<RootProvider>(context, listen: false).setPageIndex('Search');
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}