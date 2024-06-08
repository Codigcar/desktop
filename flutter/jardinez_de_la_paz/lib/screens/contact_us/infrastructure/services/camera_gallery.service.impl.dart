import 'package:image_picker/image_picker.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/infrastructure/services/camera_gallery.service.dart';

class CameraGalleryServiceImpl extends CameraGalleryService {
  final ImagePicker _picker = ImagePicker();

  @override
  Future<String?> selectPhoto() async {
    final XFile? photo = await _picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 80,
      preferredCameraDevice: CameraDevice.rear,
    );
    if (photo == null) return null;
    print('image tomada: ${photo.path}');
    return photo.path;
  }

  @override
  Future<String?> takePhoto() async {
    final XFile? photo = await _picker.pickImage(
      source: ImageSource.camera,
      imageQuality: 80,
      preferredCameraDevice: CameraDevice.rear,
    );
    if (photo == null) return null;
    print('image tomada: ${photo.path}');
    return photo.path;
  }
}
