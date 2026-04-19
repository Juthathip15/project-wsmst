import 'package:flutter/material.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_AboutUs.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_Dashboard.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_Registry.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_Resetpassword.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_login.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_testing_API.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter First Project',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.amber),
        useMaterial3: true,
      ),

      //home : PagePackage(),
      //home: PagePayment(),
      //home : page_testing_API(),
      //home : page_Dashboard(),
      //home : Page_AboutUs(),
      //home: page_login(),
      //home : page_Registry(),
      //home : page_Resetpassword(),
      //npx json-server db.json --port 4000  //npx json-server db.json
    );
  }
}
