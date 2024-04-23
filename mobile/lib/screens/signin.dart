import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/screens/signup.dart';
import 'package:mobile/screens/resetpassword.dart';

class SignInPage extends StatefulWidget {
  const SignInPage({super.key});

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  String name='';
  final formKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String email = '';
  String password = '';

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
              SizedBox(height: height*0.04,),
              const Text('Lets Get', style: TextStyle(fontSize: 30, color: Colors.black87),),
              const Text('You Sign In', style: TextStyle(fontSize: 30, color: Colors.black87),),
              SizedBox(height: height*0.05),
              TextFormField(
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'Enter your email',
                ),
                validator: (value){
                  //   check if value is null or empty using regex
                  if(value!.isEmpty || RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+').hasMatch(value)){
                    return "Enter valid Email";
                  }
                  else {
                    return null; //'Email already taken';
                  }
                },
                onSaved: (value) {
                    email = value!;
                  }
              ),
              SizedBox(height: height*0.05),
              TextFormField(
                controller: passwordController,
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
                onSaved: (value) {
                    password = value!;
                  }
              ),
              SizedBox(height: height*0.05),
              SizedBox(height: height*0.05),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Sign In', style: TextStyle(fontSize: 22, color:  Colors.black87)),
                  SizedBox(
                    width: 100,
                    height: 100,
                    child:  TextButton.icon(
                      // onPressed: (){
                      //   if(formKey.currentState!.validate()){
                      //     // check form data is valid
                      //     const snackBar = SnackBar(content: Text('submitting form'));
                      //     scaffoldMessengerKey.currentState!.showSnackBar(snackBar);
                      //   }
                      // },
                      onPressed: () async {
                        try {
                          if (formKey.currentState!.validate()) {
                            formKey.currentState!.save();

                            // Print the email and password
                            print('Email: $email');
                            print('Password: $password');

                            // Get the form data
                            // var email = formKey.currentState!.fields['email']!.value;
                            // var password = formKey.currentState!.fields['password']!.value;

                            // Create Dio object
                            var dio = Dio();

                            // Make the API call
                            var response = await dio.post(
                              'http://127.0.0.1:5000/users/v1/login',
                              data: {'email': email, 'password': password},
                            );

                            // Check if the API call was successful
                            if (response.statusCode == 200) {
                              // Get the data from the response
                              var data = response.data;

                              // Create storage
                              const storage = FlutterSecureStorage();

                              // Save the data securely
                              await storage.write(
                                  key: 'token', value: data['token']);
                              await storage.write(
                                  key: 'username', value: data['username']);
                              await storage.write(
                                  key: 'id', value: data['id'].toString());
                              await storage.write(
                                  key: 'email', value: data['email']);

                              // Show a success message
                              const snackBar = SnackBar(
                                  content: Text('Successfully signed in!'));
                              scaffoldMessengerKey.currentState!.showSnackBar(
                                  snackBar);
                              Navigator.pushReplacementNamed(context, '/home');
                            } else if (response.statusCode! >= 400) {
                              // Show an error message
                              const snackBar = SnackBar(
                                  content: Text('Failed to sign in.'));
                              scaffoldMessengerKey.currentState!.showSnackBar(
                                  snackBar);
                            }
                          }
                        } catch (e){
                          print(e);
                          // Show a network error message
                          const snackBar = SnackBar(content: Text('Network error occurred.'));
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
              // SizedBox(height: height*0.05),
              SizedBox(height: height*0.1),
              Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      child: const Text('Sign Up'),
                      onTap: () {
                        // Navigator.push(context,MaterialPageRoute(builder: (context) => const SignInPage()),);
                        Navigator.pushReplacementNamed(context, '/register');
                      },
                    ),
                    GestureDetector(
                      child: const Text('Forgot password? Reset!'),
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

