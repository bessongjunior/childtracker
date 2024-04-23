import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget {
  // const SplashPage({Key? key}) : super(key: key);
  final int duration = 0;
  final Widget goToPage;

  const SplashPage({super.key, required duration, required this.goToPage});

  @override
  Widget build(BuildContext context) {

    Future.delayed(Duration(seconds:duration), ()=> Navigator.push(
        context, MaterialPageRoute(builder: (context)=> goToPage)
    ));
    return Material(
        child: Container(
            color: Colors.white,//AppColors.MAIN_COLOR,
            alignment: Alignment.center,
            child: Stack(
              children: [
                const Align(
                  alignment: Alignment.center,
                  child: Icon(Icons.location_on, size: 100, color: Colors.black87,),
                ),
                Align(
                  alignment: Alignment.center,
                  child: SizedBox(
                    width: 150,
                    height: 150,
                    child: CircularProgressIndicator(
                      strokeWidth: 10,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.black87.withOpacity(0.5)),
                    ),
                  ),
                ),
                // const Text('Easy Tracking', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),),
              ],
            )
        )
    );
  }
}
