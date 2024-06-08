import 'package:authentication/model/usuario.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class UsuarioService {
  CollectionReference usuariosRef =
      FirebaseFirestore.instance.collection(Usuario.collectionId);

  Future<void> create(Usuario usuario) async {
    await usuariosRef.add(usuario.toMap());
  }

  Future<Usuario> getById(String uid) async {
    Usuario usuario;
    DocumentSnapshot documentSnapshot = await usuariosRef.doc(uid).get();
    if (documentSnapshot.exists) {
      usuario =
          Usuario.fromSnapshot(documentSnapshot.id, documentSnapshot.data());
    }
    return usuario;
  }

  Future<List<Usuario>> get() async {
    QuerySnapshot querySnapshot = await usuariosRef.get();
    return querySnapshot.docs
        .map((ds) => Usuario.fromSnapshot(ds.id, ds.data()))
        .toList();
  }

  Stream<List<Usuario>> getByNombres(String nombres) {
    return usuariosRef.where('nombres', isEqualTo: nombres).snapshots().map(
        (e) => e.docs
            .map((ds) => Usuario.fromSnapshot(ds.id, ds.data()))
            .toList());
  }
}
