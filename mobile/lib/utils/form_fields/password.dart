// import 'package:formz/formz.dart';
//
// enum PasswordValidationError { invalid }
//
// final class Password extends FormzInput<String, PasswordValidationError> {
//   const Password.pure([super.value = '']) : super.pure();
//   const Password.dirty([super.value = '']) : super.dirty();
//
//   static final _passwordRegex =
//   RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$');
//
//   @override
//   PasswordValidationError? validator(String? value) {
//     return _passwordRegex.hasMatch(value ?? '')
//         ? null
//         : PasswordValidationError.invalid;
//   }
// }

import 'package:formz/formz.dart';

class Password extends FormzInput<String, PasswordValidationError> {
  const Password.unvalidated([
    super.value = '',
  ]) : super.pure();

  const Password.validated([
    super.value = '',
  ]) : super.dirty();

  @override
  PasswordValidationError? validator(String value) {
    if (value.isEmpty) {
      return PasswordValidationError.empty;
    } else if (value.length < 5 || value.length > 120) {
      return PasswordValidationError.invalid;
    } else {
      return null;
    }
  }
}

enum PasswordValidationError {
  empty,
  invalid,
  isValid
}
