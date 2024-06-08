import 'package:url_launcher/url_launcher.dart';

class Utils {
  static void openBrowserLink(String url) {
    final browserUrl = url;
    final _url = Uri.parse(browserUrl);
    launchUrl(_url);
  }

  static void openPDF(String url) {
    launchUrl(Uri.parse(url), mode: LaunchMode.externalNonBrowserApplication);
  }
}
