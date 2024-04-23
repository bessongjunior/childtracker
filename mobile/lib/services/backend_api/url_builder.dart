class UrlBuilder {
  const UrlBuilder({
    String? baseUrl,
  }) : _baseUrl = baseUrl ?? 'https://127.0.0.1:5000/user';

  final String _baseUrl;

  // String buildGetQuoteListPageUrl(
  //     int page, {
  //       String? tag,
  //       String searchTerm = '',
  //       String? favoritedByUsername,
  //     }) {
  //   assert(
  //   (tag == null && searchTerm.isEmpty) ||
  //       (searchTerm.isEmpty && favoritedByUsername == null) ||
  //       (favoritedByUsername == null && tag == null),
  //   'FavQs doesn\'t support filtering favorites or searching by both query and '
  //       'tag at the same time.');
  //
  //   final tagQueryStringPart = tag != null ? '&filter=$tag&type=tag' : '';
  //   final favoriteQueryStringPart = favoritedByUsername != null
  //       ? '&filter=$favoritedByUsername&type=user'
  //       : '';
  //   final searchQueryStringPart =
  //   searchTerm.isNotEmpty ? '&filter=$searchTerm' : '';
  //   return '$_baseUrl/quotes/?page=$page$tagQueryStringPart$searchQueryStringPart$favoriteQueryStringPart';
  // }

  String buildGetQuoteUrl(int id) {
    return '$_baseUrl/quotes/$id';
  }


  String buildSignInUrl() {
    return '$_baseUrl/v1/users/login';
  }

  String buildSignOutUrl() {
    return '$_baseUrl/v1/users/logout';
  }

  String buildSignUpUrl() {
    return '$_baseUrl/v1/users/register';
  }

  String buildUpdateProfileUrl(String username) {
    return '$_baseUrl/v1/users/edit; $username';
  }

  // String buildRequestPasswordResetEmailUrl() {
  //   return '$_baseUrl/v1/users/forgot_password';
  // }
}
