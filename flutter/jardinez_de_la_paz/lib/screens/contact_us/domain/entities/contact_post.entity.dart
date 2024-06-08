class ContactPostEntity {
  final String description;
  final List<ImageEntity> path;

  ContactPostEntity({this.description = '', this.path = const []});
}

class ImageEntity {
  final String path;

  ImageEntity({this.path = ''});
}
