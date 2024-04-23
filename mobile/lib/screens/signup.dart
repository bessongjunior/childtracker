// import 'package:flutter_neumorphic/flutter_neumorphic.dart';
import 'package:mobile/screens/signin.dart';
import 'package:mobile/screens/resetpassword.dart';
import 'package:flutter/material.dart';


class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  String name='';
  final formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();

    return Scaffold(
      key: scaffoldMessengerKey,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Container(
        padding: const EdgeInsets.only(left: 40, right: 40),
        child: Form(
          key: formKey,
          child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: height*0.04),
              const Text('Lets Get', style: TextStyle(fontSize: 30, color: Colors.black87),),
              const Text('You Sign Up', style: TextStyle(fontSize: 30, color: Colors.black87),),
              SizedBox(height: height*0.04),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Enter your username',
                ),
                validator: (value){
                //   check if value is null or empty using regex
                  if(value!.isEmpty || RegExp(r'^[a-zA-Z0-9]*$').hasMatch(value)){
                    return "Enter valid username";
                  }
                  else {
                    return 'user name taken';
                  }
                },
              ),
              SizedBox(height: height*0.04),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Enter your email',
                ),
                validator: (value){
                  //   check if value is null or empty using regex
                  if(value!.isEmpty || RegExp(r'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$').hasMatch(value)){
                    // r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+' -- use this
                    return "Enter valid Email";
                  }
                  else {
                    return 'Email already taken';
                  }
                },
              ),
              SizedBox(height: height*0.04),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Enter your password',
                ),
                validator: (value){
                  //   check if value is null or empty using regex
                  if(value!.isEmpty){
                    return "Enter valid password";
                  }
                  else {
                    return null;
                  }
                },
              ),
              SizedBox(height: height*0.04),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Sign Up', style: TextStyle(fontSize: 22, color:  Colors.black87)),
                  // NeumorphicButton(
                  //   margin: const EdgeInsets.only(top: 12),
                  //   onPressed: (){
                  //     if(formKey.currentState!.validate()){
                  //     //   check form data is valid
                  //       const snackBar = SnackBar(content: Text('submitting form'));
                  //       scaffoldMessengerKey.currentState!.showSnackBar(snackBar);
                  //     }
                  //   },
                  //   style: const NeumorphicStyle(
                  //     shape: NeumorphicShape.flat,
                  //     boxShape: NeumorphicBoxShape.circle(),
                  //   )
                  // ),

                  SizedBox(
                    width: 90,
                    height: 90,
                    child:  TextButton.icon(
                        onPressed: (){
                          if(formKey.currentState!.validate()){
                            // check form data is valid
                            const snackBar = SnackBar(content: Text('submitting form'));
                            scaffoldMessengerKey.currentState!.showSnackBar(snackBar);
                          }
                        },
                        icon: const Icon(Icons.arrow_forward, color: Colors.white, size: 50.0),
                        // icon: const SizedBox(
                        //   width: 80.0, // adjust width as needed
                        //   height: 80.0, // adjust height as needed
                        //   child: Icon(Icons.arrow_forward, color: Colors.white, size: 35.0),),
                        label: Container(),//Text('Submit', style: TextStyle(color: Colors.white)),
                        style: TextButton.styleFrom(
                          backgroundColor: Colors.black,
                          shape: const CircleBorder(),
                        ),
                      ),
                  )
                ],
              ),
              SizedBox(height: height*0.08),
              Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      child: const Text('Sign In'),
                      onTap: () {
                        // Navigator.push(context,MaterialPageRoute(builder: (context) => const SignInPage()),);
                        Navigator.pushReplacementNamed(context, '/login');
                      },
                    ),
                    GestureDetector(
                      child: const Text('Forgot password?'),
                      onTap: () {
                        // Navigator.push(context, MaterialPageRoute(builder: (context) => const ResetPasswordPage()),);
                        Navigator.pushReplacementNamed(context, '/reset-password');
                      },
                    )
                  ]
              ),
            ],
          ),
        ),
      ),
    );
  }
}


// NeumorphicTheme(
// themeMode: ThemeMode.light, //or dark / system
// darkTheme: NeumorphicThemeData(
// baseColor: Color(0xff333333),
// accentColor: Colors.green,
// lightSource: LightSource.topLeft,
// depth: 4,
// intensity: 0.3,
// ),
// theme: NeumorphicThemeData(
// baseColor: Color(0xffDDDDDD),
// accentColor: Colors.cyan,
// lightSource: LightSource.topLeft,
// depth: 6,
// intensity: 0.5,
// ),
// )