import 'package:jardinez_de_la_paz/screens/contact_us/domain/entities/contact_post.entity.dart';

abstract class ContactRepository {
  Future<void> saveSuggestion(String message, List<ImageEntity> images);
}
