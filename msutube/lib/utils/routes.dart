import 'package:flutter/material.dart';
import 'package:msutube/pages/404/not_found_page.dart';
import 'package:msutube/pages/auth/login/login.dart';
import 'package:msutube/pages/auth/signup/signup.dart';
import 'package:msutube/pages/home/audio/audio.dart';
import 'package:msutube/pages/home/home.dart';
import 'package:msutube/pages/home/images/images.dart';
import 'package:msutube/pages/post/post.dart';
import 'package:msutube/pages/profile/profile.dart';
import 'package:msutube/pages/upload/upload.dart';

class RouteGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    // For routes that require arguments
    // final args = settings.arguments;
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => HomePage());
      case '/login':
        return MaterialPageRoute(builder: (_) => LoginPage());
      case '/signup':
        return MaterialPageRoute(builder: (_) => SignupPage());
      case '/post':
        return MaterialPageRoute(builder: (_) => PostPage());
      case '/upload':
        return MaterialPageRoute(builder: (_) => UploadPage());
      case '/profile':
        return MaterialPageRoute(builder: (_) => ProfilePage());
      case '/audio':
        return MaterialPageRoute(builder: (_) => AudioPage());
      case '/images':
        return MaterialPageRoute(builder: (_) => ImagesPage());
      default:
        return MaterialPageRoute(builder: (_) => NotFoundPage());
    }
  }
}
