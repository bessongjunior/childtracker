import 'package:flutter/material.dart';
// import 'package:flutter_neumorphic/flutter_neumorphic.dart';
import 'package:mobile/screens/splashpage.dart';
import 'package:mobile/screens/welcomepage.dart';
import 'package:mobile/screens/signin.dart';
import 'package:mobile/screens/signup.dart';
import 'package:mobile/screens/resetpassword.dart';

void main() {
  runApp(const TrackerApp());
}

class TrackerApp extends StatelessWidget {
  const TrackerApp({super.key});


  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tracker app',
      theme: ThemeData(
        // colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        // colorScheme: ColorScheme.fromSwatch().copyWith(secondary: Colors.white),
        useMaterial3: true,
      ),
      //   themeMode: ThemeMode.light,
      //   theme: const NeumorphicThemeData(
      //     baseColor: Color(0xFFFFFFFF),
      //     lightSource: LightSource.topLeft,
      //     depth: 10,
      //   ),
      //   darkTheme: const NeumorphicThemeData(
      //     baseColor: Color(0xFF3E3E3E),
      //     lightSource: LightSource.topLeft,
      //     depth: 6,
      //   ),
    debugShowCheckedModeBanner: false,
    initialRoute: "/splashpage",
    routes: <String, WidgetBuilder>{
      "/splashpage": (BuildContext context) => const SplashPage(goToPage: WelcomePage(), duration: 3),
      "/welcome": (BuildContext context) => const WelcomePage(),
      "/login": (BuildContext context) => const SignInPage(),
      "/register": (BuildContext context) => const SignUpPage(),
      "/reset-password": (BuildContext context) => const ResetPasswordPage(),
      //
      // "/home": (BuildContext context) => new Home(),
      // "/maps": (BuildContext context) => new Components(),
      //
      // "/profile": (BuildContext context) => new Profile(),
      // "/settings": (BuildContext context) => new Settings(),
    });
  }
}
