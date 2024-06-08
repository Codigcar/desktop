import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/domain/entities/contact_post.entity.dart';
import 'package:jardinez_de_la_paz/screens/contact_us/domain/repositories/contact.repository.dart';

//! 1. state
class ContactState {
  final bool isLoading;
  final ContactPostEntity contact;

  ContactState({
    this.isLoading = false,
    ContactPostEntity? contact,
  }) : contact = contact ?? ContactPostEntity();

  ContactState copyWith({
    bool? isLoading,
    ContactPostEntity? contact,
  }) =>
      ContactState(
        isLoading: isLoading ?? this.isLoading,
        contact: contact ?? this.contact,
      );
}

//! 2. notifier

class ContactNotifier extends StateNotifier<ContactState> {
  final ContactRepository contactRepository;

  ContactNotifier({required this.contactRepository}) : super(ContactState());

  
}
